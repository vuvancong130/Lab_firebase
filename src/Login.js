import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    if (route.params?.clearFields) {
      // Khi nhận được thông tin điều hướng, làm trống các trường nhập liệu
      setEmail('');
      setPass('');
    }
  }, [route.params?.clearFields]);

  const handleLogin = async () => {
    if (!email || !pass) {
      Alert.alert('Error', 'Vui lòng nhập email và mật khẩu.');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, pass);
      navigation.navigate('HomeScreen');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Email không hợp lệ.');
      } else if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert('Error', 'Thông tin đăng nhập không chính xác.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log('ERROR', error);
      Alert.alert('Error', 'Đăng nhập bằng Google không thành công.');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

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
