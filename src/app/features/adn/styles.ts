import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8d6e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapItem: {
    width: 125,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 25,
    height: 25,
    borderRadius: 30,
    position: 'absolute',
  },
  leftDot: {
    left: 0,
  },
  rightDot: {
    right: 0,
  },
  line: {
    width: 100,
    zIndex: -2,
    height: 5,
    backgroundColor: '#f1f2f6',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
});
