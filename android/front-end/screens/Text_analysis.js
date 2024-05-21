import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const Text_analysis = () => {
  const [text, setText] = useState('');
  const [responseText, setResponseText] = useState('');

  const generateAPI = async () => {
    try {
      const response = await fetch('http://192.168.1.7:5000/api/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }), // Sending the text to the API
      });
      console.log(response.text);
      const data = await response.text();
      setResponseText(data);
    } catch (error) {
      console.error('Error generating API:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.mainHeading}>Ask any medical related questions and bot will provide information</Text>
      </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your medical question"
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity style={styles.generateBtn} onPress={generateAPI}>
          <Text style={styles.textBtn}>Get Answer</Text>
        </TouchableOpacity>
        {responseText ? <Text style={styles.responseText}>{responseText}</Text> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
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
  generateBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'blue',
    marginBottom: 20,
  },
  textBtn: {
    color: '#fff',
  },
  responseText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Text_analysis;
