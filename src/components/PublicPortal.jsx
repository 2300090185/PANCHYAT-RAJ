import React, { useState } from 'react';
import { 
  Home, Cpu, Trash2, Trees, Droplets, BookOpen, Heart, Sparkles, Sprout, Wifi, Award, Smile, Users, Briefcase, Sun, Compass,
  Play, ExternalLink, Calendar, MapPin, Globe, ShieldCheck, ArrowRight, UserPlus, FileText, CheckCircle2, ChevronRight, X,
  MessageSquare, ThumbsUp, BarChart2, Trophy 
} from 'lucide-react';

export default function PublicPortal({ nominations = [], setSelectedCategory, setActiveTab, setActiveRole, triggerToast, resultsReleased }) {
  const [activeRegModal, setActiveRegModal] = useState(null); // 'volunteer', 'ngo', 'csr'
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', org: '', interest: '' });

  const awards = [
    { title: 'Village Development Award', desc: 'Holistic transformation of rural infrastructure, sanitation, and community amenities.', icon: Home, gradient: 'from-emerald-500 to-teal-400' },
    { title: 'Smart Village Award', desc: 'Integration of digital technologies, solar micro-grids, and decentralized e-governance.', icon: Cpu, gradient: 'from-cyan-500 to-blue-500' },
    { title: 'Plastic-Free Village Award', desc: 'Elimination of single-use plastics through segregation hubs and high recycling rates.', icon: Trash2, gradient: 'from-rose-500 to-orange-500' },
    { title: 'Green Village Award', desc: 'Advancing carbon neutrality, community bio-gas, and zero-emission fuels.', icon: Trees, gradient: 'from-green-500 to-emerald-400' },
    { title: 'Water Conservation Award', desc: 'Rejuvenation of ancient check-dams, watershed systems, and rainwater harvesting.', icon: Droplets, gradient: 'from-blue-500 to-indigo-400' },
    { title: 'Education Excellence Award', desc: 'Bridging the rural digital divide, training teachers, and upgrading school libraries.', icon: BookOpen, gradient: 'from-indigo-500 to-purple-500' },
    { title: 'Health & Hygiene Award', desc: 'Strengthening primary medical health centers, sanitation camps, and first-aid kits.', icon: Heart, gradient: 'from-red-500 to-pink-500' },
    { title: 'Women Empowerment Award', desc: 'Nurturing Self Help Groups (SHGs), digital banking literacy, and safety audits.', icon: Sparkles, gradient: 'from-purple-500 to-pink-500' },
    { title: 'Agriculture Innovation Award', desc: 'Promoting organic farming, precision drip-irrigation, and crop marketing setups.', icon: Sprout, gradient: 'from-amber-500 to-yellow-500' },
    { title: 'Digital Village Award', desc: 'Expanding Common Service Centres (CSCs), broadband access, and online civic forms.', icon: Wifi, gradient: 'from-sky-500 to-indigo-500' },
    { title: 'Youth Leadership Award', desc: 'Recognizing young leaders who drive village planning and direct local representation.', icon: Award, gradient: 'from-yellow-500 to-amber-500' },
    { title: 'Best Volunteer Award', desc: 'Honoring exceptional direct action and community relief service in remote mandals.', icon: Smile, gradient: 'from-teal-500 to-emerald-400' },
    { title: 'Best NGO Award', desc: 'Recognizing non-profits implementing high-impact village adoption frameworks.', icon: Users, gradient: 'from-cyan-500 to-blue-500' },
    { title: 'Social Entrepreneurship Award', desc: 'Fostering self-sustaining micro-enterprises solving localized utility problems.', icon: Briefcase, gradient: 'from-violet-500 to-fuchsia-500' },
    { title: 'Climate Action Award', desc: 'Combating soil erosion through massive afforestation and renewable energy models.', icon: Sun, gradient: 'from-orange-500 to-red-500' },
    { title: 'Biodiversity Conservation Award', desc: 'Preservation of local wild fauna corridors and indigenous seed crop banks.', icon: Compass, gradient: 'from-green-500 to-teal-400' }
  ];

  const sdgs = [
    { num: 1, name: 'No Poverty', desc: 'Livelihood & income generation' },
    { num: 2, name: 'Zero Hunger', desc: 'Nutrition & sustainable farming' },
    { num: 3, name: 'Good Health', desc: 'Health camps & sanitation' },
    { num: 4, name: 'Quality Education', desc: 'Digital literacy & school support' },
    { num: 5, name: 'Gender Equality', desc: 'Women leadership & empowerment' },
    { num: 6, name: 'Clean Water', desc: 'Water conservation & check-dams' },
    { num: 7, name: 'Clean Energy', desc: 'Solar village initiatives' },
    { num: 8, name: 'Decent Work', desc: 'Entrepreneurship & rural employment' },
    { num: 9, name: 'Innovation', desc: 'Smart village solutions & digital hubs' },
    { num: 10, name: 'Reduced Inequalities', desc: 'Inclusive community development' },
    { num: 11, name: 'Sustainable Communities', desc: 'Village adoption & disaster resilience' },
    { num: 12, name: 'Responsible Consumption', desc: 'Plastic-free campaigns & waste management' },
    { num: 13, name: 'Climate Action', desc: 'Tree plantation & awareness drives' },
    { num: 14, name: 'Life Below Water', desc: 'Lake & river restoration programs' },
    { num: 15, name: 'Life on Land', desc: 'Afforestation, soil health & biodiversity' },
    { num: 16, name: 'Peace & Strong Institutions', desc: 'Youth governance & panchayat panels' },
    { num: 17, name: 'Partnerships', desc: 'Government, NGO & CSR collaborative platforms' }
  ];

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    triggerToast(`${activeRegModal.toUpperCase()} Registration Submitted successfully! Our local coordinators will reach out shortly.`);
    setActiveRegModal(null);
    setFormData({ name: '', email: '', phone: '', org: '', interest: '' });
  };

  // Filter dynamic award winners from full-stack database
  const winners = nominations.filter(n => n.status === 'Award Winner');

  return (
    <div className="relative pb-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] hero-gradient pointer-events-none"></div>

      {/* 1. Split Hero Section */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Heading and Details */}
          <div className="text-left space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/5 px-4 py-1.5 text-xs sm:text-sm font-semibold text-amber-400 shadow-sm select-none">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-3 shadow rounded-sm" viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
                  <rect width="9" height="2" fill="#FF9933" />
                  <rect y="2" width="9" height="2" fill="#FFFFFF" />
                  <rect y="4" width="9" height="2" fill="#138808" />
                  <circle cx="4.5" cy="3" r="0.7" fill="#000080" />
                  <circle cx="4.5" cy="3" r="0.4" fill="#FFFFFF" />
                  <circle cx="4.5" cy="3" r="0.25" fill="#000080" />
                </svg>
              </span>
              <span>Official Panchayati Raj Initiative</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl font-display leading-[1.1]">
              Recognize. Inspire.<br />
              <span className="bg-gradient-to-r from-orange-400 via-white to-green-500 bg-clip-text text-transparent font-black">
                Transform. Sustain.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-xl">
              "Empowering Communities. Transforming Rural India." Join the official platform in partnership with the Ministry of Panchayati Raj to recognize local changemakers driving sustainable development and village governance under Viksit Bharat 2047.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setActiveRole('nominee');
                  setActiveTab('nominate');
                }}
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-sm font-bold text-white transition-all hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg hover:shadow-emerald-600/30 hover:scale-[1.02]"
              >
                <FileText className="h-5 w-5" />
                <span>Apply for Nomination</span>
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => setActiveRegModal('volunteer')}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-900/60 px-6 py-4 text-sm font-bold text-gray-200 transition-all hover:bg-gray-800 hover:border-gray-600"
              >
                <UserPlus className="h-5 w-5" />
                <span>Register as Volunteer</span>
              </button>
            </div>
          </div>

          {/* Right Column: Glowing Interactive Mockups */}
          <div className="hidden lg:flex relative items-center justify-center h-[460px]">
            {/* Glowing background bubble */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-indigo-500/10 rounded-3xl blur-3xl"></div>
            
            {/* Floating Card 1: Live Activity Indicator */}
            <div className="absolute top-4 left-4 w-60 glass-panel p-4.5 rounded-2xl shadow-2xl border-gray-850/80 animate-float" style={{ animationDelay: '0s' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Globe className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Live Activity</span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <p className="text-2xl font-black text-white">3,820</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Villages Adopted Nationally</p>
              <div className="h-1 w-full bg-gray-900 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            {/* Floating Card 2: Verified Nominee Profile */}
            <div className="absolute bottom-6 right-4 w-64 glass-panel p-4 rounded-2xl shadow-2xl border-gray-850/80 animate-float" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                  AS
                </div>
                <div>
                  <h4 className="font-bold text-[11px] text-white leading-tight">Anjali Sharma</h4>
                  <p className="text-[8px] text-gray-500">GP Ramapuram, Andhra Pradesh</p>
                </div>
              </div>
              <div className="mt-3 border-t border-gray-900 pt-2.5 flex items-center justify-between">
                <span className="text-[8px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded">Plastic-Free GP</span>
                <span className="text-[10px] font-black text-white">Score: 88/100</span>
              </div>
            </div>

            {/* Floating Card 3: SDG Target Metrics */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 glass-panel p-4.5 rounded-2xl shadow-2xl border-gray-850/80 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[11px] text-white">SDG Target Progress</h4>
                <span className="text-[8px] text-gray-500 uppercase font-black">Verified</span>
              </div>
              <p className="text-[9px] text-gray-400 mb-3">Expected vs Actual environmental indicators</p>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                    <span>SDG 13: Trees Planted (120k)</span>
                    <span className="font-bold text-emerald-400">92%</span>
                  </div>
                  <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                    <span>SDG 6: Lakes Restored (84)</span>
                    <span className="font-bold text-teal-400">84%</span>
                  </div>
                  <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Quick Statistics Highlights */}
      <div className="mx-auto max-w-7xl px-4 mt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: '12,450+', label: 'Registered Youth' },
            { value: '450+', label: 'Active NGOs' },
            { value: '180+', label: 'CSR Partners' },
            { value: '3,800+', label: 'Villages Covered' }
          ].map((s, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl text-center border-gray-800/80">
              <p className="text-3xl sm:text-4xl font-black text-white bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 1.5 Final Results Declaration (Conditional) */}
      {resultsReleased && (
        <div className="mx-auto max-w-7xl px-4 mt-20 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border-emerald-900/60 bg-gradient-to-br from-emerald-950/40 to-slate-900/80 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Award className="w-64 h-64 text-emerald-500" />
            </div>
            
            <div className="relative z-10 text-center mb-10">
              <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">Official Announcement</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-display">Panchayat Award Winners</h2>
              <p className="mt-3 text-gray-300 max-w-2xl mx-auto">The final evaluation process has concluded. Congratulations to the outstanding individuals and projects leading grassroots transformation across the nation.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {nominations.filter(n => n.status === 'Award Winner').length === 0 ? (
                <div className="col-span-full text-center p-8 bg-gray-900/50 rounded-2xl border border-gray-800 text-gray-500">
                  Winners are currently being compiled. Check back shortly.
                </div>
              ) : (
                nominations.filter(n => n.status === 'Award Winner').map(n => (
                  <div key={n.id} className="p-6 bg-slate-900 border border-emerald-900/40 rounded-2xl shadow-xl shadow-emerald-900/10 flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                      <Award className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-black text-white font-display leading-tight">{n.fullName}</h3>
                    <p className="text-[11px] text-emerald-400 font-bold mt-1.5 uppercase tracking-wider">{n.category}</p>
                    <div className="w-8 h-0.5 bg-gray-800 my-4"></div>
                    <p className="text-[11px] text-gray-400 mb-1 leading-relaxed">"{n.projectName}"</p>
                    <p className="text-[10px] font-semibold text-gray-500">{n.village} GP, {n.state}</p>
                    {n.juryScores && (
                      <div className="mt-4 px-3 py-1.5 bg-emerald-950/30 rounded border border-emerald-900/50 text-[10px] text-emerald-300 font-bold flex gap-2 items-center">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Jury Score: {Object.values(n.juryScores).reduce((a, b) => a + b, 0)} / 100
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Vision & Mission Section */}
      <div className="mx-auto max-w-7xl px-4 mt-28 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden border-gray-800/80">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl font-display">Our Vision & Mission</h2>
              <p className="mt-4 text-gray-300 leading-relaxed text-sm sm:text-base">
                To build India's largest digital platform that recognizes, documents, supports, and inspires youth, NGOs, institutions, and community leaders contributing to rural and urban transformation while advancing the United Nations Sustainable Development Goals (SDGs) and Viksit Bharat 2047.
              </p>
              <ul className="mt-6 space-y-3.5">
                {[
                  'Strengthen Panchayati Raj Institutions (PRIs)',
                  'Create measurable and verifiable social impact metrics',
                  'Foster collaboration between Volunteers, CSRs, and Govt Departments',
                  'Encourage sustainable village adoption initiatives'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900 border border-gray-800">
                <Globe className="h-8 w-8 text-emerald-400 mb-3" />
                <h3 className="font-bold text-white text-base">SDG Alignment</h3>
                <p className="text-xs text-gray-400 mt-1.5">Direct integration with UN Goals for tracking community progress.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 border border-gray-800">
                <ShieldCheck className="h-8 w-8 text-emerald-400 mb-3" />
                <h3 className="font-bold text-white text-base">Verified Impact</h3>
                <p className="text-xs text-gray-400 mt-1.5">Jury scored, ground-verified, and QR code certificate backed.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 border border-gray-800">
                <Heart className="h-8 w-8 text-emerald-400 mb-3" />
                <h3 className="font-bold text-white text-base">Village Adoption</h3>
                <p className="text-xs text-gray-400 mt-1.5">Promoting self-reliance (Atmanirbhar) across Gram Panchayats.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 border border-[#138808]/40 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-7 h-5 rounded shadow-sm" viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
                    <rect width="9" height="2" fill="#FF9933" />
                    <rect y="2" width="9" height="2" fill="#FFFFFF" />
                    <rect y="4" width="9" height="2" fill="#138808" />
                    <circle cx="4.5" cy="3" r="0.7" fill="#000080" />
                    <circle cx="4.5" cy="3" r="0.4" fill="#FFFFFF" />
                    <circle cx="4.5" cy="3" r="0.25" fill="#000080" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-base">Viksit Bharat</h3>
                <p className="text-xs text-gray-400 mt-1.5">Driving youth participation in grassroots governance & development for 2047.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Award Categories Grid */}
      <div className="mx-auto max-w-7xl px-4 mt-28 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl font-display">16 Award Categories</h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Recognizing social action across green growth, water conservation, education, digital inclusion, and youth empowerment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {awards.map((award, idx) => {
            const IconComponent = award.icon;
            return (
              <div key={idx} className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between group">
                <div>
                  <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-tr ${award.gradient} text-slate-950 font-black text-sm mb-4 shadow-md shadow-emerald-500/10`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-emerald-400 transition-colors font-display">
                    {award.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">
                    {award.desc}
                  </p>
                </div>
                <div 
                  className="mt-6 flex items-center text-xs font-semibold text-emerald-500 group-hover:text-emerald-400 group-hover:underline cursor-pointer" 
                  onClick={() => { 
                    setSelectedCategory(award.title);
                    setActiveRole('nominee'); 
                    setActiveTab('nominate'); 
                  }}
                >
                  <span>Apply under category</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Panchayat Ranking Engine: National Leaderboard */}
      <div className="mx-auto max-w-7xl px-4 mt-28 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl font-display flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-amber-500" />
            National Sustainability Leaderboard
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Live dynamic rankings of the top performing Gram Panchayats based on aggregated AI scores and verified ground impact.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-amber-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-900/50">
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Gram Panchayat</th>
                  <th className="px-6 py-4">State</th>
                  <th className="px-6 py-4">SDG Index Score</th>
                  <th className="px-6 py-4 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900/50 text-sm">
                {[
                  { rank: 1, name: 'Punsari', state: 'Gujarat', score: 98.4, trend: '+2' },
                  { rank: 2, name: 'Hiware Bazar', state: 'Maharashtra', score: 97.1, trend: '-' },
                  { rank: 3, name: 'Odanthurai', state: 'Tamil Nadu', score: 96.5, trend: '+1' },
                  { rank: 4, name: 'Piplantri', state: 'Rajasthan', score: 95.8, trend: '-2' },
                  { rank: 5, name: 'Mawlynnong', state: 'Meghalaya', score: 94.2, trend: '+3' },
                ].map((gp, idx) => (
                  <tr key={idx} className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 font-black">
                      <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${idx === 0 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : idx === 1 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/30' : idx === 2 ? 'bg-orange-700/20 text-orange-400 border border-orange-700/30' : 'bg-gray-900 text-gray-500'}`}>
                        #{gp.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{gp.name}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{gp.state}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 bg-gray-900 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${gp.score}%` }}></div>
                        </div>
                        <span className="font-mono text-emerald-400 font-bold">{gp.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold">
                      <span className={gp.trend.startsWith('+') ? 'text-emerald-500' : gp.trend.startsWith('-') && gp.trend.length > 1 ? 'text-rose-500' : 'text-gray-600'}>
                        {gp.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. SDG Goals Mapping Directory */}
      <div className="mx-auto max-w-7xl px-4 mt-28 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-gray-800/80">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white font-display">UN Sustainable Development Goals (SDG) Alignment</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Every submitted youth nomination maps directly to one or more of these standard goals.</p>
            </div>
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className="flex items-center gap-1.5 text-xs sm:text-sm text-emerald-400 font-bold hover:underline"
            >
              <span>View SDG Progress Dashboard</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sdgs.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-gray-900 hover:border-emerald-950/80 transition-all flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-xs font-black shrink-0">
                  {s.num}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-200">{s.name}</h4>
                  <p className="text-[10px] text-gray-500 mt-1 leading-snug">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Citizen Participation Module */}
      <div className="mx-auto max-w-7xl px-4 mt-28 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-400 mb-6">
              <MessageSquare className="h-3 w-3" />
              Citizen Participation
            </div>
            <h2 className="text-3xl font-extrabold text-white font-display mb-4">Community Voices & Testimonials</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              We empower local citizens to validate the ground reality. Browse public feedback, upvote impactful projects, and participate in the "People's Choice" ranking matrix.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-xl border-sky-900/30 text-center">
                <span className="block text-2xl font-black text-sky-400">12.4k</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Verified Upvotes</span>
              </div>
              <div className="glass-panel p-4 rounded-xl border-emerald-900/30 text-center">
                <span className="block text-2xl font-black text-emerald-400">4,820</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Public Testimonials</span>
              </div>
            </div>
            <button className="mt-8 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-sky-900/40">
              Submit Public Feedback
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Ramesh K.', role: 'Farmer, Karnataka', quote: 'The new solar micro-grid has transformed our irrigation schedules. We no longer rely on erratic power cuts!', likes: 245 },
              { name: 'Anita Devi', role: 'SHG Leader, UP', quote: 'With the digital literacy center, 50 women in our village have started their own online handicraft businesses.', likes: 189 },
              { name: 'Dr. Suresh', role: 'Medical Officer, Bihar', quote: 'The upgraded primary health center has reduced maternal mortality to zero in the last 12 months. Amazing work by the Panchayat.', likes: 412 }
            ].map((test, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-2xl border-gray-800/80 hover:border-gray-700 transition-colors">
                <p className="text-sm text-gray-300 italic mb-4">"{test.quote}"</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                      {test.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{test.name}</p>
                      <p className="text-[10px] text-gray-500">{test.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-950/30 px-2 py-1 rounded-lg border border-emerald-900/50 cursor-pointer hover:bg-emerald-900/50 transition-colors">
                    <ThumbsUp className="h-3 w-3" />
                    {test.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Dynamic Verified Award Winners Showcase */}
      <div className="mx-auto max-w-7xl px-4 mt-28 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Award Winners Grid */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white font-display">National Award Winners Showcase</h2>
              <span className="text-xs text-emerald-400 hover:underline cursor-pointer">View all registry</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {winners.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-gray-500 font-semibold border border-dashed border-gray-800 rounded-2xl">
                  No verified award winners loaded from registry.
                </div>
              ) : (
                winners.map((win) => (
                  <div key={win.id} className="glass-panel rounded-2xl border-gray-800/80 flex flex-col justify-between overflow-hidden transition-all hover:border-emerald-500/30">
                    {win.image && (
                      <div className="h-48 w-full overflow-hidden relative border-b border-gray-900 bg-slate-950">
                        <img 
                          src={win.image} 
                          alt={win.projectName} 
                          className="h-full w-full object-cover opacity-75 hover:opacity-95 transition-opacity" 
                        />
                        <div className="absolute top-3 left-3 rounded-lg bg-amber-500/90 text-slate-950 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 font-display">
                          <Award className="h-3 w-3" />
                          <span>🏆 Verified Winner</span>
                        </div>
                      </div>
                    )}
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <span className="inline-block rounded bg-indigo-950/40 border border-indigo-900/60 px-2 py-0.5 text-[9px] font-semibold text-indigo-400">
                          {win.category.replace(' Award', '')}
                        </span>
                        <h3 className="font-bold text-white text-base leading-snug mt-1.5 font-display">{win.projectName}</h3>
                        <p className="text-xs text-emerald-400 font-bold mt-1">Lead: {win.fullName} ({win.orgType})</p>
                        <p className="text-[11px] text-gray-400 mt-2.5 leading-relaxed">{win.objectives}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-900 flex justify-between items-center text-[10px] text-gray-500">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-rose-500" /> {win.village}, {win.state}</span>
                        <span className="text-[9px] text-emerald-400 font-bold">SDGs: {win.selectedSDGs?.map(s => `SDG ${s}`).join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming Events / News */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white font-display">News & Events</h2>
            <div className="space-y-4">
              {[
                { title: 'National Panchayat Award Registrations', date: 'July 15, 2026', time: '11:00 AM', desc: 'Pre-nomination webinars for youth groups.' },
                { title: 'Ground Jury Field Visits Commencing', date: 'August 01, 2026', time: 'All Day', desc: 'Verification phase across 12 selected districts.' },
                { title: 'Rural Climate Action Youth Hackathon', date: 'August 24, 2026', time: '09:00 AM', desc: 'Design challenge for low-cost solar ideas.' }
              ].map((ev, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gray-950 border border-gray-900 flex gap-3.5 items-start">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">{ev.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{ev.date} at {ev.time}</p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Partner/Sponsors Grid */}
      <div className="mx-auto max-w-7xl px-4 mt-28 sm:px-6 lg:px-8 border-t border-gray-900 pt-16">
        <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-widest mb-8">Empowered and Supported By</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="h-10 text-gray-400 font-extrabold text-sm flex items-center font-display">Ministry of Panchayati Raj</div>
          <div className="h-10 text-gray-400 font-extrabold text-sm flex items-center font-display">Rural Development Board</div>
          <div className="h-10 text-gray-400 font-extrabold text-sm flex items-center font-display">Sustainable India Alliance</div>
          <div className="h-10 text-gray-400 font-extrabold text-sm flex items-center font-display">National Youth Federation</div>
        </div>
      </div>

      {/* 7. Registration Modals */}
      {activeRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 relative border-gray-800 shadow-2xl animate-float">
            <button
              onClick={() => setActiveRegModal(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2 font-display">
              <UserPlus className="h-5 w-5 text-emerald-400" />
              <span>Register as {activeRegModal === 'volunteer' ? 'Volunteer' : activeRegModal === 'ngo' ? 'NGO Partner' : 'CSR Sponsor'}</span>
            </h3>
            <p className="text-xs text-gray-400 mb-4">Provide details to join our collaborative network for village transformation.</p>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Full Name / Contact Person</label>
                <input
                  type="text"
                  required
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg bg-gray-900 border border-gray-800 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="email@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg bg-gray-900 border border-gray-800 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Mobile / WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg bg-gray-900 border border-gray-800 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {(activeRegModal === 'ngo' || activeRegModal === 'csr') && (
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Organization Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter official name"
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                    className="w-full rounded-lg bg-gray-900 border border-gray-800 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Area of Interest / Focus SDG</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full rounded-lg bg-gray-900 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="water">SDG 6: Clean Water & Sanitation</option>
                  <option value="waste">SDG 12: Plastic waste & Recycling</option>
                  <option value="climate">SDG 13: Trees & Climate Action</option>
                  <option value="education">SDG 4: Digital Literacy & Schools</option>
                  <option value="farming">SDG 2: Zero Hunger & Soil Health</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-600 py-2.5 text-xs font-bold text-white transition-all hover:bg-emerald-500 shadow-md shadow-emerald-600/10"
              >
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
