
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PriceSummary({
  totalItems,
  totalPrice,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Total items</Text>
        <Text>{totalItems}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total price</Text>
        <Text style={styles.totalPrice}>
          ${totalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16834A',
  },
});
