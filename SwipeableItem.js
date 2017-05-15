import React from 'react';
import {
  Animated,
  View,
} from 'react-native';
import itemWithSwipeable from './itemWithSwipeable';

const CONTENT_TRANSLATEX = 8;

const SwipeableItem = itemWithSwipeable(({ 
  x,
  offset,
  active,
  panResponder,
  actionsWidth,
  renderBody,
  renderActions,
  style,
  itemStyle,
  item,
  index,
}) => {
  const range = [-actionsWidth, 0];
  const extraRange = [-CONTENT_TRANSLATEX - actionsWidth, -actionsWidth, 0, CONTENT_TRANSLATEX + actionsWidth];
  const translateX = x.interpolate({
    inputRange: range,
    outputRange: range,
    extrapolate: 'clamp',
  });

  const extraTranslateX = x.interpolate({
    inputRange: extraRange,
    outputRange: [-CONTENT_TRANSLATEX, 0, 0, CONTENT_TRANSLATEX],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={style}
      {...panResponder.panHandlers}
    >
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: actionsWidth,
        }}
      >
        {renderActions({ item, index })}
      </View>
      <Animated.View
        style={[itemStyle, {
          flex: 1,
          transform: [
            { translateX },
          ],
        }]}
      >
        <Animated.View
          style={{
            flex: 1,
            transform: [
              { translateX: extraTranslateX },
            ]
          }}
        >
          {renderBody({ item, index })}
        </Animated.View>
      </Animated.View>
    </View>
  );
});

export default SwipeableItem;