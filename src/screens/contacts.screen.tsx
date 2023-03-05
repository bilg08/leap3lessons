import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  Button,
  // Animated,
} from 'react-native';
import * as RNContacts from 'react-native-contacts';
import * as RNPermission from 'react-native-permissions';
// import {PanGestureHandler} from 'react-native-gesture-handler';
// import {
// useAnimatedStyle,
// useSharedValue,
// useAnimatedGestureHandler,
// } from 'react-native-reanimated';
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  contactListHeader: {
    backgroundColor: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  contactItem: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 5,
  },
});
export function Contacts(): JSX.Element {
  const [contacts, setContacts] = useState([]);
  const [isContactUpdated, setIsContactUpdated] = useState(false);
  // const x = useSharedValue(0);
  // const y = useSharedValue(0);
  // const onGestureEvent = useAnimatedGestureHandler({
  //   onActive: ({translationX, translationY}) => {
  //     x.value = translationX;
  //     y.value = translationY;
  //   },
  // });
  // const style = useAnimatedStyle(() => ({
  //   transform: [{translateX: x.value}, {translateY: y.value}],
  // }));
  async function checkGrantedToGetContactThenGetContacts() {
    const isGranted = await RNPermission.check(
      RNPermission.PERMISSIONS.ANDROID.READ_CONTACTS,
    );

    if (isGranted !== 'granted') {
      RNPermission.request(RNPermission.PERMISSIONS.ANDROID.READ_CONTACTS);
    } else {
      try {
        let contactsOfUser = await RNContacts.getAll();
        let contactsOfUserIncludedFirstLetter = contactsOfUser.map(contact => ({
          ...contact,
          firstLetter: contact.givenName.slice(0, 1).toUpperCase(),
        }));
        const groupByLetter = contactsOfUserIncludedFirstLetter.reduce(
          (group, contact) => {
            const {firstLetter} = contact;
            //@ts-ignore
            group[firstLetter] = group[firstLetter] ?? [];
            //@ts-ignore
            group[firstLetter].push(contact);
            return group;
          },
          {},
        );
        //@ts-ignore
        setContacts(Object.entries(groupByLetter));
      } catch (error) {}
    }
  }
  function renderItem({item}: {item: any}) {
    return (
      <View>
        <Text style={styles.contactListHeader}>{item[0]}</Text>
        <FlatList
          data={item[1]}
          renderItem={({item}) => (
            // <PanGestureHandler onGestureEvent={onGestureEvent}>
            // <Animated.View style={style}>
            <Text key={item.recordID} style={styles.contactItem}>
              {item.givenName}
            </Text>
            // </Animated.View>
            // </PanGestureHandler>
          )}
        />
      </View>
    );
  }
  useEffect(() => {
    checkGrantedToGetContactThenGetContacts();
  }, [isContactUpdated]);

  async function addContact() {
    let newPerson = {
      recordID: '6b2237ee0df85980',
      backTitle: '',
      company: '',
      emailAddresses: [
        {
          label: 'work',
          email: 'carl-jung@example.com',
        },
      ],
      familyName: 'Jung',
      givenName: 'CHelloarl',
      middleName: '',
      jobTitle: '',
      phoneNumbers: [
        {
          label: 'mobile',
          number: '(555) 555-5555',
        },
      ],
      hasThumbnail: true,
      thumbnailPath: 'content://com.android.contacts/display_photo/3',
      postalAddresses: [
        {
          label: 'home',
          formattedAddress: '',
          street: '123 Fake Street',
          pobox: '',
          neighborhood: '',
          city: 'Sample City',
          region: 'CA',
          state: 'CA',
          postCode: '90210',
          country: 'USA',
        },
      ],
      prefix: 'MR',
      suffix: '',
      department: '',
      birthday: {year: 1988, month: 1, day: 1},
      imAddresses: [
        {username: '0123456789', service: 'ICQ'},
        {username: 'johndoe123', service: 'Facebook'},
      ],
      isStarred: false,
    };
    await RNContacts.addContact(newPerson).then(() => {
      setIsContactUpdated(e => !e);
    });
  }
  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Contact baihgui baina``</Text>}
        ListHeaderComponent={<ContactHeader addContact={addContact} />}
      />
    </SafeAreaView>
  );
}

function ContactHeader({addContact}: {addContact: () => {}}) {
  return (
    <View>
      <Text>Contacts</Text>
      <Button title="add Contact" onPress={addContact} />
    </View>
  );
}
