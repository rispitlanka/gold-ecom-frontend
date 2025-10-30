import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-yellow-900 dark:to-amber-900">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 opacity-50">
              {item.metalType.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {item.purity} • {item.weight.value} {item.weight.unit}
        </p>
        <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
          ${item.totalPrice.toLocaleString()}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Minus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>
        <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Plus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Subtotal</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          ${(item.totalPrice * item.quantity).toLocaleString()}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item._id)}
        className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
      >
        <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
      </button>
    </div>
  );
};

export default CartItem;