import React, { useEffect, useState } from 'react';
import { productAPI } from '../services/api';
import ProductList from '../components/products/ProductList';
import ProductFilter from '../components/products/ProductFilter';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    metalType: 'all',
    sortBy: 'newest',
    search: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.metalType !== 'all') {
        params.metalType = filters.metalType;
      }

      const response = await productAPI.getAll(params);
      let productsData = response.data.data;

      // Apply search filter
      if (filters.search) {
        productsData = productsData.filter(product =>
          product.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'price-low':
          productsData.sort((a, b) => a.totalPrice - b.totalPrice);
          break;
        case 'price-high':
          productsData.sort((a, b) => b.totalPrice - a.totalPrice);
          break;
        case 'name':
          productsData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          // newest first (default from API)
          break;
      }

      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Our Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse our collection of premium precious metals
          </p>
        </div>

        <ProductFilter filters={filters} setFilters={setFilters} />
        <ProductList products={products} loading={loading} />
      </div>
    </div>
  );
};

export default Products;