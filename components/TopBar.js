import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colorTheme } from '../utils/defaultSettings';

const TopBar = ({ type }) => {
  return (
    <View style={styles.container}>
      {type === 'focus' ? (
        <Text style={styles.marked}>Focus</Text>
      ) : (
        <Text style={styles.unmarked}>Focus</Text>
      )}

      {type === 'shortBreak' ? (
        <Text style={styles.marked}>Short Break</Text>
      ) : (
        <Text style={styles.unmarked}>Short Break</Text>
      )}

      {type === 'longBreak' ? (
        <Text style={styles.marked}>Long Break</Text>
      ) : (
        <Text style={styles.unmarked}>Long Break</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marked: {
    borderWidth: 1,
    fontSize: 20,
    margin: 5,
    padding: 5,
    color: colorTheme.Gunmetal,
  },
  unmarked: {
    borderWidth: 0,
    fontSize: 20,
    margin: 5,
    padding: 5,
    color: colorTheme.Gunmetal,
  },
});

TopBar.propTypes = {
  type: PropTypes.string,
};

export default TopBar;
