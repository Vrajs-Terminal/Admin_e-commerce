import React, { useMemo, useState } from 'react';
import { Download, Filter, Search, Star } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const initialReviews = [
  { id: 23, product: 'Product has been deleted', productImage: '', customer: 'Devid Jack', rating: 4, review: 'Nice human.', replied: false },
  { id: 22, product: 'Product has been deleted', productImage: '', customer: 'Robert Downey', rating: 5, review: 'Delivery service was good.', replied: false },
  { id: 21, product: 'Product has been deleted', productImage: '', customer: 'Devid Jack', rating: 5, review: 'Very good delivery service. Thank you for the quick support.', replied: false },
  { id: 20, product: 'Product has been deleted', productImage: '', customer: 'Robert Downey', rating: 5, review: 'Delivery service was good.', replied: false },
  { id: 19, product: 'Leather Ladies Bag', productImage: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=200', customer: 'Robert Downey', rating: 5, review: 'Product quality was good.', replied: true },
  { id: 18, product: 'Smart Fitness Band', productImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=200', customer: 'Ariana Clark', rating: 3, review: 'It is a long established fact that this product is useful but battery can improve.', replied: true },
];

const CustomerReviewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState('All');
  const [replyFilter, setReplyFilter] = useState('All');

  const filteredReviews = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return initialReviews.filter((row) => {
      const matchesSearch =
        !query ||
        row.product.toLowerCase().includes(query) ||
        row.customer.toLowerCase().includes(query) ||
        row.review.toLowerCase().includes(query) ||
        String(row.id).includes(query);
      const matchesRating = minRating === 'All' || row.rating >= Number(minRating);
      const matchesReply =
        replyFilter === 'All' ||
        (replyFilter === 'Replied' && row.replied) ||
        (replyFilter === 'Not Replied' && !row.replied);
      return matchesSearch && matchesRating && matchesReply;
    });
  }, [searchQuery, minRating, replyFilter]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 text-[10px] font-black tracking-[0.3em] uppercase">19 People & Content</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">Customer Reviews</h1>
        <p className="text-sm sm:text-base text-surface-500 max-w-2xl">Track product reviews, ratings, and reply coverage from one moderated review queue.</p>
      </div>

      <section className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl shadow-card overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-surface-100 dark:border-surface-700 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-surface-900 dark:text-white">Customer Reviews List</h2>
            <p className="text-sm text-surface-500 inline-flex items-center gap-2">Total reviews <Badge variant="primary" size="sm">{filteredReviews.length}</Badge></p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <div className="relative w-full sm:w-[18rem]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search by id, product, customer" className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 pl-10 pr-4 py-2.5 text-sm text-surface-700 dark:text-surface-100" />
            </div>
            <select value={minRating} onChange={(event) => setMinRating(event.target.value)} className="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-3 py-2.5 text-sm text-surface-700 dark:text-surface-100">
              <option value="All">All Ratings</option>
              <option value="5">5+</option>
              <option value="4">4+</option>
              <option value="3">3+</option>
            </select>
            <select value={replyFilter} onChange={(event) => setReplyFilter(event.target.value)} className="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-3 py-2.5 text-sm text-surface-700 dark:text-surface-100">
              <option>All</option>
              <option>Replied</option>
              <option>Not Replied</option>
            </select>
            <Button variant="secondary" icon={Filter}>Filter</Button>
            <Button variant="secondary" icon={Download}>Export</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-surface-50 dark:bg-surface-900/60 border-b border-surface-200 dark:border-surface-700">
              <tr>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">SL</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Review ID</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Product</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Customer</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Rating</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Review</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Reply</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((row, index) => (
                <tr key={row.id} className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-5 py-4 text-surface-500">{index + 1}</td>
                  <td className="px-5 py-4 text-surface-700 dark:text-surface-200">{row.id}</td>
                  <td className="px-5 py-4 text-surface-700 dark:text-surface-200">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 overflow-hidden rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-100 dark:bg-surface-900">
                        {row.productImage ? (
                          <img src={row.productImage} alt={row.product} className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                      <span>{row.product}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-surface-700 dark:text-surface-200">
                    <div className="flex items-center gap-2">
                      <img src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${row.customer}`} alt={row.customer} className="h-8 w-8 rounded-full border border-surface-200 dark:border-surface-700" />
                      <span>{row.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                      {row.rating}
                      <Star size={12} />
                    </span>
                  </td>
                  <td className="px-5 py-4 text-surface-700 dark:text-surface-200 max-w-[22rem]">
                    <p className="truncate" title={row.review}>{row.review}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={row.replied ? 'success' : 'warning'} size="sm">{row.replied ? 'Replied' : '-'}</Badge>
                  </td>
                </tr>
              ))}
              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-surface-500 dark:text-surface-400">No reviews match the current filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CustomerReviewsPage;
