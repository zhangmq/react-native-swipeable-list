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
const CONTENT_TRANSLATEX = 8;

export default compose(
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
          this.props.startPanning(keyExtractor(item));
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
          const { actionsWidth, keyExtractor, item, active } = this.props;
          this.state.x.flattenOffset();
          const nextActive = active
            ? gestureState.dx < actionsWidth / 2
            : gestureState.dx < -actionsWidth / 2;
          if (Math.abs(gestureState.dx + CONTENT_TRANSLATEX)) {
            const distance = actionsWidth + CONTENT_TRANSLATEX;
            this.state.x.setValue(gestureState.dx > 0 ? distance : -distance);
          }
          this.props.endPanning(keyExtractor(item), nextActive);
        },
        onPanResponderTerminationRequest: () => false,
      });
    },
    componentWillReceiveProps(nextProps) {
      const { actionsWidth } = nextProps;
      if (nextProps.active !== this.props.active 
        || nextProps.panning !== this.props.panning
      ) {
        this.state.x.stopAnimation(() => {
          Animated.timing(
            this.state.x,
            {
              toValue: nextProps.active ? -actionsWidth : 0,
              duration: ANIMATE_DURATION,
            }
          ).start();
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