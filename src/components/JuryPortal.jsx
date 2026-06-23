import { useState, useEffect } from 'react';
import { 
  Star, Calendar, MessageSquare, ClipboardCheck, Search, Filter, 
  ChevronDown, ChevronUp, AlertCircle, Info, TrendingUp, BarChart2, Eye
} from 'lucide-react';
import { categoryJuryCriteria, categoryCustomFields } from '../constants/awardConfigs';

// Fallback generic criteria if category isn't in the config
const GENERIC_CRITERIA = [
  { key: 'innovation', label: 'Innovation & Creativity', weight: 25, desc: 'Originality and creative problem solving approach.' },
  { key: 'community', label: 'Community Participation', weight: 25, desc: 'Panchayat & local volunteer mobilization.' },
  { key: 'sustainability', label: 'Sustainability Plan', weight: 25, desc: 'Long term impact & self-reliance potential.' },
  { key: 'impact', label: 'Social Impact', weight: 25, desc: 'Verified metrics & household benefits.' }
];

const STATUS_STYLES = {
  'Award Recommended': 'bg-emerald-950/30 text-emerald-400 border-emerald-900/60',
  'Under Review': 'bg-amber-950/30 text-amber-400 border-amber-900/60',
  'Award Winner': 'bg-rose-950/30 text-rose-400 border-rose-900/60',
  'Information Requested': 'bg-orange-950/30 text-orange-400 border-orange-900/60',
  'Pending': 'bg-indigo-950/30 text-indigo-400 border-indigo-900/60'
};

export default function JuryPortal({ nominations, updateNominationStatus, addJuryScores, triggerToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedNomination, setSelectedNomination] = useState(null);
  const [scores, setScores] = useState({});
  const [remarks, setRemarks] = useState('');
  const [fieldVisitDate, setFieldVisitDate] = useState('');
  const [showCustomFieldsPanel, setShowCustomFieldsPanel] = useState(true);

  // Get criteria for the currently selected nomination's category
  const activeCriteria = selectedNomination
    ? (categoryJuryCriteria[selectedNomination.category] || GENERIC_CRITERIA)
    : GENERIC_CRITERIA;

  // Get the custom questions for the nomination's category
  const activeCustomFieldDefs = selectedNomination
    ? (categoryCustomFields[selectedNomination.category] || [])
    : [];

  // Build a zeroed scores object for the active criteria
  const buildEmptyScores = (criteria) => {
    return criteria.reduce((acc, c) => ({ ...acc, [c.key]: 0 }), {});
  };

  // When nomination changes, reset scores to fit new criteria
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!selectedNomination) {
      setScores({});
      setRemarks('');
      setFieldVisitDate('');
      return;
    }

    const criteria = categoryJuryCriteria[selectedNomination.category] || GENERIC_CRITERIA;

    if (selectedNomination.juryScores) {
      // Merge existing saved scores; fill missing criteria with 0
      const merged = buildEmptyScores(criteria);
      Object.keys(selectedNomination.juryScores).forEach(k => {
        if (Object.prototype.hasOwnProperty.call(merged, k)) merged[k] = selectedNomination.juryScores[k];
      });
      setScores(merged);
    } else {
      setScores(buildEmptyScores(criteria));
    }
    setRemarks(selectedNomination.juryRemarks || '');
    setFieldVisitDate(selectedNomination.fieldVisit || '');
  }, [selectedNomination]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const totalScore = Object.values(scores).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
  const maxScore = activeCriteria.reduce((sum, c) => sum + c.weight, 0);

  const handleScoreChange = (key, val, max) => {
    let n = parseFloat(val) || 0;
    if (n > max) n = max;
    if (n < 0) n = 0;
    setScores(prev => ({ ...prev, [key]: n }));
  };

  const handleSaveScores = (e) => {
    e.preventDefault();
    if (!selectedNomination) return;
    addJuryScores(selectedNomination.id, scores, remarks, fieldVisitDate);
    triggerToast(`Jury scoring (${totalScore}/${maxScore}) recorded for ${selectedNomination.fullName}.`);
    const newStatus = totalScore >= (maxScore * 0.75) ? 'Award Recommended' : 'Under Review';
    updateNominationStatus(selectedNomination.id, newStatus);
    setSelectedNomination(prev => ({
      ...prev, status: newStatus, juryScores: scores, juryRemarks: remarks, fieldVisit: fieldVisitDate
    }));
  };

  const handleSelectNomination = (n) => {
    setSelectedNomination(n);
    setShowCustomFieldsPanel(true);
  };

  const categories = ['All (Master Override)', ...new Set(nominations.map(n => n.category))];

  const filteredNominations = nominations.filter(n => {
    const matchesSearch = n.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory.startsWith('All') || n.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate score completion percentage for progress bar
  const scorePercent = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const scoreColor = scorePercent >= 75 ? 'bg-emerald-500' : scorePercent >= 50 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Jury Header */}
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
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-amber-500" />
                <span>Jury Evaluation Portal</span>
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5">Review nominations, score with category-specific criteria, schedule field visits, and recommend finalists.</p>
            </div>
          </div>
          {/* Quick stats */}
          <div className="flex gap-3">
            {[
              { label: 'Total', value: nominations.length, color: 'text-white' },
              { label: 'Recommended', value: nominations.filter(n => n.status === 'Award Recommended' || n.status === 'Award Winner').length, color: 'text-emerald-400' },
              { label: 'Pending', value: nominations.filter(n => n.status === 'Pending').length, color: 'text-amber-400' }
            ].map(stat => (
              <div key={stat.label} className="glass-panel px-4 py-2 rounded-xl border-gray-800/80 text-center min-w-[70px]">
                <p className={`text-lg font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left: Nomination Table */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input type="text" placeholder="Search nominee, project, village..."
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl bg-gray-900 border border-gray-800 pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500" />
            </div>
            <div className="relative mt-4 sm:mt-0">
              <span className="absolute -top-4 right-1 text-[9px] text-amber-500/80 uppercase tracking-widest font-bold">Assigned Jury Panel</span>
              <select value={filterCategory} onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setSelectedNomination(null);
                }}
                className="rounded-xl bg-amber-950/20 border border-amber-900/50 px-4 py-2.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500 appearance-none pr-8">
                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
              <Filter className="absolute right-3 top-3 h-3.5 w-3.5 text-amber-500 pointer-events-none" />
            </div>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden border-gray-800/80">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-400">
                <thead className="bg-gray-950 text-gray-400 uppercase tracking-wider text-[10px] font-bold border-b border-gray-900">
                  <tr>
                    <th className="px-5 py-4">Nominee & Project</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4 text-center">Status</th>
                    <th className="px-5 py-4 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900 bg-transparent">
                  {filteredNominations.length === 0 ? (
                    <tr><td colSpan={4} className="text-center py-8 text-gray-500 font-semibold">No nominations found</td></tr>
                  ) : (
                    filteredNominations.map(n => {
                      const criteria = categoryJuryCriteria[n.category] || GENERIC_CRITERIA;
                      const maxPts = criteria.reduce((s, c) => s + c.weight, 0);
                      const scoreValue = n.juryScores
                        ? Object.values(n.juryScores).reduce((a, b) => a + (parseFloat(b) || 0), 0)
                        : null;
                      const isSelected = selectedNomination?.id === n.id;
                      return (
                        <tr key={n.id} onClick={() => handleSelectNomination(n)}
                          className={`hover:bg-gray-900/40 cursor-pointer transition-colors ${isSelected ? 'bg-amber-950/20 border-l-2 border-l-amber-500' : ''}`}>
                          <td className="px-5 py-4">
                            <p className="font-bold text-white text-sm">{n.fullName}</p>
                            <p className="text-[10px] text-gray-500 truncate max-w-[200px] mt-0.5">{n.projectName}</p>
                            <p className="text-[10px] text-gray-600">{n.village}, {n.state}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className="rounded bg-slate-900 px-2 py-0.5 font-medium border border-gray-800 text-[10px] leading-snug block max-w-[130px]">
                              {n.category.replace(' Award', '')}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${STATUS_STYLES[n.status] || 'bg-gray-900 text-gray-400 border-gray-800'}`}>
                              {n.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className={`font-black text-sm ${scoreValue !== null ? (scoreValue >= maxPts * 0.75 ? 'text-emerald-400' : 'text-amber-400') : 'text-gray-600'}`}>
                              {scoreValue !== null ? `${scoreValue}/${maxPts}` : '—'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Evaluation Sheet */}
        <div className="lg:col-span-2 space-y-4">
          {selectedNomination ? (
            <>
              {/* Nominee Info Panel */}
              <div className="glass-panel p-5 rounded-2xl border-gray-800/80 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{selectedNomination.orgType} Nominee</span>
                    <h3 className="text-base font-bold text-white mt-0.5 font-display">{selectedNomination.fullName}</h3>
                    <p className="text-xs text-amber-400 font-semibold">{selectedNomination.category}</p>
                  </div>
                  <span className="text-xs bg-slate-900 border border-gray-800 rounded px-2.5 py-1 text-gray-300">
                    #{selectedNomination.id.slice(0, 8)}
                  </span>
                </div>

                <div className="text-[11px] bg-slate-950/60 border border-gray-900 p-3 rounded-lg text-gray-400 space-y-1.5">
                  <p><span className="font-bold text-gray-300">Project:</span> {selectedNomination.projectName}</p>
                  <p><span className="font-bold text-gray-300">Location:</span> {selectedNomination.village}, {selectedNomination.state}</p>
                  {selectedNomination.objectives && (
                    <p><span className="font-bold text-gray-300">Objectives:</span> {selectedNomination.objectives}</p>
                  )}
                  {selectedNomination.selectedSDGs?.length > 0 && (
                    <p><span className="font-bold text-gray-300">SDGs:</span> {selectedNomination.selectedSDGs.map(s => `SDG ${s}`).join(', ')}</p>
                  )}
                </div>

                {/* Category-Specific Custom Field Responses */}
                {activeCustomFieldDefs.length > 0 && selectedNomination.customFields && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowCustomFieldsPanel(p => !p)}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-amber-950/20 border border-amber-900/30 text-xs font-bold text-amber-400 hover:border-amber-700/50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Eye className="h-3.5 w-3.5" />
                        View Category-Specific Evidence Answers ({activeCustomFieldDefs.length})
                      </span>
                      {showCustomFieldsPanel ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showCustomFieldsPanel && (
                      <div className="mt-2 space-y-2">
                        {activeCustomFieldDefs.map((fieldDef, idx) => (
                          <div key={fieldDef.key} className="p-3 rounded-lg bg-amber-950/10 border border-amber-900/20">
                            <p className="text-[10px] font-bold text-amber-400 mb-1">Q{idx + 1}. {fieldDef.label}</p>
                            <p className="text-[11px] text-gray-300 leading-relaxed italic">
                              "{selectedNomination.customFields[fieldDef.key] || <span className="text-gray-600 not-italic">Not provided</span>}"
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Scorecard Panel */}
              <div className="glass-panel p-5 rounded-2xl border-gray-800/80">
                <form onSubmit={handleSaveScores} className="space-y-4">
                  {/* Scorecard Header */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <BarChart2 className="h-4 w-4 text-amber-500" />
                        <span>Category Evaluation Matrix</span>
                      </h4>
                      <span className={`text-sm font-black rounded-lg px-2.5 py-0.5 border ${
                        scorePercent >= 75 ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900'
                        : 'bg-amber-950/30 text-amber-400 border-amber-900'
                      }`}>
                        {totalScore} / {maxScore}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${scoreColor}`} style={{ width: `${scorePercent}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                      <span>0</span>
                      <span className={scorePercent >= 75 ? 'text-emerald-500' : 'text-amber-500'}>{scorePercent}% complete</span>
                      <span>{maxScore}</span>
                    </div>
                  </div>

                  {/* Category-Specific Criteria Banner */}
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-950/10 border border-amber-900/20">
                    <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <p className="text-[10px] text-amber-400 font-semibold">
                      Scoring criteria specific to <span className="font-black">{selectedNomination.category}</span>
                    </p>
                  </div>

                  {/* Criteria Sliders */}
                  <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
                    {activeCriteria.map(crit => (
                      <div key={crit.key} className="p-3 bg-gray-950 rounded-xl border border-gray-900 space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-gray-200">{crit.label}</span>
                          <span className="text-[11px] text-amber-500 font-semibold tabular-nums">Max: {crit.weight} pts</span>
                        </div>
                        <p className="text-[9px] text-gray-500 leading-snug">{crit.desc}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <input type="range" min="0" max={crit.weight} step="1"
                            value={scores[crit.key] || 0}
                            onChange={(e) => handleScoreChange(crit.key, e.target.value, crit.weight)}
                            className="flex-1 accent-amber-500 h-1.5 rounded bg-gray-800 appearance-none cursor-pointer" />
                          <input type="number" min="0" max={crit.weight}
                            value={scores[crit.key] || 0}
                            onChange={(e) => handleScoreChange(crit.key, e.target.value, crit.weight)}
                            className="w-12 bg-slate-900 border border-gray-800 rounded px-1.5 py-0.5 text-center text-xs text-white font-bold" />
                        </div>
                        {/* Mini progress bar per criterion */}
                        <div className="h-0.5 w-full bg-gray-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500/40 rounded-full transition-all"
                            style={{ width: `${crit.weight > 0 ? ((scores[crit.key] || 0) / crit.weight) * 100 : 0}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Field Visit */}
                  <div className="p-3 bg-gray-950 rounded-xl border border-gray-900 space-y-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-amber-500" />
                      <span>Schedule Field Verification Visit</span>
                    </label>
                    <input type="date" value={fieldVisitDate} onChange={(e) => setFieldVisitDate(e.target.value)}
                      className="w-full bg-slate-900 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500" />
                  </div>

                  {/* Remarks */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4 text-amber-500" />
                      <span>Jury Remarks / Observations</span>
                    </label>
                    <textarea rows={3} required
                      placeholder="Enter observation notes, verified counts, ground visit findings..."
                      value={remarks} onChange={(e) => setRemarks(e.target.value)}
                      className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500" />
                  </div>

                  {/* Recommendation threshold hint */}
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-900/20">
                    <TrendingUp className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <p className="text-[10px] text-gray-400">
                      Score <span className="font-bold text-indigo-400">{Math.ceil(maxScore * 0.75)}+ pts ({Math.round(75)}%)</span> auto-recommends for award. Currently at <span className={`font-bold ${scorePercent >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>{scorePercent}%</span>.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-gray-900">
                    <button type="submit"
                      className="flex-1 rounded-lg bg-amber-600 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-500 transition-all shadow-md shadow-amber-600/10">
                      Save Scores & Recommend
                    </button>
                    <button type="button"
                      onClick={() => {
                        updateNominationStatus(selectedNomination.id, 'Information Requested');
                        triggerToast(`Requested clarification from ${selectedNomination.fullName}.`);
                        setSelectedNomination(null);
                      }}
                      className="rounded-lg border border-gray-800 px-3.5 py-2.5 text-xs font-semibold text-gray-300 hover:text-white hover:border-gray-700 transition-colors"
                      title="Request Clarification">
                      Clarify
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border-gray-800/80 text-center flex flex-col items-center justify-center h-96">
              <Star className="h-10 w-10 text-gray-700 animate-pulse mb-3" />
              <h3 className="font-bold text-sm text-gray-300">No Nomination Selected</h3>
              <p className="text-xs text-gray-500 max-w-xs mt-1.5">Select a nomination from the list to begin scorecard grading with category-specific evaluation criteria.</p>
              {nominations.length === 0 && (
                <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-amber-950/20 border border-amber-900/30">
                  <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                  <p className="text-xs text-amber-400">No nominations yet. Add nominations via the Nominee portal.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
