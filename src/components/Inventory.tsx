import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingDown, Plus, Minus, Search, Edit3, DollarSign, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  totalStock: number;
  totalSold: number;
  lowStockThreshold: number;
  lastRestocked: string;
  salesVelocity: number; // units per week
  channels: {
    website: { inStock: number; sold: number };
    showroom: { inStock: number; sold: number };
  };
  costs: {
    components: { name: string; cost: number }[];
    totalCost: number;
  };
}

interface BusinessCost {
  id: string;
  category: string;
  description: string;
  amount: number;
  frequency: 'monthly' | 'yearly' | 'one-time';
}

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCostModal, setShowCostModal] = useState(false);
  const [newCost, setNewCost] = useState({ category: '', description: '', amount: 0, frequency: 'monthly' as const });

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'The Meadow Whisper Top',
      sku: 'MWT-001',
      image: '/The Meadow Whisper Top.png',
      price: 910.00,
      totalStock: 145,
      totalSold: 156,
      lowStockThreshold: 20,
      lastRestocked: '2025-01-10',
      salesVelocity: 12,
      channels: {
        website: { inStock: 95, sold: 98 },
        showroom: { inStock: 50, sold: 58 }
      },
      costs: {
        components: [
          { name: 'Fabric', cost: 45.50 },
          { name: 'Thread', cost: 8.20 },
          { name: 'Buttons', cost: 5.30 },
          { name: 'Labor', cost: 25.00 }
        ],
        totalCost: 84.00
      }
    },
    {
      id: '2',
      name: 'The Berry Whisper Top',
      sku: 'BWT-002',
      image: '/The Berry Whisper Top.png',
      price: 910.00,
      totalStock: 12,
      totalSold: 234,
      lowStockThreshold: 15,
      lastRestocked: '2025-01-05',
      salesVelocity: 18,
      channels: {
        website: { inStock: 8, sold: 156 },
        showroom: { inStock: 4, sold: 78 }
      },
      costs: {
        components: [
          { name: 'Fabric', cost: 48.00 },
          { name: 'Thread', cost: 8.50 },
          { name: 'Buttons', cost: 6.20 },
          { name: 'Labor', cost: 25.00 }
        ],
        totalCost: 87.70
      }
    },
    {
      id: '3',
      name: 'Long Sleve Beige Top',
      sku: 'LSB-003',
      image: '/Long Sleve Beige Top.jpg',
      price: 390.00,
      totalStock: 67,
      totalSold: 189,
      lowStockThreshold: 25,
      lastRestocked: '2025-01-12',
      salesVelocity: 8,
      channels: {
        website: { inStock: 45, sold: 123 },
        showroom: { inStock: 22, sold: 66 }
      },
      costs: {
        components: [
          { name: 'Fabric', cost: 22.80 },
          { name: 'Thread', cost: 4.90 },
          { name: 'Buttons', cost: 3.40 },
          { name: 'Labor', cost: 15.00 }
        ],
        totalCost: 46.10
      }
    },
    {
      id: '4',
      name: 'Pink Cloud Chemise',
      sku: 'PCC-004',
      image: '/Pink Cloud Chemise.jpg',
      price: 620.00,
      totalStock: 234,
      totalSold: 98,
      lowStockThreshold: 30,
      lastRestocked: '2025-01-08',
      salesVelocity: 5,
      channels: {
        website: { inStock: 156, sold: 67 },
        showroom: { inStock: 78, sold: 31 }
      },
      costs: {
        components: [
          { name: 'Fabric', cost: 35.20 },
          { name: 'Thread', cost: 6.80 },
          { name: 'Lace', cost: 12.30 },
          { name: 'Labor', cost: 18.00 }
        ],
        totalCost: 72.30
      }
    }
  ]);

  const [businessCosts, setBusinessCosts] = useState<BusinessCost[]>([
    { id: '1', category: 'Marketing', description: 'Social Media Ads', amount: 2500, frequency: 'monthly' },
    { id: '2', category: 'Operations', description: 'Rent & Utilities', amount: 1800, frequency: 'monthly' },
    { id: '3', category: 'Logistics', description: 'Shipping & Packaging', amount: 1200, frequency: 'monthly' },
    { id: '4', category: 'Personnel', description: 'Staff Salaries', amount: 4500, frequency: 'monthly' }
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockProducts = products.filter(p => p.totalStock <= p.lowStockThreshold);
  const agingProducts = products.filter(p => p.salesVelocity < 6); // Less than 6 units per week

  const updateStock = (productId: string, change: number, channel?: 'website' | 'showroom') => {
    setProducts(prev => prev.map(product => {
      if (product.id === productId) {
        if (channel) {
          return {
            ...product,
            channels: {
              ...product.channels,
              [channel]: {
                ...product.channels[channel],
                inStock: Math.max(0, product.channels[channel].inStock + change)
              }
            },
            totalStock: Math.max(0, product.totalStock + change)
          };
        } else {
          return {
            ...product,
            totalStock: Math.max(0, product.totalStock + change)
          };
        }
      }
      return product;
    }));
  };

  const getRestockRecommendation = (product: Product) => {
    const weeksOfStock = product.totalStock / product.salesVelocity;
    if (weeksOfStock < 2) return { amount: product.salesVelocity * 4, urgency: 'high' };
    if (weeksOfStock < 4) return { amount: product.salesVelocity * 3, urgency: 'medium' };
    return { amount: 0, urgency: 'low' };
  };

  const addBusinessCost = () => {
    if (newCost.description && newCost.amount > 0) {
      const cost: BusinessCost = {
        id: Date.now().toString(),
        ...newCost
      };
      setBusinessCosts(prev => [...prev, cost]);
      setNewCost({ category: '', description: '', amount: 0, frequency: 'monthly' });
      setShowCostModal(false);
    }
  };

  const ProductDetailModal = ({ product, onClose }: { product: Product; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-all duration-200">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Channel Distribution */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.channels).map(([channel, data]) => (
                <div key={channel} className="p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100">
                  <h4 className="font-medium text-gray-900 capitalize mb-3">{channel === 'showroom' ? 'GenZ Showroom' : 'Website'}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">In Stock:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateStock(product.id, -1, channel as 'website' | 'showroom')}
                          className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-medium w-8 text-center">{data.inStock}</span>
                        <button
                          onClick={() => updateStock(product.id, 1, channel as 'website' | 'showroom')}
                          className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sold:</span>
                      <span className="font-medium">{data.sold}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Breakdown */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Components</h3>
            <div className="space-y-2">
              {product.costs.components.map((component, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100">
                  <span className="text-sm text-gray-700">{component.name}</span>
                  <span className="font-medium text-gray-900">LE {component.cost.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-t border-blue-200">
                <span className="font-semibold text-blue-900">Total Cost per Unit</span>
                <span className="font-bold text-blue-900">LE {product.costs.totalCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Restock Recommendation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Restock Analysis</h3>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <span className="font-medium text-yellow-800">Restock Recommendation</span>
              </div>
              <p className="text-sm text-yellow-700">
                Sales Velocity: {product.salesVelocity} units/week | 
                Weeks of Stock Remaining: {(product.totalStock / product.salesVelocity).toFixed(1)}
              </p>
              {(() => {
                const rec = getRestockRecommendation(product);
                return rec.amount > 0 ? (
                  <p className="text-sm font-medium text-yellow-800 mt-1">
                    Suggested Restock: {rec.amount} units ({rec.urgency} priority)
                  </p>
                ) : (
                  <p className="text-sm text-green-700 mt-1">Stock levels are adequate</p>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CostModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add Business Cost</h2>
          <button onClick={() => setShowCostModal(false)} className="text-gray-500 hover:text-gray-700 transition-all duration-200">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={newCost.category}
              onChange={(e) => setNewCost({ ...newCost, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="">Select category</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Logistics">Logistics</option>
              <option value="Personnel">Personnel</option>
              <option value="Technology">Technology</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={newCost.description}
              onChange={(e) => setNewCost({ ...newCost, description: e.target.value })}
              placeholder="e.g., Facebook Ads Campaign"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (LE)</label>
            <input
              type="number"
              value={newCost.amount}
              onChange={(e) => setNewCost({ ...newCost, amount: Number(e.target.value) })}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
            <select
              value={newCost.frequency}
              onChange={(e) => setNewCost({ ...newCost, frequency: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="one-time">One-time</option>
            </select>
          </div>
          
          <button
            onClick={addBusinessCost}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            Add Cost
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Manage stock levels, costs, and product performance</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowCostModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 hover:shadow-md transform hover:scale-105"
          >
            <DollarSign size={16} />
            Add Business Cost
          </button>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-lg font-bold text-red-900">{lowStockProducts.length}</p>
              <p className="text-sm text-red-700">Low Stock Alerts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-900">{agingProducts.length}</p>
              <p className="text-sm text-yellow-700">Slow Moving Items</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-lg font-bold text-blue-900">{products.length}</p>
              <p className="text-sm text-blue-700">Total Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 transition-all duration-200 hover:shadow-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Product</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">SKU</th>
                <th className="text-center py-3 px-6 font-medium text-gray-900">Price</th>
                <th className="text-center py-3 px-6 font-medium text-gray-900">Stock</th>
                <th className="text-center py-3 px-6 font-medium text-gray-900">Sold</th>
                <th className="text-center py-3 px-6 font-medium text-gray-900">Velocity</th>
                <th className="text-center py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const isLowStock = product.totalStock <= product.lowStockThreshold;
                const isAging = product.salesVelocity < 6;
                
                return (
                  <tr 
                    key={product.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
                      isLowStock ? 'bg-red-50' : isAging ? 'bg-yellow-50' : ''
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling!.textContent = product.name.slice(0, 2);
                            }}
                          />
                          <span className="text-gray-600 font-medium text-xs hidden">{product.name.slice(0, 2)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-600">Last restocked: {product.lastRestocked}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm text-gray-700">{product.sku}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-medium text-gray-900">LE {product.price.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStock(product.id, -1);
                          }}
                          className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
                        >
                          <Minus size={12} />
                        </button>
                        <span className={`font-bold px-2 ${
                          isLowStock ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {product.totalStock}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStock(product.id, 1);
                          }}
                          className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      {isLowStock && (
                        <span className="text-xs text-red-600 block mt-1">Low Stock!</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-medium text-gray-900">{product.totalSold}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`font-medium ${isAging ? 'text-yellow-600' : 'text-gray-900'}`}>
                          {product.salesVelocity}/week
                        </span>
                        {isAging && (
                          <span className="text-xs text-yellow-600">Slow Moving</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm transform hover:scale-105"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Business Costs Section */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Costs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {businessCosts.map((cost) => (
            <div key={cost.id} className="p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{cost.category}</span>
                <button className="text-red-600 hover:text-red-700 transition-all duration-200">
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{cost.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">LE {cost.amount.toLocaleString()}</span>
                <span className="text-xs text-gray-500 capitalize">{cost.frequency}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-blue-900">Total Monthly Costs</span>
            <span className="font-bold text-blue-900">
              LE {businessCosts.reduce((sum, cost) => {
                const monthlyAmount = cost.frequency === 'yearly' ? cost.amount / 12 : 
                                   cost.frequency === 'one-time' ? 0 : cost.amount;
                return sum + monthlyAmount;
              }, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Restock Recommendations */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Restock Recommendations</h3>
        <div className="space-y-3">
          {products.map((product) => {
            const rec = getRestockRecommendation(product);
            if (rec.amount === 0) return null;
            
            return (
              <div key={product.id} className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                rec.urgency === 'high' ? 'bg-red-50 border-red-200' :
                rec.urgency === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                      Current Stock: {product.totalStock} | Weekly Sales: {product.salesVelocity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      rec.urgency === 'high' ? 'text-red-700' :
                      rec.urgency === 'medium' ? 'text-yellow-700' :
                      'text-blue-700'
                    }`}>
                      Restock: {rec.amount} units
                    </p>
                    <p className="text-sm text-gray-600 capitalize">{rec.urgency} priority</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
      
      {showCostModal && <CostModal />}
    </div>
  );
};

export default Inventory;