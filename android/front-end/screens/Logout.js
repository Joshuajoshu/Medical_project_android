import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const Logout = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get('https://9348-175-101-99-41.ngrok-free.app/api/users');
        console.log(res.data);
        setUsers(res.data); // Set the retrieved users data into state
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchApi(); // Call fetchApi function inside useEffect
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <View>
      <Text>List of Users:</Text>
      {/* Render the users data */}
      <FlatList
        data={users}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Age: {item.age}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Logout;
