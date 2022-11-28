import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Main from './components/Main';

export default function App() {
  return (
    <>
      <Main />
      <StatusBar style="auto" />
    </>
  );
}
