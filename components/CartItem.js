
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.price}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.button}
            onPress={onDecrease}
          >
            <Text>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onIncrease}
          >
            <Text>+</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onRemove}>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 110,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
  },
  price: {
    color: '#16834A',
    fontWeight: 'bold',
    marginTop: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#EEEEEE',
    borderRadius: 6,
  },
  quantity: {
    fontWeight: 'bold',
  },
  remove: {
    color: '#D62828',
  },
});
