import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [repass, setRePass] = useState('');

  const handleRegister = async () => {
    if (!email || !pass || !repass) {
      Alert.alert('Error', 'Vui lòng nhập tất cả các trường.');
      return;
    }

    if (pass !== repass) {
      Alert.alert('Error', 'Mật khẩu không khớp.');
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, pass);
      Alert.alert('Thành công', 'Đăng ký thành công');
      navigation.navigate('LoginScreen');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Email đã được sử dụng.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Email không hợp lệ.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Mật khẩu quá yếu.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          placeholder="Nhập email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Nhập mật khẩu"
          value={pass}
          onChangeText={setPass}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Nhập lại mật khẩu"
          value={repass}
          onChangeText={setRePass}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: 300,
    padding: 10,
    marginVertical: 10,
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
