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
      setActive(() => null);
    },
    endPanning: ({
      panning,
      active,
      setPanning,
      setActive,
    }) => key => {
      setPanning(prevKey => prevKey === key ? null : prevKey);
      setActive(prevKey => prevKey === key ? key : prevKey);
    }
  })
);