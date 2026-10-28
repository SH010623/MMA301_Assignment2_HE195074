
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import useCart from '../hooks/useCart';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, totalItems } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Success', 'Product added to cart!');
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.category}>
          {product.category}
        </Text>

        <Text style={styles.title}>
          {product.title}
        </Text>

        <Text style={styles.price}>
          ${product.price.toFixed(2)}
        </Text>

        <Text style={styles.descriptionTitle}>
          Description
        </Text>

        <Text style={styles.description}>
          {product.description}
        </Text>

        <Text style={styles.rating}>
          Rating: {product.rating ?? 'N/A'}
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addButtonText}>
            Add to Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartButtonText}>
            View Cart ({totalItems})
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  category: {
    color: '#777777',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  price: {
    color: '#16834A',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  description: {
    color: '#555555',
    lineHeight: 22,
  },
  rating: {
    marginTop: 16,
  },
  addButton: {
    backgroundColor: '#16834A',
    padding: 16,
    borderRadius: 10,
    marginTop: 24,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cartButton: {
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  cartButtonText: {
    color: '#16834A',
    fontWeight: 'bold',
  },
});
