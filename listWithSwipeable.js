import {
  compose,
  withState,
  lifecycle,
  pure,
} from 'recompose';
import {
  PanResponder,
} from 'react-native';

export const listWithSwipeable = compose(
  pure,
  withState('panning', 'setPanning', null),
  lifecycle({
    componentWillMount() {
      this.state = {};
      this.state.panResponder = PanResponder.create({
        onStartShouldSetPanResponderCapture: () => this.props.panning,
        onStartShouldSetPanResponder: () => this.props.panning,
        onPanResponderGrant: () => {
          this.props.setPanning(() => null);
        },
        onPanResponderTerminationRequest: () => false,
      });
    },
  }),
);