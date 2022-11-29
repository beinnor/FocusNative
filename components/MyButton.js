import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const MyButton = ({ title, accessibilityLabel, onPress }) => {
  return (
    <View style={styles.container}>
      <Button title={title} accessibilityLabel={accessibilityLabel} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});

MyButton.propTypes = {
  title: PropTypes.string,
  accessibilityLabel: PropTypes.string,
  onPress: PropTypes.func,
};

export default MyButton;
