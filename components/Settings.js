import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import defaultSettings from '../utils/defaultSettings';

const Settings = ({ toggleSettings, sessionTypes, updateSettings }) => {
  const [focusTime, setFocusTime] = useState(sessionTypes.focus.minutes);
  const [shortBreakTime, setShortBreakTime] = useState(sessionTypes.shortBreak.minutes);
  const [longBreakTime, setLongBreakTime] = useState(sessionTypes.longBreak.minutes);

  const reset = () => {
    setFocusTime(defaultSettings.focus.minutes);
    setShortBreakTime(defaultSettings.shortBreak.minutes);
    setLongBreakTime(defaultSettings.longBreak.minutes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topTitleText}>Settings</Text>

      <Text style={styles.titleText}>Focus time:</Text>
      <View style={styles.horizontalView}>
        <Button
          title="-"
          accessibilityLabel="Less time"
          onPress={() => {
            if (focusTime > 1) {
              setFocusTime((focusTime) => focusTime - 1);
            }
          }}
        />

        <Text style={styles.timeText}>{focusTime}</Text>

        <Button
          title="+"
          accessibilityLabel="More time"
          onPress={() => setFocusTime((focusTime) => focusTime + 1)}
        />
      </View>
      <Text style={styles.titleText}>Short break time:</Text>
      <View style={styles.horizontalView}>
        <Button
          title="-"
          accessibilityLabel="Less time"
          onPress={() => {
            if (shortBreakTime > 1) {
              setShortBreakTime((shortBreakTime) => shortBreakTime - 1);
            }
          }}
        />

        <Text style={styles.timeText}>{shortBreakTime}</Text>

        <Button
          title="+"
          accessibilityLabel="More time"
          onPress={() => setShortBreakTime((shortBreakTime) => shortBreakTime + 1)}
        />
      </View>

      <Text style={styles.titleText}>Long break time:</Text>
      <View style={styles.horizontalView}>
        <Button
          title="-"
          accessibilityLabel="Less time"
          onPress={() => {
            if (longBreakTime > 1) {
              setLongBreakTime((longBreakTime) => longBreakTime - 1);
            }
          }}
        />

        <Text style={styles.timeText}>{longBreakTime}</Text>

        <Button
          title="+"
          accessibilityLabel="More time"
          onPress={() => setLongBreakTime((longBreakTime) => longBreakTime + 1)}
        />
      </View>

      <View style={styles.horizontalView}>
        <Button title="Defaults" accessibilityLabel="Reset to defaults" onPress={reset} />

        <Button
          title="Save"
          accessibilityLabel="Save settings"
          onPress={() => updateSettings(focusTime, shortBreakTime, longBreakTime)}
        />
      </View>

      <Button title="Close" accessibilityLabel="Close this page" onPress={() => toggleSettings()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topTitleText: {
    fontSize: 50,
  },
  titleText: {
    fontSize: 30,
  },
  timeText: {
    fontSize: 30,
  },
});

Settings.propTypes = {
  toggleSettings: PropTypes.func,
  sessionTypes: PropTypes.object,
  updateSettings: PropTypes.func,
};

export default Settings;
