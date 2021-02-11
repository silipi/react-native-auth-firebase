import React from 'react';
import { LogBox } from 'react-native';
import Providers from './navigation';
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Providers />
  );
}