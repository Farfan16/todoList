import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const InputTodo = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = () => {
    if (title && desc) {
      let id = uuidv4();
      const newData = [...data, {id, title, desc}];
      setData(newData);
      setTitle('');
      setDesc('');
      // console.log(newData)
      navigation.navigate('Main', {dataArray: newData});
    }
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
          Tambah Kerjaan
        </Text>
      </View>
      <View style={styles.inputField}>
        <Text style={styles.inputTitle}>Judul Kerjaan</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.inputTitle}>Deskripsi Kerjaan</Text>
        <TextInput
          multiline
          style={styles.input}
          value={desc}
          onChangeText={setDesc}
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
            Simpan Kerjaan
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InputTodo;

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
