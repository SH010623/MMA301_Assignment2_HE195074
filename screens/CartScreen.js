
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import CartItem from '../components/CartItem';
import PriceSummary from '../components/PriceSummary';
import useCart from '../hooks/useCart';

export default function CartScreen() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>
          Your cart is empty
        </Text>
        <Text>Add some products to get started!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={() =>
              updateQuantity(item.id, item.quantity + 1)
            }
            onDecrease={() =>
              updateQuantity(item.id, item.quantity - 1)
            }
            onRemove={() => removeFromCart(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <View>
            <PriceSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
            />

            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearCart}
            >
              <Text style={styles.clearText}>
                Clear Cart
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  list: {
    padding: 12,
    paddingBottom: 24,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F6FA',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#D62828',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  clearText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
