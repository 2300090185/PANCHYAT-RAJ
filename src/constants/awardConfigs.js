export const categoryCustomFields = {
  'Village Development Award': [
    { key: 'infraUpgrade', label: 'Sanitation & Roads Infrastructure Details', placeholder: 'Describe details of layout roads, sanitation drains, public lighting, etc.' },
    { key: 'publicAmenities', label: 'Public Utility Upgrades & Welfare Buildings', placeholder: 'Provide details about upgrades to community centers, drinking water wells, or school utilities.' }
  ],
  'Smart Village Award': [
    { key: 'solarGrid', label: 'Renewable Solar Micro-grid Capacity (kW) & Storage', placeholder: 'Specify capacity in kW, household coverage, battery backup systems, etc.' },
    { key: 'digitalHub', label: 'Common Service Centres & Public Wi-Fi Details', placeholder: 'Provide details on internet availability, services rendered, and monthly usage metrics.' }
  ],
  'Plastic-Free Village Award': [
    { key: 'sortingSystem', label: 'Dry/Wet Sorting System & Recycling Buy-back Details', placeholder: 'Describe waste sorting facilities, schedules, and partnerships with recycling units.' },
    { key: 'plasticReduction', label: 'Single-use Plastic Ban Campaigns & Enforcement', placeholder: 'Detail the local awareness drives, store checks, and cloth bag distribution campaigns.' }
  ],
  'Green Village Award': [
    { key: 'compostBioGas', label: 'Compost & Bio-Gas Infrastructure Implemented', placeholder: 'Detail community compost bins, domestic or community bio-gas plant installs.' },
    { key: 'carbonNeutrality', label: 'Carbon Neutrality Initiatives & Community Projects', placeholder: 'List projects like solar streetlights, tree cover enhancement, or woodstove replacements.' }
  ],
  'Water Conservation Award': [
    { key: 'desilting', label: 'Water Body De-silting & Drain Cleared', placeholder: 'Describe depth added to lakes/check-dams, volume of silt excavated, and length of drains cleared.' },
    { key: 'harvesting', label: 'Rainwater Harvest Shafts & Artificial Recharge Methods', placeholder: 'Explain layout of recharge shafts, household pit counts, and groundwater level impacts.' }
  ],
  'Education Excellence Award': [
    { key: 'classroomUpgrades', label: 'Classroom Digital Dividends & Infrastructure', placeholder: 'List computer systems, audio-visual aids, library books, and school furniture added.' },
    { key: 'enrollmentCampaign', label: 'Retention, Tutoring Camps, & Literacy Campaigns', placeholder: 'Describe bridge programs, summer tutoring camps, and child dropout tracking methods.' }
  ],
  'Health & Hygiene Award': [
    { key: 'medicalCamps', label: 'Primary Health Camps & Medical Kit Distribution', placeholder: 'Specify number of camps, specialists involved, and types of health kits distributed.' },
    { key: 'wasteManagement', label: 'Liquid Waste Management & Open Defecation Free Maintenance', placeholder: 'Describe soak pits, drainage connections, and ODF sustainment activities.' }
  ],
  'Women Empowerment Award': [
    { key: 'shgFinances', label: 'Self Help Group (SHG) Savings & Micro-credit Ledger', placeholder: 'Provide totals of microloans disbursed, active members, and savings accumulated.' },
    { key: 'skillsLivelihood', label: 'Handicraft, Tailoring, & Livelihood Skill Camps', placeholder: 'Describe course durations, machinery provided, and certificates issued.' }
  ],
  'Agriculture Innovation Award': [
    { key: 'irrigationSetup', label: 'Precision Drip-Irrigation & Farm Pond Setups', placeholder: 'Specify acreage covered under micro-irrigation, count of farm ponds dug, etc.' },
    { key: 'organicMethods', label: 'Organic Bio-fertilizers & Soil Health Card Adoption', placeholder: 'Detail organic composting units set up and percentage of farmers holding active soil cards.' }
  ],
  'Digital Village Award': [
    { key: 'internetAccess', label: 'Broadband Connectivity & Wi-Fi Hotspots Setup', placeholder: 'List locations of network nodes, backup power configurations, and speeds.' },
    { key: 'digitalTraining', label: 'Digital Literacy Drives & Mobile Payment Onboarding', placeholder: 'Explain sessions held to teach digital banking, tax payments, and mobile app usage.' }
  ],
  'Youth Leadership Award': [
    { key: 'sabhaParticipation', label: 'Youth Representation in Gram Sabha / Committees', placeholder: 'Describe local youth panels created and their role in local governance decisions.' },
    { key: 'youthWelfare', label: 'Drug Awareness, Sports Clubs, or Leadership Camps Run', placeholder: 'List campaigns, tournaments organized, and participant counts.' }
  ],
  'Best Volunteer Award': [
    { key: 'hoursLog', label: 'Total Voluntary Service Hours & Key Milestones', placeholder: 'Detail hours logged, projects supported, and community endorsements.' },
    { key: 'crisisResponse', label: 'Disaster Mitigation / Relief Support Actions', placeholder: 'Specify support provided during floods, pandemics, heatwaves, or other crises.' }
  ],
  'Best NGO Award': [
    { key: 'adoptionModel', label: 'Multi-year Village Adoption & Welfare Frameworks', placeholder: 'Describe the adoption framework, government schemes integrated, and project lifecycle.' },
    { key: 'csrFunding', label: 'NGO Audited Funds Utilization & CSR Partners', placeholder: 'Provide details on funds deployed, main sponsors, and compliance standings.' }
  ],
  'Social Entrepreneurship Award': [
    { key: 'revenueSustain', label: 'Revenue Generation & Self-Sustenance Model', placeholder: 'Explain the pricing model, sales channels, and path to operational break-even.' },
    { key: 'localJobs', label: 'Employment Ledger & Local Product Supply Chain', placeholder: 'Specify jobs generated, wage brackets, and how local raw materials are utilized.' }
  ],
  'Climate Action Award': [
    { key: 'afforestationArea', label: 'Geo-tagged Afforestation Acreage & Biodiversity Index', placeholder: 'Specify acres planted, survival rate checks, and variety of indigenous saplings.' },
    { key: 'renewableShift', label: 'Solar/LED Conversions & Energy Efficiency Audits', placeholder: 'Specify solar power generated (kWh), smart grid shift, and light upgrade volumes.' }
  ],
  'Biodiversity Conservation Award': [
    { key: 'faunaFloraProtection', label: 'Local Flora & Wildlife Track Conservation', placeholder: 'Detail protection areas, local species documented, and boundary fences built.' },
    { key: 'seedBanks', label: 'Indigenous Seed Banks & Herbal Gardens Set Up', placeholder: 'Describe seed storage volumes, seed varieties preserved, and herbal garden layouts.' }
  ]
};

export const categoryJuryCriteria = {
  'Village Development Award': [
    { key: 'infraQuality', label: 'Sanitation & Roads Quality', weight: 30, desc: 'Assess durability of layout roads, sanitation drains, public lighting, and utility upgrades.' },
    { key: 'publicUtility', label: 'Public Utility Upgrades', weight: 30, desc: 'Evaluate improvements to community buildings, drinking water wells, and other public facilities.' },
    { key: 'sdg11Alignment', label: 'SDG 11 Alignment', weight: 20, desc: 'Review how effectively the project addresses sustainable community benchmarks.' },
    { key: 'communityMobilization', label: 'Community Mobilization', weight: 20, desc: 'Examine Panchayat endorsement level and local youth volunteer participation.' }
  ],
  'Smart Village Award': [
    { key: 'solarGridPower', label: 'Solar Grid Capacity & Power Output', weight: 35, desc: 'Assess total capacity installed (kW), household coverage, and backup infrastructure reliability.' },
    { key: 'digitalServices', label: 'Common Service Centres & Digital Services', weight: 35, desc: 'Evaluate public internet accessibility, center efficiency, and services accessed per month.' },
    { key: 'techInnovation', label: 'Smart Technology Integration', weight: 20, desc: 'Rate the uniqueness and adaptability of solar or internet tech components used.' },
    { key: 'sustainPlan', label: 'Upkeep & Financial Sustainability', weight: 10, desc: 'Measure the strength of user fee collections or long-term operational plans.' }
  ],
  'Plastic-Free Village Award': [
    { key: 'sortingEfficiency', label: 'Waste Segregation Processes & Bins', weight: 35, desc: 'Examine garbage segregation rates at household levels and sorting hub operations.' },
    { key: 'recyclingYield', label: 'Plastic Recycled Volume & MoUs', weight: 35, desc: 'Review total kg of single-use plastic collected and formal contract terms with processing factories.' },
    { key: 'communityBan', label: 'Single-Use Plastic Ban Enforcement', weight: 20, desc: 'Rate localized shop inspections, vendor compliance, and usage of alternative carry bags.' },
    { key: 'sdg12Contribution', label: 'SDG 12 Alignment', weight: 10, desc: 'Verify connection to responsible consumption and recycling goals.' }
  ],
  'Green Village Award': [
    { key: 'compostBioGas', label: 'Compost & Bio-Gas Infrastructure Setup', weight: 35, desc: 'Examine setup quality of composting units, organic fertilizer heaps, and bio-gas pipes.' },
    { key: 'carbonFootprint', label: 'Carbon Neutrality & Emission Reductions', weight: 35, desc: 'Estimate shift away from firewood or chemical inputs, plus smart lighting audits.' },
    { key: 'stewardship', label: 'Green Cover & Afforestation Action', weight: 20, desc: 'Evaluate village afforestation density and community tree maintenance.' },
    { key: 'longTermSustain', label: 'Maintenance & Self-Sufficiency Policy', weight: 10, desc: 'Review Panchayat regulations ensuring green infrastructure upkeep.' }
  ],
  'Water Conservation Award': [
    { key: 'desiltVolume', label: 'Lake & Drainage De-silting Volume', weight: 35, desc: 'Assess the physical space cleared in lakes, channels excavated, and de-silting efficiency.' },
    { key: 'rechargeRate', label: 'Recharge Wells & Shafts Setup', weight: 35, desc: 'Examine water redirection shafts, filtration materials, and groundwater level indicators.' },
    { key: 'waterSharing', label: 'Water Users Association Governance', weight: 20, desc: 'Review water allocation rules, association meeting registry, and maintenance collections.' },
    { key: 'sdg6Alignment', label: 'SDG 6 Integration', weight: 10, desc: 'Rate alignment with clean water access and water security objectives.' }
  ],
  'Education Excellence Award': [
    { key: 'digitalClassroom', label: 'Digital Classroom Nodes & Libraries Setup', weight: 35, desc: 'Measure the number of computers installed, cataloged library books, and solar battery storage.' },
    { key: 'retentionRate', label: 'Student Enrollment & Retention Progress', weight: 35, desc: 'Review attendance registers, bridge camp attendance, and drop-out rates reduction.' },
    { key: 'volunteerHours', label: 'Tutors & Leaders Mobilization', weight: 20, desc: 'Count volunteer teaching hours and student feedback ratings.' },
    { key: 'sdg4Alignment', label: 'SDG 4 Alignment', weight: 10, desc: 'Verify quality education target mapping and curriculum standard adjustments.' }
  ],
  'Health & Hygiene Award': [
    { key: 'medicalCampReach', label: 'Check-up Camps & Kit Beneficiaries', weight: 35, desc: 'Assess number of clinical camps held, total patients checked, and medicine supply records.' },
    { key: 'liquidWaste', label: 'Drainage & Waste Management Infrastructure', weight: 35, desc: 'Evaluate community soak pits, sewage channels, and ODF validation stamps.' },
    { key: 'communityHygiene', label: 'Sanitation Drive Awareness', weight: 20, desc: 'Rate community participation in sanitation drives and general cleanliness indicators.' },
    { key: 'sdg3Alignment', label: 'SDG 3 Support', weight: 10, desc: 'Examine integration with primary healthcare and wellness objectives.' }
  ],
  'Women Empowerment Award': [
    { key: 'shgBanking', label: 'SHG Savings, Banking & Credit Records', weight: 35, desc: 'Evaluate financial record keeping, loans disbursed, and SHG credit rating levels.' },
    { key: 'livelihoodSkills', label: 'Tailoring, Handcraft & Small Trade Training', weight: 35, desc: 'Assess tailoring node capacities, tools provided, and job placement counts.' },
    { key: 'employmentGenerated', label: 'Direct Self-Employment Created', weight: 20, desc: 'Verify monthly earnings increase of trained women and enterprise sustainability.' },
    { key: 'sdg5Alignment', label: 'SDG 5 Alignment', weight: 10, desc: 'Validate contributions to gender equity and economic self-reliance.' }
  ],
  'Agriculture Innovation Award': [
    { key: 'dripPrecision', label: 'Drip Irrigation & Farm Ponds Setup', weight: 35, desc: 'Verify exact acreage equipped with drip valves and water storage capacity added.' },
    { key: 'organicBioInputs', label: 'Organic Fertilizer Adoption & Soil Card Usage', weight: 35, desc: 'Rate bio-compost distribution volumes and percentage of soils analyzed.' },
    { key: 'farmerIncome', label: 'Yield and Crop Marketing Improvement', weight: 20, desc: 'Assess crop storage setups, collective marketing groups, and income trends.' },
    { key: 'sdg2Alignment', label: 'SDG 2 Support', weight: 10, desc: 'Verify hunger reduction measures and sustainable soil practices.' }
  ],
  'Digital Village Award': [
    { key: 'broadbandSpeed', label: 'Broadband Connectivity & Wi-Fi Coverage', weight: 35, desc: 'Assess fiber/wireless coverage quality, hotspot hardware configurations, and uptime.' },
    { key: 'digitalLiteracy', label: 'Panchayat UPI & Digital Utility Adoption', weight: 35, desc: 'Rate active mobile payment users and percentage of villagers trained in online transactions.' },
    { key: 'localTechJobs', label: 'Local Job Creation in IT/Services', weight: 20, desc: 'Verify training certifications and jobs generated within local information offices.' },
    { key: 'sdg9Alignment', label: 'SDG 9 Integration', weight: 10, desc: 'Evaluate local innovation and infrastructure expansion strengths.' }
  ],
  'Youth Leadership Award': [
    { key: 'sabhaInfluence', label: 'Youth Representation in Panchayat Councils', weight: 35, desc: 'Examine youth presence in village development planning meetings.' },
    { key: 'campaignLeadership', label: 'Anti-drug & Sports Campaigns Led', weight: 35, desc: 'Evaluate impact of youth-led campaigns and tournament setups.' },
    { key: 'peerMobilization', label: 'Youth Volunteers Mobilized', weight: 20, desc: 'Rate number of active youth volunteers trained for community service.' },
    { key: 'sdg16Alignment', label: 'SDG 16 Support', weight: 10, desc: 'Measure development of transparent and inclusive local institutions.' }
  ],
  'Best Volunteer Award': [
    { key: 'volunteerImpact', label: 'Voluntary Service Hours & Achievements', weight: 40, desc: 'Verify documented service logbooks and signatures from Panchayat heads.' },
    { key: 'crisisRelief', label: 'Disaster Relief (Flood/Covid) Support', weight: 40, desc: 'Evaluate emergency response execution, food/medical supply delivery, and grit.' },
    { key: 'peerReference', label: 'NSS/NCC Endorsements & References', weight: 20, desc: 'Review letters of recommendation and character records from regional coordinators.' }
  ],
  'Best NGO Award': [
    { key: 'adoptionModel', label: 'Village Adoption & Multi-year Programs', weight: 35, desc: 'Assess long-term development plans, structural sustainability, and Gram Panchayat coordination.' },
    { key: 'auditFinance', label: 'Audited Balance Sheets & Fund Utilization', weight: 35, desc: 'Examine financial reports, overhead-to-benefit ratios, and compliance.' },
    { key: 'csrPartnership', label: 'Corporate Sponsors & Scale of Funding', weight: 20, desc: 'Verify co-funding levels and validation from external corporate CSR officers.' },
    { key: 'sdg17Alignment', label: 'SDG 17 Alignment', weight: 10, desc: 'Evaluate strength of multi-stakeholder partnerships and global target mappings.' }
  ],
  'Social Entrepreneurship Award': [
    { key: 'bizViability', label: 'Revenue Model & Self-Reliance Viability', weight: 35, desc: 'Assess market demand, sales figures, and operational independence from grants.' },
    { key: 'jobGeneration', label: 'Direct Salaries & Job Generation', weight: 35, desc: 'Verify payroll logs, local employment growth, and skill improvement.' },
    { key: 'supplyChain', label: 'Clean Fuel/Products Supply Gaps Closed', weight: 20, desc: 'Evaluate local product sourcing and solutions to village logistical issues.' },
    { key: 'sdg8Alignment', label: 'SDG 8 Alignment', weight: 10, desc: 'Check compliance with decent work standards and local economic development.' }
  ],
  'Climate Action Award': [
    { key: 'afforestationScale', label: 'Acreage, Seedling Survival & Tree Species', weight: 40, desc: 'Verify plantation scale, survival rates, and diversity of tree types planted.' },
    { key: 'energyEfficiency', label: 'LED/Solar Power Conversions & Energy Audits', weight: 40, desc: 'Evaluate energy saved (kWh) by conversion of streetlights, water pumps, etc.' },
    { key: 'environmentalAwareness', label: 'Climate Mitigation Campaigns', weight: 20, desc: 'Examine local workshops on carbon footprint and environment drives.' }
  ],
  'Biodiversity Conservation Award': [
    { key: 'habitatConservation', label: 'Flora and Fauna Tracks Protection', weight: 35, desc: 'Examine boundaries secured, native plantings restored, and wildlife tracking methods.' },
    { key: 'seedBankDiversity', label: 'Seed Banks & Local Herbal Zone Setups', weight: 35, desc: 'Rate number of rare crop seed varieties stored and herbal zones built.' },
    { key: 'communityVBR', label: 'Village Biodiversity Register Maintenance', weight: 20, desc: 'Verify registration compliance and completeness of local biodiversity catalog.' },
    { key: 'sdg15Alignment', label: 'SDG 15 Integration', weight: 10, desc: 'Measure contribution to protecting and restoring terrestrial ecosystems.' }
  ]
};
