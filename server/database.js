import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE_PATH = path.join(__dirname, 'db.json');
const DB_VERSION = 3; // Increment this to trigger auto-reseed on schema changes

const DEFAULT_NOMINATIONS = [
  {
    id: 'nom-101',
    fullName: 'Anjali Sharma',
    gender: 'female',
    dob: '2003-05-12',
    mobile: '9848022338',
    email: 'anjali.sharma@example.org',
    aadhaar: '123456789012',
    address: 'H-No 4-50, Main Road',
    state: 'Andhra Pradesh',
    district: 'Anantapur',
    mandal: 'Dharmavaram',
    gp: 'Ramapuram GP',
    village: 'Ramapuram',
    pinCode: '515671',
    orgType: 'Volunteer',
    projectName: 'Zero-Waste & Plastic Free Ramapuram',
    category: 'Plastic-Free Village Award',
    startDate: '2025-10-01',
    endDate: '2026-03-31',
    location: 'Ramapuram GP, Dharmavaram Mandal',
    objectives: 'Eliminate single-use plastics and introduce recycling segregation units across households.',
    challenges: 'Convincing local vendors to shift to paper bags and managing logistics of plastic trash.',
    innovations: 'Partnered with a local recycling start-up to exchange plastic scraps for eco-credits.',
    sustainabilityPlan: 'Panchayat took over the bin collection maintenance fee from April.',
    communityParticipation: '400 local youth and school students actively participated in awareness marches.',
    governmentSupport: 'Received GP resolution certificate endorsing the zero-waste policy.',
    csrPartnership: 'Rs 1 Lakh grant from Green India Foundation CSR.',
    customFields: {
      sortingSystem: 'Set up 12 color-coded dry/wet bins across 4 wards. Partnered with Ramapuram Green Recyclers to buy plastic at Rs 8/kg. Covers all 320 households.',
      plasticReduction: 'Conducted 6 weekend awareness marches, distributed 600 free cloth bags, inspected 28 shops monthly to ban 5-layer plastic usage. Reduced usage by 70%.'
    },
    selectedSDGs: [12, 11, 15],
    selectedLDGs: [2, 3, 10],
    metricVillages: 1,
    metricHouseholds: 320,
    metricBeneficiaries: 1200,
    metricStudents: 150,
    metricWomen: 210,
    metricFarmers: 50,
    metricVolunteers: 45,
    metricTrees: 180,
    metricPlastic: 2500,
    metricWaterBodies: 0,
    metricHarvesting: 0,
    metricJobs: 4,
    metricSkills: 12,
    metricCarbon: 120,
    status: 'Award Winner',
    declared: true,
    image: '/images/plastic-free.png',
    juryScores: {
      sortingEfficiency: 32,
      recyclingYield: 30,
      communityBan: 18,
      sdg12Contribution: 8
    },
    juryRemarks: 'Verified by ground inspection. Superb community participation. GP has passed a formal resolution. Sorting stations operational and MoU with recycler confirmed.',
    fieldVisit: '2026-06-15'
  },
  {
    id: 'nom-102',
    fullName: 'Green Youth Club NGO',
    gender: 'other',
    dob: '2015-08-20',
    mobile: '8897044551',
    email: 'kothur.greenclub@example.org',
    aadhaar: '',
    address: 'Sector 3, Community Center',
    state: 'Telangana',
    district: 'Mahabubnagar',
    mandal: 'Jadcherla',
    gp: 'Kothur GP',
    village: 'Kothur',
    pinCode: '509301',
    orgType: 'NGO',
    projectName: 'Reviving Kothur Irrigation Lakes',
    category: 'Water Conservation Award',
    startDate: '2025-05-15',
    endDate: '2025-11-20',
    location: 'Kothur GP, Jadcherla Mandal',
    objectives: 'De-silting old check dams and installing rainwater harvest models to recharge ground wells.',
    challenges: 'Hard rock terrain which slowed down trench digging; sourcing low-cost filtering materials.',
    innovations: 'Adopted low-cost vernacular sand-gravel filters for community borehole recharge.',
    sustainabilityPlan: 'Formed a Kothur Water Users Association to run periodic maintenance.',
    communityParticipation: 'Villagers contributed Shramdaan (voluntary labor) worth Rs 1.5 Lakhs.',
    governmentSupport: 'Assisted by District Irrigation engineers with topographical maps.',
    csrPartnership: 'Sponsored by HydroCorp CSR under water stewardship agenda.',
    customFields: {
      desilting: 'De-silted 3 irrigation tanks removing 2,400 cubic metres of silt. Cleared 1.2 km of main drainage channels and widened 6 blocked discharge outlets for monsoon overflow.',
      harvesting: 'Constructed 15 recharge shafts (3-ft dia, 20-ft deep) using sand-gravel filter beds near the main tanks. Groundwater level rose by 4.2 feet post-monsoon per DTDWM survey.'
    },
    selectedSDGs: [6, 15, 17],
    selectedLDGs: [2, 3, 4],
    metricVillages: 2,
    metricHouseholds: 560,
    metricBeneficiaries: 2400,
    metricStudents: 0,
    metricWomen: 450,
    metricFarmers: 380,
    metricVolunteers: 68,
    metricTrees: 450,
    metricPlastic: 0,
    metricWaterBodies: 3,
    metricHarvesting: 15,
    metricJobs: 8,
    metricSkills: 35,
    metricCarbon: 0,
    status: 'Award Winner',
    declared: true,
    image: '/images/water-conservation.png',
    juryScores: {
      desiltVolume: 33,
      rechargeRate: 32,
      waterSharing: 18,
      sdg6Alignment: 9
    },
    juryRemarks: 'High water volume storage capacity added. Formed water users group ensuring sustainability. District Irrigation validated ground report. Excellent documentation.',
    fieldVisit: '2026-06-18'
  },
  {
    id: 'nom-103',
    fullName: 'Vikas Academy',
    gender: 'other',
    dob: '2010-01-01',
    mobile: '9123456789',
    email: 'contact@vikasacademy.org',
    aadhaar: '',
    address: 'Near Fort Road',
    state: 'Karnataka',
    district: 'Hassan',
    mandal: 'Halebidu',
    gp: 'Halebidu GP',
    village: 'Halebidu',
    pinCode: '573121',
    orgType: 'Institution',
    projectName: 'Rural Digital Labs for Schools',
    category: 'Digital Village Award',
    startDate: '2026-01-10',
    endDate: '',
    location: 'Halebidu Village government schools',
    objectives: 'Providing computer labs, digital literacy, and basic coding courses to 5 rural schools.',
    challenges: 'Frequent power cuts in the village required us to configure solar batteries.',
    innovations: 'Used Raspberry Pi mini-computers to drastically minimize power and cost.',
    sustainabilityPlan: 'Instituted nominal computer fee (Rs 20/month) to pay for internet subscription.',
    communityParticipation: 'School committees provided the room and managed power wiring.',
    governmentSupport: 'Authorized by Hassan District Education Office.',
    csrPartnership: 'Supported by TechLabs Ltd providing refurbished computers.',
    customFields: {
      internetAccess: '30 Raspberry Pi nodes with 50Mbps fiber broadband running on 2 kW solar + 2x200Ah battery backup. 3 outdoor hotspot antennas covering main street and market. 99.2% uptime.',
      digitalTraining: 'Trained 420 villagers in UPI payments, DigiLocker, and PFMS portal access. 18 workshops across 5 schools. 85% of student families onboarded to digital bill payments.'
    },
    selectedSDGs: [4, 9, 10],
    selectedLDGs: [5, 9, 10],
    metricVillages: 3,
    metricHouseholds: 0,
    metricBeneficiaries: 850,
    metricStudents: 850,
    metricWomen: 410,
    metricFarmers: 0,
    metricVolunteers: 12,
    metricTrees: 0,
    metricPlastic: 0,
    metricWaterBodies: 0,
    metricHarvesting: 0,
    metricJobs: 2,
    metricSkills: 420,
    metricCarbon: 0,
    status: 'Award Winner',
    declared: true,
    image: '/images/digital-village.png',
    juryScores: {
      broadbandSpeed: 31,
      digitalLiteracy: 32,
      localTechJobs: 18,
      sdg9Alignment: 9
    },
    juryRemarks: 'High utility digital inclusion. Kids have shown active learning metrics in testing. Sustainable fee model confirms long-term viability. Well documented project.',
    fieldVisit: '2026-06-20'
  }
];

const DEFAULT_NOTIFICATIONS = [
  { id: 1, title: 'Nomination Submitted', message: 'Nomination for "Zero-Waste Ramapuram" received under Plastic-Free Category.', time: '2 hrs ago', read: false },
  { id: 2, title: 'Field Visit Logged', message: 'Jury member mapped a ground verification schedule for Kothur lakes on June 18.', time: '1 day ago', read: false },
  { id: 3, title: 'Secretary Endorsement', message: 'Sec. R.K. Prasad signed digital credentials for Category 3 winners.', time: '3 days ago', read: true }
];

// Helper to read database
function readDB() {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      const initialData = { version: DB_VERSION, nominations: DEFAULT_NOMINATIONS, notifications: DEFAULT_NOTIFICATIONS };
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const fileContent = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(fileContent);

    // Auto-migrate: if db version is missing or outdated, reseed
    if (!parsed.version || parsed.version < DB_VERSION) {
      console.log(`[DB] Schema version mismatch (found: ${parsed.version ?? 'none'}, required: ${DB_VERSION}). Re-seeding database...`);
      const freshData = { version: DB_VERSION, nominations: DEFAULT_NOMINATIONS, notifications: DEFAULT_NOTIFICATIONS };
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(freshData, null, 2), 'utf-8');
      return freshData;
    }
    return parsed;
  } catch (error) {
    console.error('Error reading JSON database:', error);
    return { version: DB_VERSION, nominations: [], notifications: [] };
  }
}

// Helper to write database
function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing JSON database:', error);
  }
}

export const db = {
  getNominations: () => {
    return readDB().nominations;
  },

  saveNomination: (nomination) => {
    let defaultImage = '/images/plastic-free.png';
    const categoryLower = nomination.category.toLowerCase();
    if (categoryLower.includes('water') || categoryLower.includes('conservation')) {
      defaultImage = '/images/water-conservation.png';
    } else if (categoryLower.includes('digital') || categoryLower.includes('smart') || categoryLower.includes('education')) {
      defaultImage = '/images/digital-village.png';
    }
    nomination.image = defaultImage;

    const data = readDB();
    data.nominations.unshift(nomination);
    writeDB(data);
    return nomination;
  },

  updateNominationStatus: (id, status) => {
    const data = readDB();
    data.nominations = data.nominations.map(n => {
      if (n.id === id) {
        return { ...n, status };
      }
      return n;
    });
    writeDB(data);
    return data.nominations.find(n => n.id === id);
  },

  addJuryScores: (id, scores, remarks, fieldVisit) => {
    const data = readDB();
    data.nominations = data.nominations.map(n => {
      if (n.id === id) {
        return {
          ...n,
          juryScores: scores,
          juryRemarks: remarks,
          fieldVisit
        };
      }
      return n;
    });
    writeDB(data);
    return data.nominations.find(n => n.id === id);
  },

  getNotifications: () => {
    return readDB().notifications;
  },

  saveNotification: (notif) => {
    const data = readDB();
    data.notifications.unshift(notif);
    writeDB(data);
    return notif;
  },

  clearNotifications: () => {
    const data = readDB();
    data.notifications = data.notifications.map(n => ({ ...n, read: true }));
    writeDB(data);
    return data.notifications;
  }
};
