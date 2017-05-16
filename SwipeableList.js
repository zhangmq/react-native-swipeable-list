import React from 'react';
import { 
  FlatList,
  View,
} from 'react-native';
import listWithSwipeable from './listWithSwipeable';

const SwipeableList = listWithSwipeable(({ 
  panning,
  active,
  startPanning,
  endPanning,
  panResponder,
  renderItem,
  keyExtractor,
  ...flatListProps,
}) => (
  <FlatList
    scrollEnabled={!panning}
    renderItem={renderItem({ panning, active, startPanning, endPanning, keyExtractor })}
    keyExtractor={keyExtractor}
    {...flatListProps}
  />
));

export default SwipeableList;