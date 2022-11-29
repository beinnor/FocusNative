import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import Settings from '../components/Settings';
import Timer from '../components/Timer';
import TopBar from '../components/TopBar';
import defaultSettings from '../utils/defaultSettings';

const Main = () => {
  const [sessionTypes, setSessionTypes] = useState(defaultSettings);
  const [shortBreaksCount, setShortBreaksCount] = useState(0);
  const [currentSessionType, setCurrentSessionType] = useState(sessionTypes.focus);
  const [showSettings, setShowSettings] = useState(false);

  const selectSessionType = () => {
    if (currentSessionType.name === 'focus') {
      if (shortBreaksCount === 3) {
        setCurrentSessionType(sessionTypes.longBreak);
        setShortBreaksCount(0);
      } else {
        setCurrentSessionType(sessionTypes.shortBreak);
        setShortBreaksCount(shortBreaksCount + 1);
      }
    } else if (currentSessionType.name === 'shortbreak') {
      setCurrentSessionType(sessionTypes.focus);
    } else {
      setCurrentSessionType(sessionTypes.focus);
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const updateSettings = (focusTime, shortBreakTime, longBreakTime) => {
    const tmp = {
      focus: { name: 'focus', text: 'Focus', minutes: focusTime },
      shortBreak: {
        name: 'shortbreak',
        text: 'Short break',
        minutes: shortBreakTime,
      },
      longBreak: {
        name: 'longbreak',
        text: 'Long break',
        minutes: longBreakTime,
      },
    };

    setSessionTypes(tmp);
    setCurrentSessionType(tmp[currentSessionType.name]);
  };

  const nextSession = () => {
    selectSessionType();
  };
  if (showSettings) {
    return (
      <Settings
        toggleSettings={toggleSettings}
        sessionTypes={sessionTypes}
        updateSettings={updateSettings}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <TopBar type={currentSessionType.name} />

        <Text style={styles.currentSessionText}>{currentSessionType.text}</Text>

        <Timer seconds={currentSessionType.minutes * 60} nextSession={nextSession} />

        <Button title="Settings" accessibilityLabel="Set session timers" onPress={toggleSettings} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentSessionText: {
    fontSize: 60,
  },
});

export default Main;
