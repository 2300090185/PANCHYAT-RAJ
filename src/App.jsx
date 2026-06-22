import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PublicPortal from './components/PublicPortal';
import NominationForm from './components/NominationForm';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import JuryPortal from './components/JuryPortal';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import { Award, Info, Heart, ArrowRight, ShieldCheck, MessageCircle, X, Send, Bot } from 'lucide-react';

export default function App() {
  const [activeRole, setActiveRole] = useState('public'); // public, nominee, jury, admin
  const [activeTab, setActiveTab] = useState('home'); // home, about, awards, nominate, my-status, jury-reviews, admin-dashboard

  const [nominations, setNominations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Village Development Award');
  const [resultsReleased, setResultsReleased] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Namaste! I am your AI Governance Assistant. How can I help you with your Panchayat Award application today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const [authenticatedRoles, setAuthenticatedRoles] = useState({
    nominee: false,
    jury: false,
    admin: false
  });

  const handleLogin = (role) => {
    setAuthenticatedRoles(prev => ({ ...prev, [role]: true }));
    triggerToast(`Successfully signed in to ${role} portal.`);
  };

  const handleLogout = (role) => {
    setAuthenticatedRoles(prev => ({ ...prev, [role]: false }));
    triggerToast(`Signed out of ${role} portal.`);
    // Optionally redirect to public home
    setActiveRole('public');
    setActiveTab('home');
  };

  // Fetch initial data from backend on mount
  useEffect(() => {
    fetch('/api/nominations')
      .then(res => {
        if (!res.ok) throw new Error('API issue');
        return res.json();
      })
      .then(data => setNominations(data))
      .catch(err => console.error('Error fetching nominations:', err));

    fetch('/api/notifications')
      .then(res => {
        if (!res.ok) throw new Error('API issue');
        return res.json();
      })
      .then(data => setNotifications(data))
      .catch(err => console.error('Error fetching notifications:', err));
  }, []);

  // Toast helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const markNotificationsAsRead = () => {
    fetch('/api/notifications/clear', { method: 'POST' })
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error('Error clearing notifications:', err));
  };

  // State modifiers via API
  const handleNominationSubmit = (newNom) => {
    fetch('/api/nominations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNom)
    })
      .then(res => res.json())
      .then(saved => {
        setNominations(prev => [saved, ...prev]);
        
        // Sync notifications
        fetch('/api/notifications')
          .then(res => res.json())
          .then(data => setNotifications(data));
      })
      .catch(err => {
        console.error('Error submitting nomination:', err);
        triggerToast('Database submit failed. Check connection.');
      });
  };

  const updateNominationStatus = (id, status) => {
    fetch(`/api/nominations/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(updated => {
        setNominations(prev => prev.map(n => n.id === id ? updated : n));

        // Sync notifications
        fetch('/api/notifications')
          .then(res => res.json())
          .then(data => setNotifications(data));
      })
      .catch(err => console.error('Error updating nomination status:', err));
  };

  const addJuryScores = (id, scores, remarks, fieldVisit) => {
    fetch(`/api/nominations/${id}/scores`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scores, remarks, fieldVisit })
    })
      .then(res => res.json())
      .then(updated => {
        setNominations(prev => prev.map(n => n.id === id ? updated : n));
      })
      .catch(err => console.error('Error saving jury scores:', err));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-slate-100 bg-grid-pattern">
      {/* Navbar */}
      <Navbar 
        activeRole={activeRole} 
        setActiveRole={setActiveRole} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        notifications={notifications}
        markNotificationsAsRead={markNotificationsAsRead}
        authenticatedRoles={authenticatedRoles}
        onLogout={handleLogout}
      />

      {/* Main Core Content Wrapper */}
      <main className="flex-grow">
        
        {/* Render pages for Public Persona */}
        {activeRole === 'public' && (
          <>
            {activeTab === 'home' && (
              <PublicPortal 
                nominations={nominations}
                setSelectedCategory={setSelectedCategory}
                setActiveTab={setActiveTab} 
                setActiveRole={setActiveRole} 
                triggerToast={triggerToast} 
                resultsReleased={resultsReleased}
              />
            )}
            
            {activeTab === 'about' && (
              <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center">
                  <h1 className="text-4xl font-extrabold text-white font-display">About the Recognition Initiative</h1>
                  <p className="text-xs text-gray-400 mt-2">An official national program strengthening grassroots democracy and Viksit Bharat 2047.</p>
                </div>

                <div className="glass-panel p-8 rounded-3xl border-gray-800 space-y-6">
                  <h2 className="text-xl font-bold text-white font-display">Governance Structure</h2>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    The portal operates under a tripartite verification schema. Youth, NGOs, and community builders register their localized works. Ground-level verification is driven by Gram Panchayat members, District Welfare offices, and NSS/NCC coordinators.
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Evaluations are transparent and structured on a 100-point index reviewed by regional academic and government jury panels before final blockchain-secured certificate signatures are cleared by the State Secretary of Rural Development.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-900 border border-gray-800 flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-6 h-4 shadow rounded-sm" viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
                        <rect width="9" height="2" fill="#FF9933" />
                        <rect y="2" width="9" height="2" fill="#FFFFFF" />
                        <rect y="4" width="9" height="2" fill="#138808" />
                        <circle cx="4.5" cy="3" r="0.7" fill="#000080" />
                        <circle cx="4.5" cy="3" r="0.4" fill="#FFFFFF" />
                        <circle cx="4.5" cy="3" r="0.25" fill="#000080" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-white text-base">Viksit Bharat</h3>
                    <p className="text-xs text-gray-400 mt-1.5">Driving youth participation in grassroots governance & development.</p>
                  </div>
                  <div className="p-6 bg-slate-900 border border-gray-800 rounded-2xl">
                    <h3 className="font-bold text-white text-sm">Government Collaboration</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">Collaborating directly with Mandal Parishads, Gram Panchayats, and CSR partners to bridge micro-funding into local transformation ideas.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'awards' && (
              <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center">
                  <h1 className="text-4xl font-extrabold text-white font-display">Award Categories Directory</h1>
                  <p className="text-xs text-gray-400 mt-2">We recognize 16 specialized spheres of rural and urban social engineering.</p>
                </div>

                <div className="p-6 rounded-2xl bg-indigo-950/10 border border-indigo-900/30 text-center max-w-xl mx-auto">
                  <h3 className="text-sm font-bold text-white mb-1.5 flex items-center justify-center gap-1.5 font-display">
                    <Award className="h-4.5 w-4.5 text-amber-500" />
                    <span>Automatic Eligibility Check</span>
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">Submit a project in the nominee wizard, select your target category, and the system automatically matches your entry to corresponding SDGs.</p>
                  <button 
                    onClick={() => { setActiveRole('nominee'); setActiveTab('nominate'); }} 
                    className="mt-4 inline-flex items-center gap-1 text-xs text-indigo-400 font-bold hover:underline"
                  >
                    <span>Open Nomination wizard</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Village Development Award', weight: '20% Innovation, 20% Sustainability', desc: 'Given for overall Gram Panchayat infra and wellness updates.' },
                    { title: 'Smart Village Award', weight: '15% Technology integration', desc: 'Given for renewable solar micro-grids, internet centres, and digital classrooms.' },
                    { title: 'Plastic-Free Village Award', weight: '20% Impact metric', desc: 'Focuses on plastic-free campaigns, collection metrics, and local sorting hubs.' },
                    { title: 'Green Village Award', weight: '20% Environmental', desc: 'Promoting organic farming, afforestation, and bio-gas setups.' },
                    { title: 'Water Conservation Award', weight: '20% Sustainability index', desc: 'Restoration of lakes, tanks, check-dams, and recharge wells.' },
                    { title: 'Education Excellence Award', weight: '10% Volunteer strength', desc: 'Improving primary schools, establishing village libraries, and tutoring.' }
                  ].map((cat, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-gray-950 border border-gray-900 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-white text-base font-display">{cat.title}</h4>
                        <span className="text-[10px] text-amber-400 font-bold bg-amber-950/20 px-2 py-0.5 rounded border border-amber-900/30 mt-2 inline-block">{cat.weight}</span>
                        <p className="text-xs text-gray-400 mt-3 leading-relaxed">{cat.desc}</p>
                      </div>
                      <div className="mt-5 border-t border-gray-900 pt-3 text-[10px] text-gray-500">
                        Evaluated by Regional Jury panels.
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <AnalyticsDashboard nominations={nominations} />
            )}
          </>
        )}

        {/* Render pages for Nominee Persona */}
        {activeRole === 'nominee' && (
          !authenticatedRoles.nominee ? (
            <LoginPage role="nominee" onLogin={handleLogin} />
          ) : (
            <>
              {activeTab === 'nominate' && (
                <NominationForm
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  onNominationSubmit={handleNominationSubmit}
                  triggerToast={triggerToast}
                />
              )}

              {activeTab === 'my-status' && (
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8">
                  <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white font-display">My Nomination Status</h1>
                    <p className="text-xs text-gray-400 mt-2">Track the live evaluation progress of your submitted social impact applications.</p>
                  </div>

                  <div className="space-y-6">
                    {nominations.length === 0 ? (
                      <div className="p-8 rounded-xl bg-gray-950/40 border border-gray-900 text-center text-gray-500 font-semibold">
                        No applications found. Fill out a nomination first.
                      </div>
                    ) : (
                      nominations.slice(0, 3).map((nom, idx) => {
                        const score = nom.juryScores
                          ? Object.values(nom.juryScores).reduce((a, b) => a + b, 0)
                          : null;
                        const statusBadge =
                          nom.status === 'Award Winner'
                            ? 'bg-rose-950/40 text-rose-400 border-rose-900'
                            : nom.status === 'Award Recommended'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900'
                            : 'bg-amber-950/40 text-amber-400 border-amber-900';
                        const stateStepActive = nom.status !== 'Pending';
                        const stage3Class = ['h-4 w-4 rounded-full ring-4 ring-gray-950 transition-colors', stateStepActive ? 'bg-emerald-500 glow-emerald' : 'bg-gray-800'].join(' ');
                        const stage4Class = ['h-4 w-4 rounded-full ring-4 ring-gray-950 transition-colors', score ? 'bg-emerald-500 glow-emerald' : 'bg-gray-800'].join(' ');
                        const stage5Class = ['h-4 w-4 rounded-full ring-4 ring-gray-950 transition-colors', nom.status === 'Award Winner' ? 'bg-rose-500 glow-rose' : 'bg-gray-800'].join(' ');
                        return (
                          <div key={idx} className="glass-panel p-6 rounded-2xl border-gray-800/80">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-900">
                              <div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">ID: #{nom.id}</span>
                                <h3 className="text-base font-bold text-white mt-0.5">{nom.projectName}</h3>
                                <p className="text-xs text-indigo-400 font-semibold">{nom.category}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={['rounded-full px-3 py-1 text-xs font-bold border', statusBadge].join(' ')}>
                                  {nom.status}
                                </span>
                              </div>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-6 pt-5 text-xs text-gray-400">
                              <div className="space-y-1">
                                <p className="font-bold text-gray-300">Panchayat Location</p>
                                <p>{nom.village} GP, {nom.state}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="font-bold text-gray-300">Jury Grading</p>
                                {score !== null ? (
                                  <div>
                                    <p className="text-emerald-400 font-bold mb-1.5">{score} / 100 Total Points</p>
                                    <div className="grid grid-cols-2 gap-1 text-[9px]">
                                      {Object.entries(nom.juryScores).map(([k, v]) => (
                                        <div key={k} className="bg-gray-900 rounded px-1.5 py-0.5 flex justify-between border border-gray-800">
                                          <span className="capitalize text-gray-400 truncate pr-1">{k}</span>
                                          <span className="font-bold text-gray-200">{v}/25</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <p>Pending evaluation</p>
                                )}
                              </div>
                              <div className="space-y-1">
                                <p className="font-bold text-gray-300">Field Inspection</p>
                                <p>{nom.fieldVisit ? ('Scheduled: ' + nom.fieldVisit) : 'Not scheduled yet'}</p>
                              </div>
                            </div>

                            {nom.juryRemarks && (
                              <div className="mt-5 p-3 rounded-lg bg-gray-950 border border-gray-900 text-xs">
                                <span className="font-bold text-gray-300 block mb-1">Official Review Remarks:</span>
                                <p className="text-gray-400 italic">{nom.juryRemarks}</p>
                              </div>
                            )}

                            {/* Workflow Timeline */}
                            <div className="mt-6 border-t border-gray-900 pt-5">
                              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">Multi-Level Approval Workflow Timeline</h4>
                              <div className="flex justify-between items-center relative z-0">
                                <div className="absolute left-0 top-[7px] w-full h-0.5 bg-gray-900 -z-10"></div>
                                <div className="flex flex-col items-center gap-2 w-16 text-center bg-gray-950/80">
                                  <div className="h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-gray-950 glow-emerald"></div>
                                  <span className="text-[9px] font-bold text-emerald-400 leading-tight">Submitted</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-16 text-center bg-gray-950/80">
                                  <div className="h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-gray-950 glow-emerald"></div>
                                  <span className="text-[9px] font-bold text-emerald-400 leading-tight">District Cleared</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-16 text-center bg-gray-950/80">
                                  <div className={stage3Class}></div>
                                  <span className={['text-[9px] font-bold leading-tight', stateStepActive ? 'text-emerald-400' : 'text-gray-600'].join(' ')}>State Endorsed</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-16 text-center bg-gray-950/80">
                                  <div className={stage4Class}></div>
                                  <span className={['text-[9px] font-bold leading-tight', score ? 'text-emerald-400' : 'text-gray-600'].join(' ')}>National Jury</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-16 text-center bg-gray-950/80">
                                  <div className={stage5Class}></div>
                                  <span className={['text-[9px] font-bold leading-tight', nom.status === 'Award Winner' ? 'text-rose-400' : 'text-gray-600'].join(' ')}>Ministry Final</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </>
          )
        )}

        {/* Render pages for Jury Persona */}
        {activeRole === 'jury' && (
          !authenticatedRoles.jury ? (
            <LoginPage role="jury" onLogin={handleLogin} />
          ) : activeTab === 'jury-reviews' && (
            <JuryPortal 
              nominations={nominations} 
              updateNominationStatus={updateNominationStatus}
              addJuryScores={addJuryScores}
              triggerToast={triggerToast}
            />
          )
        )}

        {/* Render pages for Admin Persona */}
        {activeRole === 'admin' && (
          !authenticatedRoles.admin ? (
            <LoginPage role="admin" onLogin={handleLogin} />
          ) : activeTab === 'admin-dashboard' && (
            <AdminPanel 
              nominations={nominations} 
              updateNominationStatus={updateNominationStatus}
              triggerToast={triggerToast}
              resultsReleased={resultsReleased}
              setResultsReleased={setResultsReleased}
            />
          )
        )}

      </main>

      {/* Floating Glassmorphic Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-float">
          <div className="glass-panel p-4 rounded-xl border-emerald-500/30 bg-[#091e14]/90 text-emerald-200 text-xs font-bold shadow-2xl flex items-center gap-3.5 max-w-sm">
            <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <p className="leading-snug">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* AI Governance Assistant */}
      <div className="fixed bottom-6 left-6 z-50">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 shadow-xl shadow-emerald-900/50 flex items-center justify-center text-white hover:scale-110 transition-transform border border-emerald-400/30 group"
          >
            <Bot className="h-6 w-6 group-hover:animate-pulse" />
          </button>
        ) : (
          <div className="w-80 h-96 bg-gray-950/95 backdrop-blur-xl border border-emerald-900/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
            <div className="h-14 bg-gradient-to-r from-emerald-900/80 to-slate-900 flex items-center justify-between px-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-bold text-white font-display">AI Governance Assistant</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed ${
                    msg.role === 'ai' 
                      ? 'bg-slate-800/80 text-gray-200 border border-gray-700/50 rounded-tl-sm' 
                      : 'bg-emerald-600 text-white rounded-tr-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-slate-900 border-t border-gray-800">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!chatInput.trim()) return;
                  setChatMessages(prev => [...prev, { role: 'user', text: chatInput }]);
                  setChatInput('');
                  setTimeout(() => {
                    setChatMessages(prev => [...prev, { role: 'ai', text: 'I am analyzing your request against the National Panchayat Guidelines. As this is a simulation, please refer to the official portal docs.' }]);
                  }, 1000);
                }}
                className="flex gap-2"
              >
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about eligibility..." 
                  className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
                <button type="submit" className="h-8 w-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 hover:bg-emerald-500 transition-colors">
                  <Send className="h-3 w-3" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-900 bg-gray-950 py-8 text-center text-xs text-gray-500 font-medium">
        {/* Tricolor line */}
        <div className="w-full h-0.5 grid grid-cols-3 mb-6">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>
        <div className="flex items-center justify-center gap-3 mb-3">
          <svg className="w-8 h-6 shadow rounded-sm" viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
            <rect width="9" height="2" fill="#FF9933" />
            <rect y="2" width="9" height="2" fill="#FFFFFF" />
            <rect y="4" width="9" height="2" fill="#138808" />
            <circle cx="4.5" cy="3" r="0.7" fill="#000080" />
            <circle cx="4.5" cy="3" r="0.4" fill="#FFFFFF" />
            <circle cx="4.5" cy="3" r="0.25" fill="#000080" />
          </svg>
          <span className="text-gray-300 font-semibold text-sm">Panchayat Awards</span>
        </div>
        <p className="text-gray-400">&quot;Recognize. Inspire. Transform. Sustain.&quot;</p>
        <p className="mt-2 text-[10px] text-gray-600">© 2026 Ministry of Panchayati Raj & Rural Development, Government of India | भारत सरकार</p>
        <div className="flex items-center justify-center gap-6 mt-4 text-[10px] text-gray-600">

          <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9933] transition-colors">india.gov.in</a>
          <span>|</span>
          <a href="https://panchayat.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9933] transition-colors">panchayat.gov.in</a>
        </div>
      </footer>
    </div>
  );
}
