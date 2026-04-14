import React, { useMemo, useState } from 'react';
import { Calendar, ImagePlus, Plus, Save, UploadCloud, WandSparkles } from 'lucide-react';
import Button from '../../components/ui/Button';

const defaultForm = {
  name: '',
  sku: '',
  category: 'Fitness',
  subCategory: 'Yoga',
  unit: 'kg',
  brand: 'RoyalVirtus',
  shortDescription: '',
  description: '',
  listPrice: '',
  sellingPrice: '',
  discountType: 'Flat',
  discountValue: '',
  stock: '',
  minQty: 1,
  tags: '',
  metaTitle: '',
  metaDescription: '',
  isFeatured: false,
  isTaxable: true,
  isDigital: false,
};

const AddNewProduct = () => {
  const [form, setForm] = useState(defaultForm);
  const [mainImage, setMainImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const discountPreview = useMemo(() => {
    const list = Number(form.listPrice || 0);
    const sell = Number(form.sellingPrice || 0);
    if (!list || !sell || list <= sell) return 0;
    return Math.round(((list - sell) / list) * 100);
  }, [form.listPrice, form.sellingPrice]);

  const onInput = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleMainImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMainImage(file);
  };

  const handleGalleryUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setGallery((prev) => [...prev, ...files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Product draft saved. Hook this form to your backend API next.');
  };

  const handleReset = () => {
    setForm(defaultForm);
    setMainImage(null);
    setGallery([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Add New <span className="text-primary-600">Product</span>
          </h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Reference-inspired setup with structured product, pricing, media, and SEO sections.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-sm text-sm font-medium text-surface-600 dark:text-surface-300">
          <Calendar size={16} className="text-primary-500" />
          <span className="whitespace-nowrap">Draft Session</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <section className="xl:col-span-2 bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700 shadow-card space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">Basic Setup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1 md:col-span-2">
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Product Name</span>
              <input required value={form.name} onChange={(e) => onInput('name', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">SKU</span>
              <input required value={form.sku} onChange={(e) => onInput('sku', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Brand</span>
              <input value={form.brand} onChange={(e) => onInput('brand', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Category</span>
              <select value={form.category} onChange={(e) => onInput('category', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Fitness</option>
                <option>Accessories</option>
                <option>Apparel</option>
                <option>Supplements</option>
                <option>Weights</option>
              </select>
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Sub Category</span>
              <select value={form.subCategory} onChange={(e) => onInput('subCategory', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Yoga</option>
                <option>Cardio</option>
                <option>Strength</option>
                <option>Women</option>
                <option>Protein</option>
              </select>
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Unit</span>
              <input value={form.unit} onChange={(e) => onInput('unit', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </label>
            <label className="space-y-1 md:col-span-2">
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Short Description</span>
              <input value={form.shortDescription} onChange={(e) => onInput('shortDescription', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </label>
            <label className="space-y-1 md:col-span-2">
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Description</span>
              <textarea rows={5} value={form.description} onChange={(e) => onInput('description', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </label>
          </div>
        </section>

        <section className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700 shadow-card space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">Main Image</h2>
          <label className="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary-500 transition-colors">
            <ImagePlus size={28} className="text-primary-500 mb-2" />
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{mainImage ? mainImage.name : 'Upload product thumbnail'}</span>
            <span className="text-xs text-surface-500 mt-1">JPG, PNG up to 2MB</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleMainImageUpload} />
          </label>
          <div className="text-xs text-surface-500 space-y-1">
            <p>Recommended ratio: 1:1 square</p>
            <p>Reference style: clean card visual with centered preview</p>
          </div>
        </section>
      </div>

      <section className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700 shadow-card space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">Pricing & Others</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <label className="space-y-1">
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">List Price</span>
            <input type="number" min="0" value={form.listPrice} onChange={(e) => onInput('listPrice', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Selling Price</span>
            <input type="number" min="0" value={form.sellingPrice} onChange={(e) => onInput('sellingPrice', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Discount Type</span>
            <select value={form.discountType} onChange={(e) => onInput('discountType', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Flat</option>
              <option>Percent</option>
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Discount Value</span>
            <input type="number" min="0" value={form.discountValue} onChange={(e) => onInput('discountValue', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Current Stock</span>
            <input type="number" min="0" value={form.stock} onChange={(e) => onInput('stock', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Minimum Qty</span>
            <input type="number" min="1" value={form.minQty} onChange={(e) => onInput('minQty', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </label>
          <div className="md:col-span-2 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-primary-600">Calculated Margin Hint</p>
              <p className="text-sm text-surface-700 dark:text-surface-300 mt-1">Auto discount preview from list vs selling price.</p>
            </div>
            <span className="text-2xl font-extrabold text-primary-600">{discountPreview}%</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <section className="xl:col-span-2 bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700 shadow-card space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">Product Variant Setup</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 text-sm text-surface-700 dark:text-surface-300">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => onInput('isFeatured', e.target.checked)} />
              Featured Product
            </label>
            <label className="flex items-center gap-2 text-sm text-surface-700 dark:text-surface-300">
              <input type="checkbox" checked={form.isTaxable} onChange={(e) => onInput('isTaxable', e.target.checked)} />
              Tax Included
            </label>
            <label className="flex items-center gap-2 text-sm text-surface-700 dark:text-surface-300">
              <input type="checkbox" checked={form.isDigital} onChange={(e) => onInput('isDigital', e.target.checked)} />
              Digital Product
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Tags</label>
            <input value={form.tags} onChange={(e) => onInput('tags', e.target.value)} placeholder="yoga, mat, eco-friendly" className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </section>

        <section className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700 shadow-card space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">Gallery</h2>
          <label className="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-2xl p-5 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary-500 transition-colors">
            <UploadCloud size={26} className="text-primary-500 mb-2" />
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Upload gallery images</span>
            <span className="text-xs text-surface-500 mt-1">{gallery.length} file(s) selected</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleGalleryUpload} />
          </label>
          {gallery.length > 0 && (
            <div className="space-y-1 text-xs text-surface-500 max-h-24 overflow-y-auto">
              {gallery.map((file, index) => (
                <p key={`${file.name}-${index}`}>{file.name}</p>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700 shadow-card space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">SEO Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-1">
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Meta Title</span>
            <input value={form.metaTitle} onChange={(e) => onInput('metaTitle', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </label>
          <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 flex gap-2 items-start">
            <WandSparkles size={16} className="text-primary-500 mt-0.5" />
            <p className="text-xs text-surface-600 dark:text-surface-300">Tip: keep SEO title under 60 chars and description under 160 chars for best results.</p>
          </div>
          <label className="space-y-1 md:col-span-2">
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Meta Description</span>
            <textarea rows={3} value={form.metaDescription} onChange={(e) => onInput('metaDescription', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </label>
        </div>
      </section>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={handleReset}>Reset</Button>
        <Button type="submit" variant="primary" icon={Save}>Save Product</Button>
      </div>
    </form>
  );
};

export default AddNewProduct;
