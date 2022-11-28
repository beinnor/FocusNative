import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { secsInMmssString } from '../utils/Helper';

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

  const finished = () => {
    setRestart(true);
    nextSession();
  };

  const startBtnJSX = () => {
    return (
      <Button title="Start" accessibilityLabel="Start session" onPress={() => setPaused(false)} />
    );
  };

  const resetBtnJSX = () => {
    if (paused && secondsLeft !== seconds)
      return <Button title="Reset" accessibilityLabel="Reset session time" onPress={reset} />;

    return <Button title="Reset" accessibilityLabel="Reset session time" disabled />;
  };

  const stopBtnJSX = () => {
    return (
      <Button title="Stop" accessibilityLabel="Stop session" onPress={() => setPaused(true)} />
    );
  };

  return (
    <View>
      <Text style={styles.timeLeftText}>{secsInMmssString(secondsLeft)}</Text>
      <View>
        {paused ? startBtnJSX() : stopBtnJSX()}

        {resetBtnJSX()}
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
