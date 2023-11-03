import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Main from './src/pages/Main';
import InputTodo from './src/pages/InputTodo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import EditTodo from './src/pages/EditTodo';

// export type RootStackParamList = {
//   Main: undefined;
//   InputTodo: undefined;
// };

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="InputTodo"
            component={InputTodo}
            options={{
              headerStyle: {backgroundColor: '#F6F4EB'},
              headerShadowVisible: false,
              title: '',
              headerTintColor: '#4682A9',
            }}
          />
          <Stack.Screen
            name="EditTodo"
            component={EditTodo}
            options={{
              headerStyle: {backgroundColor: '#F6F4EB'},
              headerShadowVisible: false,
              title: '',
              headerTintColor: '#4682A9',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
