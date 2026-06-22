import React, { useState } from 'react';
import { Shield, Users, Award, Download, CheckCircle2, QrCode, Sparkles, X, Printer, Search, HelpCircle, FileJson } from 'lucide-react';

export default function AdminPanel({ nominations, updateNominationStatus, triggerToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('nominations'); // nominations, certificates, settings
  const [activeCert, setActiveCert] = useState(null); // Selected nomination for certificate preview
  const [showQrVerification, setShowQrVerification] = useState(false);

  // Status updates available to admin
  const availableStatuses = ['Pending', 'Under Review', 'Verified', 'Award Recommended', 'Award Winner'];

  const filteredNominations = nominations.filter(n => 
    n.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export database mock
  const handleExportData = (format) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(nominations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prd_portal_nominations_${new Date().toISOString().slice(0, 10)}.${format}`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast(`Exported ${nominations.length} records successfully in ${format.toUpperCase()} format.`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* myGov Government Header */}
      <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
        {/* Tricolor top bar */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>
        <div className="bg-[#0a1628] px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            {/* Indian Flag SVG */}
            <svg className="w-10 h-7 rounded shadow-md shrink-0" viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
              <rect width="9" height="2" fill="#FF9933" />
              <rect y="2" width="9" height="2" fill="#FFFFFF" />
              <rect y="4" width="9" height="2" fill="#138808" />
              <circle cx="4.5" cy="3" r="0.7" fill="#000080" />
              <circle cx="4.5" cy="3" r="0.4" fill="#FFFFFF" />
              <circle cx="4.5" cy="3" r="0.25" fill="#000080" />
            </svg>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-rose-500" />
                  <span>my<span className="text-[#FF9933]">Gov</span> Admin Control Panel</span>
                </h2>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">Ministry of Panchayati Raj & Rural Development — Internal Portal</p>
            </div>
          </div>
          {/* Administrative Tools */}
          <div className="flex gap-2">
            <button 
              onClick={() => handleExportData('json')}
              className="flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-900 px-3.5 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:border-[#FF9933] transition-colors"
            >
              <FileJson className="h-4 w-4 text-blue-400" />
              <span>Export JSON Registry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-900 pb-2">
        <button
          onClick={() => setActiveTab('nominations')}
          className={`px-4 py-2 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'nominations' 
              ? 'border-rose-500 text-rose-400' 
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          Nomination Management
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'certificates' 
              ? 'border-rose-500 text-rose-400' 
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          Certificate Issuance ({nominations.filter(n => n.status === 'Award Winner' || n.status === 'Award Recommended').length})
        </button>
      </div>

      {/* SEARCH OR FILTERS */}
      {activeTab === 'nominations' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search nomination database..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-gray-900 border border-gray-800 pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden border-gray-800/80">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-400">
                <thead className="bg-gray-950 text-gray-400 uppercase tracking-wider text-[10px] font-bold border-b border-gray-900">
                  <tr>
                    <th className="px-6 py-4">Nominee Name</th>
                    <th className="px-6 py-4">Project Title</th>
                    <th className="px-6 py-4">State</th>
                    <th className="px-6 py-4 text-center">Current Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900 bg-transparent text-xs text-gray-300">
                  {filteredNominations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500">No matching applications</td>
                    </tr>
                  ) : (
                    filteredNominations.map(n => (
                      <tr key={n.id} className="hover:bg-gray-900/20">
                        <td className="px-6 py-4">
                          <p className="font-bold text-white text-sm">{n.fullName}</p>
                          <p className="text-[10px] text-indigo-400 mt-0.5">{n.orgType}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="truncate max-w-[220px] font-medium">{n.projectName}</p>
                          <p className="text-[10px] text-gray-500">{n.category}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>{n.village}</p>
                          <p className="text-[10px] text-gray-500">{n.state}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                            n.status === 'Award Winner' 
                              ? 'bg-rose-950/30 text-rose-400 border-rose-900' 
                              : n.status === 'Award Recommended' 
                                ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900' 
                                : n.status === 'Under Review' 
                                  ? 'bg-amber-950/30 text-amber-400 border-amber-900'
                                  : 'bg-gray-900 text-gray-400 border-gray-800'
                          }`}>
                            {n.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <select
                            value={n.status}
                            onChange={(e) => {
                              updateNominationStatus(n.id, e.target.value);
                              triggerToast(`Updated status of ${n.fullName} to ${e.target.value}`);
                            }}
                            className="bg-slate-900 border border-gray-800 rounded px-2 py-1 text-xs text-white focus:outline-none"
                          >
                            {availableStatuses.map((st, i) => (
                              <option key={i} value={st}>{st}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATES ISSUANCE VIEW */}
      {activeTab === 'certificates' && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Winners list */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-widest font-display">Qualified Award Finalists</h3>
            <div className="space-y-3">
              {nominations.filter(n => n.status === 'Award Winner' || n.status === 'Award Recommended').length === 0 ? (
                <div className="p-8 rounded-xl bg-gray-950/40 border border-gray-900 text-center text-gray-500">
                  No verified winners or recommended nominees found. Change statuses in Nomination management to generate certificates.
                </div>
              ) : (
                nominations
                  .filter(n => n.status === 'Award Winner' || n.status === 'Award Recommended')
                  .map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => setActiveCert(n)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                        activeCert?.id === n.id 
                          ? 'bg-rose-950/20 border-rose-500/80 scale-[1.01]' 
                          : 'bg-gray-950 border-gray-900 hover:border-gray-800'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-white text-sm">{n.fullName}</h4>
                        <p className="text-[10px] text-emerald-400 font-semibold">{n.category}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{n.village}, {n.state}</p>
                      </div>
                      <Award className="h-5 w-5 text-amber-500" />
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Certificate visual canvas preview */}
          <div>
            {activeCert ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-gray-200 uppercase tracking-widest font-display">Official Certificate Sandbox</h3>
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 rounded-lg bg-gray-900 border border-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print</span>
                  </button>
                </div>

                {/* Printable certificate design */}
                <div className="rounded-2xl border-8 border-double border-amber-900/60 bg-slate-900 p-8 text-center text-slate-100 shadow-2xl relative overflow-hidden select-none">
                  {/* Subtle watermarks / shapes */}
                  <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-emerald-500/5 blur-xl"></div>
                  <div className="absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-amber-500/5 blur-xl"></div>
                  
                  <div className="flex justify-center mb-3">
                    <Award className="h-10 w-10 text-amber-500" />
                  </div>
                  
                  <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase">Panchayati Raj & Rural Development Department</span>
                  <h2 className="text-xl font-bold tracking-tight text-white mt-1.5 font-display">NATIONAL SOCIAL IMPACT AWARD</h2>
                  
                  <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-4"></div>
                  
                  <p className="text-xs text-gray-400 italic">This certificate of excellence is proudly presented to</p>
                  <p className="text-lg font-black text-white tracking-wide mt-2 font-display">{activeCert.fullName}</p>
                  
                  <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                    for outstanding youth leadership, sustainable stewardship, and pioneering contributions under the award category:
                  </p>
                  <p className="text-xs font-black text-amber-400 mt-1 uppercase tracking-wider">{activeCert.category}</p>
                  
                  <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">
                    Project name: <span className="font-bold text-gray-300">"{activeCert.projectName}"</span> executed in Gram Panchayat: <span className="font-bold text-gray-300">{activeCert.village}</span>.
                  </p>

                  <div className="mt-8 flex justify-between items-center border-t border-gray-800 pt-6">
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-gray-300">Shri R. K. Prasad</p>
                      <p className="text-[9px] text-gray-500">Secretary, Panchayati Raj Dept.</p>
                    </div>

                    {/* QR Code Container */}
                    <div 
                      onClick={() => setShowQrVerification(true)}
                      className="cursor-pointer p-1.5 rounded-lg bg-white hover:ring-2 hover:ring-emerald-500 transition-all flex flex-col items-center gap-0.5"
                      title="Click to Verify QR Code"
                    >
                      <QrCode className="h-10 w-10 text-slate-900" />
                      <span className="text-[8px] text-slate-800 font-bold tracking-tighter">SECURE VERIFY</span>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-300">Date Issued</p>
                      <p className="text-[9px] text-gray-500">{new Date().toISOString().slice(0, 10)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-8 rounded-2xl border-gray-800/80 text-center flex flex-col items-center justify-center h-96">
                <Award className="h-10 w-10 text-gray-700 animate-pulse mb-3" />
                <h3 className="font-bold text-sm text-gray-300">Select Nominee for Certificate</h3>
                <p className="text-xs text-gray-500 max-w-xs mt-1.5">Only nominees whose status has been updated to "Award Winner" or "Award Recommended" can have official department certificates generated.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR VERIFICATION DRAWER */}
      {showQrVerification && activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 relative border-gray-800 shadow-2xl animate-float">
            <button
              onClick={() => setShowQrVerification(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>

            <h3 className="text-center text-lg font-bold text-white font-display">Blockchain QR Certificate Verified</h3>
            <p className="text-center text-xs text-gray-400 mt-1">This digital credential is authenticated against the Ministry of Panchayati Raj Central Registry database.</p>

            <div className="mt-5 p-4 rounded-xl bg-gray-900 border border-gray-800 text-xs space-y-2 text-gray-300">
              <p><span className="font-bold text-gray-400">Registry Reference:</span> PRD-VERIFY-{activeCert.id.toUpperCase().slice(0, 12)}</p>
              <p><span className="font-bold text-gray-400">Award Recipient:</span> {activeCert.fullName}</p>
              <p><span className="font-bold text-gray-400">Organization Type:</span> {activeCert.orgType}</p>
              <p><span className="font-bold text-gray-400">Project:</span> {activeCert.projectName}</p>
              <p><span className="font-bold text-gray-400">GP Location:</span> {activeCert.village} GP, {activeCert.state}</p>
              <p><span className="font-bold text-gray-400">Jury Verification Score:</span> {activeCert.juryScores ? Object.values(activeCert.juryScores).reduce((a,b)=>a+b, 0) : '85'} / 100</p>
              <p><span className="font-bold text-gray-400">Verified By:</span> District Ground Verification Panel</p>
            </div>

            <button
              onClick={() => setShowQrVerification(false)}
              className="w-full mt-5 rounded-lg bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-500"
            >
              Close Diagnostics
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
