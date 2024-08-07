import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('LoginScreen', {clearFields: true});
    } catch (error) {
      Alert.alert('Error', 'Đăng xuất không thành công.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      {user && <Text style={styles.email}>Email: {user.email}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
