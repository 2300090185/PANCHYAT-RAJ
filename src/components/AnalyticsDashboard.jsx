import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { Trees, Trash2, Droplets, Users, ShieldAlert, Award, Globe, Building2, Map } from 'lucide-react';

export default function AnalyticsDashboard({ nominations }) {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  // Static seeds + dynamic nominations aggregated data
  const metrics = useMemo(() => {
    let trees = 124500;
    let plastic = 42300;
    let water = 84;
    let beneficiaries = 245000;
    let gps = 1420;

    nominations.forEach(n => {
      trees += n.metricTrees || 0;
      plastic += n.metricPlastic || 0;
      water += n.metricWaterBodies || 0;
      beneficiaries += n.metricBeneficiaries || 0;
      gps += n.metricVillages || 0;
    });

    return { trees, plastic, water, beneficiaries, gps };
  }, [nominations]);

  // SDG Focus Areas (From requirements)
  const sdgData = [
    { name: 'SDG 11 (Communities)', value: 100 },
    { name: 'SDG 13 (Climate Action)', value: 95 },
    { name: 'SDG 15 (Life on Land)', value: 90 },
    { name: 'SDG 12 (Responsible Cons.)', value: 85 },
    { name: 'SDG 4 (Quality Education)', value: 80 },
    { name: 'SDG 3 (Good Health)', value: 70 },
    { name: 'SDG 6 (Clean Water)', value: 65 },
    { name: 'SDG 8 (Decent Work)', value: 60 },
    { name: 'SDG 5 (Gender Equality)', value: 55 },
    { name: 'SDG 17 (Partnerships)', value: 50 },
  ];

  // Nominator Distribution Data
  const nominatorDistribution = useMemo(() => {
    const counts = { Student: 42, Volunteer: 88, Individual: 65, NGO: 34, SHG: 27, Startup: 12, Institution: 15, Government: 8 };
    nominations.forEach(n => {
      if (counts[n.orgType] !== undefined) {
        counts[n.orgType]++;
      } else {
        counts[n.orgType] = 1;
      }
    });

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
  }, [nominations]);

  // 6 Months Growth Timeline
  const growthTimeline = [
    { month: 'Jan', nominations: 110, volunteers: 480 },
    { month: 'Feb', nominations: 145, volunteers: 590 },
    { month: 'Mar', nominations: 190, volunteers: 750 },
    { month: 'Apr', nominations: 260, volunteers: 980 },
    { month: 'May', nominations: 340, volunteers: 1250 },
    { month: 'Jun', nominations: 450, volunteers: 1680 }
  ];

  // Mock GIS state-wise data details
  const regionalData = {
    'North Region': { gps: 420, beneficiaries: 85000, trees: 34000, plastic: 12500, leadProject: 'Solar Micro-Grids (Himachal)' },
    'South Region': { gps: 380, beneficiaries: 92000, trees: 45000, plastic: 16200, leadProject: 'Tanks Rejuvenation (Andhra)' },
    'East Region': { gps: 290, beneficiaries: 41000, trees: 28000, plastic: 6400, leadProject: 'Bamboo Handicrafts (Odisha)' },
    'West Region': { gps: 330, beneficiaries: 57000, trees: 17500, plastic: 7200, leadProject: 'Water Conservation (Rajasthan)' },
    'All Regions': { gps: 1420, beneficiaries: 275000, trees: 124500, plastic: 42300, leadProject: 'National Watershed Campaign' }
  };

  const activeRegionStats = regionalData[selectedRegion];

  // Custom Colors
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#ef4444', '#14b8a6', '#6366f1'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* myGov Analytics Header */}
      <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
        {/* Tricolor top bar */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>
        <div className="bg-[#0a1628] px-6 py-4 flex items-center gap-4">
          <svg className="w-10 h-7 rounded shadow-md shrink-0" viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
            <rect width="9" height="2" fill="#FF9933" />
            <rect y="2" width="9" height="2" fill="#FFFFFF" />
            <rect y="4" width="9" height="2" fill="#138808" />
            <circle cx="4.5" cy="3" r="0.7" fill="#000080" />
            <circle cx="4.5" cy="3" r="0.4" fill="#FFFFFF" />
            <circle cx="4.5" cy="3" r="0.25" fill="#000080" />
          </svg>
          <div>
            <h2 className="text-xl font-extrabold text-white font-display">
              my<span className="text-[#FF9933]">Gov</span> — Analytics & GIS Mapping Dashboard
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Real-time indicators aggregating registrations, SDG progress, and village level environmental/social metrics.</p>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Total Beneficiaries', value: metrics.beneficiaries.toLocaleString(), icon: Users, color: 'text-indigo-400 border-indigo-950 bg-indigo-950/20' },
          { label: 'Trees Planted', value: metrics.trees.toLocaleString(), icon: Trees, color: 'text-emerald-400 border-emerald-950 bg-emerald-950/20' },
          { label: 'Plastic Waste Collected', value: `${metrics.plastic.toLocaleString()} kg`, icon: Trash2, color: 'text-rose-400 border-rose-950 bg-rose-950/20' },
          { label: 'Water Bodies Restored', value: metrics.water, icon: Droplets, color: 'text-blue-400 border-blue-950 bg-blue-950/20' },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`p-5 rounded-2xl border ${card.color} transition-transform hover:scale-[1.01]`}>
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.label}</p>
                <Icon className="h-5 w-5 opacity-80" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white mt-3">{card.value}</p>
              <div className="flex items-center gap-1 mt-2 text-[10px] text-emerald-400 font-semibold">
                <span>+12.4% vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Horizontal Bar Chart for SDGs focus */}
        <div className="glass-panel p-5 rounded-2xl border-gray-800/80 lg:col-span-2">
          <h3 className="font-bold text-sm text-gray-200 mb-4 font-display flex items-center gap-1.5">
            <Globe className="h-4.5 w-4.5 text-emerald-400" />
            <span>SDG Contribution Focus Distribution (Weightage / Projects Count)</span>
          </h3>
          <div className="text-xs">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                layout="vertical"
                data={sdgData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis type="number" stroke="#64748b" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={130} fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '10px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Nominator Distribution Pie Chart */}
        <div className="glass-panel p-5 rounded-2xl border-gray-800/80">
          <h3 className="font-bold text-sm text-gray-200 mb-4 font-display flex items-center gap-1.5">
            <Building2 className="h-4.5 w-4.5 text-indigo-400" />
            <span>Nominee Stakeholder Distribution</span>
          </h3>
          <div className="flex justify-center items-center text-xs">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={nominatorDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {nominatorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2 text-[10px] text-gray-400">
            {nominatorDistribution.slice(0, 6).map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                <span className="truncate">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* GIS Map & Regional Analytics Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-gray-800/80">
        <h3 className="font-bold text-base text-white mb-1 flex items-center gap-2 font-display">
          <Map className="h-5 w-5 text-teal-400" />
          <span>GIS Gram Panchayat Sustainability & Impact Map</span>
        </h3>
        <p className="text-xs text-gray-400 mb-6">Select a region on the vector map to filter village metrics and see verified ground results.</p>
        
        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* SVG Map (Representing GIS quadrants) */}
          <div className="md:col-span-3 flex justify-center bg-gray-950/40 p-6 rounded-2xl border border-gray-900/60 relative">
            <svg viewBox="0 0 400 300" className="w-full max-w-[400px] h-auto cursor-pointer">
              {/* North Region */}
              <path 
                d="M 100,50 L 300,50 L 250,130 L 150,130 Z" 
                fill={selectedRegion === 'North Region' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(30, 41, 59, 0.6)'} 
                stroke={selectedRegion === 'North Region' ? '#10b981' : '#334155'} 
                strokeWidth={2}
                onClick={() => setSelectedRegion('North Region')}
                className="transition-colors hover:fill-emerald-500/20"
              />
              <text x="200" y="85" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none">North Region</text>

              {/* West Region */}
              <path 
                d="M 50,100 L 150,130 L 120,220 L 50,180 Z" 
                fill={selectedRegion === 'West Region' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(30, 41, 59, 0.6)'} 
                stroke={selectedRegion === 'West Region' ? '#10b981' : '#334155'} 
                strokeWidth={2}
                onClick={() => setSelectedRegion('West Region')}
                className="transition-colors hover:fill-emerald-500/20"
              />
              <text x="95" y="155" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none">West</text>

              {/* East Region */}
              <path 
                d="M 250,130 L 350,100 L 350,180 L 280,220 Z" 
                fill={selectedRegion === 'East Region' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(30, 41, 59, 0.6)'} 
                stroke={selectedRegion === 'East Region' ? '#10b981' : '#334155'} 
                strokeWidth={2}
                onClick={() => setSelectedRegion('East Region')}
                className="transition-colors hover:fill-emerald-500/20"
              />
              <text x="305" y="155" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none">East</text>

              {/* South Region */}
              <path 
                d="M 150,130 L 250,130 L 280,220 L 200,280 L 120,220 Z" 
                fill={selectedRegion === 'South Region' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(30, 41, 59, 0.6)'} 
                stroke={selectedRegion === 'South Region' ? '#10b981' : '#334155'} 
                strokeWidth={2}
                onClick={() => setSelectedRegion('South Region')}
                className="transition-colors hover:fill-emerald-500/20"
              />
              <text x="200" y="190" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none">South Region</text>
            </svg>

            {selectedRegion !== 'All Regions' && (
              <button 
                onClick={() => setSelectedRegion('All Regions')} 
                className="absolute top-4 right-4 text-[10px] bg-slate-900 border border-gray-800 rounded-lg px-2 py-1 text-gray-400 hover:text-white"
              >
                Reset Map Filter
              </button>
            )}
          </div>

          {/* Regional Information Panel */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-4.5 rounded-2xl bg-slate-900/60 border border-gray-800">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Filters</h4>
              <p className="text-lg font-extrabold text-white mt-1">{selectedRegion}</p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3 bg-gray-950 rounded-xl border border-gray-900">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">GPs Covered</span>
                <span className="text-base font-extrabold text-white mt-1 block">{activeRegionStats.gps}</span>
              </div>
              <div className="p-3 bg-gray-950 rounded-xl border border-gray-900">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Beneficiaries</span>
                <span className="text-base font-extrabold text-white mt-1 block">{activeRegionStats.beneficiaries.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-gray-950 rounded-xl border border-gray-900">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Trees Planted</span>
                <span className="text-base font-extrabold text-white mt-1 block">{activeRegionStats.trees.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-gray-950 rounded-xl border border-gray-900">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Plastic waste removed</span>
                <span className="text-base font-extrabold text-white mt-1 block">{activeRegionStats.plastic.toLocaleString()} kg</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-900/40">
              <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider block">Highlight Region Initiative</span>
              <span className="text-xs font-bold text-gray-200 mt-1 block">{activeRegionStats.leadProject}</span>
              <span className="text-[10px] text-gray-500 mt-1 block">Averaging 92.5 score on sustainability indices.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline growth chart */}
      <div className="glass-panel p-5 rounded-2xl border-gray-800/80">
        <h3 className="font-bold text-sm text-gray-200 mb-4 font-display">Registration & Volunteer Growth Timeline (6 months)</h3>
        <div className="text-xs">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={growthTimeline} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '10px' }} />
              <Legend />
              <Line type="monotone" dataKey="nominations" stroke="#3b82f6" activeDot={{ r: 8 }} strokeWidth={2} name="Nominations" />
              <Line type="monotone" dataKey="volunteers" stroke="#10b981" strokeWidth={2} name="Volunteers" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
