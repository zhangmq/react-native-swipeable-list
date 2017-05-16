import {
  compose,
  withState,
  withHandlers,
  lifecycle,
  pure,
} from 'recompose';
import {
  PanResponder,
} from 'react-native';

export default compose(
  pure,
  withState('panning', 'setPanning', null),
  withState('active', 'setActive', null),
  withHandlers({
    startPanning: ({ 
      panning, 
      active, 
      setPanning, 
      setActive,
    }) => key => {
      setPanning(() => key);
      setActive(() => active === key ? key : null);
    },
    endPanning: ({
      panning,
      active,
      setPanning,
      setActive,
    }) => (key, isActive) => {
      if (panning === key) {
        setPanning(() => null);
        setActive(() => isActive ? key : null);
      }
    }
  }),
);