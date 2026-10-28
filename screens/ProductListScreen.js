
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';

import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ProductCard from '../components/ProductCard';
import useCart from '../hooks/useCart';

const PAGE_SIZE = 10;

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Lấy tổng số sản phẩm trong giỏ hàng
  const { totalItems } = useCart();

  // Ngăn nhiều yêu cầu API chạy đồng thời
  const requestLock = useRef(false);

  // Tải sản phẩm từ DummyJSON API
  const fetchProducts = useCallback(
    async (offset, reset = false) => {
      if (requestLock.current) return;

      requestLock.current = true;
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${offset}`
        );

        if (!response.ok) {
          throw new Error('Unable to load products.');
        }

        const data = await response.json();

        // Cập nhật danh sách sản phẩm
        setProducts((prev) =>
          reset
            ? data.products
            : [...prev, ...data.products]
        );

        // Vị trí bắt đầu của trang tiếp theo
        setSkip(offset + data.products.length);

        // Kiểm tra còn sản phẩm để tải không
        setHasMore(
          offset + data.products.length < data.total
        );
      } catch (err) {
        setError(
          err.message || 'Something went wrong.'
        );
      } finally {
        requestLock.current = false;
        setLoading(false);
      }
    },
    []
  );

  // Tải trang đầu tiên khi màn hình được mở
  useEffect(() => {
    fetchProducts(0, true);
  }, [fetchProducts]);

  // Tìm kiếm trong những sản phẩm đã tải
  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  // Tải trang tiếp theo khi cuộn gần cuối danh sách
  const loadMore = () => {
    if (
      !loading &&
      !requestLock.current &&
      hasMore &&
      !search.trim()
    ) {
      fetchProducts(skip);
    }
  };

  // Hiển thị trạng thái cuối danh sách
  const renderFooter = () => {
    if (loading && products.length > 0) {
      return (
        <ActivityIndicator
          size="large"
          style={styles.footer}
        />
      );
    }

    if (error && products.length > 0) {
      return (
        <TouchableOpacity
          style={styles.retry}
          onPress={() => fetchProducts(skip)}
        >
          <Text style={styles.retryText}>
            Loading failed. Tap to retry.
          </Text>
        </TouchableOpacity>
      );
    }

    if (!hasMore && products.length > 0) {
      return (
        <Text style={styles.endText}>
          You have reached the end.
        </Text>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>ShopMate</Text>

        <TouchableOpacity
          style={styles.cartButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartText}>
            Cart ({totalItems})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        style={styles.search}
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      {/* Initial loading */}
      {loading && products.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.message}>
            Loading products...
          </Text>
        </View>
      ) : error && products.length === 0 ? (
        /* Initial loading error */
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => fetchProducts(0, true)}
          >
            <Text style={styles.retryButtonText}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      ) : filteredProducts.length === 0 ? (
        /* Empty search result */
        <View style={styles.center}>
          <Text style={styles.message}>
            No products found.
          </Text>
        </View>
      ) : (
        /* Product list */
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  product: item,
                })
              }
            />
          )}
          numColumns={2}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  cartButton: {
    backgroundColor: '#16834A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },

  cartText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  search: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    fontSize: 15,
  },

  list: {
    paddingBottom: 20,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  message: {
    marginTop: 12,
    fontSize: 15,
    color: '#555555',
  },

  errorText: {
    color: '#D62828',
    textAlign: 'center',
  },

  retryButton: {
    backgroundColor: '#16834A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 14,
  },

  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  retry: {
    padding: 16,
    alignItems: 'center',
  },

  retryText: {
    color: '#D62828',
  },

  footer: {
    marginVertical: 20,
  },

  endText: {
    textAlign: 'center',
    color: '#777777',
    padding: 16,
  },
});
