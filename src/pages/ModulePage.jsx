import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  LayoutDashboard,
  Search,
  Plus,
  Download,
  Sparkles,
  CircleCheck,
  Clock3,
  Check,
  ChartNoAxesColumn,
} from 'lucide-react';
import { getModuleBySlug } from '../constants/navigation';

const hashValue = (str = '') => str.split('').reduce((acc, ch, idx) => acc + ch.charCodeAt(0) * (idx + 1), 0);

const titleFromSlug = (slug = '') =>
  slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const statusPalette = {
  primary: 'text-primary-600 bg-primary-50 dark:bg-primary-900/20',
  success: 'text-green-600 bg-green-50 dark:bg-green-900/20',
  warning: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
  danger: 'text-red-600 bg-red-50 dark:bg-red-900/20',
};

const buildRows = (label, seed) =>
  Array.from({ length: 8 }).map((_, idx) => ({
    name: `${label} Item ${idx + 1}`,
    owner: ['Team Alpha', 'Team Growth', 'Team Ops', 'Team Admin'][(seed + idx) % 4],
    status: ['Active', 'Review', 'Draft', 'Published'][(seed + idx * 2) % 4],
    updated: `${(seed + idx * 3) % 28 + 1} Apr 2026`,
  }));

const getPreset = (slug, moduleItem) => {
  const seed = hashValue(slug);
  const label = moduleItem?.label || titleFromSlug(slug);

  const base = {
    subtitle: `Operate ${label.toLowerCase()} with advanced workflows, automation controls, and clear performance insights.`,
    chips: ['Workflow', 'Automation', 'Audit Trail', 'Approvals', 'Exports'],
    checklist: ['Review pending records', 'Apply updated rules', 'Publish latest changes'],
    stats: [
      { label: 'Total Records', value: (seed % 120) + 24, tone: 'primary' },
      { label: 'In Progress', value: (seed % 18) + 6, tone: 'warning' },
      { label: 'Completed', value: (seed % 40) + 10, tone: 'success' },
      { label: 'Need Attention', value: (seed % 9) + 2, tone: 'danger' },
    ],
    rows: buildRows(label, seed),
  };

  const presetsBySlug = {
    refund: {
      subtitle: 'Manage refund operations end-to-end, from request intake to settlement and closure.',
      chips: ['SLA Monitor', 'Reason Codes', 'Escalation', 'Payout Sync', 'Fraud Checks'],
    },
    'refund-pending': {
      subtitle: 'Track pending refund cases and prioritize reviews based on SLA and customer value.',
      chips: ['Pending Queue', 'Aging Buckets', 'Priority Rules', 'Approver Assignments', 'Customer Notes'],
    },
    'refund-approved': {
      subtitle: 'Execute approved refunds with payout readiness and reconciliation checkpoints.',
      chips: ['Approval Ledger', 'Payout Batches', 'Gateway Status', 'Reconciliation', 'Exports'],
    },
    'refund-refunded': {
      subtitle: 'Review completed refunds with traceable payout references and audit confidence.',
      chips: ['Settlement Logs', 'Gateway IDs', 'Audit Trails', 'CSV Export', 'Customer Timeline'],
    },
    'refund-rejected': {
      subtitle: 'Handle rejected requests consistently with reason taxonomy and communication templates.',
      chips: ['Reason Catalog', 'Policy Checks', 'Appeals', 'Response Templates', 'Quality Review'],
    },
    categories: {
      subtitle: 'Organize storefront taxonomy for discoverability, merchandising, and scalable growth.',
      chips: ['Category Tree', 'SEO Labels', 'Rules', 'Visibility', 'Sort Priority'],
    },
    'sub-categories': {
      subtitle: 'Maintain detailed sub-category structures with precision filtering and storefront alignment.',
      chips: ['Hierarchy', 'Filters', 'Mappings', 'Naming Rules', 'Batch Actions'],
    },
    'product-attributes': {
      subtitle: 'Configure reusable product attributes to power variants and faceted search.',
      chips: ['Attribute Sets', 'Variant Rules', 'Validation', 'Localization', 'Dependencies'],
    },
    'add-new-product': {
      subtitle: 'Launch products quickly with a guided onboarding flow and quality checkpoints.',
      chips: ['Draft Builder', 'Image Uploader', 'Variants', 'Pricing', 'Publish'],
    },
    'limited-stock': {
      subtitle: 'Monitor low inventory in real time and trigger replenishment workflows automatically.',
      chips: ['Low Stock Rules', 'Alerts', 'Thresholds', 'Vendor Queue', 'Reorder'],
    },
    'bulk-import': {
      subtitle: 'Process high-volume catalog uploads with validation previews and rollback safety.',
      chips: ['CSV Mapping', 'Preview', 'Validation', 'Error Logs', 'Rollback'],
    },
    'request-restock-list': {
      subtitle: 'Coordinate restock requests across teams with SLA, ownership, and vendor tracking.',
      chips: ['Request Queue', 'Vendor Sync', 'SLA', 'Approvals', 'Fulfillment'],
    },
    'product-gallery': {
      subtitle: 'Manage media assets with optimized delivery profiles and merchandising consistency.',
      chips: ['Media Library', 'Optimization', 'Tagging', 'Alt Text', 'Collections'],
    },
    'banner-setup': {
      subtitle: 'Build conversion-focused banner experiences with scheduling and campaign targeting.',
      chips: ['Placements', 'Scheduling', 'Campaign Tags', 'Preview', 'AB Test'],
    },
    'offers-and-deals': {
      subtitle: 'Control promotion strategy across campaigns, coupon mechanics, and storefront placement.',
      chips: ['Campaigns', 'Eligibility Rules', 'Budget Caps', 'Priority', 'ROI'],
    },
    coupon: {
      subtitle: 'Issue and govern coupon programs with usage rules, limits, and fraud prevention.',
      chips: ['Coupon Builder', 'Usage Limits', 'Eligibility', 'Stacking Rules', 'Abuse Guard'],
    },
    'flash-deals': {
      subtitle: 'Run high-velocity flash campaigns with scheduling, allocation, and real-time monitoring.',
      chips: ['Countdown', 'Inventory Lock', 'Traffic Shield', 'Discount Rules', 'Live Metrics'],
    },
    'deal-of-the-day': {
      subtitle: 'Merchandise a daily flagship offer with visibility controls and conversion analytics.',
      chips: ['Daily Rotation', 'Featured Placement', 'Pacing', 'Guardrails', 'Insight'],
    },
    'featured-deal': {
      subtitle: 'Showcase premium promotional bundles with strategic placement and narrative design.',
      chips: ['Hero Placement', 'Creative Assets', 'Targeting', 'Scheduling', 'Reporting'],
    },
    'clearance-sale': {
      subtitle: 'Liquidate aging inventory using markdown ladders and controlled campaign windows.',
      chips: ['Markdown Ladder', 'Inventory Aging', 'Pacing', 'Storefront Slots', 'Recovery Metrics'],
    },
    notifications: {
      subtitle: 'Orchestrate omnichannel communication flows with segmentation and delivery tracking.',
      chips: ['Channels', 'Segmentation', 'Templates', 'Schedules', 'Deliverability'],
    },
    'send-notification': {
      subtitle: 'Compose and deliver targeted announcements with live audience previews and timing controls.',
      chips: ['Composer', 'Audience Preview', 'Scheduling', 'A/B Testing', 'Read Tracking'],
    },
    'push-notifications-setup': {
      subtitle: 'Configure push infrastructure, payload standards, and fallback behavior at scale.',
      chips: ['Provider Setup', 'Payload Schema', 'Retry Rules', 'Device Tokens', 'Monitoring'],
    },
    announcement: {
      subtitle: 'Publish company-wide announcements with approval workflows and visibility options.',
      chips: ['Drafts', 'Approvals', 'Audience Scope', 'Scheduling', 'History'],
    },
    message: {
      subtitle: 'Manage direct message streams with smart routing and response performance tools.',
      chips: ['Inbox', 'Routing', 'Templates', 'SLA', 'Escalation'],
    },
    'support-ticket': {
      subtitle: 'Track support cases through triage, escalation, and resolution quality metrics.',
      chips: ['Ticket Queue', 'Priority', 'SLA', 'Resolution Notes', 'CSAT'],
    },
    'earning-reports': {
      subtitle: 'Analyze revenue trends with period comparisons, drilldowns, and finance-ready exports.',
      chips: ['Revenue Trend', 'MoM Comparison', 'Segments', 'Export', 'Audit'],
    },
    'product-report': {
      subtitle: 'Measure catalog performance across engagement, conversion, and stock outcomes.',
      chips: ['SKU Health', 'Conversion', 'Returns', 'Velocity', 'Benchmarks'],
    },
    'order-report': {
      subtitle: 'Evaluate order lifecycle metrics and identify operational bottlenecks proactively.',
      chips: ['Order Funnel', 'Status Mix', 'SLA', 'Failure Analysis', 'Exports'],
    },
    'admin-tax-report': {
      subtitle: 'Maintain tax visibility with accurate summaries, exceptions, and compliance exports.',
      chips: ['Tax Summary', 'Jurisdiction View', 'Exceptions', 'Reconcile', 'Compliance'],
    },
    blog: {
      subtitle: 'Manage editorial operations with SEO support, publishing cadence, and content governance.',
      chips: ['Editorial Calendar', 'SEO Checks', 'Draft Workflow', 'Scheduling', 'Revision History'],
    },
    'blog-add-new': {
      subtitle: 'Create rich blog entries with structure guidance, SEO signals, and media tooling.',
      chips: ['Composer', 'SEO Assistant', 'Media Attachments', 'Preview', 'Publish'],
    },
    'blog-list': {
      subtitle: 'Track all articles by status, owner, and performance to keep content operations sharp.',
      chips: ['Status Filters', 'Ownership', 'Performance', 'Bulk Actions', 'Archive'],
    },
    'customer-reviews': {
      subtitle: 'Moderate and amplify customer sentiment with smart triage and response workflows.',
      chips: ['Moderation', 'Sentiment', 'Flagging', 'Response Templates', 'Insights'],
    },
    'loyalty-points': {
      subtitle: 'Design and operate loyalty mechanics with earn/redeem controls and member segmentation.',
      chips: ['Earning Rules', 'Redeem Rules', 'Tiering', 'Fraud Guard', 'Program Insights'],
    },
    employees: {
      subtitle: 'Coordinate employee operations with role-aware views, ownership, and productivity signals.',
      chips: ['Directory', 'Access Scope', 'Assignments', 'Capacity', 'Performance'],
    },
    'employee-role-setup': {
      subtitle: 'Define role structures with permissions, inheritance, and audit-friendly governance.',
      chips: ['Role Matrix', 'Permission Sets', 'Inheritance', 'Approvals', 'Audit Logs'],
    },
    'tax-gst': {
      subtitle: 'Set and maintain GST rules with region-aware logic and compliance safeguards.',
      chips: ['GST Rules', 'Region Mapping', 'Rates', 'Validation', 'Compliance'],
    },
    'priority-setup': {
      subtitle: 'Configure priority models that route critical operations to the right teams instantly.',
      chips: ['Priority Rules', 'Thresholds', 'Routing', 'Escalation', 'SLA Policy'],
    },
    'pages-media': {
      subtitle: 'Manage storefront pages and media touchpoints with consistent brand delivery.',
      chips: ['Page Builder', 'Media Library', 'Linking', 'Versioning', 'Governance'],
    },
    'business-pages': {
      subtitle: 'Maintain key business pages with structure templates and conversion-ready sections.',
      chips: ['Page Templates', 'Blocks', 'SEO', 'Preview', 'Publishing'],
    },
    'social-media-links': {
      subtitle: 'Centralize social links and ensure consistency across all customer touchpoints.',
      chips: ['Link Registry', 'Validation', 'UTM Tags', 'Placement', 'Monitoring'],
    },
    'login-settings': {
      subtitle: 'Control authentication behavior, session policy, and secure login experience settings.',
      chips: ['Session Policy', 'MFA', 'Password Rules', 'Rate Limits', 'Risk Alerts'],
    },
    'email-template': {
      subtitle: 'Design reusable email templates with brand consistency and campaign-level customization.',
      chips: ['Template Builder', 'Blocks', 'Variables', 'Preview', 'Send Tests'],
    },
    'marketing-tools': {
      subtitle: 'Operate growth tooling with audience targeting, experiments, and impact reporting.',
      chips: ['Audience', 'Experiments', 'Campaign Ops', 'Attribution', 'ROI'],
    },
  };

  return { ...base, ...(presetsBySlug[slug] || {}) };
};

const ModulePage = () => {
  const { moduleSlug } = useParams();
  const moduleItem = getModuleBySlug(moduleSlug);

  const [query, setQuery] = useState('');
  const [automationOn, setAutomationOn] = useState(true);

  const preset = useMemo(() => getPreset(moduleSlug, moduleItem), [moduleSlug, moduleItem]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return preset.rows;

    return preset.rows.filter(
      (row) =>
        row.name.toLowerCase().includes(q) ||
        row.owner.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q)
    );
  }, [preset.rows, query]);

  if (!moduleItem) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">Module not found</h1>
          <p className="text-sm sm:text-base text-surface-500">The requested module is not available in the sidebar configuration.</p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-600 text-white font-bold shadow-lg shadow-primary-500/25 hover:bg-primary-700 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const Icon = moduleItem.icon || LayoutDashboard;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 text-[10px] font-black tracking-[0.3em] uppercase">
            {moduleItem.sectionNumber} {moduleItem.sectionTitle}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">{moduleItem.label}</h1>
            <p className="text-sm sm:text-base text-surface-500 max-w-2xl">{preset.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-colors">
            <Plus size={16} />
            Create New
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-200 font-bold hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
            <Download size={16} />
            Export
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-200 font-bold hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {preset.stats.map((stat) => (
          <article key={stat.label} className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl p-4 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-surface-400">{stat.label}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusPalette[stat.tone]}`}>
                +{(hashValue(moduleSlug + stat.label) % 13) + 1}%
              </span>
            </div>
            <p className="text-3xl font-extrabold text-surface-900 dark:text-white">{stat.value}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-surface-400 uppercase tracking-[0.35em]">Dedicated Workspace</p>
                <h2 className="text-xl font-extrabold text-surface-900 dark:text-white">{moduleItem.label} Console</h2>
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm font-semibold text-surface-600 dark:text-surface-300">
              <input
                type="checkbox"
                checked={automationOn}
                onChange={(e) => setAutomationOn(e.target.checked)}
                className="w-4 h-4 rounded accent-primary-600"
              />
              Automation Mode
            </label>
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search records, owners, status..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 text-sm text-surface-800 dark:text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-surface-400 mb-3">Features</p>
            <div className="flex flex-wrap gap-2">
              {preset.chips.map((chip) => (
                <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-900/25 text-primary-600">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface-50 dark:bg-surface-900/60">
                <tr>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-surface-500">Name</th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-surface-500">Owner</th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-surface-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-surface-500">Updated</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={`${row.name}-${row.updated}`} className="border-t border-surface-100 dark:border-surface-800">
                    <td className="px-4 py-3 font-semibold text-surface-900 dark:text-surface-100">{row.name}</td>
                    <td className="px-4 py-3 text-surface-600 dark:text-surface-300">{row.owner}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-200">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-surface-500 dark:text-surface-400">{row.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="bg-gradient-to-br from-surface-900 to-surface-800 text-white rounded-3xl p-6 shadow-card">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/60 mb-3">Smart Assistant</p>
            <h3 className="text-xl font-extrabold mb-3">Operational Suggestions</h3>
            <p className="text-sm text-white/70 leading-6 mb-4">
              Dedicated module experience is active with automation support and performance-first controls.
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <Sparkles size={15} />
              Next-level workflow enabled
            </div>
          </section>

          <section className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl p-6 shadow-card">
            <h3 className="text-sm font-black uppercase tracking-[0.25em] text-surface-400 mb-4">Checklist</h3>
            <div className="space-y-3">
              {preset.checklist.map((item, idx) => (
                <div key={item} className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${idx === 0 ? 'bg-primary-100 text-primary-600' : 'bg-surface-100 dark:bg-surface-700 text-surface-500'}`}>
                    {idx === 0 ? <Check size={12} /> : <Clock3 size={12} />}
                  </div>
                  <p className="text-sm text-surface-700 dark:text-surface-200 leading-6">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl p-6 shadow-card">
            <h3 className="text-sm font-black uppercase tracking-[0.25em] text-surface-400 mb-4">Module Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-surface-500">Number</span>
                <span className="font-bold text-surface-900 dark:text-white">{moduleItem.number}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-surface-500">Section</span>
                <span className="font-bold text-surface-900 dark:text-white">{moduleItem.sectionTitle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-surface-500">Status</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                  <CircleCheck size={14} /> Active
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <section className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-extrabold text-surface-900 dark:text-white">Performance Snapshot</h3>
            <p className="text-sm text-surface-500">Current module progression and execution health.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 text-sm font-bold text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
            <ChartNoAxesColumn size={16} />
            Open Analytics
          </button>
        </div>

        <div className="space-y-3">
          {preset.stats.slice(0, 3).map((stat, idx) => {
            const progress = `${55 + (hashValue(stat.label + idx + moduleSlug) % 35)}%`;
            return (
              <div key={stat.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-semibold text-surface-700 dark:text-surface-200">{stat.label}</span>
                  <span className="text-surface-500">{progress}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-100 dark:bg-surface-700 overflow-hidden">
                  <div className="h-full rounded-full bg-primary-600" style={{ width: progress }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ModulePage;
