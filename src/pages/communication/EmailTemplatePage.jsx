import React, { useState } from 'react';
import { 
  Mail, 
  Save, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  Layout, 
  Type, 
  MousePointer2,
  Settings2,
  Send,
  Sparkles,
  ChevronRight,
  Monitor,
  Smartphone
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const templates = [
  { id: 1, name: 'Welcome Email', trigger: 'User Registration', lastSent: '2 mins ago', status: 'Active', tone: 'Friendly' },
  { id: 2, name: 'Order Confirmation', trigger: 'New Order', lastSent: '15 mins ago', status: 'Active', tone: 'Professional' },
  { id: 3, name: 'Password Reset', trigger: 'Forgot Password', lastSent: '1 hour ago', status: 'Active', tone: 'Urgent' },
  { id: 4, name: 'Flash Sale Alert', trigger: 'Marketing Campaign', lastSent: 'Yesterday', status: 'Draft', tone: 'Exciting' },
  { id: 5, name: 'Abandon Cart', trigger: 'Cart Idle (2h)', lastSent: '5 hours ago', status: 'Active', tone: 'Persuasive' },
];

const EmailTemplatePage = () => {
  const [activeTab, setActiveTab] = useState('Transactional');
  const [selectedTemplate, setSelectedTemplate] = useState(templates[1]);
  const [device, setDevice] = useState('Desktop');

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 text-[10px] font-black tracking-[0.3em] uppercase">
            26 System Setup
          </div>
          <h1 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">Email <span className="text-primary-600">Templates</span></h1>
          <p className="text-sm text-surface-500 max-w-lg">Design and automate your brand communication with visual templates and smart triggers.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="secondary" icon={Settings2}>Global Config</Button>
           <Button variant="primary" icon={Plus}>Create Template</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-8">
        {/* Template List */}
        <section className="space-y-4">
           <div className="flex gap-2 p-1.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl w-fit">
              {['Transactional', 'Marketing', 'System'].map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'text-surface-500 hover:text-surface-900 dark:hover:text-white'}`}
                 >
                    {tab}
                 </button>
              ))}
           </div>

           <div className="space-y-3">
              {templates.map(tmpl => (
                 <button
                   key={tmpl.id}
                   onClick={() => setSelectedTemplate(tmpl)}
                   className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 ${selectedTemplate.id === tmpl.id ? 'bg-primary-600 border-primary-600 shadow-xl shadow-primary-500/20 text-white' : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:border-primary-300'}`}
                 >
                    <div className="flex items-center justify-between mb-3">
                       <div className={`p-2 rounded-xl ${selectedTemplate.id === tmpl.id ? 'bg-white/20' : 'bg-surface-50 dark:bg-surface-900'} text-primary-500`}>
                          <Mail size={18} className={selectedTemplate.id === tmpl.id ? 'text-white' : ''} />
                       </div>
                       <Badge variant={tmpl.status === 'Active' ? 'success' : 'primary'}>{tmpl.status}</Badge>
                    </div>
                    <p className={`font-black uppercase tracking-wider text-sm ${selectedTemplate.id === tmpl.id ? 'text-white' : 'text-surface-900 dark:text-white'}`}>{tmpl.name}</p>
                    <div className="flex items-center justify-between mt-2">
                       <p className={`text-[10px] font-bold uppercase tracking-widest ${selectedTemplate.id === tmpl.id ? 'text-white/60' : 'text-surface-400'}`}>Last sent: {tmpl.lastSent}</p>
                       <p className={`text-[10px] font-bold uppercase tracking-widest ${selectedTemplate.id === tmpl.id ? 'text-white/80' : 'text-surface-600 dark:text-surface-300'}`}>{tmpl.tone}</p>
                    </div>
                 </button>
              ))}
           </div>
        </section>

        {/* Visual Preview / Editor Wrapper */}
        <section className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-[2.5rem] shadow-card overflow-hidden">
           <div className="p-8 border-b border-surface-100 dark:border-surface-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                    <Layout size={28} />
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-surface-900 dark:text-white tracking-tight">{selectedTemplate.name}</h2>
                    <p className="text-[10px] text-surface-400 font-bold uppercase tracking-widest mt-1">Trigger: <span className="text-primary-600">{selectedTemplate.trigger}</span></p>
                 </div>
              </div>

              <div className="flex items-center gap-2 p-1.5 bg-surface-50 dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-700">
                 <button onClick={() => setDevice('Desktop')} className={`p-2 rounded-xl transition-all ${device === 'Desktop' ? 'bg-white dark:bg-surface-800 text-primary-600 shadow-sm' : 'text-surface-400 hover:text-surface-600'}`}>
                    <Monitor size={18} />
                 </button>
                 <button onClick={() => setDevice('Mobile')} className={`p-2 rounded-xl transition-all ${device === 'Mobile' ? 'bg-white dark:bg-surface-800 text-primary-600 shadow-sm' : 'text-surface-400 hover:text-surface-600'}`}>
                    <Smartphone size={18} />
                 </button>
              </div>
              
              <div className="flex gap-2">
                 <Button variant="secondary" icon={Eye}>Preview</Button>
                 <Button variant="primary" icon={Edit3}>Edit Content</Button>
              </div>
           </div>

           <div className="p-8 bg-surface-50 dark:bg-surface-900/50 flex flex-col items-center">
              <div 
                className={`bg-white dark:bg-surface-800 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 border border-surface-200 dark:border-surface-700 ${device === 'Mobile' ? 'max-w-[360px]' : 'w-full max-w-[650px]'}`}
                style={{ minHeight: '500px' }}
              >
                  {/* Mock Email Template Content */}
                  <div className="bg-primary-600 p-10 text-white flex flex-col items-center text-center">
                     <div className="p-3 bg-white/20 rounded-2xl mb-6">
                        <Send size={32} />
                     </div>
                     <h1 className="text-2xl font-black uppercase tracking-tight">Your Order is Confirmed!</h1>
                     <p className="text-xs text-white/70 font-bold uppercase tracking-widest mt-2">Order #FF-10928 • ROYALVIRTUS STORE</p>
                  </div>
                  
                  <div className="p-8">
                     <div className="mb-10 text-center">
                        <h2 className="text-2xl font-black text-surface-900 dark:text-white uppercase tracking-tight">Order Confirmed!</h2>
                        <p className="text-sm text-surface-500 leading-relaxed">Thank you for choosing <b>RoyalVirtus</b>. We've received your order and our team is already preparing it for shipment. You'll receive another email with your tracking information soon.</p>
                     </div>
                     <div className="p-6 bg-surface-50 dark:bg-surface-900 rounded-3xl border border-surface-100 dark:border-surface-700 space-y-4">
                        <div className="flex items-center justify-between border-b border-dashed border-surface-200 dark:border-surface-700 pb-3">
                           <span className="text-[10px] font-black uppercase tracking-widest text-surface-400">Items Ordered</span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-surface-400">Price</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-bold text-surface-700 dark:text-surface-300">1x Pro Eco Yoga Mat</span>
                           <span className="text-xs font-black text-surface-900 dark:text-white">$49.00</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-surface-200 dark:border-surface-700 font-black">
                           <span className="text-xs uppercase tracking-widest text-surface-900 dark:text-white">Total Charge</span>
                           <span className="text-sm text-primary-600 font-black tracking-tight">$49.00</span>
                        </div>
                     </div>
                     <div className="flex flex-col items-center pt-4">
                        <button className="px-8 py-4 bg-primary-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-500/30">Track Order Status</button>
                        <p className="mt-8 text-[10px] text-center text-surface-400 uppercase font-bold tracking-widest leading-loose">ROYALVIRTUS INC. • 123 WORKOUT ST, FITNESS CITY<br/>UNSUBSCRIBE • BROWSE STORE • HELP CENTER</p>
                     </div>
                  </div>
              </div>

              {/* Advanced Controls Bar */}
              <div className="mt-8 w-full max-w-[650px] flex items-center justify-between p-6 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl shadow-lg">
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <Type size={16} className="text-surface-400" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-surface-500">Variables</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Sparkles size={16} className="text-primary-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-surface-500">AI Rewriter</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" icon={Trash2}>Delete</Button>
                    <Button variant="primary" size="sm" icon={Save}>Update Draft</Button>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default EmailTemplatePage;
