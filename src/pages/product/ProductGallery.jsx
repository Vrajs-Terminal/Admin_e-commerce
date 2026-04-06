import React, { useMemo, useState } from 'react';
import {
  Calendar,
  Download,
  Filter,
  Grid3X3,
  ImagePlus,
  List,
  Search,
  Trash2,
  UploadCloud,
  X,
  Eye,
  Star,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const initialAssets = [
  {
    id: 'GAL-1001',
    title: 'Yoga Mat Hero',
    fileType: 'Image',
    status: 'Published',
    sizeKb: 420,
    dimensions: '1200x1200',
    uploadedBy: 'Admin Team',
    tags: ['yoga', 'hero'],
    isCover: true,
    preview: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=700',
  },
  {
    id: 'GAL-1002',
    title: 'Dumbbell Angle Shot',
    fileType: 'Image',
    status: 'Published',
    sizeKb: 612,
    dimensions: '1600x1200',
    uploadedBy: 'Catalog Team',
    tags: ['weights'],
    isCover: false,
    preview: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=700',
  },
  {
    id: 'GAL-1003',
    title: 'Resistance Band Demo',
    fileType: 'Video',
    status: 'Draft',
    sizeKb: 15320,
    dimensions: '1920x1080',
    uploadedBy: 'Media Team',
    tags: ['video', 'demo'],
    isCover: false,
    preview: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=700',
  },
  {
    id: 'GAL-1004',
    title: 'Sports Bra Lifestyle',
    fileType: 'Image',
    status: 'Archived',
    sizeKb: 510,
    dimensions: '1200x1600',
    uploadedBy: 'Brand Team',
    tags: ['apparel', 'women'],
    isCover: false,
    preview: 'https://images.unsplash.com/photo-1548330750-612b5d0f5028?auto=format&fit=crop&q=80&w=700',
  },
  {
    id: 'GAL-1005',
    title: 'Protein Studio',
    fileType: 'Image',
    status: 'Published',
    sizeKb: 440,
    dimensions: '1200x1200',
    uploadedBy: 'Admin Team',
    tags: ['supplements'],
    isCover: false,
    preview: 'https://images.unsplash.com/photo-1579722820308-d74e5719d3f1?auto=format&fit=crop&q=80&w=700',
  },
];

const emptyUpload = {
  title: '',
  fileType: 'Image',
  status: 'Draft',
  dimensions: '1200x1200',
  tags: '',
  fileName: '',
};

const ProductGallery = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewAsset, setPreviewAsset] = useState(null);
  const [uploadForm, setUploadForm] = useState(emptyUpload);

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = assets.filter((asset) => {
      const matchesSearch =
        !q ||
        asset.title.toLowerCase().includes(q) ||
        asset.id.toLowerCase().includes(q) ||
        asset.tags.join(' ').toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || asset.status === statusFilter;
      const matchesType = typeFilter === 'All' || asset.fileType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });

    if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'size') {
      result = [...result].sort((a, b) => b.sizeKb - a.sizeKb);
    } else {
      result = [...result].sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [assets, query, statusFilter, typeFilter, sortBy]);

  const toggleSelection = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const deleteAsset = (id) => {
    const ok = window.confirm('Delete this gallery asset?');
    if (!ok) return;
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const bulkDelete = () => {
    if (!selectedIds.length) return;
    const ok = window.confirm(`Delete ${selectedIds.length} selected asset(s)?`);
    if (!ok) return;
    setAssets((prev) => prev.filter((asset) => !selectedIds.includes(asset.id)));
    setSelectedIds([]);
  };

  const setCover = (id) => {
    setAssets((prev) => prev.map((asset) => ({ ...asset, isCover: asset.id === id })));
  };

  const handleUploadInput = (key, value) => setUploadForm((prev) => ({ ...prev, [key]: value }));

  const handleFilePick = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    handleUploadInput('fileName', file.name);
  };

  const handleUploadSave = (event) => {
    event.preventDefault();

    const newAsset = {
      id: `GAL-${Math.floor(1006 + Math.random() * 900)}`,
      title: uploadForm.title || 'Untitled Asset',
      fileType: uploadForm.fileType,
      status: uploadForm.status,
      sizeKb: Math.floor(300 + Math.random() * 700),
      dimensions: uploadForm.dimensions,
      uploadedBy: 'Admin Team',
      tags: uploadForm.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      isCover: false,
      preview:
        uploadForm.fileType === 'Video'
          ? 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=700'
          : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=700',
    };

    setAssets((prev) => [newAsset, ...prev]);
    setUploadForm(emptyUpload);
    setIsUploadOpen(false);
  };

  const exportSelected = () => {
    const source = selectedIds.length ? assets.filter((asset) => selectedIds.includes(asset.id)) : filteredAssets;

    const csv = [
      ['ID', 'Title', 'Type', 'Status', 'Size KB', 'Dimensions', 'Tags'],
      ...source.map((asset) => [
        asset.id,
        asset.title,
        asset.fileType,
        asset.status,
        asset.sizeKb,
        asset.dimensions,
        asset.tags.join('|'),
      ]),
    ]
      .map((line) => line.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `product-gallery-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const stats = useMemo(() => {
    const published = assets.filter((asset) => asset.status === 'Published').length;
    const draft = assets.filter((asset) => asset.status === 'Draft').length;
    const totalSizeMb = (assets.reduce((sum, asset) => sum + asset.sizeKb, 0) / 1024).toFixed(1);

    return {
      total: assets.length,
      published,
      draft,
      totalSizeMb,
    };
  }, [assets]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Product <span className="text-primary-600">Gallery</span>
          </h1>
          <p className="text-sm text-surface-500 mt-1">Manage product media assets with smart filtering, preview, and bulk actions.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-sm text-sm font-medium text-surface-600 dark:text-surface-300">
          <Calendar size={16} className="text-primary-500" />
          <span className="whitespace-nowrap">Media Library</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <p className="text-xs uppercase font-bold text-surface-500">Total Assets</p>
          <p className="text-2xl font-extrabold mt-1 text-primary-600">{stats.total}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <p className="text-xs uppercase font-bold text-surface-500">Published</p>
          <p className="text-2xl font-extrabold mt-1 text-green-600">{stats.published}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <p className="text-xs uppercase font-bold text-surface-500">Draft</p>
          <p className="text-2xl font-extrabold mt-1 text-amber-600">{stats.draft}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <p className="text-xs uppercase font-bold text-surface-500">Storage Used</p>
          <p className="text-2xl font-extrabold mt-1 text-surface-800 dark:text-surface-200">{stats.totalSizeMb} MB</p>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 border border-surface-200 dark:border-surface-700 shadow-card space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, id, tags"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
          >
            <option value="All">All Types</option>
            <option value="Image">Image</option>
            <option value="Video">Video</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
          >
            <option value="latest">Latest</option>
            <option value="name">Name</option>
            <option value="size">Size</option>
          </select>

          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border ${viewMode === 'grid' ? 'bg-primary-50 border-primary-300 text-primary-600' : 'border-surface-200 text-surface-500'}`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg border ${viewMode === 'list' ? 'bg-primary-50 border-primary-300 text-primary-600' : 'border-surface-200 text-surface-500'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" icon={Filter} size="sm">Smart Filter</Button>
            <Button variant="outline" icon={Download} size="sm" onClick={exportSelected}>
              {selectedIds.length ? `Export Selected (${selectedIds.length})` : 'Export All'}
            </Button>
          </div>
          <Button variant="primary" icon={ImagePlus} onClick={() => setIsUploadOpen(true)}>
            Add To Gallery
          </Button>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/30 flex items-center justify-between">
          <p className="text-sm font-medium text-primary-700 dark:text-primary-300">{selectedIds.length} asset(s) selected</p>
          <Button variant="danger" size="sm" icon={Trash2} onClick={bulkDelete}>Delete Selected</Button>
        </div>
      )}

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset) => (
            <article key={asset.id} className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="relative aspect-video bg-surface-100">
                <img src={asset.preview} alt={asset.title} className="w-full h-full object-cover" />
                <input
                  type="checkbox"
                  checked={selectedIds.includes(asset.id)}
                  onChange={() => toggleSelection(asset.id)}
                  className="absolute top-3 left-3 w-4 h-4 accent-primary-600"
                />
                <button
                  onClick={() => setCover(asset.id)}
                  className={`absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${asset.isCover ? 'bg-amber-500 text-white' : 'bg-white/90 text-surface-700'}`}
                >
                  <Star size={12} />
                  {asset.isCover ? 'Cover' : 'Set Cover'}
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-surface-900 dark:text-white">{asset.title}</h3>
                    <p className="text-xs text-surface-500">{asset.id}</p>
                  </div>
                  <Badge variant={asset.status === 'Published' ? 'success' : asset.status === 'Draft' ? 'warning' : 'danger'}>
                    {asset.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-surface-500">
                  <span>{asset.fileType}</span>
                  <span>•</span>
                  <span>{asset.dimensions}</span>
                  <span>•</span>
                  <span>{asset.sizeKb} KB</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {asset.tags.map((tag) => (
                    <span key={`${asset.id}-${tag}`} className="px-2 py-1 rounded-md text-[11px] bg-surface-100 dark:bg-surface-900 text-surface-600 dark:text-surface-300">#{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={Eye} onClick={() => setPreviewAsset(asset)}>Preview</Button>
                  <Button variant="danger" size="sm" icon={Trash2} onClick={() => deleteAsset(asset.id)}>Delete</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl shadow-card overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-50 dark:bg-surface-900/50 text-xs font-bold text-surface-500 uppercase">
              <tr>
                <th className="px-4 py-3"></th>
                <th className="px-4 py-3">Asset</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="border-t border-surface-100 dark:border-surface-700">
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selectedIds.includes(asset.id)} onChange={() => toggleSelection(asset.id)} className="w-4 h-4 accent-primary-600" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={asset.preview} alt={asset.title} className="w-12 h-10 object-cover rounded" />
                      <div>
                        <p className="font-semibold text-surface-900 dark:text-white">{asset.title}</p>
                        <p className="text-xs text-surface-500">{asset.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{asset.fileType}</td>
                  <td className="px-4 py-3">
                    <Badge variant={asset.status === 'Published' ? 'success' : asset.status === 'Draft' ? 'warning' : 'danger'}>{asset.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">{asset.sizeKb} KB</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" icon={Eye} onClick={() => setPreviewAsset(asset)}>View</Button>
                      <Button variant="danger" size="sm" icon={Trash2} onClick={() => deleteAsset(asset.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIsUploadOpen(false)}>
          <div className="w-full max-w-xl bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-bold text-surface-900 dark:text-white">Add Gallery Asset</h3>
              <button className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800" onClick={() => setIsUploadOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUploadSave} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="space-y-1 sm:col-span-2">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Asset Title</span>
                <input required value={uploadForm.title} onChange={(event) => handleUploadInput('title', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Type</span>
                <select value={uploadForm.fileType} onChange={(event) => handleUploadInput('fileType', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800">
                  <option>Image</option>
                  <option>Video</option>
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Status</span>
                <select value={uploadForm.status} onChange={(event) => handleUploadInput('status', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800">
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Archived</option>
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Dimensions</span>
                <input value={uploadForm.dimensions} onChange={(event) => handleUploadInput('dimensions', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800" />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Tags (comma separated)</span>
                <input value={uploadForm.tags} onChange={(event) => handleUploadInput('tags', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800" />
              </label>

              <label className="sm:col-span-2 border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-2xl p-5 min-h-[140px] flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary-500 transition-colors">
                <UploadCloud size={28} className="text-primary-500 mb-2" />
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{uploadForm.fileName || 'Upload image or video file'}</span>
                <span className="text-xs text-surface-500 mt-1">Any file type accepted for demo</span>
                <input type="file" className="hidden" onChange={handleFilePick} />
              </label>

              <div className="sm:col-span-2 flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" icon={ImagePlus}>Save Asset</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewAsset && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPreviewAsset(null)}>
          <div className="w-full max-w-3xl bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-2xl overflow-hidden" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-surface-200 dark:border-surface-700">
              <div>
                <h3 className="font-bold text-surface-900 dark:text-white">{previewAsset.title}</h3>
                <p className="text-xs text-surface-500">{previewAsset.id}</p>
              </div>
              <button className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800" onClick={() => setPreviewAsset(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="bg-surface-100 dark:bg-surface-800 p-4">
              <img src={previewAsset.preview} alt={previewAsset.title} className="w-full max-h-[60vh] object-contain rounded-xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
