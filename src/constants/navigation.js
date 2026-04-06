import {
  LayoutDashboard,
  ShoppingCart,
  RotateCcw,
  Grid2X2,
  SlidersHorizontal,
  Package,
  Image,
  Megaphone,
  Bell,
  MessageSquare,
  Ticket,
  BarChart3,
  FileText,
  Users,
  UsersRound,
  Settings,
  BadgeDollarSign,
  Pin,
  Files,
  LogIn,
  Mail,
  TrendingUp,
  ChevronDown,
  Clock,
  CheckCircle,
  Box,
  Truck,
  Flag,
  AlertCircle,
  XCircle
} from 'lucide-react';

export const sidebarSections = [
  {
    number: '01',
    title: 'Core Navigation',
    items: [
      { number: '01', label: 'Dashboard', slug: 'dashboard', path: '/', icon: LayoutDashboard, isPrimary: true },
      { 
        number: '02', 
        label: 'Orders', 
        slug: 'orders', 
        path: '/orders',
        icon: ShoppingCart, 
        isPrimary: true,
        hasDropdown: true,
        submenu: [
          { label: 'All Orders', slug: 'all-orders', path: '/orders', icon: ShoppingCart },
          { label: 'Pending Orders', slug: 'pending-orders', path: '/orders/pending', icon: Clock },
          { label: 'Confirmed Orders', slug: 'confirmed-orders', path: '/orders/confirmed', icon: CheckCircle },
          { label: 'Packaging Orders', slug: 'packaging-orders', path: '/orders/packaging', icon: Box },
          { label: 'Out for Delivery', slug: 'out-for-delivery', path: '/orders/delivery', icon: Truck },
          { label: 'Delivered Orders', slug: 'delivered-orders', path: '/orders/delivered', icon: Flag },
          { label: 'Returned Orders', slug: 'returned-orders', path: '/orders/returned', icon: RotateCcw },
          { label: 'Failed to Deliver', slug: 'failed-deliver', path: '/orders/failed', icon: AlertCircle },
          { label: 'Canceled Orders', slug: 'canceled-orders', path: '/orders/canceled', icon: XCircle },
        ]
      },
      {
        number: '03',
        label: 'Refund',
        slug: 'refund',
        path: '/refund',
        icon: RotateCcw,
        hasDropdown: true,
        submenu: [
          { label: 'Pending', slug: 'refund-pending', path: '/refund/pending', icon: Clock },
          { label: 'Approved', slug: 'refund-approved', path: '/refund/approved', icon: CheckCircle },
          { label: 'Refunded', slug: 'refund-refunded', path: '/refund/refunded', icon: RotateCcw },
          { label: 'Rejected', slug: 'refund-rejected', path: '/refund/rejected', icon: XCircle },
        ],
      },
    ],
  },
  {
    number: '02',
    title: 'Catalog Management',
    items: [
      {
        number: '04',
        label: 'Categories',
        slug: 'categories',
        path: '/categories',
        icon: Grid2X2,
        hasDropdown: true,
        submenu: [
          { label: 'Categories', slug: 'categories', path: '/categories', icon: Grid2X2 },
          { label: 'Sub Categories', slug: 'sub-categories', path: '/categories/sub-categories', icon: SlidersHorizontal },
        ],
      },
      { number: '05', label: 'Product Attributes', slug: 'product-attributes', path: '/product-attributes', icon: SlidersHorizontal },
      {
        number: '06',
        label: 'Product',
        slug: 'product',
        path: '/products',
        icon: Package,
        isPrimary: true,
        hasDropdown: true,
        submenu: [
          { label: 'Product List', slug: 'product-list', path: '/products', icon: Package },
          { label: 'Add New Product', slug: 'add-new-product', path: '/products/add-new', icon: Package },
          { label: 'Limited Stock', slug: 'limited-stock', path: '/products/limited-stock', icon: AlertCircle },
          { label: 'Bulk Import', slug: 'bulk-import', path: '/products/bulk-import', icon: Files },
          { label: 'Request Restock List', slug: 'request-restock-list', path: '/products/request-restock-list', icon: RotateCcw },
        ],
      },
      { number: '07', label: 'Product Gallery', slug: 'product-gallery', path: '/products/gallery', icon: Image },
      { number: '08', label: 'Banner Setup', slug: 'banner-setup', path: '/products/banner-setup', icon: Image },
      {
        number: '09',
        label: 'Offers and Deals',
        slug: 'offers-and-deals',
        path: '/modules/offers-and-deals',
        icon: BadgeDollarSign,
        hasDropdown: true,
        submenu: [
          { label: 'Coupon', slug: 'coupon', path: '/modules/coupon', icon: Ticket },
          { label: 'Flash Deals', slug: 'flash-deals', path: '/modules/flash-deals', icon: TrendingUp },
          { label: 'Deal of the day', slug: 'deal-of-the-day', path: '/modules/deal-of-the-day', icon: BadgeDollarSign },
          { label: 'Featured Deal', slug: 'featured-deal', path: '/modules/featured-deal', icon: Megaphone },
          { label: 'Clearance Sale', slug: 'clearance-sale', path: '/modules/clearance-sale', icon: FileText },
        ],
      },
    ],
  },
  {
    number: '03',
    title: 'Communication & Support',
    items: [
      {
        number: '10',
        label: 'Notifications',
        slug: 'notifications',
        path: '/modules/notifications',
        icon: Bell,
        hasDropdown: true,
        submenu: [
          { label: 'Send notification', slug: 'send-notification', path: '/modules/send-notification', icon: MessageSquare },
          { label: 'Push notifications setup', slug: 'push-notifications-setup', path: '/modules/push-notifications-setup', icon: Bell },
        ],
      },
      { number: '11', label: 'Announcement', slug: 'announcement', path: '/modules/announcement', icon: Megaphone },
      { number: '12', label: 'Message', slug: 'message', path: '/modules/message', icon: MessageSquare },
      { number: '13', label: 'Support Ticket', slug: 'support-ticket', path: '/modules/support-ticket', icon: Ticket },
    ],
  },
  {
    number: '04',
    title: 'Sales & Reports',
    items: [
      {
        number: '14',
        label: 'Sales & Transaction',
        slug: 'sales-transaction',
        path: '/transactions',
        icon: BarChart3,
        isPrimary: true,
        hasDropdown: true,
        submenu: [
          { label: 'Earning Reports', slug: 'earning-reports', path: '/modules/earning-reports', icon: TrendingUp },
          { label: 'Transaction Report', slug: 'transaction-report', path: '/transactions', icon: BarChart3 },
        ],
      },
      { number: '15', label: 'Product Report', slug: 'product-report', path: '/modules/product-report', icon: FileText },
      { number: '16', label: 'Order Report', slug: 'order-report', path: '/modules/order-report', icon: FileText },
      { number: '17', label: 'Admin Tax Report', slug: 'admin-tax-report', path: '/modules/admin-tax-report', icon: FileText },
    ],
  },
  {
    number: '05',
    title: 'People & Content',
    items: [
      {
        number: '18',
        label: 'Blog',
        slug: 'blog',
        path: '/modules/blog',
        icon: Files,
        hasDropdown: true,
        submenu: [
          { label: 'Add new', slug: 'blog-add-new', path: '/modules/blog-add-new', icon: FileText },
          { label: 'List', slug: 'blog-list', path: '/modules/blog-list', icon: Files },
        ],
      },
      {
        number: '19',
        label: 'Customers',
        slug: 'customers',
        path: '/customers',
        icon: Users,
        isPrimary: true,
        hasDropdown: true,
        submenu: [
          { label: 'Customer List', slug: 'customer-list', path: '/customers', icon: Users },
          { label: 'Customer Reviews', slug: 'customer-reviews', path: '/modules/customer-reviews', icon: MessageSquare },
          { label: 'Loyalty Points', slug: 'loyalty-points', path: '/modules/loyalty-points', icon: BadgeDollarSign },
        ],
      },
      {
        number: '20',
        label: 'Employees',
        slug: 'employees',
        path: '/modules/employees',
        icon: UsersRound,
        hasDropdown: true,
        submenu: [
          { label: 'Employees', slug: 'employees', path: '/modules/employees', icon: UsersRound },
          { label: 'Employee Role Setup', slug: 'employee-role-setup', path: '/modules/employee-role-setup', icon: Settings },
        ],
      },
    ],
  },
  {
    number: '06',
    title: 'System Setup',
    items: [
      { number: '21', label: 'System Setup', slug: 'system-setup', path: '/settings', icon: Settings, isPrimary: true },
      { number: '22', label: 'Tax GST', slug: 'tax-gst', path: '/modules/tax-gst', icon: BadgeDollarSign },
      { number: '23', label: 'Priority Setup', slug: 'priority-setup', path: '/modules/priority-setup', icon: Pin },
      {
        number: '24',
        label: 'Pages & Media',
        slug: 'pages-media',
        path: '/modules/pages-media',
        icon: Files,
        hasDropdown: true,
        submenu: [
          { label: 'Business Pages', slug: 'business-pages', path: '/modules/business-pages', icon: Files },
          { label: 'Social Media Links', slug: 'social-media-links', path: '/modules/social-media-links', icon: MessageSquare },
        ],
      },
      { number: '25', label: 'Login Settings', slug: 'login-settings', path: '/modules/login-settings', icon: LogIn },
      { number: '26', label: 'Email Template', slug: 'email-template', path: '/modules/email-template', icon: Mail },
      { number: '27', label: 'Marketing Tools', slug: 'marketing-tools', path: '/modules/marketing-tools', icon: TrendingUp },
    ],
  },
];

export const sidebarItems = sidebarSections.flatMap((section) => {
  return section.items.flatMap((item) => {
    const baseItem = {
      ...item,
      sectionNumber: section.number,
      sectionTitle: section.title,
    };

    if (!item.submenu) {
      return [baseItem];
    }

    const submenuItems = item.submenu.map((subItem, idx) => ({
      ...subItem,
      number: `${item.number}.${idx + 1}`,
      sectionNumber: section.number,
      sectionTitle: section.title,
    }));

    return [baseItem, ...submenuItems];
  });
});

export const getModuleBySlug = (slug) => sidebarItems.find((item) => item.slug === slug);
