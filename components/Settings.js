import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import { defaultSettings, colorTheme } from '../utils/defaultSettings';
import MyButton from './MyButton';

const Settings = ({ toggleSettings, sessionTypes, updateSettings }) => {
  const [focusTime, setFocusTime] = useState(sessionTypes.focus.minutes);
  const [shortBreakTime, setShortBreakTime] = useState(sessionTypes.shortBreak.minutes);
  const [longBreakTime, setLongBreakTime] = useState(sessionTypes.longBreak.minutes);

  const reset = () => {
    setFocusTime(defaultSettings.focus.minutes);
    setShortBreakTime(defaultSettings.shortBreak.minutes);
    setLongBreakTime(defaultSettings.longBreak.minutes);
  };

  const save = () => {
    updateSettings(focusTime, shortBreakTime, longBreakTime);
    toggleSettings();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topTitleText}>Settings</Text>
      <Text style={styles.subTitleText}>(minutes)</Text>

      <View style={styles.verticalView}>
        <Text style={styles.titleText}>Focus</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setFocusTime(newText)}
          value={focusTime.toString()}
        />
      </View>

      <View style={styles.verticalView}>
        <Text style={styles.titleText}>Short break</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setShortBreakTime(newText)}
          value={shortBreakTime.toString()}
        />
      </View>

      <View style={styles.verticalView}>
        <Text style={styles.titleText}>Long break</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setLongBreakTime(newText)}
          value={longBreakTime.toString()}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.horizontalView}>
        <MyButton title="Defaults" accessibilityLabel="Reset to defaults" onPress={reset} />

        <MyButton title="Save" accessibilityLabel="Save settings" onPress={() => save()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: colorTheme.SteelTeal,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  verticalView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topTitleText: {
    fontSize: 50,
    color: colorTheme.Gunmetal,
  },
  subTitleText: {
    fontSize: 25,
    marginTop: 0,
    marginBottom: 50,
    paddingTop: 0,
    color: colorTheme.Gunmetal,
  },
  titleText: {
    fontSize: 30,
    color: colorTheme.Gunmetal,
  },
  timeText: {
    fontSize: 30,
    color: colorTheme.Gunmetal,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 50,
    textAlign: 'center',
    fontSize: 25,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '80%',
    marginTop: 50,
    marginBottom: 50,
  },
});

Settings.propTypes = {
  toggleSettings: PropTypes.func,
  sessionTypes: PropTypes.object,
  updateSettings: PropTypes.func,
};

export default Settings;
