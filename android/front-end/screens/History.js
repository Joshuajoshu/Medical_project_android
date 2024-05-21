import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';


const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = () => {  
    setLoading(true);
    fetch('http://192.168.1.7:5000/api/get_chat_history')
      .then(response => response.json())
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching chat history:', error);
        setLoading(false);
      });
  };

  return (
    <ScrollView>
    <View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {history.map((entry, index) => (
        <View key={index}>
          <Image source={{ uri: `data:image/png;base64,${entry.image}` }} style={{alignSelf:"center", width: 200, height: 200 }} />
          <Text>{entry.response}</Text>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};

export default History;
