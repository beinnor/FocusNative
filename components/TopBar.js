import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TopBar = ({ type }) => {
  return (
    <View style={styles.container}>
      {type === 'focus' ? (
        <Text style={styles.marked}>Focus</Text>
      ) : (
        <Text style={styles.unmarked}>Focus</Text>
      )}

      {type === 'shortbreak' ? (
        <Text style={styles.marked}>Short Break</Text>
      ) : (
        <Text style={styles.unmarked}>Short Break</Text>
      )}

      {type === 'longbreak' ? (
        <Text style={styles.marked}>Long Break</Text>
      ) : (
        <Text style={styles.unmarked}>Long Break</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marked: {
    borderWidth: 1,
  },
  unmarked: {
    borderWidth: 0,
  },
});

TopBar.propTypes = {
  type: PropTypes.string,
};

export default TopBar;
