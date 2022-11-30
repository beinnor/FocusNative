import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { secsInMmssString } from '../utils/Helper';
import { colorTheme } from '../utils/defaultSettings';
import MyButton from './MyButton';

const Timer = ({ seconds, nextSession }) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const [paused, setPaused] = useState(true);
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    if (restart) {
      reset();
    }
  }, [restart]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(intervalId);
  });

  const tick = () => {
    if (paused) return;
    if (secondsLeft === 0) {
      finished();
    } else {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
    }
  };

  const reset = () => {
    setSecondsLeft(seconds);
    setPaused(true);
    setRestart(false);
  };

  const skip = () => {
    finished();
  };

  const finished = () => {
    setRestart(true);
    nextSession();
  };

  const startBtnJSX = () => {
    return (
      <MyButton title="Start" accessibilityLabel="Start session" onPress={() => setPaused(false)} />
    );
  };

  const skipBtnJSX = () => {
    return <MyButton title="skip" accessibilityLabel="skip session time" onPress={() => skip()} />;
  };

  const stopBtnJSX = () => {
    return (
      <MyButton title="Stop" accessibilityLabel="Stop session" onPress={() => setPaused(true)} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.timeLeftText}>{secsInMmssString(secondsLeft)}</Text>
      </View>
      <View style={styles.buttonStyles}>
        {paused ? startBtnJSX() : stopBtnJSX()}

        {skipBtnJSX()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    height: '100%',
  },
  timeLeftText: {
    fontSize: 80,
    color: colorTheme.Gunmetal,
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8,
  },

  buttonStyles: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 4,
  },
});

Timer.propTypes = {
  seconds: PropTypes.number,
  nextSession: PropTypes.func,
};

export default Timer;
