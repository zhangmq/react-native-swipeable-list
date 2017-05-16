import {
  compose,
  withState,
  lifecycle,
  pure,
} from 'recompose';
import {
  PanResponder,
} from 'react-native';

export default compose(
  pure,
  withState('panning', 'setPanning', null),
);