import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const metalColors = {
    gold: 'from-yellow-400 to-amber-600',
    silver: 'from-gray-300 to-gray-500',
    platinum: 'from-gray-200 to-gray-400',
    palladium: 'from-gray-300 to-gray-600'
  };

  return (
    <Link to={`/products/${product._id}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${metalColors[product.metalType]}`}>
              <span className="text-white text-6xl font-bold opacity-20">
                {product.metalType.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          {/* Metal Type Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${metalColors[product.metalType]} shadow-lg`}>
            {product.metalType.toUpperCase()}
          </div>

          {/* Stock Badge */}
          {product.stockQuantity === 0 && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold shadow-lg">
              Out of Stock
            </div>
          )}

          {/* Quick View */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">{product.purity}</span> • {product.weight.value} {product.weight.unit}
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                ${product.totalPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                (${product.pricePerUnit}/{product.weight.unit})
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="w-full flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;