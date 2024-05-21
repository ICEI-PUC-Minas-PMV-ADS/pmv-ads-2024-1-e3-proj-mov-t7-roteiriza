import React from 'react';

import Typography, { TypographyStyles } from '../components/Typography';

import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const Header = ({ title }) => {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action
        icon="chevron-left"
        onPress={() => {}}
        style={styles.icon}
      />
      <Typography style={TypographyStyles.headerTitle}>
        {title}
      </Typography>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    elevation: 0,
  },

  icon: {
    color: '#75B1FA',
    marginRight: 0,
    marginLeft: 2,
  },
});

export default Header;
