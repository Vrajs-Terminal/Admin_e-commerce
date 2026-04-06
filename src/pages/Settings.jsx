import React from 'react';
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
  Save
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto transition-all duration-300">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight animate-slide-in">
          System <span className="text-primary-600">Settings</span>
        </h1>
        <p className="text-sm sm:text-base text-surface-500 max-w-md">
          Customize your FitFloor workspace to fit your workflow perfectly.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-1/3 flex flex-nowrap lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none">
           {[
             { name: 'Profile Information', icon: User, active: true },
             { name: 'Store Preferences', icon: Store },
             { name: 'Notification Settings', icon: Bell },
             { name: 'Security & Access', icon: Shield },
             { name: 'Billing & Subscriptions', icon: CreditCard },
             { name: 'API Integrations', icon: SettingsIcon },
           ].map((item, i) => (
             <button key={i} className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-200 text-[10px] font-black tracking-widest text-left uppercase whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink-1 ${item.active ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/25' : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white'}`}>
                <item.icon size={18} />
                <span>{item.name}</span>
             </button>
           ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-10 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl shadow-card p-6 sm:p-10 animate-fade-in transition-all duration-300">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Full Name</label>
                    <div className="relative group overflow-hidden">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 transition-colors group-focus-within:text-primary-500" />
                       <input type="text" defaultValue="Viren Rajamin" className="w-full pl-11 pr-4 py-3.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 font-bold text-surface-900 dark:text-white transition-all sm:text-sm" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Email Address</label>
                    <div className="relative group overflow-hidden">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 transition-colors group-focus-within:text-primary-500" />
                       <input type="email" defaultValue="viren@fitfloor.com" className="w-full pl-11 pr-4 py-3.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 font-bold text-surface-900 dark:text-white transition-all sm:text-sm" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Role Title</label>
                    <div className="relative group overflow-hidden">
                       <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                       <input type="text" defaultValue="Head of Operations" className="w-full pl-11 pr-4 py-3.5 bg-surface-100 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl cursor-not-allowed opacity-50 font-bold sm:text-sm" disabled />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Phone Contact</label>
                    <div className="relative group overflow-hidden">
                       <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 transition-colors group-focus-within:text-primary-500" />
                       <input type="text" defaultValue="+1 (555) 000-0000" className="w-full pl-11 pr-4 py-3.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 font-bold text-surface-900 dark:text-white transition-all sm:text-sm" />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Language</label>
                    <select className="w-full px-4 py-3.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-bold dark:text-white cursor-pointer appearance-none">
                       <option>English (US)</option>
                       <option>Spanish (ES)</option>
                       <option>French (FR)</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest pl-1">Default Currency</label>
                    <select className="w-full px-4 py-3.5 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-bold dark:text-white cursor-pointer appearance-none">
                       <option>USD ($)</option>
                       <option>EUR (€)</option>
                       <option>GBP (£)</option>
                    </select>
                 </div>
              </div>
           </section>

           <div className="flex justify-end pt-4">
              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/30 hover:bg-primary-700 hover:shadow-primary-500/40 transition-all font-black text-[10px] uppercase tracking-widest group w-full sm:w-auto">
                 <Save size={18} className="group-hover:scale-125 transition-transform" />
                 Save System Changes
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
