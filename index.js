/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '332203496517-s87q4inli23444ir2jgin9lho9g7r6ld.apps.googleusercontent.com',
});

AppRegistry.registerComponent(appName, () => App);
