import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Button,Alert } from 'react-native';
import Text_analysis from './screens/Text_analysis';

import NewChat from './screens/NewChat';
import History from './screens/History';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Login_home = ({ navigation }) => {
  const Tab = createBottomTabNavigator();

  const handleLogout = async () => {
      await AsyncStorage.removeItem('email');
      Alert.alert('Logout', 'You have been successfully logged out');
      navigation.navigate("Login");
  };

    return <>   
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="Image_analysis" component={NewChat} options={
            { tabBarIcon: () => <MaterialIcons name="image" size={24} color="black" /> }
          } />
          <Tab.Screen name="Text_analysis" component={Text_analysis} options={
            { tabBarIcon: () => <MaterialIcons name="chat" size={24} color="black" /> }
          } />
          
          
        </Tab.Navigator>
      </NavigationContainer>
      <View>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      </>
};
export default Login_home;