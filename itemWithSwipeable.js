import {
  compose,
  withState,
  lifecycle,
} from 'recompose';
import {
  PanResponder,
  Animated,
} from 'react-native';

const ANIMATE_DURATION = 300;



export const itemWithSwipeable = compose(
  withState('active', 'setActive', 0),
  lifecycle({
    componentWillMount() {
      this.state = {
        x: new Animated.Value(0),
      };
      
      this.state.panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        },
        onPanResponderGrant: (evt, gestureState) => {
          const { actionsWidth, keyExtractor, item, active } = this.props;
          this.props.setPanning(() => keyExtractor(item));
          this.state.x.stopAnimation(value => {
            this.state.x.setOffset(active ? -actionsWidth : 0);
            this.state.x.setValue(0);
          });
        },
        onPanResponderMove: Animated.event([
          null,
          { dx: this.state.x }
        ]),
        onPanResponderRelease: (evt, gestureState) => {
          const { actionsWidth, active } = this.props;
          this.state.x.flattenOffset();
          
          const nextActive = active
            ? gestureState.dx < actionsWidth / 2
            : gestureState.dx < -actionsWidth / 2;

          Animated.timing(
            this.state.x,
            {
              toValue: nextActive ? -actionsWidth : 0,
              duration: ANIMATE_DURATION,
            }
          ).start(({ finished }) => {
            if (!finished) return;
            if (active !== nextActive) {
              this.props.setActive(() => nextActive);
            } else {
              this.props.setPanning(() => null);
            }
          });
        },
        onPanResponderTerminationRequest: () => false,
      });
    },
    componentWillReceiveProps(nextProps) {
      if (!nextProps.panning && this.props.panning) {
        this.state.x.stopAnimation(() => {
          Animated.timing(
            this.state.x,
            {
              toValue: 0,
              duration: ANIMATE_DURATION,
            }
          ).start(({ finished }) => {
            if (!finished) return;
            if (this.props.active) {
              this.props.setActive(() => false);
            }
          });
        });
      }
    },
    shouldComponentUpdate(nextProps) {
      return nextProps.item !== this.props.item
        || nextProps.index !== this.props.index
        || nextProps.panning !== this.props.panning
        || nextProps.active !== this.props.active;
    },
  }),
);