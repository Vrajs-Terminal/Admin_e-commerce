import React, { useMemo, useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { productCatalog } from './productData';

const ProductCard = ({ product }) => (
  <div className="group relative bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300">
    <div className="relative aspect-square overflow-hidden bg-surface-50">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
      <div className="absolute top-3 left-3">
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm ${
          product.status === 'Active'
            ? 'bg-green-500 text-white'
            : product.status === 'Low Stock'
              ? 'bg-amber-500 text-white'
              : 'bg-red-500 text-white'
        }`}>
          {product.status.toUpperCase()}
        </span>
      </div>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button className="p-2 bg-white rounded-xl text-surface-900 hover:scale-110 transition-transform">
          <Eye size={18} />
        </button>
        <button className="p-2 bg-white rounded-xl text-primary-600 hover:scale-110 transition-transform">
          <Edit size={18} />
        </button>
      </div>
    </div>
    <div className="p-4">
      <span className="text-[10px] font-bold text-primary-600 tracking-wider uppercase mb-1 block">{product.category}</span>
      <h3 className="font-bold text-surface-900 dark:text-white mb-1 line-clamp-1">{product.name}</h3>
      <div className="flex items-center justify-between mt-2">
        <span className="text-lg font-extrabold text-surface-900 dark:text-white">${product.price}</span>
        <span className="text-xs font-medium text-surface-500">Stock: {product.stock}</span>
      </div>
    </div>
  </div>
);

const ProductList = () => {
  const [viewMode, setViewMode] = useState('list');
  const [query, setQuery] = useState('');

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return productCatalog;

    return productCatalog.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-300">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight animate-slide-in">
            Products <span className="text-primary-600">Inventory</span>
          </h1>
          <p className="text-sm sm:text-base text-surface-500 max-w-md">Manage and track your entire product catalog effortlessly.</p>
        </div>
        <Link to="/products/add-new" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all font-bold active:scale-95 text-sm">
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 items-center justify-between bg-white dark:bg-surface-800 p-4 sm:p-5 border border-surface-200 dark:border-surface-700 rounded-2xl shadow-sm transition-all duration-300">
        <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-4 w-full">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 group-focus-within:text-primary-500 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter products by name or SKU..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm outline-none transition-all dark:text-white"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 border border-surface-200 dark:border-surface-700 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-900 text-sm font-bold transition-all text-surface-600 dark:text-surface-300">
            <Filter size={18} className="text-primary-500" />
            <span>Advanced Filters</span>
          </button>
        </div>
        <div className="flex items-center gap-3 w-full xl:w-auto justify-end sm:justify-center border-t xl:border-t-0 pt-4 xl:pt-0 border-surface-100 xl:border-transparent">
          <p className="text-xs font-bold text-surface-400 uppercase tracking-widest mr-2 hidden sm:block">View Mode</p>
          <div className="flex items-center gap-2 bg-surface-50 dark:bg-surface-900 p-1.5 rounded-xl border border-surface-200 dark:border-surface-700">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-surface-800 text-primary-600 shadow-sm' : 'text-surface-400 hover:text-surface-600'}`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-surface-800 text-primary-600 shadow-sm' : 'text-surface-400 hover:text-surface-600'}`}
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-50 dark:bg-surface-900/50 text-[10px] font-bold uppercase tracking-wider text-surface-400 border-b border-surface-100 dark:border-surface-800">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">SKU</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Stock</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-50 dark:divide-surface-700/50">
                {products.map((product) => (
                  <tr key={product.id} className="group hover:bg-surface-25 dark:hover:bg-surface-900/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden bg-surface-50">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-surface-900 dark:text-white text-sm line-clamp-1">{product.name}</p>
                          <p className="text-[10px] text-surface-400 font-medium">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs px-2.5 py-1 bg-surface-100 dark:bg-surface-900 text-surface-600 dark:text-surface-400 rounded-lg font-bold">{product.category.toUpperCase()}</span>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-surface-500">{product.sku}</td>
                    <td className="py-4 px-4 font-bold text-surface-900 dark:text-white">${product.price}</td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-bold ${product.stock < 20 ? 'text-amber-600' : 'text-surface-500'}`}>{product.stock} pcs</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        product.status === 'Active'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                          : product.status === 'Low Stock'
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-600'
                      }`}>
                        {product.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-xl text-surface-500 hover:text-primary-600 transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-xl text-surface-500 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-surface-200 dark:border-surface-800">
        <span className="text-sm text-surface-500 font-bold order-2 md:order-1">
          Showing <span className="text-surface-900 dark:text-white">1 - {products.length}</span> of <span className="text-surface-900 dark:text-white">{products.length}</span> results
        </span>
        <div className="flex items-center gap-2 order-1 md:order-2 bg-white dark:bg-surface-800 p-1 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-sm">
          <button className="p-2.5 hover:bg-surface-50 dark:hover:bg-surface-900 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed text-surface-600 dark:text-surface-400" disabled>
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 rounded-xl text-sm font-black transition-all bg-primary-600 text-white shadow-lg">1</button>
          </div>
          <button className="p-2.5 hover:bg-surface-50 dark:hover:bg-surface-900 rounded-xl transition-all text-primary-600" disabled>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
