/* eslint-disable no-console */
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure().useReactNative().connect();

  console.tron = tron;

  if (tron.clear) tron.clear();
}
