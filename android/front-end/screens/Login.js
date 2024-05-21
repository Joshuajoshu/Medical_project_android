import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, Alert,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  console.log(username);
  const handleRegister =()=>{
    navigation.navigate("Signup");
  }
  const handleLogin = async () => {
      const response = await fetch('http://192.168.1.7:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await response.json();
      console.log(data)
      if (data === "Success") {
        await AsyncStorage.setItem('username', username);
        navigation.navigate("Login_home");
      } else {
        Alert.alert('Login Failed', 'Invalid Username or Password');
      }
  }

  const isLoginDisabled = !username || !password;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.mainHeading}>LOGIN</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} disabled={isLoginDisabled} />
        </View>
      <View style={styles.buttonContainer}>
          <Button title="Register" onPress={handleRegister} />
      </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 180,
    marginLeft: 50
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 10,
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    borderRadius: 5,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginLeft: 12,
    padding : 10,
  },
});

export default Login;
