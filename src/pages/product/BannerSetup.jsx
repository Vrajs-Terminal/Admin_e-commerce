import React, { useMemo, useState } from 'react';
import {
  Calendar,
  Download,
  Eye,
  ImagePlus,
  PauseCircle,
  PlayCircle,
  Search,
  Sparkles,
  Trash2,
  X,
  Save,
  Copy,
  BarChart3,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Table from '../../components/ui/Table';

const seedBanners = [
  {
    id: 'BNR-1001',
    title: 'Summer Fitness Blast',
    placement: 'Homepage Hero',
    channel: 'Web',
    status: 'Active',
    priority: 1,
    startDate: '2026-04-01',
    endDate: '2026-04-21',
    clicks: 2140,
    impressions: 65321,
    ctaText: 'Shop Now',
    cover: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'BNR-1002',
    title: 'Limited Stock Rush',
    placement: 'Category Top Strip',
    channel: 'App',
    status: 'Scheduled',
    priority: 2,
    startDate: '2026-04-10',
    endDate: '2026-04-28',
    clicks: 923,
    impressions: 20832,
    ctaText: 'Explore Deals',
    cover: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'BNR-1003',
    title: 'New Arrivals in Activewear',
    placement: 'Product Listing Mid',
    channel: 'Web',
    status: 'Paused',
    priority: 3,
    startDate: '2026-03-15',
    endDate: '2026-04-12',
    clicks: 1188,
    impressions: 34129,
    ctaText: 'View Collection',
    cover: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=1200',
  },
];

const emptyForm = {
  title: '',
  placement: 'Homepage Hero',
  channel: 'Web',
  status: 'Scheduled',
  priority: 1,
  startDate: '',
  endDate: '',
  ctaText: 'Shop Now',
  cover: '',
};

const BannerSetup = () => {
  const [banners, setBanners] = useState(seedBanners);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [placementFilter, setPlacementFilter] = useState('All');
  const [selectedBannerId, setSelectedBannerId] = useState(seedBanners[0].id);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const placements = useMemo(() => ['All', ...new Set(banners.map((item) => item.placement))], [banners]);

  const filteredBanners = useMemo(() => {
    const q = query.trim().toLowerCase();

    return banners.filter((item) => {
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.placement.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesPlacement = placementFilter === 'All' || item.placement === placementFilter;

      return matchesQuery && matchesStatus && matchesPlacement;
    });
  }, [banners, query, statusFilter, placementFilter]);

  const stats = useMemo(() => {
    const totalImpressions = banners.reduce((sum, item) => sum + item.impressions, 0);
    const totalClicks = banners.reduce((sum, item) => sum + item.clicks, 0);
    const ctr = totalImpressions ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

    return {
      total: banners.length,
      active: banners.filter((item) => item.status === 'Active').length,
      scheduled: banners.filter((item) => item.status === 'Scheduled').length,
      ctr,
    };
  }, [banners]);

  const selectedBanner = useMemo(
    () => banners.find((item) => item.id === selectedBannerId) || filteredBanners[0] || null,
    [banners, selectedBannerId, filteredBanners]
  );

  const statusBadge = (status) => {
    if (status === 'Active') return 'success';
    if (status === 'Paused') return 'warning';
    if (status === 'Scheduled') return 'info';
    return 'primary';
  };

  const updateBannerStatus = (id, status) => {
    setBanners((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      title: row.title,
      placement: row.placement,
      channel: row.channel,
      status: row.status,
      priority: row.priority,
      startDate: row.startDate,
      endDate: row.endDate,
      ctaText: row.ctaText,
      cover: row.cover,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const onForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const saveBanner = (event) => {
    event.preventDefault();

    const payload = {
      id: editingId || `BNR-${Math.floor(1100 + Math.random() * 900)}`,
      title: form.title || 'Untitled Banner',
      placement: form.placement,
      channel: form.channel,
      status: form.status,
      priority: Number(form.priority) || 1,
      startDate: form.startDate,
      endDate: form.endDate,
      clicks: editingId ? (banners.find((item) => item.id === editingId)?.clicks || 0) : 0,
      impressions: editingId ? (banners.find((item) => item.id === editingId)?.impressions || 0) : 0,
      ctaText: form.ctaText,
      cover:
        form.cover ||
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
    };

    setBanners((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? payload : item));
      }
      return [payload, ...prev];
    });

    setSelectedBannerId(payload.id);
    closeForm();
  };

  const duplicateBanner = (row) => {
    const copy = {
      ...row,
      id: `BNR-${Math.floor(1200 + Math.random() * 900)}`,
      title: `${row.title} (Copy)`,
      status: 'Draft',
    };
    setBanners((prev) => [copy, ...prev]);
  };

  const deleteBanner = (row) => {
    const ok = window.confirm(`Delete banner \"${row.title}\"?`);
    if (!ok) return;

    setBanners((prev) => prev.filter((item) => item.id !== row.id));
    if (selectedBannerId === row.id) {
      setSelectedBannerId(seedBanners[0].id);
    }
  };

  const exportCsv = () => {
    const csv = [
      ['ID', 'Title', 'Placement', 'Channel', 'Status', 'Priority', 'Start', 'End', 'CTR%'],
      ...filteredBanners.map((item) => {
        const ctr = item.impressions ? ((item.clicks / item.impressions) * 100).toFixed(2) : '0.00';
        return [item.id, item.title, item.placement, item.channel, item.status, item.priority, item.startDate, item.endDate, ctr];
      }),
    ]
      .map((line) => line.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `banner-setup-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      key: 'title',
      label: 'Banner',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.cover} alt={row.title} className="w-14 h-10 object-cover rounded-lg border border-surface-200 dark:border-surface-700" />
          <div>
            <p className="font-semibold text-surface-900 dark:text-white">{row.title}</p>
            <p className="text-xs text-surface-500">{row.id}</p>
          </div>
        </div>
      ),
    },
    { key: 'placement', label: 'Placement', sortable: true },
    { key: 'channel', label: 'Channel' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <Badge variant={statusBadge(row.status)}>{row.status}</Badge>,
    },
    { key: 'priority', label: 'Priority', sortable: true },
    {
      key: 'dates',
      label: 'Schedule',
      render: (row) => (
        <div className="text-xs">
          <p className="text-surface-700 dark:text-surface-300">{row.startDate}</p>
          <p className="text-surface-500">to {row.endDate}</p>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Action',
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
          <Button size="sm" variant="ghost" icon={Eye} onClick={() => setSelectedBannerId(row.id)}>Preview</Button>
          {row.status === 'Active' ? (
            <Button size="sm" variant="secondary" icon={PauseCircle} onClick={() => updateBannerStatus(row.id, 'Paused')}>Pause</Button>
          ) : (
            <Button size="sm" variant="success" icon={PlayCircle} onClick={() => updateBannerStatus(row.id, 'Active')}>Run</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Banner <span className="text-primary-600">Setup</span>
          </h1>
          <p className="text-sm text-surface-500 mt-1">Create high-converting banner campaigns with scheduling, placements, and performance controls.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-sm text-sm font-medium text-surface-600 dark:text-surface-300">
          <Calendar size={16} className="text-primary-500" />
          <span className="whitespace-nowrap">Campaign Console</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <p className="text-xs font-bold uppercase text-surface-500">Total Banners</p>
          <p className="text-2xl font-extrabold mt-1 text-primary-600">{stats.total}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <p className="text-xs font-bold uppercase text-surface-500">Active</p>
          <p className="text-2xl font-extrabold mt-1 text-green-600">{stats.active}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <p className="text-xs font-bold uppercase text-surface-500">Scheduled</p>
          <p className="text-2xl font-extrabold mt-1 text-amber-600">{stats.scheduled}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <p className="text-xs font-bold uppercase text-surface-500">Average CTR</p>
          <p className="text-2xl font-extrabold mt-1 text-surface-900 dark:text-white">{stats.ctr}%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 border border-surface-200 dark:border-surface-700 shadow-card space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search banner id, title, placement"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
            />
          </div>

          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Draft">Draft</option>
          </select>

          <select value={placementFilter} onChange={(event) => setPlacementFilter(event.target.value)} className="px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">
            {placements.map((item) => (
              <option key={item} value={item}>{item === 'All' ? 'All Placements' : item}</option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <Button variant="outline" icon={Download} onClick={exportCsv}>Export</Button>
            <Button variant="primary" icon={ImagePlus} onClick={openCreate}>New Banner</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-card overflow-hidden">
          <Table columns={columns} data={filteredBanners} onRowClick={(row) => setSelectedBannerId(row.id)} pageSize={6} />
        </div>

        <aside className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-surface-500">Live Preview</h2>
            <span className="text-xs text-surface-400">Placement Snapshot</span>
          </div>

          {selectedBanner ? (
            <>
              <div className="rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700">
                <img src={selectedBanner.cover} alt={selectedBanner.title} className="w-full h-44 object-cover" />
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-surface-900 dark:text-white">{selectedBanner.title}</p>
                    <Badge variant={statusBadge(selectedBanner.status)}>{selectedBanner.status}</Badge>
                  </div>
                  <p className="text-xs text-surface-500">{selectedBanner.placement} • {selectedBanner.channel}</p>
                  <Button variant="primary" size="sm">{selectedBanner.ctaText}</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => openEdit(selectedBanner)} className="p-2.5 rounded-xl border border-surface-200 dark:border-surface-700 text-sm hover:bg-surface-50 dark:hover:bg-surface-900">Edit</button>
                <button onClick={() => duplicateBanner(selectedBanner)} className="p-2.5 rounded-xl border border-surface-200 dark:border-surface-700 text-sm hover:bg-surface-50 dark:hover:bg-surface-900 inline-flex items-center justify-center gap-1"><Copy size={14} />Duplicate</button>
                <button onClick={() => updateBannerStatus(selectedBanner.id, selectedBanner.status === 'Active' ? 'Paused' : 'Active')} className="p-2.5 rounded-xl border border-surface-200 dark:border-surface-700 text-sm hover:bg-surface-50 dark:hover:bg-surface-900">
                  {selectedBanner.status === 'Active' ? 'Pause Campaign' : 'Activate Campaign'}
                </button>
                <button onClick={() => deleteBanner(selectedBanner)} className="p-2.5 rounded-xl border border-red-300 text-red-600 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 inline-flex items-center justify-center gap-1"><Trash2 size={14} />Delete</button>
              </div>

              <div className="p-3 rounded-xl bg-surface-50 dark:bg-surface-900/40 border border-surface-200 dark:border-surface-700">
                <p className="text-xs uppercase font-semibold text-surface-500 mb-1">Performance</p>
                <p className="text-sm text-surface-700 dark:text-surface-300 inline-flex items-center gap-1"><BarChart3 size={14} />{selectedBanner.clicks.toLocaleString()} clicks / {selectedBanner.impressions.toLocaleString()} impressions</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-surface-500">Select a banner to preview.</p>
          )}
        </aside>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeForm}>
          <div className="w-full max-w-2xl bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-bold text-surface-900 dark:text-white">{editingId ? 'Edit Banner Campaign' : 'Create Banner Campaign'}</h3>
              <button onClick={closeForm} className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800"><X size={16} /></button>
            </div>

            <form onSubmit={saveBanner} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="space-y-1 sm:col-span-2">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Banner Title</span>
                <input required value={form.title} onChange={(event) => onForm('title', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800" />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Placement</span>
                <select value={form.placement} onChange={(event) => onForm('placement', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800">
                  <option>Homepage Hero</option>
                  <option>Category Top Strip</option>
                  <option>Product Listing Mid</option>
                  <option>Checkout Side</option>
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Channel</span>
                <select value={form.channel} onChange={(event) => onForm('channel', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800">
                  <option>Web</option>
                  <option>App</option>
                  <option>Both</option>
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Status</span>
                <select value={form.status} onChange={(event) => onForm('status', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800">
                  <option>Scheduled</option>
                  <option>Active</option>
                  <option>Paused</option>
                  <option>Draft</option>
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Priority</span>
                <input type="number" min="1" value={form.priority} onChange={(event) => onForm('priority', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800" />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Start Date</span>
                <input type="date" value={form.startDate} onChange={(event) => onForm('startDate', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800" />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">End Date</span>
                <input type="date" value={form.endDate} onChange={(event) => onForm('endDate', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800" />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">CTA Text</span>
                <input value={form.ctaText} onChange={(event) => onForm('ctaText', event.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800" />
              </label>

              <label className="space-y-1 sm:col-span-2">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Cover URL</span>
                <input value={form.cover} onChange={(event) => onForm('cover', event.target.value)} placeholder="https://..." className="w-full px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800" />
              </label>

              <div className="sm:col-span-2 p-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm text-surface-600 dark:text-surface-300 inline-flex items-center gap-2">
                <Sparkles size={14} className="text-primary-500" />
                Tip: keep only one high-priority Active banner per placement for consistent CTR.
              </div>

              <div className="sm:col-span-2 flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={closeForm}>Cancel</Button>
                <Button type="submit" variant="primary" icon={Save}>{editingId ? 'Update Banner' : 'Create Banner'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerSetup;
