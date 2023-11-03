import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Swipeable} from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Main = ({navigation, route}) => {
  const [todoList, setTodoList] = useState([]);
  let row = [];
  let prevOpenedRow;

  useEffect(() => {
    if (route.params?.dataArray) {
      setTodoList(prevTodoList => [
        ...prevTodoList,
        ...route.params?.dataArray,
      ]);
      console.log(route.params?.dataArray);
    }
    if (route.params?.editedData) {
      const editedData = route.params.editedData;
      const editedIndex = findIndex(editedData.id);
      if (editedIndex !== -1) {
        updateTodoItem(editedIndex, editedData);
      }
    }
  }, [route.params]);
  console.log(todoList);

  const findIndex = id => {
    return todoList.findIndex(item => item.id === id);
  };

  const updateTodoItem = (index, editedData) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[index] = editedData;
    setTodoList(updatedTodoList);
  };

  const deleteItem = index => {
    let arrTodoList = [...todoList];
    arrTodoList.splice(index, 1);
    setTodoList(arrTodoList);
  };

  const editItem = item => {
    navigation.navigate('EditTodo', {
      id: item.id,
      editTitle: item.title,
      editDesc: item.desc,
    });
  };

  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const leftSwipeAction = index => (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Hapus kerjaan?', 'Yakin untuk hapus kerjaan ini?', [
            {
              text: 'Ya',
              onPress: () => {
                deleteItem(index);
              },
            },
            {
              text: 'Tidak',
            },
          ]);
        }}
        style={styles.deleteZone}>
        <Animated.Text
          style={{
            fontWeight: '600',
            paddingHorizontal: 15,
            paddingVertical: 10,
            transform: [{translateX: trans}],
            elevation: 5,
            fontFamily: 'Poppins-SemiBold',
            color: '#F6F4EB',
          }}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const rightSwipeAction = index => (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [1, 0, 0, -20],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        onPress={() => editItem(todoList[index])}
        style={styles.editZone}>
        <Animated.Text
          style={{
            fontWeight: '600',
            paddingHorizontal: 15,
            paddingVertical: 10,
            transform: [{translateX: trans}],
            elevation: 5,
            fontFamily: 'Poppins-SemiBold',
            color: '#F6F4EB',
          }}>
          Edit
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={{
            fontSize: 35,
            // fontWeight: 'bold',
            color: '#4682A9',
            fontFamily: 'Poppins-BoldItalic',
          }}>
          Ngapain yaa?
        </Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate('InputTodo')}
        style={({pressed}) => [
          {backgroundColor: pressed ? '#749BC2' : '#91C8E4'},
          styles.btnAdd,
        ]}>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: '700',
            textTransform: 'uppercase',
            fontFamily: 'Poppins',
          }}>
          Tambah Kerjaan
        </Text>
      </Pressable>
      <View style={{width: '100%', flex: 1, paddingHorizontal: 30}}>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {todoList.map((item, index) => (
            <View key={index} style={{width: '100%', elevation: 10}}>
              <Swipeable
                ref={ref => (row[index] = ref)}
                friction={0.5}
                overshootLeft={0.1}
                renderLeftActions={leftSwipeAction(index)}
                renderRightActions={rightSwipeAction(index)}
                onSwipeableOpen={closeRow(index)}>
                <View style={[styles.lists, {elevation: 5}]}>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <Text style={styles.listDesc}>{item.desc}</Text>
                </View>
              </Swipeable>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: SCREEN_WIDTH,
    paddingTop: 30,
    paddingHorizontal: 50,
    gap: 25,
    backgroundColor: '#F6F4EB',
  },

  titleContainer: {
    borderWidth: 2,
    borderColor: '#4682A9',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    paddingVertical: 8,
  },

  btnAdd: {
    alignItems: 'center',
    width: 'fit',
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 2,
    borderRadius: 20,
  },

  listContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 15,
    paddingBottom: 16,
  },

  lists: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    width: '100%',
    height: 'fit',
    elevation: 5,
  },

  listTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  listDesc: {
    fontSize: 14,
    fontFamily: 'Poppins',
  },

  deleteZone: {
    backgroundColor: '#FD3E81',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'fit',
    width: 100,
    // borderTopLeftRadius: 50,
    // borderBottomLeftRadius: 50,
  },

  editZone: {
    backgroundColor: '#F3A712',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'fit',
    width: 100,
  },
});
