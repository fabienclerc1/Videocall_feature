import 'react-native-gesture-handler';

import App from './App';
import {AppRegistry} from 'react-native';
import {ContextProvider} from './src/components/SocketContext/index';
import React from 'react';
import {name as appName} from './app.json';

const AppReact = () => (
  <ContextProvider>
    <App />
  </ContextProvider>
);

AppRegistry.registerComponent(appName, () => AppReact);
