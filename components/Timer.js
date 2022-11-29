import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { secsInMmssString } from '../utils/Helper';
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
    <View>
      <Text style={styles.timeLeftText}>{secsInMmssString(secondsLeft)}</Text>
      <View>
        {paused ? startBtnJSX() : stopBtnJSX()}

        {skipBtnJSX()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeLeftText: {
    fontSize: 60,
  },
});

Timer.propTypes = {
  seconds: PropTypes.number,
  nextSession: PropTypes.func,
};

export default Timer;
