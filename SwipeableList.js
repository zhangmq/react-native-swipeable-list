import React from 'react';
import { 
  FlatList,
  View,
} from 'react-native';
import listWithSwipeable from './listWithSwipeable';

const SwipeableList = listWithSwipeable(({ 
  panning,
  setPanning,
  panResponder,
  renderItem,
  keyExtractor,
  ...flatListProps,
}) => (
  <FlatList
    scrollEnabled={!panning}
    renderItem={renderItem({ panning, setPanning, keyExtractor })}
    keyExtractor={keyExtractor}
    {...flatListProps}
  />
));

export default SwipeableList;