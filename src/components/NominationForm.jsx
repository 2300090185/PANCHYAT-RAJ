import React, { useState, useEffect } from 'react';
import { 
  FileText, User, LayoutGrid, BarChart2, ShieldAlert, Sparkles, Check, ChevronRight, ChevronLeft, Upload, Info, 
  Map, Home, Users, BookOpen, Heart, Sprout, Smile, Trees, Trash2, Droplets, CloudRain, Briefcase, TrendingUp, Sun,
  HelpCircle, AlertCircle
} from 'lucide-react';
import { categoryCustomFields } from '../constants/awardConfigs';

const categoryGuides = {
  'Village Development Award': {
    objectives: 'Focuses on holistic improvement of Gram Panchayat sanitation, layout roads, utility wells, and local public buildings.',
    requiredDocs: 'Gram Panchayat Approval Resolution and geo-tagged before/after layout photos.',
    metrics: ['metricVillages', 'metricHouseholds', 'metricBeneficiaries', 'metricVolunteers'],
    sdg: 11, color: 'indigo'
  },
  'Smart Village Award': {
    objectives: 'Integration of renewable solar energy grids, Common Service Centres, public internet hubs, and digital governance.',
    requiredDocs: 'Grid connection compliance reports and hardware setup snapshots.',
    metrics: ['metricVillages', 'metricHouseholds', 'metricJobs', 'metricSkills'],
    sdg: 9, color: 'cyan'
  },
  'Plastic-Free Village Award': {
    objectives: 'Campaigns to ban single-use plastics, implementing village sorting systems, and setting up recycling buy-backs.',
    requiredDocs: 'Dry waste processing MoU or trash collection weighbridge receipts.',
    metrics: ['metricPlastic', 'metricHouseholds', 'metricVolunteers'],
    sdg: 12, color: 'orange'
  },
  'Green Village Award': {
    objectives: 'Advancing village carbon neutrality, installing community compost bins, solar pumps, and bio-gas systems.',
    requiredDocs: 'Soil testing logs or solar-pump installation reports.',
    metrics: ['metricTrees', 'metricCarbon', 'metricVolunteers'],
    sdg: 13, color: 'green'
  },
  'Water Conservation Award': {
    objectives: 'De-silting check-dams, clearing natural drains, setting up rainwater harvest shafts, and water table mapping.',
    requiredDocs: 'District engineer validation reports and watershed site pictures.',
    metrics: ['metricWaterBodies', 'metricHarvesting', 'metricBeneficiaries', 'metricVolunteers'],
    sdg: 6, color: 'blue'
  },
  'Education Excellence Award': {
    objectives: 'Bridge digital classroom divides, conduct tutoring camps, upgrade rural school libraries, and improve attendance.',
    requiredDocs: 'School headmaster recommendation letter and student attendance records.',
    metrics: ['metricStudents', 'metricSkills', 'metricVolunteers'],
    sdg: 4, color: 'teal'
  },
  'Health & Hygiene Award': {
    objectives: 'Primary medical check-up camps, distribution of health kits, sanitation drives, and primary care centers.',
    requiredDocs: 'PHC doctor endorsement certificate and medical camp list.',
    metrics: ['metricHouseholds', 'metricBeneficiaries', 'metricVolunteers'],
    sdg: 3, color: 'rose'
  },
  'Women Empowerment Award': {
    objectives: 'Promoting Self Help Group (SHG) banking, tailoring/handicraft training, and setting up child daycare nodes.',
    requiredDocs: 'SHG registry ledger logs and bank account statements.',
    metrics: ['metricWomen', 'metricSkills', 'metricJobs'],
    sdg: 5, color: 'pink'
  },
  'Agriculture Innovation Award': {
    objectives: 'Precision drip-irrigation setups, organic bio-fertilizers, soil card tests, and crop storage marketing hubs.',
    requiredDocs: 'Soil health cards and innovation sketch notes.',
    metrics: ['metricFarmers', 'metricWaterBodies', 'metricJobs'],
    sdg: 2, color: 'amber'
  },
  'Digital Village Award': {
    objectives: 'Broadband internet setups, mobile application training, digital literacy drives, and online utility payment portals.',
    requiredDocs: 'Inventory logs of devices and network speed metrics.',
    metrics: ['metricHouseholds', 'metricSkills', 'metricJobs'],
    sdg: 9, color: 'violet'
  },
  'Youth Leadership Award': {
    objectives: 'Youth representation panels inside the Panchayat, directing youth wings, and leadership training programs.',
    requiredDocs: 'Panchayat endorsement check and nominee age proof.',
    metrics: ['metricVolunteers', 'metricBeneficiaries'],
    sdg: 16, color: 'fuchsia'
  },
  'Best Volunteer Award': {
    objectives: 'Outstanding individual volunteer action during floods, sanitation blocks, or remote community support.',
    requiredDocs: 'NSS/NCC coordinator letter of recommendation.',
    metrics: ['metricVolunteers', 'metricBeneficiaries'],
    sdg: 17, color: 'emerald'
  },
  'Best NGO Award': {
    objectives: 'Structured multi-year village adoption programs establishing long-term self-reliance frameworks.',
    requiredDocs: 'NGO 80G registration certificates and audited balance sheets.',
    metrics: ['metricVillages', 'metricBeneficiaries', 'metricVolunteers', 'metricJobs'],
    sdg: 17, color: 'sky'
  },
  'Social Entrepreneurship Award': {
    objectives: 'Setting up self-sustaining social businesses that solve localized village clean fuel or supply constraints.',
    requiredDocs: 'Incorporation documents and employment ledger lines.',
    metrics: ['metricBeneficiaries', 'metricJobs', 'metricSkills'],
    sdg: 8, color: 'lime'
  },
  'Climate Action Award': {
    objectives: 'Massive plantation, climate risk mitigation, solar conversion, and environmental awareness drives.',
    requiredDocs: 'Geo-tagged afforestation maps and forest range logs.',
    metrics: ['metricTrees', 'metricCarbon', 'metricVolunteers'],
    sdg: 13, color: 'yellow'
  },
  'Biodiversity Conservation Award': {
    objectives: 'Protecting local wild fauna tracks, organic crop seed banks, and local herbal tree zones.',
    requiredDocs: 'Village biodiversity register summaries.',
    metrics: ['metricTrees', 'metricWaterBodies', 'metricVolunteers'],
    sdg: 15, color: 'lime'
  }
};

const getWordCount = (str) => {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
};

export default function NominationForm({ selectedCategory, setSelectedCategory = () => {}, onNominationSubmit, triggerToast }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', gender: 'male', mobile: '', email: '', address: '',
    state: 'Andhra Pradesh', district: '', mandal: '', gp: '', village: '', pinCode: '',
    orgType: 'Individual',
    projectName: '', category: 'Village Development Award', startDate: '', endDate: '',
    location: '', objectives: '', challenges: '', innovations: '', sustainabilityPlan: '',
    communityParticipation: '', governmentSupport: '', csrPartnership: '',
    customFields: {},
    selectedSDGs: [], selectedLDGs: [],
    metricVillages: 0, metricHouseholds: 0, metricBeneficiaries: 0, metricStudents: 0,
    metricWomen: 0, metricFarmers: 0, metricVolunteers: 0, metricTrees: 0,
    metricPlastic: 0, metricWaterBodies: 0, metricHarvesting: 0, metricJobs: 0,
    metricSkills: 0, metricCarbon: 0,
    declared: false,
    professionalPhoto: '',
    evidenceReport: '',
    mediaEvidence: ''
  });

  const steps = [
    { num: 1, label: 'Profile & Region', icon: User },
    { num: 2, label: 'Project Scope', icon: FileText },
    { num: 3, label: 'SDG & LDG Mapping', icon: LayoutGrid },
    { num: 4, label: 'Impact Metrics', icon: BarChart2 },
    { num: 5, label: 'Upload & Submit', icon: ShieldAlert }
  ];

  const awardCategories = Object.keys(categoryGuides);

  const sdgList = [
    { num: 1, text: 'SDG 1: No Poverty' }, { num: 2, text: 'SDG 2: Zero Hunger' },
    { num: 3, text: 'SDG 3: Good Health' }, { num: 4, text: 'SDG 4: Quality Education' },
    { num: 5, text: 'SDG 5: Gender Equality' }, { num: 6, text: 'SDG 6: Clean Water' },
    { num: 7, text: 'SDG 7: Clean Energy' }, { num: 8, text: 'SDG 8: Decent Work' },
    { num: 9, text: 'SDG 9: Innovation' }, { num: 10, text: 'SDG 10: Reduced Inequalities' },
    { num: 11, text: 'SDG 11: Sustainable Communities' }, { num: 12, text: 'SDG 12: Responsible Consumption' },
    { num: 13, text: 'SDG 13: Climate Action' }, { num: 14, text: 'SDG 14: Life Below Water' },
    { num: 15, text: 'SDG 15: Life on Land' }, { num: 16, text: 'SDG 16: Peace & Institutions' },
    { num: 17, text: 'SDG 17: Partnerships' }
  ];

  const ldgList = [
    { num: 1, text: 'LDG 1: Leadership Development' }, { num: 2, text: 'LDG 2: Community Service' },
    { num: 3, text: 'LDG 3: Environmental Stewardship' }, { num: 4, text: 'LDG 4: Innovation & Problem Solving' },
    { num: 5, text: 'LDG 5: Digital Empowerment' }, { num: 6, text: 'LDG 6: Health & Well-being' },
    { num: 7, text: 'LDG 7: Financial Literacy & Entrepreneurship' }, { num: 8, text: 'LDG 8: Cultural & Heritage Preservation' },
    { num: 9, text: 'LDG 9: Lifelong Learning' }, { num: 10, text: 'LDG 10: Nation Building & Citizenship' }
  ];

  const metricFields = [
    { field: 'metricVillages', label: 'Villages Covered', icon: Map, color: 'text-indigo-400' },
    { field: 'metricHouseholds', label: 'Households Benefited', icon: Home, color: 'text-sky-400' },
    { field: 'metricBeneficiaries', label: 'Total Beneficiaries', icon: Users, color: 'text-emerald-400' },
    { field: 'metricStudents', label: 'Students Benefited', icon: BookOpen, color: 'text-teal-400' },
    { field: 'metricWomen', label: 'Women Benefited', icon: Heart, color: 'text-rose-400' },
    { field: 'metricFarmers', label: 'Farmers Benefited', icon: Sprout, color: 'text-amber-400' },
    { field: 'metricVolunteers', label: 'Volunteers Mobilized', icon: Smile, color: 'text-pink-400' },
    { field: 'metricTrees', label: 'Trees Planted', icon: Trees, color: 'text-green-400' },
    { field: 'metricPlastic', label: 'Plastic Collected (kg)', icon: Trash2, color: 'text-orange-400' },
    { field: 'metricWaterBodies', label: 'Water Bodies Restored', icon: Droplets, color: 'text-blue-400' },
    { field: 'metricHarvesting', label: 'Rainwater Harvesters', icon: CloudRain, color: 'text-cyan-400' },
    { field: 'metricJobs', label: 'Employment Generated', icon: Briefcase, color: 'text-violet-400' },
    { field: 'metricSkills', label: 'Skill Beneficiaries', icon: TrendingUp, color: 'text-fuchsia-400' },
    { field: 'metricCarbon', label: 'Carbon Reduced (kg est)', icon: Sun, color: 'text-yellow-400' }
  ];

  // Sync with selectedCategory prop (only when it comes from outside, e.g. from the award cards on the public portal)
  const lastExternalCategory = React.useRef(null);
  useEffect(() => {
    if (
      selectedCategory &&
      selectedCategory !== formData.category &&
      selectedCategory !== lastExternalCategory.current
    ) {
      lastExternalCategory.current = selectedCategory;
      setFormData(prev => ({ ...prev, category: selectedCategory, customFields: {} }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Auto-lock mandatory SDG for category
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const guide = categoryGuides[formData.category];
    if (guide?.sdg) {
      setFormData(prev => {
        const sdgs = [...prev.selectedSDGs];
        if (!sdgs.includes(guide.sdg)) sdgs.push(guide.sdg);
        return { ...prev, selectedSDGs: sdgs };
      });
    }
  }, [formData.category]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleInputChange = (field, val) => setFormData(prev => ({ ...prev, [field]: val }));

  const handleCustomFieldChange = (key, val) => {
    setFormData(prev => ({ ...prev, customFields: { ...prev.customFields, [key]: val } }));
  };

  const handleCategoryChange = (newCat) => {
    // Single atomic update: change category + clear custom fields + notify parent
    setFormData(prev => ({ ...prev, category: newCat, customFields: {} }));
    lastExternalCategory.current = newCat; // prevent the useEffect from double-firing
    setSelectedCategory(newCat);
  };

  const toggleSDG = (num) => {
    const guide = categoryGuides[formData.category];
    if (guide?.sdg === num) return;
    let current = [...formData.selectedSDGs];
    if (current.includes(num)) current = current.filter(x => x !== num);
    else current.push(num);
    handleInputChange('selectedSDGs', current);
  };

  const toggleLDG = (num) => {
    let current = [...formData.selectedLDGs];
    if (current.includes(num)) current = current.filter(x => x !== num);
    else current.push(num);
    handleInputChange('selectedLDGs', current);
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (
        !formData.fullName ||
        !formData.mobile ||
        !formData.email ||
        !formData.address ||
        !formData.state ||
        !formData.district ||
        !formData.mandal ||
        !formData.gp ||
        !formData.village ||
        !formData.pinCode ||
        !formData.professionalPhoto
      ) {
        triggerToast('Please fill all mandatory profile and regional fields, including your professional photo.');
        return false;
      }
    }
    if (currentStep === 2) {
      if (
        !formData.projectName ||
        !formData.startDate ||
        !formData.endDate ||
        !formData.location ||
        !formData.objectives ||
        !formData.challenges ||
        !formData.innovations ||
        !formData.sustainabilityPlan ||
        !formData.communityParticipation ||
        !formData.governmentSupport ||
        !formData.csrPartnership
      ) {
        triggerToast('Please fill all mandatory project fields (Name, Dates, Location, Objectives, Challenges, Innovations, Sustainability, Community, Govt, CSR).');
        return false;
      }

      // Check word count constraint for narrative textareas (50-100 words)
      const narrativeFields = [
        { name: 'objectives', label: 'Key Objectives' },
        { name: 'challenges', label: 'Challenges Faced' },
        { name: 'innovations', label: 'Key Innovations' },
        { name: 'sustainabilityPlan', label: 'Sustainability & Future Plan' },
        { name: 'communityParticipation', label: 'Community Participation' },
        { name: 'governmentSupport', label: 'Government Support' },
        { name: 'csrPartnership', label: 'CSR Partnership & Funding' }
      ];
      
      for (const field of narrativeFields) {
        const count = getWordCount(formData[field.name]);
        if (count < 50 || count > 100) {
          triggerToast(`"${field.label}" must be between 50 and 100 words. Current: ${count} words.`);
          return false;
        }
      }
      
      const fields = categoryCustomFields[formData.category] || [];
      for (const f of fields) {
        if (!formData.customFields[f.key] || formData.customFields[f.key].trim() === '') {
          triggerToast(`Please fill the required field: "${f.label}"`);
          return false;
        }
        const count = getWordCount(formData.customFields[f.key]);
        if (count < 50 || count > 100) {
          triggerToast(`"${f.label}" response must be between 50 and 100 words. Current: ${count} words.`);
          return false;
        }
      }
    }
    if (currentStep === 3) {
      if (formData.selectedSDGs.length === 0) {
        triggerToast('Please map at least one Sustainable Development Goal (SDG).');
        return false;
      }
      if (formData.selectedLDGs.length === 0) {
        triggerToast('Please map at least one Life Development Goal (LDG).');
        return false;
      }
    }
    if (currentStep === 4) {
      const activeGuide = categoryGuides[formData.category];
      const metrics = activeGuide?.metrics || [];
      for (const m of metrics) {
        if (formData[m] === undefined || formData[m] === '' || formData[m] <= 0) {
          triggerToast('Please fill all category-specific impact metrics with valid positive values.');
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.evidenceReport || !formData.mediaEvidence) {
      triggerToast('Please upload both the Evidence Report and Media Evidence documents.');
      return;
    }
    if (!formData.declared) {
      triggerToast('Please check the declaration box certifying your information is authentic.');
      return;
    }
    onNominationSubmit(formData);
    triggerToast('Nomination submitted successfully! Keep note of your reference ID.');
    setCurrentStep(1);
    setFormData({
      fullName: '', gender: 'male', mobile: '', email: '', address: '',
      state: 'Andhra Pradesh', district: '', mandal: '', gp: '', village: '', pinCode: '',
      orgType: 'Individual', projectName: '', category: 'Village Development Award',
      startDate: '', endDate: '', location: '', objectives: '', challenges: '', innovations: '',
      sustainabilityPlan: '', communityParticipation: '', governmentSupport: '', csrPartnership: '',
      customFields: {}, selectedSDGs: [], selectedLDGs: [],
      metricVillages: 0, metricHouseholds: 0, metricBeneficiaries: 0, metricStudents: 0,
      metricWomen: 0, metricFarmers: 0, metricVolunteers: 0, metricTrees: 0,
      metricPlastic: 0, metricWaterBodies: 0, metricHarvesting: 0, metricJobs: 0,
      metricSkills: 0, metricCarbon: 0, declared: false,
      professionalPhoto: '', evidenceReport: '', mediaEvidence: ''
    });
  };

  const activeGuide = categoryGuides[formData.category] || { metrics: [], requiredDocs: 'Supporting files', sdg: 1 };
  const filteredMetrics = metricFields.filter(m => activeGuide.metrics.includes(m.field));
  const activeCustomFields = categoryCustomFields[formData.category] || [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Introduction Card */}
      <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-xl mb-8">
        {/* Tricolor top bar */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>
        <div className="glass-panel p-5 rounded-b-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <svg className="w-10 h-7 rounded shadow-md shrink-0" viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
              <rect width="9" height="2" fill="#FF9933" />
              <rect y="2" width="9" height="2" fill="#FFFFFF" />
              <rect y="4" width="9" height="2" fill="#138808" />
              <circle cx="4.5" cy="3" r="0.7" fill="#000080" />
              <circle cx="4.5" cy="3" r="0.4" fill="#FFFFFF" />
              <circle cx="4.5" cy="3" r="0.25" fill="#000080" />
            </svg>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Panchayat Awards — Nomination Form</h2>
              <p className="text-xs text-gray-400 mt-0.5">Submit your project details to represent your community and stand a chance to win Panchayati Raj Rural Awards — Ministry of Panchayati Raj, Govt. of India.</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/25 shrink-0">
            <Sparkles className="h-4 w-4" />
            <span>Award-Specific Application</span>
          </div>
        </div>
      </div>

      {/* Stepper Header */}
      <div className="glass-panel p-4 rounded-2xl border-gray-800/80 mb-8 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] px-2">
          {steps.map((st, index) => {
            const isActive = currentStep === st.num;
            const isCompleted = currentStep > st.num;
            return (
              <React.Fragment key={st.num}>
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-bold transition-all ${
                    isActive ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20 scale-105' 
                    : isCompleted ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400' 
                    : 'bg-gray-900 border-gray-800 text-gray-500'
                  }`}>
                    {isCompleted ? <Check className="h-4 w-4" /> : st.num}
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${isActive ? 'text-white' : isCompleted ? 'text-emerald-400' : 'text-gray-500'}`}>{st.label}</p>
                    <p className="text-[10px] text-gray-600">Step {st.num}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-4 rounded ${isCompleted ? 'bg-emerald-800' : 'bg-gray-800'}`}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Wizard Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-gray-800/80 shadow-xl">
        <form onSubmit={handleSubmit}>

          {/* ─── STEP 1: Personal & Org Details ─── */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-white border-b border-gray-900 pb-3 font-display">Step 1: Nominee Profile & Demographics</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Nominee Type <span className="text-red-500">*</span></label>
                  <select value={formData.orgType} onChange={(e) => handleInputChange('orgType', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500">
                    <option value="Student">Student</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="Individual">Individual Changemaker</option>
                    <option value="NGO">NGO (Non-Governmental Org)</option>
                    <option value="SHG">Self Help Group (SHG)</option>
                    <option value="Startup">Social Startup</option>
                    <option value="Institution">Educational Institution</option>
                    <option value="Government Department">Government Department</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 mb-1">Full Name (Individual or Organization) <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="Enter official name" value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Gender</label>
                  <div className="flex gap-2">
                    {['male', 'female', 'other'].map(g => (
                      <button key={g} type="button" onClick={() => handleInputChange('gender', g)}
                        className={`flex-1 rounded-lg border py-2 text-xs font-semibold capitalize transition-all ${
                          formData.gender === g ? 'bg-indigo-950/60 border-indigo-500 text-indigo-400 font-bold' : 'bg-gray-950 border-gray-800 text-gray-400'
                        }`}>{g}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Mobile / WhatsApp <span className="text-red-500">*</span></label>
                  <input type="tel" required placeholder="10-digit phone" value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" required placeholder="email@example.com" value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 border-t border-gray-900 pt-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Professional Attire Photo <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      id="professionalPhoto"
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (file.size > 200 * 1024) {
                            triggerToast('Professional photo size must be less than 200KB. Please choose a smaller file.');
                            e.target.value = '';
                            return;
                          }
                          handleInputChange('professionalPhoto', file.name);
                          triggerToast(`Selected photo: ${file.name}`);
                        }
                      }}
                    />
                    <label 
                      htmlFor="professionalPhoto"
                      className="flex items-center gap-2 rounded-lg border border-dashed border-gray-800 bg-gray-950 px-4 py-2.5 text-xs text-gray-400 cursor-pointer hover:border-indigo-500/50 hover:text-white transition-colors"
                    >
                      <Upload className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                      <span className="truncate">{formData.professionalPhoto ? formData.professionalPhoto : 'Choose professional photo'}</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Nominee Address <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="Full street address" value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-900 pt-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">State <span className="text-red-500">*</span></label>
                  <select value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                    <option>Andhra Pradesh</option><option>Telangana</option><option>Karnataka</option><option>Maharashtra</option><option>Tamil Nadu</option><option>Kerala</option><option>Gujarat</option><option>Rajasthan</option><option>Uttar Pradesh</option><option>Madhya Pradesh</option><option>Delhi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">District <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="District" value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Mandal / Block <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="Mandal" value={formData.mandal}
                    onChange={(e) => handleInputChange('mandal', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Gram Panchayat (GP) <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="Gram Panchayat" value={formData.gp}
                    onChange={(e) => handleInputChange('gp', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Village <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="Village" value={formData.village}
                    onChange={(e) => handleInputChange('village', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">PIN Code <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="6-digits" value={formData.pinCode}
                    onChange={(e) => handleInputChange('pinCode', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Project Details + Category-Specific Custom Fields ─── */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-900 pb-3">
                <h3 className="text-base font-bold text-white font-display">Step 2: Project Details & Category Context</h3>
                <span className="text-xs bg-slate-900 border border-gray-800 rounded px-2.5 py-1 text-emerald-400 font-bold">{formData.category}</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Project / Initiative Title <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="e.g. Village Plastic Free Recycling Campaign"
                    value={formData.projectName} onChange={(e) => handleInputChange('projectName', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Award Category <span className="text-red-500">*</span></label>
                  <select value={formData.category} onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500">
                    {awardCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              {/* Award Guidelines Banner */}
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/30 space-y-2">
                <h4 className="font-bold text-xs text-indigo-400 font-display uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>Evaluation Benchmarks for {formData.category}</span>
                </h4>
                <p className="text-[11px] text-gray-300 leading-relaxed"><span className="font-bold text-gray-400">Objectives:</span> {activeGuide.objectives}</p>
                <p className="text-[11px] text-gray-400 leading-relaxed"><span className="font-bold text-gray-500">Required Evidence:</span> {activeGuide.requiredDocs}</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 border-t border-gray-900 pt-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Start Date <span className="text-red-500">*</span></label>
                  <input type="date" required value={formData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Completion Date <span className="text-red-500">*</span></label>
                  <input type="date" required value={formData.endDate} onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Project Execution Location <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="e.g. Ramapuram GP, Mandal 4" value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Key Objectives <span className="text-red-500">*</span></label>
                <textarea required rows={2} placeholder="What did you aim to achieve?" value={formData.objectives}
                  onChange={(e) => handleInputChange('objectives', e.target.value)}
                  className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                <div className={`text-[10px] text-right mt-1 ${getWordCount(formData.objectives) >= 50 && getWordCount(formData.objectives) <= 100 ? 'text-emerald-400 font-bold' : 'text-rose-500 font-bold'}`}>
                  {getWordCount(formData.objectives)} / 50-100 words
                </div>
              </div>

              {/* ── Category-Specific Custom Fields ── */}
              {activeCustomFields.length > 0 && (
                <div className="border-t border-gray-900 pt-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      {formData.category} — Specific Evidence Questions
                    </h4>
                    <span className="text-[10px] text-gray-500 ml-1">(All required)</span>
                  </div>
                  <div className="grid md:grid-cols-1 gap-4">
                    {activeCustomFields.map((field, idx) => (
                      <div key={field.key} className="p-4 rounded-xl bg-amber-950/10 border border-amber-900/25 space-y-2">
                        <label className="block text-xs font-bold text-amber-300">
                          Q{idx + 1}. {field.label} <span className="text-red-500">*</span>
                        </label>
                        <p className="text-[10px] text-gray-500 flex items-start gap-1.5">
                          <HelpCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-gray-600" />
                          <span>{field.placeholder}</span>
                        </p>
                        <textarea
                          rows={3}
                          required
                          placeholder={field.placeholder}
                          value={formData.customFields[field.key] || ''}
                          onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                          className="w-full rounded-lg bg-gray-950 border border-amber-900/30 px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                        <div className={`text-[10px] text-right mt-1 ${getWordCount(formData.customFields[field.key]) >= 50 && getWordCount(formData.customFields[field.key]) <= 100 ? 'text-emerald-400 font-bold' : 'text-rose-500 font-bold'}`}>
                          {getWordCount(formData.customFields[field.key])} / 50-100 words
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 border-t border-gray-900 pt-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Challenges Faced <span className="text-red-500">*</span></label>
                  <textarea rows={2} required placeholder="What roadblocks did you overcome?" value={formData.challenges}
                    onChange={(e) => handleInputChange('challenges', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                  <div className={`text-[10px] text-right mt-1 ${getWordCount(formData.challenges) >= 50 && getWordCount(formData.challenges) <= 100 ? 'text-emerald-400 font-bold' : 'text-rose-500 font-bold'}`}>
                    {getWordCount(formData.challenges)} / 50-100 words
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Key Innovations <span className="text-red-500">*</span></label>
                  <textarea rows={2} required placeholder="What unique ideas did you execute?" value={formData.innovations}
                    onChange={(e) => handleInputChange('innovations', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                  <div className={`text-[10px] text-right mt-1 ${getWordCount(formData.innovations) >= 50 && getWordCount(formData.innovations) <= 100 ? 'text-emerald-400 font-bold' : 'text-rose-500 font-bold'}`}>
                    {getWordCount(formData.innovations)} / 50-100 words
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Sustainability & Future Plan <span className="text-red-500">*</span></label>
                  <textarea rows={2} required placeholder="How will the project sustain long-term?" value={formData.sustainabilityPlan}
                    onChange={(e) => handleInputChange('sustainabilityPlan', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                  <div className={`text-[10px] text-right mt-1 ${getWordCount(formData.sustainabilityPlan) >= 50 && getWordCount(formData.sustainabilityPlan) <= 100 ? 'text-emerald-400 font-bold' : 'text-rose-500 font-bold'}`}>
                    {getWordCount(formData.sustainabilityPlan)} / 50-100 words
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Community Participation <span className="text-red-500">*</span></label>
                  <textarea rows={2} required placeholder="How did local villagers engage?" value={formData.communityParticipation}
                    onChange={(e) => handleInputChange('communityParticipation', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                  <div className={`text-[10px] text-right mt-1 ${getWordCount(formData.communityParticipation) >= 50 && getWordCount(formData.communityParticipation) <= 100 ? 'text-emerald-400 font-bold' : 'text-rose-500 font-bold'}`}>
                    {getWordCount(formData.communityParticipation)} / 50-100 words
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Government Support <span className="text-red-500">*</span></label>
                  <textarea rows={2} required placeholder="GP resolutions, block endorsements, or schemes." value={formData.governmentSupport}
                    onChange={(e) => handleInputChange('governmentSupport', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                  <div className={`text-[10px] text-right mt-1 ${getWordCount(formData.governmentSupport) >= 50 && getWordCount(formData.governmentSupport) <= 100 ? 'text-emerald-400 font-bold' : 'text-rose-500 font-bold'}`}>
                    {getWordCount(formData.governmentSupport)} / 50-100 words
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">CSR Partnership & Funding <span className="text-red-500">*</span></label>
                  <textarea rows={2} required placeholder="Private sponsorships, corporate grants, etc." value={formData.csrPartnership}
                    onChange={(e) => handleInputChange('csrPartnership', e.target.value)}
                    className="w-full rounded-lg bg-gray-950 border border-gray-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                  <div className={`text-[10px] text-right mt-1 ${getWordCount(formData.csrPartnership) >= 50 && getWordCount(formData.csrPartnership) <= 100 ? 'text-emerald-400 font-bold' : 'text-rose-500 font-bold'}`}>
                    {getWordCount(formData.csrPartnership)} / 50-100 words
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 3: SDG & LDG Mapping ─── */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-white border-b border-gray-900 pb-3 font-display">Step 3: Goal Mappings & Alignment</h3>

              <div>
                <span className="block text-xs font-bold text-gray-400 mb-2 flex items-center gap-1">
                  <span>UN Sustainable Development Goals (Select all that apply)</span>
                  <span className="text-red-500">*</span>
                  <span className="text-[10px] text-indigo-400 flex items-center gap-0.5 ml-2"><Info className="h-3.5 w-3.5" /> Primary SDG locked by category</span>
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {sdgList.map(item => {
                    const isSelected = formData.selectedSDGs.includes(item.num);
                    const isLocked = activeGuide.sdg === item.num;
                    return (
                      <button key={item.num} type="button" onClick={() => toggleSDG(item.num)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          isLocked ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400 font-bold cursor-not-allowed'
                          : isSelected ? 'bg-emerald-950/20 border-emerald-600/50 text-emerald-400 font-bold scale-[1.01]'
                          : 'bg-gray-950 border-gray-900 text-gray-400 hover:border-gray-800'
                        }`}>
                        <span>{item.text}</span>
                        {isLocked ? <span className="text-[8px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase font-black tracking-widest text-emerald-400">Locked</span>
                          : isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400 ml-1.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-gray-900 pt-5">
                <span className="block text-xs font-bold text-gray-400 mb-2 flex items-center gap-1">
                  <span>Life Development Goals (LDGs) — Soft Skills & Leadership</span>
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {ldgList.map(item => {
                    const isSelected = formData.selectedLDGs.includes(item.num);
                    return (
                      <button key={item.num} type="button" onClick={() => toggleLDG(item.num)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          isSelected ? 'bg-indigo-950/50 border-indigo-500 text-indigo-400 font-bold scale-[1.01]'
                          : 'bg-gray-950 border-gray-900 text-gray-400 hover:border-gray-800'
                        }`}>
                        <span>{item.text}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-indigo-400 ml-1.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 4: Impact Metrics ─── */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-900 pb-3">
                <h3 className="text-base font-bold text-white font-display">Step 4: Award-Specific Impact Metrics</h3>
                <span className="text-[10px] bg-slate-900 text-gray-400 border border-gray-800 px-2 py-0.5 rounded uppercase font-black tracking-wider">Filtered for {formData.category.split(' ').slice(0,2).join(' ')}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredMetrics.length === 0 ? (
                  <div className="col-span-full p-6 text-center text-gray-500 bg-gray-950 rounded-xl border border-gray-900">
                    No custom numeric metrics defined. Proceed to uploads.
                  </div>
                ) : (
                  filteredMetrics.map(m => {
                    const Icon = m.icon;
                    return (
                      <div key={m.field} className="p-3.5 bg-gray-950 rounded-xl border border-gray-900 flex items-center gap-3 hover:border-indigo-500/20 transition-all">
                        <div className={`p-2 rounded-lg bg-gray-900 border border-gray-800 ${m.color} shrink-0`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-grow">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{m.label}</label>
                          <input type="number" min="0" value={formData[m.field]}
                            onChange={(e) => handleInputChange(m.field, parseInt(e.target.value) || 0)}
                            className="w-full bg-slate-900 border border-gray-800 rounded-lg px-2 py-0.5 text-xs text-white font-bold text-right focus:outline-none focus:border-indigo-500" />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ─── STEP 5: Upload & Declaration ─── */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-white border-b border-gray-900 pb-3 font-display">Step 5: Document Uploads & Official Declaration</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input 
                    type="file" 
                    id="evidenceReportFile" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleInputChange('evidenceReport', file.name);
                        triggerToast(`Uploaded Evidence Report: ${file.name}`);
                      }
                    }} 
                  />
                  <label 
                    htmlFor="evidenceReportFile"
                    className="p-6 rounded-2xl bg-gray-950 border border-dashed border-gray-800 text-center flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/50 hover:text-white transition-colors block"
                  >
                    <Upload className="h-10 w-10 text-indigo-500 mb-3" />
                    <h4 className="font-bold text-xs text-gray-200 font-display">Upload Category Evidence Report <span className="text-red-500">*</span></h4>
                    <p className="text-[10px] text-gray-500 mt-1">{formData.evidenceReport ? `Selected: ${formData.evidenceReport}` : `Required: ${activeGuide.requiredDocs}`}</p>
                  </label>
                </div>

                <div>
                  <input 
                    type="file" 
                    id="mediaEvidenceFile" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleInputChange('mediaEvidence', file.name);
                        triggerToast(`Uploaded Media Evidence: ${file.name}`);
                      }
                    }} 
                  />
                  <label 
                    htmlFor="mediaEvidenceFile"
                    className="p-6 rounded-2xl bg-gray-950 border border-dashed border-gray-800 text-center flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/50 hover:text-white transition-colors block"
                  >
                    <Upload className="h-10 w-10 text-indigo-500 mb-3" />
                    <h4 className="font-bold text-xs text-gray-200">Upload Media Evidence <span className="text-red-500">*</span></h4>
                    <p className="text-[10px] text-gray-500 mt-1">{formData.mediaEvidence ? `Selected: ${formData.mediaEvidence}` : 'Photos, recommendation letters (PNG, JPG, PDF)'}</p>
                  </label>
                </div>
              </div>

              {/* Review Summary */}
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40">
                <h4 className="font-bold text-xs text-indigo-400 mb-3 font-display">Review Summary</h4>
                <div className="grid sm:grid-cols-3 gap-4 text-[11px] text-gray-400">
                  <div><span className="font-bold text-gray-300">Nominee:</span> {formData.fullName || 'Not specified'}</div>
                  <div><span className="font-bold text-gray-300">Project:</span> {formData.projectName || 'Not specified'}</div>
                  <div><span className="font-bold text-gray-300">GP / Village:</span> {formData.gp || ''} / {formData.village || 'Not specified'}</div>
                  <div><span className="font-bold text-gray-300">SDGs Mapped:</span> {formData.selectedSDGs.length} Goals</div>
                  <div><span className="font-bold text-gray-300">Category:</span> {formData.category}</div>
                  <div><span className="font-bold text-gray-300">Primary SDG:</span> SDG {activeGuide.sdg}</div>
                </div>

                {/* Custom fields summary */}
                {activeCustomFields.length > 0 && Object.keys(formData.customFields).length > 0 && (
                  <div className="mt-4 border-t border-indigo-900/30 pt-4 space-y-2">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Category-Specific Responses:</p>
                    {activeCustomFields.map((field) => (
                      formData.customFields[field.key] && (
                        <div key={field.key}>
                          <p className="text-[10px] font-bold text-gray-400">{field.label}:</p>
                          <p className="text-[11px] text-gray-300 italic leading-relaxed">"{formData.customFields[field.key]}"</p>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>

              {/* Declaration */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 flex items-start gap-3">
                <input type="checkbox" id="decl-check" checked={formData.declared}
                  onChange={(e) => handleInputChange('declared', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-800 bg-gray-950 text-indigo-600 focus:ring-0 mt-0.5" />
                <label htmlFor="decl-check" className="text-xs text-gray-300 leading-relaxed cursor-pointer select-none">
                  <span className="font-extrabold text-white">Declaration: </span>"I hereby certify that all information, metrics, data points, and document evidence submitted in this nomination form are true, complete, and authentic to the best of my knowledge."
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between border-t border-gray-900 pt-5">
            {currentStep > 1 ? (
              <button type="button" onClick={handleBack}
                className="flex items-center gap-1 rounded-lg border border-gray-800 bg-gray-950 px-4 py-2 text-xs font-bold text-gray-300 transition-all hover:bg-gray-900 hover:text-white">
                <ChevronLeft className="h-4 w-4" /><span>Back</span>
              </button>
            ) : <div />}

            {currentStep < 5 ? (
              <button type="button" onClick={handleNext}
                className="flex items-center gap-1 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-bold text-white transition-all hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-600/20">
                <span>Continue</span><ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="submit"
                className="flex items-center gap-1 rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-emerald-500 hover:shadow-md hover:shadow-emerald-600/20">
                <span>Submit Final Nomination</span><Check className="h-4 w-4" />
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
