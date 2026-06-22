import React, { useState } from 'react';
import { Award, Bell, Shield, User, Users, FileText, BarChart3, Star, Menu, X, Sparkles, Globe } from 'lucide-react';

export default function Navbar({ activeRole, setActiveRole, activeTab, setActiveTab, notifications, markNotificationsAsRead, authenticatedRoles, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const roles = [
    { id: 'public', label: 'Public Portal', icon: Users, color: 'text-emerald-400 bg-emerald-950/40 border-emerald-900/50' },
    { id: 'nominee', label: 'Nominee Portal', icon: FileText, color: 'text-indigo-400 bg-indigo-950/40 border-indigo-900/50' },
    { id: 'jury', label: 'Jury Portal', icon: Star, color: 'text-amber-400 bg-amber-950/40 border-amber-900/50' },
    { id: 'admin', label: 'Admin Portal', icon: Shield, color: 'text-rose-400 bg-rose-950/40 border-rose-900/50' }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Official Government of India Topbar */}
      <div className="w-full bg-[#0a0a0a] border-b border-gray-900 text-[10px] text-gray-400 py-1 font-semibold select-none z-[60]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-3 shadow-sm rounded-sm shrink-0" viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
                <rect width="9" height="2" fill="#FF9933" />
                <rect y="2" width="9" height="2" fill="#FFFFFF" />
                <rect y="4" width="9" height="2" fill="#138808" />
                <circle cx="4.5" cy="3" r="0.7" fill="#000080" />
                <circle cx="4.5" cy="3" r="0.4" fill="#FFFFFF" />
                <circle cx="4.5" cy="3" r="0.25" fill="#000080" />
              </svg>
              GOVERNMENT OF INDIA | भारत सरकार
            </span>
            <span className="text-gray-800">|</span>
            <span className="hidden md:inline text-gray-500 uppercase">Ministry of Panchayati Raj / पंचायती राज मंत्रालय</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-gray-500">
            <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff9933] transition-colors">National Portal</a>
          </div>
        </div>
      </div>
      
      {/* Tricolor Accent Line */}
      <div className="w-full h-0.5 grid grid-cols-3 z-[60] relative">
        <div className="bg-[#FF9933]"></div>
        <div className="bg-white"></div>
        <div className="bg-[#138808]"></div>
      </div>

      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('home'); setActiveRole('public'); }}>
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600/20 to-emerald-600/20 border border-gray-800 text-white shadow-lg">
                <div className="text-center font-black tracking-tighter leading-none flex flex-col items-center select-none">
                  <span className="text-[11px] text-[#138808] font-black uppercase leading-none">PR</span>
                </div>
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-orange-500 border border-white"></div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-white font-display flex items-center">
                    <span className="text-gray-300 font-medium">Panchayat</span>
                  </span>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold text-[#ff9933] border border-[#ff9933]/20 uppercase tracking-wider">Awards</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium hidden sm:block">Social Impact & Sustainable Development Portal</p>
              </div>
            </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Tabs for the active role */}
            <div className="flex items-center gap-2 bg-gray-900/50 p-1.5 rounded-xl border border-gray-800/80">
              {activeRole === 'public' && (
                <>
                  <button 
                    onClick={() => setActiveTab('home')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'home' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => setActiveTab('about')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'about' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                  >
                    About Initiative
                  </button>
                  <button 
                    onClick={() => setActiveTab('awards')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'awards' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                  >
                    Award Categories
                  </button>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                  >
                    Analytics & GIS
                  </button>
                </>
              )}
              {activeRole === 'nominee' && (
                <>
                  <button 
                    onClick={() => setActiveTab('nominate')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'nominate' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                  >
                    Nomination Form
                  </button>
                  <button 
                    onClick={() => setActiveTab('my-status')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'my-status' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                  >
                    My Application Status
                  </button>
                </>
              )}
              {activeRole === 'jury' && (
                <>
                  <button 
                    onClick={() => setActiveTab('jury-reviews')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'jury-reviews' ? 'bg-amber-600 text-slate-950 shadow-md' : 'text-gray-400 hover:text-white'}`}
                  >
                    Review Board
                  </button>
                </>
              )}
              {activeRole === 'admin' && (
                <>
                  <button 
                    onClick={() => setActiveTab('admin-dashboard')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'admin-dashboard' ? 'bg-rose-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                  >
                    Admin Dashboard
                  </button>
                </>
              )}
            </div>

            {/* Language Selector */}
            <div className="flex items-center border-l border-gray-800 pl-6 mr-2 relative z-[70]">
              <div className="relative group cursor-pointer">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 border border-gray-800 hover:text-white hover:bg-gray-800 transition-all">
                  <Globe className="h-3.5 w-3.5 text-emerald-400" />
                  <span>ENG</span>
                </button>
                {/* Simulated Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-36 bg-gray-950 border border-gray-800 rounded-xl shadow-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                  {['English', 'हिंदी (Hindi)', 'తెలుగు (Telugu)', 'தமிழ் (Tamil)', 'मराठी (Marathi)'].map((lang, idx) => (
                    <div key={idx} className={`px-4 py-2.5 text-xs cursor-pointer transition-colors ${idx === 0 ? 'text-emerald-400 font-bold bg-emerald-950/20' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}>
                      {lang}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Role Picker (Dropdown layout inside Navbar for easy testing) */}
            <div className="flex items-center gap-2 border-l border-gray-800 pl-6">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mr-1">Switch View:</span>
              <div className="flex gap-1 bg-gray-900/80 p-1 rounded-xl border border-gray-800">
                {roles.map(r => {
                  const Icon = r.icon;
                  const isSelected = activeRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setActiveRole(r.id);
                        if (r.id === 'public') setActiveTab('home');
                        if (r.id === 'nominee') setActiveTab('nominate');
                        if (r.id === 'jury') setActiveTab('jury-reviews');
                        if (r.id === 'admin') setActiveTab('admin-dashboard');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isSelected 
                          ? `${r.color} shadow-sm font-bold scale-[1.03]`
                          : 'text-gray-400 bg-transparent border-transparent hover:text-white hover:bg-gray-800/50'
                      }`}
                      title={r.label}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="hidden xl:inline">{r.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {authenticatedRoles && authenticatedRoles[activeRole] && (
              <button 
                onClick={() => onLogout(activeRole)}
                className="rounded-xl border border-rose-900/50 bg-rose-950/40 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-900 transition-all mr-2"
              >
                Sign Out
              </button>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications && unreadCount > 0) {
                    markNotificationsAsRead();
                  }
                }}
                className="relative rounded-xl border border-gray-800 bg-gray-900/40 p-2.5 text-gray-400 hover:text-white transition-all hover:bg-gray-900"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-slate-950 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-gray-800 bg-gray-950 p-4 shadow-xl shadow-black/80 ring-1 ring-black ring-opacity-5 transition-all">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
                    <span className="font-bold text-sm text-white">Notifications</span>
                    <button 
                      onClick={() => markNotificationsAsRead()} 
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-gray-500 text-center py-4">No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-2.5 rounded-lg border text-xs transition-all ${n.read ? 'bg-gray-900/30 border-gray-900 text-gray-400' : 'bg-gray-900 border-gray-800 text-gray-200'}`}>
                          <div className="flex justify-between items-start mb-0.5">
                            <span className="font-semibold">{n.title}</span>
                            <span className="text-[10px] text-gray-500">{n.time}</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-gray-400">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Notification Bell Mobile */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (unreadCount > 0) markNotificationsAsRead();
                }}
                className="relative rounded-xl border border-gray-800 bg-gray-900/40 p-2 text-gray-400 hover:text-white"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-1 ring-slate-950">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 rounded-xl border border-gray-800 bg-gray-950 p-3 shadow-xl shadow-black/80 z-50">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
                    <span className="font-bold text-xs text-white">Notifications</span>
                    <button onClick={markNotificationsAsRead} className="text-[10px] text-emerald-400 hover:underline">Clear</button>
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-2 text-xs">
                    {notifications.length === 0 ? (
                      <p className="text-[11px] text-gray-500 text-center py-2">No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-2 bg-gray-900 rounded border border-gray-800">
                          <p className="font-semibold text-gray-200">{n.title}</p>
                          <p className="text-[10px] text-gray-400">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="rounded-xl border border-gray-800 bg-gray-900/40 p-2 text-gray-400 hover:text-white"
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {showMobileMenu && (
        <div className="lg:hidden border-t border-gray-800 bg-gray-950 px-4 py-4 space-y-4 shadow-2xl z-40 relative">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Navigation</span>
            <div className="grid grid-cols-2 gap-2">
              {activeRole === 'public' && (
                <>
                  <button onClick={() => { setActiveTab('home'); setShowMobileMenu(false); }} className={`p-2 rounded-lg text-center text-xs font-semibold ${activeTab === 'home' ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-gray-400'}`}>Home</button>
                  <button onClick={() => { setActiveTab('about'); setShowMobileMenu(false); }} className={`p-2 rounded-lg text-center text-xs font-semibold ${activeTab === 'about' ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-gray-400'}`}>About</button>
                  <button onClick={() => { setActiveTab('awards'); setShowMobileMenu(false); }} className={`p-2 rounded-lg text-center text-xs font-semibold ${activeTab === 'awards' ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-gray-400'}`}>Awards</button>
                  <button onClick={() => { setActiveTab('dashboard'); setShowMobileMenu(false); }} className={`p-2 rounded-lg text-center text-xs font-semibold ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-gray-400'}`}>Analytics</button>
                </>
              )}
              {activeRole === 'nominee' && (
                <>
                  <button onClick={() => { setActiveTab('nominate'); setShowMobileMenu(false); }} className={`p-2 rounded-lg text-center text-xs font-semibold ${activeTab === 'nominate' ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-gray-400'}`}>Nominate</button>
                  <button onClick={() => { setActiveTab('my-status'); setShowMobileMenu(false); }} className={`p-2 rounded-lg text-center text-xs font-semibold ${activeTab === 'my-status' ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-gray-400'}`}>My Status</button>
                </>
              )}
              {activeRole === 'jury' && (
                <button onClick={() => { setActiveTab('jury-reviews'); setShowMobileMenu(false); }} className={`p-2 rounded-lg text-center text-xs font-semibold col-span-2 ${activeTab === 'jury-reviews' ? 'bg-amber-600 text-slate-950' : 'bg-gray-900 text-gray-400'}`}>Review Board</button>
              )}
              {activeRole === 'admin' && (
                <button onClick={() => { setActiveTab('admin-dashboard'); setShowMobileMenu(false); }} className={`p-2 rounded-lg text-center text-xs font-semibold col-span-2 ${activeTab === 'admin-dashboard' ? 'bg-rose-600 text-white' : 'bg-gray-900 text-gray-400'}`}>Admin Dashboard</button>
              )}
            </div>
          </div>

          <div className="border-t border-gray-800 pt-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2 font-display">Switch User Perspective</span>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(r => {
                const Icon = r.icon;
                const isSelected = activeRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setActiveRole(r.id);
                      setShowMobileMenu(false);
                      if (r.id === 'public') setActiveTab('home');
                      if (r.id === 'nominee') setActiveTab('nominate');
                      if (r.id === 'jury') setActiveTab('jury-reviews');
                      if (r.id === 'admin') setActiveTab('admin-dashboard');
                    }}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs font-semibold border ${
                      isSelected 
                        ? `${r.color} font-bold scale-[1.02]`
                        : 'text-gray-400 bg-gray-900/50 border-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  </>
  );
}
