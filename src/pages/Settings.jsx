import React, { useState } from 'react';
import { 
  User, 
  Store, 
  Bell, 
  Shield, 
  CreditCard, 
  Mail, 
  Settings as SettingsIcon,
  Globe,
  Smartphone,
  Save,
  CheckCircle2,
  Lock,
  Key,
  CreditCard as BillingIcon,
  CloudLightning,
  UploadCloud,
  ExternalLink,
  ShoppingCart,
  Package
} from 'lucide-react';
import Button from '../components/ui/Button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile Information');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { name: 'Profile Information', icon: User },
    { name: 'Store Preferences', icon: Store },
    { name: 'Notification Settings', icon: Bell },
    { name: 'Security & Access', icon: Shield },
    { name: 'Billing & Subscriptions', icon: CreditCard },
    { name: 'API Integrations', icon: SettingsIcon },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile Information':
        return (
          <div className="space-y-10 animate-fade-in">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-surface-900 dark:text-white tracking-tight">Profile Details</h2>
                  <p className="text-xs text-surface-400 font-bold uppercase tracking-widest">Update your personal identity</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input type="text" defaultValue="Viren Rajamin" className="w-full pl-11 pr-4 py-3.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 font-bold dark:text-white transition-all text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input type="email" defaultValue="viren@royalvirtus.com" className="w-full pl-11 pr-4 py-3.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 font-bold dark:text-white transition-all text-sm" />
                  </div>
                </div>
              </div>
            </section>
            <div className="h-px bg-surface-100 dark:bg-surface-700 w-full" />
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                  <Globe size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-surface-900 dark:text-white tracking-tight">Regional Preference</h2>
                  <p className="text-xs text-surface-400 font-bold uppercase tracking-widest">Adjust localization and currency</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Language</label>
                  <select className="w-full px-4 py-3.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 font-bold dark:text-white transition-all text-sm appearance-none">
                    <option>English (US)</option>
                    <option>Spanish (ES)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Currency</label>
                  <select className="w-full px-4 py-3.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 font-bold dark:text-white transition-all text-sm appearance-none">
                    <option>USD ($)</option>
                    <option>INR (₹)</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
        );
      case 'Store Preferences':
        return (
          <div className="space-y-10 animate-fade-in">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                  <Store size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-surface-900 dark:text-white tracking-tight">Store Identity</h2>
                  <p className="text-xs text-surface-400 font-bold uppercase tracking-widest">Public profile and branding</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-surface-100 dark:bg-surface-900 border-2 border-dashed border-surface-300 dark:border-surface-700 flex flex-col items-center justify-center text-surface-400 group cursor-pointer hover:border-primary-500 transition-all">
                    <UploadCloud size={24} className="group-hover:text-primary-500" />
                    <span className="text-[8px] font-bold mt-2 uppercase tracking-widest">Logo</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-surface-900 dark:text-white">Store Logo</h3>
                    <p className="text-xs text-surface-500">Recommended 512x512px. SVG, PNG or JPG.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Store Name</label>
                    <input type="text" defaultValue="RoyalVirtus Store" className="w-full px-5 py-3.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 font-bold dark:text-white text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Store URL</label>
                    <div className="flex items-center gap-2">
                      <input type="text" defaultValue="royalvirtus-shop" className="w-full px-5 py-3.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 font-bold dark:text-white text-sm" />
                      <div className="px-3 text-surface-400 font-bold">.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      case 'Notification Settings':
        return (
          <div className="space-y-10 animate-fade-in">
            <section className="space-y-6">
              {[
                { label: 'Order Updates', sub: 'Receive emails for every new order placed.', icon: ShoppingCart },
                { label: 'Inventory Alerts', sub: 'Get notified when stock levels fall below threshold.', icon: Package },
                { label: 'Customer Messages', sub: 'Direct notifications for new support tickets.', icon: Mail },
                { label: 'System Announcements', sub: 'Major platform updates and maintenance info.', icon: Bell }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-surface-50 dark:bg-surface-900/50 rounded-3xl border border-surface-100 dark:border-surface-800">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-surface-800 rounded-2xl shadow-sm text-primary-600">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-surface-900 dark:text-white uppercase tracking-tight text-sm">{item.label}</h4>
                      <p className="text-xs text-surface-500">{item.sub}</p>
                    </div>
                  </div>
                  <button className="w-11 h-6 bg-primary-600 rounded-full relative p-0.5">
                    <div className="w-5 h-5 bg-white rounded-full translate-x-5 shadow-sm" />
                  </button>
                </div>
              ))}
            </section>
          </div>
        );
      case 'Security & Access':
        return (
          <div className="space-y-10 animate-fade-in">
            <section className="space-y-8">
              <div className="p-8 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-[2.5rem] space-y-6">
                <div className="flex items-center gap-3">
                  <Lock size={20} className="text-primary-600" />
                  <h3 className="font-black uppercase tracking-widest text-sm text-surface-900 dark:text-white">Change Password</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="password" placeholder="Current Password" className="w-full px-5 py-4 bg-white dark:bg-surface-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 font-bold dark:text-white text-sm" />
                  <input type="password" placeholder="New Password" className="w-full px-5 py-4 bg-white dark:bg-surface-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 font-bold dark:text-white text-sm" />
                </div>
                <Button variant="outline" className="w-full">Update Credentials</Button>
              </div>
              <div className="flex items-center justify-between p-8 bg-primary-600 rounded-[2.5rem] text-white">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield size={24} />
                    <h3 className="text-lg font-black uppercase tracking-tight">Two-Factor Auth</h3>
                  </div>
                  <p className="text-sm text-white/80 max-w-md">Add an extra layer of security to your account with authenticator apps.</p>
                </div>
                <button className="px-6 py-3 bg-white text-primary-600 rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl">Enable MFA</button>
              </div>
            </section>
          </div>
        );
      case 'Billing & Subscriptions':
        return (
          <div className="space-y-10 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-surface-900 rounded-[2.5rem] text-white space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-primary-600 rounded-2xl">
                    <BillingIcon size={24} />
                  </div>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">Active Plan</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-black uppercase tracking-tight">Enterprise</h3>
                  <p className="text-surface-400 text-xs font-bold uppercase tracking-widest">$249 / Monthly</p>
                </div>
                <div className="h-px bg-white/10 w-full" />
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-surface-400">
                  <span>Next Invoice: May 12, 2026</span>
                  <ExternalLink size={16} />
                </div>
              </div>
              <div className="p-8 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-[2.5rem] space-y-6">
                <h3 className="font-black uppercase tracking-widest text-sm text-surface-900 dark:text-white">Payment Method</h3>
                <div className="flex items-center gap-4 p-4 bg-surface-50 dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-700">
                  <div className="w-12 h-8 bg-surface-800 rounded-md flex items-center justify-center text-white font-bold text-[10px]">VISA</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold dark:text-white">•••• 4242</p>
                    <p className="text-[10px] text-surface-500 font-bold uppercase tracking-widest">Expires 04/28</p>
                  </div>
                  <button className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Edit</button>
                </div>
                <Button variant="outline" className="w-full">Add New Card</Button>
              </div>
            </div>
          </div>
        );
      case 'API Integrations':
        return (
          <div className="space-y-10 animate-fade-in">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                  <CloudLightning size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-surface-900 dark:text-white tracking-tight">API Management</h2>
                  <p className="text-xs text-surface-400 font-bold uppercase tracking-widest">Connect your apps and data</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-[2.5rem] space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Secret API Key</label>
                    <button className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Regenerate Key</button>
                  </div>
                  <div className="flex gap-2">
                    <input type="password" readOnly value="sk_test_51Mz9VqJ9p9p9p9p9" className="flex-1 px-5 py-4 bg-white dark:bg-surface-800 border-none rounded-2xl outline-none font-mono text-sm dark:text-white" />
                    <button className="p-4 bg-white dark:bg-surface-800 rounded-2xl text-surface-400 hover:text-primary-600 transition-colors">
                      <Key size={20} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Shopify', 'Webflow', 'Zapier'].map(app => (
                    <div key={app} className="p-6 bg-white dark:bg-surface-800 border border-surface-100 dark:border-surface-700 rounded-[2rem] flex flex-col items-center gap-4 group cursor-pointer hover:border-primary-500 transition-all">
                      <div className="w-12 h-12 bg-surface-50 dark:bg-surface-900 rounded-2xl flex items-center justify-center font-bold text-xs text-surface-400 group-hover:text-primary-600">
                        {app[0]}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest dark:text-white">{app}</span>
                      <span className="px-2 py-1 bg-surface-100 dark:bg-surface-900 rounded-full text-[8px] font-bold text-surface-500 uppercase tracking-widest">Connect</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight animate-slide-in">
            System <span className="text-primary-600">Settings</span>
          </h1>
          <p className="text-sm text-surface-500">
            Configure your <span className="text-primary-600 font-bold uppercase tracking-tight">RoyalVirtus</span> ecosystem architecture.
          </p>
        </div>
        <Button 
          variant="primary" 
          icon={isSaving ? CheckCircle2 : Save} 
          onClick={handleSave}
          className={`${isSaving ? 'bg-green-600 shadow-green-500/20' : ''} shadow-lg shadow-primary-500/20 px-8 py-4 text-xs h-auto min-w-[200px]`}
        >
          {isSaving ? 'Successfully Applied' : 'Apply System Changes'}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-72 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none sticky top-24 z-10">
           {tabs.map((item, i) => (
             <button 
                key={i} 
                onClick={() => setActiveTab(item.name)}
                className={`
                  flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 text-[10px] font-black tracking-widest text-left uppercase whitespace-nowrap flex-shrink-0
                  ${activeTab === item.name 
                    ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/30 translate-x-1' 
                    : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white'}
                `}
             >
                <item.icon size={18} className={`${activeTab === item.name ? 'scale-110' : ''} transition-transform`} />
                <span>{item.name}</span>
             </button>
           ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-[3rem] shadow-card p-6 sm:p-12 transition-all duration-300 relative overflow-hidden">
           {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
