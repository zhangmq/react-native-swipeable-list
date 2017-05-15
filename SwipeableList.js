import React from 'react';
import { 
  FlatList,
  View,
} from 'react-native';
import { listWithSwipeable } from './helpers';

const SwipeableList = listWithSwipeable(({ 
  panning,
  setPanning,
  panResponder,
  renderItem,
  keyExtractor,
  ...flatListProps,
}) => (
  <View style={{ flex: 1 }} {...panResponder.panHandlers}>
    <FlatList
      scrollEnabled={!panning}
      renderItem={renderItem({ panning, setPanning, keyExtractor })}
      keyExtractor={keyExtractor}
      {...flatListProps}
    />
  </View>
));

export default SwipeableList;