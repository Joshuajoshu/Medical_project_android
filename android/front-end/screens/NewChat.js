import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const NewChat = () => {
  const [imgUrl, setImgUrl] = useState('data:image/png;base64,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');

  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        setImgUrl(result?.assets[0]?.uri);
      }
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  };

  const openLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        setImgUrl(result?.assets[0]?.uri);
      }
    } catch (error) {
      console.error('Error opening image library:', error);
    }
  };

  const generateAPI = async () => {
   
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imgUrl,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch('http://192.168.1.7:5000/api/analyze', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.text();
      setResponseText(data);
    } catch (error) {
      console.error('Error generating API:', error);
    }
  };

  return (
    <ScrollView >
      <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.mainHeading}>Upload an Image</Text>
      </View>
        <Image resizeMode="contain" style={styles.img} source={{ uri: imgUrl }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnCam} onPress={openCamera}>
            <Text style={styles.textBtn}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCam} onPress={openLibrary}>
            <Text style={styles.textBtn}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.generateBtn} onPress={generateAPI}>
          <Text style={styles.textBtn}>Analyse the Image</Text>
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
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    width: '100%', 
    marginBottom: 10,
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
  img: {
    width: '90%',
    height: 300,
    alignSelf: 'center',
    
  },
  btnCam: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'green',
    marginBottom: 10,
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

export default NewChat;
