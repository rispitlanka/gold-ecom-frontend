import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Award, TrendingUp } from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metalPrices, setMetalPrices] = useState({
    gold: 1950,
    silver: 24,
    platinum: 980,
    palladium: 1580
  });

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productAPI.getAll({ limit: 4 });
      setProducts(response.data.data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                Invest in Precious Metals with Confidence
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Buy and sell gold, silver, platinum, and palladium at competitive prices. 
                Secure your financial future with tangible assets.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="flex items-center space-x-2">
                    <span>Browse Products</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/sell">
                  <Button variant="outline" size="lg">
                    Sell Your Metals
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Live Prices */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
                Live Metal Prices
              </h3>
              <div className="space-y-4">
                {Object.entries(metalPrices).map(([metal, price]) => (
                  <div key={metal} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        metal === 'gold' ? 'bg-yellow-500' :
                        metal === 'silver' ? 'bg-gray-400' :
                        metal === 'platinum' ? 'bg-gray-300' :
                        'bg-gray-500'
                      }`}></div>
                      <span className="font-semibold text-gray-900 dark:text-white capitalize">
                        {metal}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ${price}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        +2.3% today
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                Prices per troy ounce • Updated in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The most trusted platform for precious metal transactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure Transactions',
                description: 'Bank-level encryption and secure payment processing'
              },
              {
                icon: Award,
                title: 'Certified Quality',
                description: 'All products certified for purity and authenticity'
              },
              {
                icon: Truck,
                title: 'Fast Delivery',
                description: 'Insured shipping with tracking to your doorstep'
              },
              {
                icon: TrendingUp,
                title: 'Best Prices',
                description: 'Competitive pricing updated with real-time market rates'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 text-white mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Handpicked selection of premium precious metals
            </p>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="text-center">
                <Link to="/products">
                  <Button size="lg" variant="outline">
                    View All Products
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-amber-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-yellow-50 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their precious metal investments
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="shadow-xl">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;