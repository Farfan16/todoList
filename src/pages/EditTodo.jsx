import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const EditTodo = ({route, navigation}) => {
  const {id, editTitle, editDesc} = route.params;
  const [editedTitle, setEditedTitle] = useState(editTitle);
  const [editedDesc, setEditedDesc] = useState(editDesc);

  const handleSubmit = () => {
    const editedData = {
      id: id,
      title: editedTitle,
      desc: editedDesc,
    };
    navigation.navigate('Main', {editedData: editedData});
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={{
            fontSize: 35,
            color: '#4682A9',
            borderWidth: 2,
            borderColor: '#4682A9',
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            fontFamily: 'Poppins-BoldItalic',
          }}>
          Edit Kerjaan
        </Text>
      </View>
      <View style={styles.inputField}>
        <Text style={styles.inputTitle}>Masukkan Judul Kerjaan</Text>
        <TextInput
          style={styles.input}
          value={editedTitle}
          onChangeText={text => setEditedTitle(text)}
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.inputTitle}>Masukkan Deskripsi Kerjaan</Text>
        <TextInput
          multiline
          style={styles.input}
          value={editedDesc}
          onChangeText={text => setEditedDesc(text)}
        />
      </View>
      {/* <Button title="Tambah kerjaan" color="#91C8E4" /> */}
      <View style={{flex: 1, alignItems: 'center'}}>
        <Pressable
          style={({pressed}) => [
            {backgroundColor: pressed ? '#749BC2' : '#91C8E4'},
            styles.btnAdd,
          ]}
          onPress={handleSubmit}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontWeight: '500',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Update Kerjaan
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
    backgroundColor: '#F6F4EB',
  },

  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
    marginBottom: 50,
  },

  inputField: {
    gap: 10,
    marginBottom: 10,
  },

  inputTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },

  input: {
    height: 50,
    width: 'auto',
    borderWidth: 1,
    padding: 10,
    borderColor: '#4682A9',
    borderRadius: 4,
    color: '#12130F',
    fontSize: 16,
    fontFamily: 'Poppins',
  },

  btnAdd: {
    alignItems: 'center',
    width: '60%',
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 2,
    borderRadius: 40,
  },
});
