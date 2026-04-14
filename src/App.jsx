import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LayoutProvider } from './context/LayoutContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/product/ProductList';
import AddNewProduct from './pages/product/AddNewProduct';
import LimitedStock from './pages/product/LimitedStock';
import BulkImport from './pages/product/BulkImport';
import RequestRestockList from './pages/product/RequestRestockList';
import ProductGallery from './pages/product/ProductGallery';
import BannerSetup from './pages/product/BannerSetup';
import ProductAttributes from './pages/ProductAttributes';
import OffersAndDeals from './pages/offers/OffersAndDeals';
import Coupon from './pages/offers/Coupon';
import FlashDeals from './pages/offers/FlashDeals';
import DealOfTheDay from './pages/offers/DealOfTheDay';
import FeaturedDeal from './pages/offers/FeaturedDeal';
import ClearanceSale from './pages/offers/ClearanceSale';
import Notifications from './pages/notifications/Notifications';
import SendNotification from './pages/notifications/SendNotification';
import PushNotificationsSetup from './pages/notifications/PushNotificationsSetup';
import Categories from './pages/categories/Categories';
import SubCategories from './pages/categories/SubCategories';
import AllOrders from './pages/orders/AllOrders';
import PendingOrders from './pages/orders/PendingOrders';
import ConfirmedOrders from './pages/orders/ConfirmedOrders';
import PackagingOrders from './pages/orders/PackagingOrders';
import OutForDeliveryOrders from './pages/orders/OutForDeliveryOrders';
import DeliveredOrders from './pages/orders/DeliveredOrders';
import ReturnedOrders from './pages/orders/ReturnedOrders';
import FailedToDeliverOrders from './pages/orders/FailedToDeliverOrders';
import CanceledOrders from './pages/orders/CanceledOrders';
import OrderByStatus from './pages/orders/OrderByStatus';
import Customers from './pages/Customers';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import ModulePage from './pages/ModulePage';
import AnnouncementPage from './pages/communication/AnnouncementPage';
import MessagePage from './pages/communication/MessagePage';
import SupportTicketPage from './pages/communication/SupportTicketPage';
import EarningReportsPage from './pages/reports/EarningReportsPage';
import ProductReportPage from './pages/reports/ProductReportPage';
import OrderReportPage from './pages/reports/OrderReportPage';
import AdminTaxReportPage from './pages/reports/AdminTaxReportPage';
import BlogAddNewPage from './pages/content/BlogAddNewPage';
import BlogListPage from './pages/content/BlogListPage';
import CustomerReviewsPage from './pages/customer-management/CustomerReviewsPage';
import LoyaltyPointsPage from './pages/customer-management/LoyaltyPointsPage';
import EmployeesPage from './pages/employees/EmployeesPage';
import EmployeeRolePage from './pages/employees/EmployeeRolePage';
import TaxGstPage from './pages/system/TaxGstPage';
import PrioritySetupPage from './pages/system/PrioritySetupPage';
import PagesMediaPage from './pages/content/PagesMediaPage';
import BusinessPages from './pages/content/BusinessPages';
import SocialMediaLinksPage from './pages/content/SocialMediaLinksPage';
import LoginSettingsPage from './pages/system/LoginSettingsPage';
import EmailTemplatePage from './pages/communication/EmailTemplatePage';
import MarketingToolsPage from './pages/marketing/MarketingToolsPage';
import RefundAll from './pages/refund/RefundAll';
import RefundPending from './pages/refund/RefundPending';
import RefundApproved from './pages/refund/RefundApproved';
import RefundRefunded from './pages/refund/RefundRefunded';
import RefundRejected from './pages/refund/RefundRejected';
import AuthPortal from './pages/AuthPortal';

const App = () => {
  const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;
  const routerProps = import.meta.env.PROD ? {} : { basename: import.meta.env.BASE_URL };

  return (
    <ThemeProvider>
      <LayoutProvider>
        <Router {...routerProps}>
          <Routes>
            <Route path="/login" element={<AuthPortal />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/add-new" element={<AddNewProduct />} />
              <Route path="products/limited-stock" element={<LimitedStock />} />
              <Route path="products/bulk-import" element={<BulkImport />} />
              <Route path="products/request-restock-list" element={<RequestRestockList />} />
              <Route path="products/gallery" element={<ProductGallery />} />
              <Route path="products/banner-setup" element={<BannerSetup />} />
              <Route path="product-attributes" element={<ProductAttributes />} />
              <Route path="modules/offers-and-deals" element={<OffersAndDeals />} />
              <Route path="modules/coupon" element={<Coupon />} />
              <Route path="modules/flash-deals" element={<FlashDeals />} />
              <Route path="modules/deal-of-the-day" element={<DealOfTheDay />} />
              <Route path="modules/featured-deal" element={<FeaturedDeal />} />
              <Route path="modules/clearance-sale" element={<ClearanceSale />} />
              <Route path="modules/notifications" element={<Notifications />} />
              <Route path="modules/send-notification" element={<SendNotification />} />
              <Route path="modules/push-notifications-setup" element={<PushNotificationsSetup />} />
              <Route path="modules/announcement" element={<AnnouncementPage />} />
              <Route path="modules/message" element={<MessagePage />} />
              <Route path="modules/support-ticket" element={<SupportTicketPage />} />
              <Route path="modules/earning-reports" element={<EarningReportsPage />} />
              <Route path="modules/product-report" element={<ProductReportPage />} />
              <Route path="modules/order-report" element={<OrderReportPage />} />
              <Route path="modules/admin-tax-report" element={<AdminTaxReportPage />} />
              <Route path="modules/blog-add-new" element={<BlogAddNewPage />} />
              <Route path="modules/blog-list" element={<BlogListPage />} />
              <Route path="modules/customer-reviews" element={<CustomerReviewsPage />} />
              <Route path="modules/loyalty-points" element={<LoyaltyPointsPage />} />
              <Route path="modules/employees" element={<EmployeesPage />} />
              <Route path="modules/employee-role-setup" element={<EmployeeRolePage />} />
              <Route path="modules/tax-gst" element={<TaxGstPage />} />
              <Route path="modules/priority-setup" element={<PrioritySetupPage />} />
              <Route path="modules/pages-media" element={<PagesMediaPage />} />
              <Route path="modules/business-pages" element={<BusinessPages />} />
              <Route path="modules/social-media-links" element={<SocialMediaLinksPage />} />
              <Route path="modules/login-settings" element={<LoginSettingsPage />} />
              <Route path="modules/email-template" element={<EmailTemplatePage />} />
              <Route path="modules/marketing-tools" element={<MarketingToolsPage />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/sub-categories" element={<SubCategories />} />
              <Route path="orders" element={<AllOrders />} />
              <Route path="orders/pending" element={<PendingOrders />} />
              <Route path="orders/confirmed" element={<ConfirmedOrders />} />
              <Route path="orders/packaging" element={<PackagingOrders />} />
              <Route path="orders/delivery" element={<OutForDeliveryOrders />} />
              <Route path="orders/delivered" element={<DeliveredOrders />} />
              <Route path="orders/returned" element={<ReturnedOrders />} />
              <Route path="orders/failed" element={<FailedToDeliverOrders />} />
              <Route path="orders/canceled" element={<CanceledOrders />} />
              <Route path="orders/:status" element={<OrderByStatus />} />
              <Route path="refund" element={<RefundAll />} />
              <Route path="refund/pending" element={<RefundPending />} />
              <Route path="refund/approved" element={<RefundApproved />} />
              <Route path="refund/refunded" element={<RefundRefunded />} />
              <Route path="refund/rejected" element={<RefundRejected />} />
              <Route path="customers" element={<Customers />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="settings" element={<Settings />} />
              <Route path="modules/:moduleSlug" element={<ModulePage />} />
            </Route>
          </Routes>
        </Router>
      </LayoutProvider>
    </ThemeProvider>
  );
};

export default App;
