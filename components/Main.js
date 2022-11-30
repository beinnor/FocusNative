import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Settings from '../components/Settings';
import Timer from '../components/Timer';
import TopBar from '../components/TopBar';
import { defaultSettings, colorTheme } from '../utils/defaultSettings';
import MyButton from './MyButton';

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
    const tmp = defaultSettings;

    tmp.focus.minutes = focusTime;
    tmp.shortBreak.minutes = shortBreakTime;
    tmp.longBreak.minutes = longBreakTime;

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
        <View style={styles.first}>
          <TopBar type={currentSessionType.name} />
        </View>
        <View style={styles.second}>
          <Text style={styles.currentSessionText}>{currentSessionType.text}</Text>
        </View>
        <View style={styles.third}>
          <Timer
            style={styles.timerstyle}
            seconds={currentSessionType.minutes * 60}
            nextSession={nextSession}
          />
        </View>
        <View style={styles.fourth}>
          <MyButton
            style={styles.button}
            title="Settings"
            accessibilityLabel="Set session timers"
            onPress={toggleSettings}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorTheme.LavenderWeb,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  currentSessionText: {
    fontSize: 50,
    color: colorTheme.Gunmetal,
  },
  button: {
    marginBottom: 0,
  },
  first: {
    flex: 2,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  second: {
    flex: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  third: { flex: 8, width: '100%', alignItems: 'center' },
  fourth: { flex: 1, width: '100%', alignItems: 'center' },
});

export default Main;
