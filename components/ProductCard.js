
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>

      <Text style={styles.price}>
        ${product.price.toFixed(2)}
      </Text>

      <Text style={styles.category}>
        {product.category}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 6,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 130,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    minHeight: 38,
  },
  price: {
    fontSize: 16,
    color: '#16834A',
    fontWeight: 'bold',
    marginTop: 8,
  },
  category: {
    color: '#777777',
    fontSize: 12,
    marginTop: 5,
  },
});
