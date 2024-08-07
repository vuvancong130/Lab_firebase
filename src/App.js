import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Register from './Register';
import Login from './Login';
const StackDemo = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StackDemo.Navigator initialRouteName="LoginScreen">
        <StackDemo.Screen
          name="HomeScreen"
          component={Home}
          options={{headerShown: false}}
        />
        <StackDemo.Screen
          name="RegisterScreen"
          component={Register}
          options={{headerShown: false}}
        />
        <StackDemo.Screen
          name="LoginScreen"
          component={Login}
          options={{headerShown: false}}
        />
      </StackDemo.Navigator>
    </NavigationContainer>
  );
};

export default App;
