import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PublicPortal from './components/PublicPortal';
import NominationForm from './components/NominationForm';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import JuryPortal from './components/JuryPortal';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import { Award, ArrowRight, ShieldCheck, X, Send, Bot, FileText, Copy, QrCode, CheckCircle2, Printer } from 'lucide-react';
import { translations } from './constants/translations';

const inlineTranslations = {
  "ENG": {
    "aboutHeader": "About the Recognition Initiative",
    "aboutSub": "An official national program strengthening grassroots democracy and Viksit Bharat 2047.",
    "govStructure": "Governance Structure",
    "govDesc1": "The portal operates under a tripartite verification schema. Youth, NGOs, and community builders register their localized works. Ground-level verification is driven by Gram Panchayat members, District Welfare offices, and NSS/NCC coordinators.",
    "govDesc2": "Evaluations are transparent and structured on a 100-point index reviewed by regional academic and government jury panels before final blockchain-secured certificate signatures are cleared by the State Secretary of Rural Development.",
    "viksitBharatTitle": "Viksit Bharat",
    "viksitBharatDesc": "Driving youth participation in grassroots governance & development.",
    "govCollabTitle": "Government Collaboration",
    "govCollabDesc": "Collaborating directly with Mandal Parishads, Gram Panchayats, and CSR partners to bridge micro-funding into local transformation ideas.",
    "awardsDirHeader": "Award Categories Directory",
    "awardsDirSub": "We recognize 16 specialized spheres of rural and urban social engineering.",
    "autoCheck": "Automatic Eligibility Check",
    "autoCheckDesc": "Submit a project in the nominee wizard, select your target category, and the system automatically matches your entry to corresponding SDGs.",
    "openWizard": "Open Nomination wizard",
    "evalJury": "Evaluated by Regional Jury panels.",
    "myStatusHeader": "My Nomination Status",
    "myStatusSub": "Track the live evaluation progress of your submitted social impact applications.",
    "noAppsFound": "No applications found. Fill out a nomination first.",
    "panchayatLocation": "Panchayat Location",
    "juryGrading": "Jury Grading",
    "pendingEval": "Pending evaluation",
    "totalPoints": "Total Points",
    "fieldInspection": "Field Inspection",
    "notScheduled": "Not scheduled yet",
    "scheduledOn": "Scheduled: ",
    "reviewRemarks": "Official Review Remarks:",
    "timelineTitle": "Multi-Level Approval Workflow Timeline",
    "stepSubmitted": "Submitted",
    "stepDistrict": "District Cleared",
    "stepState": "State Endorsed",
    "stepJury": "National Jury",
    "stepMinistry": "Ministry Final"
  },
  "HIN": {
    "aboutHeader": "मान्यता पहल के बारे में",
    "aboutSub": "जमीनी स्तर के लोकतंत्र और विकसित भारत 2047 को मजबूत करने वाला एक आधिकारिक राष्ट्रीय कार्यक्रम।",
    "govStructure": "शासन संरचना",
    "govDesc1": "पोर्टल एक त्रिपक्षीय सत्यापन योजना के तहत संचालित होता है। युवा, गैर सरकारी संगठन और समुदाय निर्माता अपने स्थानीयकृत कार्यों को पंजीकृत करते हैं। जमीनी स्तर पर सत्यापन ग्राम पंचायत सदस्यों, जिला कल्याण कार्यालयों और एनएसएस/एनसीसी समन्वयकों द्वारा किया जाता है।",
    "govDesc2": "मूल्यांकन पारदर्शी हैं और राज्य ग्रामीण विकास सचिव द्वारा अंतिम ब्लॉकचेन-सुरक्षित प्रमाणपत्र हस्ताक्षरों को मंजूरी देने से पहले क्षेत्रीय शैक्षणिक और सरकारी जूरी पैनलों द्वारा समीक्षा किए गए 100-बिंदू सूचकांक पर संरचित हैं।",
    "viksitBharatTitle": "विकसित भारत",
    "viksitBharatDesc": "जमीनी स्तर पर शासन और विकास में युवाओं की भागीदारी को बढ़ावा देना।",
    "govCollabTitle": "सरकारी सहयोग",
    "govCollabDesc": "स्थानीय परिवर्तन विचारों में सूक्ष्म वित्त पोषण को जोड़ने के लिए मण्डल परिषदों, ग्राम पंचायतों और सीएसआर भागीदारों के साथ सीधे सहयोग करना।",
    "awardsDirHeader": "पुरस्कार श्रेणियाँ निर्देशिका",
    "awardsDirSub": "हम ग्रामीण और शहरी सामाजिक इंजीनियरिंग के 16 विशेष क्षेत्रों को मान्यता देते हैं।",
    "autoCheck": "स्वचालित पात्रता जांच",
    "autoCheckDesc": "नामांकित विज़ार्ड में एक परियोजना सबमिट करें, अपनी लक्षित श्रेणी चुनें, और सिस्टम स्वचालित रूप से आपकी प्रविष्टि को संबंधित एसडीजी से मिलाता है।",
    "openWizard": "नामांकन विज़ार्ड खोलें",
    "evalJury": "क्षेत्रीय जूरी पैनलों द्वारा मूल्यांकन किया गया।",
    "myStatusHeader": "मेरे नामांकन की स्थिति",
    "myStatusSub": "अपने प्रस्तुत सामाजिक प्रभाव अनुप्रयोगों के लाइव मूल्यांकन प्रगति को ट्रैक करें।",
    "noAppsFound": "कोई आवेदन नहीं मिला। पहले एक नामांकन भरें।",
    "panchayatLocation": "पंचायत स्थान",
    "juryGrading": "जूरी ग्रेडिंग",
    "pendingEval": "मूल्यांकन लंबित है",
    "totalPoints": "कुल अंक",
    "fieldInspection": "क्षेत्र निरीक्षण",
    "notScheduled": "अभी तक शेड्यूल नहीं किया गया",
    "scheduledOn": "शेड्यूल किया गया: ",
    "reviewRemarks": "आधिकारिक समीक्षा टिप्पणियां:",
    "timelineTitle": "बहु-स्तरीय अनुमोदन कार्यप्रवाह समयरेखा",
    "stepSubmitted": "प्रस्तुत किया गया",
    "stepDistrict": "जिला स्वीकृत",
    "stepState": "राज्य समर्थित",
    "stepJury": "राष्ट्रीय जूरी",
    "stepMinistry": "मंत्रालय अंतिम"
  },
  "TEL": {
    "aboutHeader": "ఈ గుర్తింపు చొరవ గురించి",
    "aboutSub": "క్షేత్రస్థాయి ప్రజాస్వామ్యాన్ని మరియు వికసిత్ భారత్ 2047 ను బలోపేతం చేసే అధికారిక జాతీయ కార్యక్రమం.",
    "govStructure": "పాలనా నిర్మాణం",
    "govDesc1": "ఈ పోర్టల్ త్రైపాక్షిక ధృవీకరణ విధానం కింద పనిచేస్తుంది. యువత, స్వచ్ఛంద సంస్థలు మరియు సమాజ నిర్మాతలు వారి స్థానిక పనులను నమోదు చేస్తారు. క్షేత్రస్థాయి ధృవీకరణను గ్రామ పంచాయతీ సభ్యులు, జిల్లా సంక్షేమ కార్యాలయాలు మరియు NSS/NCC సమన్వయకర్తలు నిర్వహిస్తారు.",
    "govDesc2": "రాష్ట్ర గ్రామీణాభివృద్ధి కార్యదర్శి తుది బ్లాక్‌చైన్-సురక్షిత సర్టిఫికేట్ సంతకాలను క్లియర్ చేయడానికి ముందు ప్రాంతీయ విద్యా మరియు ప్రభుత్వ జూరీ ప్యానెల్‌లు సమీక్షించిన 100-పాయింట్ల సూచీపై మూల్యాంకనాలు పారదర్శకంగా మరియు నిర్మాణాत्मकకంగా ఉంటాయి.",
    "viksitBharatTitle": "వికసిత్ భారత్",
    "viksitBharatDesc": "క్షేత్రస్థాయి పాలన మరియు అభివృద్ధిలో యువత భాగస్వామ్యాన్ని పెంపొందించడం.",
    "govCollabTitle": "ప్రభుత్వ సహకారం",
    "govCollabDesc": "స్థానిక పరివర్తన ఆలోచనలలోకి సూక్ష్మ నిధులను అనుసంధానించడానికి మండల పరిషత్తులు, గ్రామ పంచాయతీలు మరియు CSR భాగస్వాములతో నేరుగా సహకరించడం.",
    "awardsDirHeader": "అవార్డు వర్గాల డైరెక్టరీ",
    "awardsDirSub": "మేము గ్రామీణ మరియు పట్టణ సామాజిక ఇంజనీరింగ్ యొక్క 16 ప్రత్యేక విభాగాలను గుర్తిస్తాము.",
    "autoCheck": "స్వయంచాలక అర్హత తనిఖీ",
    "autoCheckDesc": "నామినీ విజార్డ్‌లో ప్రాజెక్ట్‌ను సమర్పించి, మీ లక్ష్య వర్గాన్ని ఎంచుకోండి, సిస్టమ్ స్వయంచాలకంగా మీ ఎంట్రీని సంబంధిత SDGs తో సరిపోల్చుతుంది.",
    "openWizard": "నామినేషన్ విజార్డ్‌ను తెరవండి",
    "evalJury": "ప్రాంతీయ జూరీ ప్యానెల్స్ ద్వారా మూల్యాంకనం చేయబడుతుంది.",
    "myStatusHeader": "నా నామినేషన్ స్థితి",
    "myStatusSub": "మీరు సమర్పించిన సామాజిక ప్రభావ దరఖాస్తుల ప్రత్యక్ష మూల్యాంకన పురోగతిని ట్రాక్ చేయండి.",
    "noAppsFound": "దరఖాస్తులు ఏవీ కనుగొనబడలేదు. మొదట నామినేషన్ నింపండి.",
    "panchayatLocation": "పంచాయితీ స్థానం",
    "juryGrading": "జూరీ గ్రేడింగ్",
    "pendingEval": "మూల్యాంకనం పెండింగ్‌లో ఉంది",
    "totalPoints": "మొత్తం పాయింట్లు",
    "fieldInspection": "క్షేత్ర పరిశీలన",
    "notScheduled": "ఇంకా షెడ్యూల్ చేయబడలేదు",
    "scheduledOn": "షెడ్యూల్ చేయబడింది: ",
    "reviewRemarks": "అధికారిక సమీక్ష వ్యాఖ్యలు:",
    "timelineTitle": "బహుళ-స్థాయి ఆమోద వర్క్‌ఫ్లో కాలక్రమం",
    "stepSubmitted": "సమర్పించబడింది",
    "stepDistrict": "జిల్లా క్లియర్ చేయబడింది",
    "stepState": "రాష్ట్ర ఆమోదం",
    "stepJury": "జాతీయ జూరీ",
    "stepMinistry": "మంత్రిత్వ శాఖ తుది"
  },
  "TAM": {
    "aboutHeader": "அங்கீகார முயற்சி பற்றி",
    "aboutSub": "ஜனநாயகத்தை மற்றும் விக்சித் பாரத் 2047 ஐ வலுப்படுத்தும் அதிகாரப்பூர்வ தேசிய திட்டம்.",
    "govStructure": "நிர்வாகக் கட்டமைப்பு",
    "govDesc1": "இந்த போர்டல் முத்தரப்பு சரிபார்ப்பு திட்டத்தின் கீழ் இயங்குகிறது. இளைஞர்கள், தன்னார்வ தொண்டு நிறுவனங்கள் மற்றும் சமூக உருவாக்குநர்கள் தங்களது உள்ளூர் பணிகளைப் பதிவு செய்கிறார்கள். கள அளவிலான சரிபார்ப்பு கிராம பஞ்சாயத்து உறுப்பினர்கள், மாவட்ட நல அலுவலகங்கள் மற்றும் NSS/NCC ஒருங்கிணைப்பாளர்களால் மேற்கொள்ளப்படுகிறது.",
    "govDesc2": "மதிப்பீடுகள் வெளிப்படையானவை மற்றும் மாநில ஊரக வளர்ச்சி செயலாளரால் இறுதி பிளாக்செயின்-பாதுகாக்கப்பட்ட சான்றிதழ் கையொப்பங்கள் அழிக்கப்படுவதற்கு முன்பு பிராந்திய கல்வி மற்றும் அரசு நடுவர் குழுக்களால் மதிப்பாய்வு செய்யப்பட்ட 100 புள்ளி குறியீட்டில் கட்டமைக்கப்பட்டுள்ளன.",
    "viksitBharatTitle": "விக்சித் பாரத்",
    "viksitBharatDesc": "மக்களாட்சி மற்றும் மேம்பாட்டில் இளைஞர்களின் பங்களிப்பை ஊக்குவித்தல்.",
    "govCollabTitle": "அரசு ஒத்துழைப்பு",
    "govCollabDesc": "உள்ளூர் மாற்றுக் கருத்துக்களில் நுண் நிதியுதவியை இணைக்க மண்டல परिषத்துகள், கிராம பஞ்சாயத்துகள் மற்றும் CSR கூட்டாளர்களுடன் நேரடியாக ஒத்துழைத்தல்.",
    "awardsDirHeader": "விருது வகைகள் அடைவு",
    "awardsDirSub": "கிராமப்புற மற்றும் நகர்ப்புற சமூக பொறியியலின் 16 சிறப்புத் துறைகளை நாங்கள் அங்கீகரிக்கிறோம்.",
    "autoCheck": "தானியங்கி தகுதி சரிபார்ப்பு",
    "autoCheckDesc": "விண்ணப்பதாரர் வழிகாட்டியில் ஒரு திட்டத்தைச் சமர்ப்பித்து, உங்கள் இலக்கு வகையைத் தேர்ந்தெடுக்கவும், கணினி தானாகவே உங்கள் உள்ளீட்டை தொடர்புடைய SDGகளுடன் பொருத்துகிறது.",
    "openWizard": "விண்ணப்ப வழிகாட்டியைத் திறக்கவும்",
    "evalJury": "பிராந்திய நடுவர் குழுக்களால் மதிப்பிடப்படுகிறது.",
    "myStatusHeader": "எனது விண்ணப்ப நிலை",
    "myStatusSub": "சமர்ப்பிக்கப்பட்ட சமூக தாக்க விண்ணப்பங்களின் நேரடி மதிப்பீட்டு முன்னேற்றத்தைக் கண்காணிக்கவும்.",
    "noAppsFound": "விண்ணப்பங்கள் எதுவும் இல்லை. முதலில் விண்ணப்பத்தை நிரப்பவும்.",
    "panchayatLocation": "பஞ்சாயத்து இருப்பிடம்",
    "juryGrading": "நடுவர் மதிப்பீடு",
    "pendingEval": "மதிப்பீடு நிலுவையில் உள்ளது",
    "totalPoints": "மொத்த புள்ளிகள்",
    "fieldInspection": "கள ஆய்வு",
    "notScheduled": "இன்னும் திட்டமிடப்படவில்லை",
    "scheduledOn": "திட்டமிடப்பட்டுள்ளது: ",
    "reviewRemarks": "அதிகாரப்பூர்வ மதிப்பாய்வுக் குறிப்புகள்:",
    "timelineTitle": "பல்வேறு நிலை ஒப்புதல் பணிப்பாய்வு காலவரிசை",
    "stepSubmitted": "சமர்ப்பிக்கப்பட்டது",
    "stepDistrict": "மாவட்டம் அங்கீகரிக்கப்பட்டது",
    "stepState": "மாநிலம் பரிந்துரைத்தது",
    "stepJury": "தேசிய நடுவர்",
    "stepMinistry": "அமைச்சக இறுதி"
  },
  "MAR": {
    "aboutHeader": "मान्यता उपक्रमाबद्दल",
    "aboutSub": "तळागाळातील लोकशाही आणि विकसित भारत 2047 ला बळकट करणारा अधिकृत राष्ट्रीय कार्यक्रम.",
    "govStructure": "प्रशासकीय रचना",
    "govDesc1": "पोर्टल त्रिपक्षीय पडताळणी योजनेअंतर्गत कार्य करते. तरुण, स्वयंसेवी संस्था आणि समुदाय निर्माते त्यांच्या स्थानिक कामांची नोंदणी करतात. जमिनीवरील पडताळणी ग्रामपंचायत सदस्य, जिल्हा कल्याण कार्यालये आणि एनएसएस/एनसीसी समन्वयक यांच्याद्वारे केली जाते.",
    "govDesc2": "मूल्यमापन पारदर्शक आहे आणि राज्य ग्रामीण विकास सचिवांद्वारे अंतिम ब्लॉकचेन-सुरक्षित प्रमाणपत्र स्वाक्षरी मंजूर होण्यापूर्वी प्रादेशिक शैक्षणिक आणि सरकारी जूरी पॅनेलद्वारे पुनरावलोकन केलेल्या 100-बिंदू निर्देशांकावर आधारित आहे.",
    "viksitBharatTitle": "विकसित भारत",
    "viksitBharatDesc": "तळागाळातील प्रशासन आणि विकासामध्ये तरुणांच्या सहभागाला चालना देणे.",
    "govCollabTitle": "सरकारी सहकार्य",
    "govCollabDesc": "स्थानिक परिवर्तनाच्या कल्पनांमध्ये सूक्ष्म-निधी जोडण्यासाठी मंडळ परिषद, ग्रामपंचायती आणि सीएसआर भागीदारांसह थेट सहकार्य करणे.",
    "awardsDirHeader": "पुरस्कार श्रेणी निर्देशिका",
    "awardsDirSub": "आम्ही ग्रामीण आणि शहरी सामाजिक अभियांत्रिकीच्या 16 विशेष क्षेत्रांना मान्यता देतो.",
    "autoCheck": "स्वयंचलित पात्रता तपासणी",
    "autoCheckDesc": "नामांकित विझार्डमध्ये प्रकल्प सबमिट करा, तुमची लक्ष्य श्रेणी निवडा आणि सिस्टम स्वयंचलितपणे तुमची नोंदणी संबंधित एसडीजीशी जुळवते.",
    "openWizard": "नामांकन विझार्ड उघडा",
    "evalJury": "प्रादेशिक जूरी पॅनेलद्वारे मूल्यमापन केले जाते.",
    "myStatusHeader": "माझ्या नामांकनाची स्थिती",
    "myStatusSub": "तुमच्या सादर केलेल्या सामाजिक प्रभाव अर्जांच्या थेट मूल्यमापन प्रगतीचा मागोवा घ्या.",
    "noAppsFound": "कोणतेही अर्ज आढळले नाहीत. प्रथम नामांकन भरा.",
    "panchayatLocation": "पंचायत ठिकाण",
    "juryGrading": "जूरी श्रेणीकरण",
    "pendingEval": "मूल्यमापन प्रलंबित",
    "totalPoints": "एकूण गुण",
    "fieldInspection": "क्षेत्र तपासणी",
    "notScheduled": "अद्याप नियोजित नाही",
    "scheduledOn": "नियोजित: ",
    "reviewRemarks": "अधिकृत पुनरावलोकन शेरे:",
    "timelineTitle": "बहु-स्तरीय मंजूरी कार्यप्रवाह समयरेखा",
    "stepSubmitted": "सादर केले",
    "stepDistrict": "जिल्हा मंजूर",
    "stepState": "राज्य समर्थित",
    "stepJury": "राष्ट्रीय जूरी",
    "stepMinistry": "मंत्रालय अंतिम"
  }
};

export default function App() {
  const [activeRole, setActiveRole] = useState('public'); // public, nominee, jury, admin
  const [activeTab, setActiveTab] = useState('home'); // home, about, awards, nominate, my-status, jury-reviews, admin-dashboard
  const [currentLanguage, setCurrentLanguage] = useState('ENG');
  const it = inlineTranslations[currentLanguage] || inlineTranslations.ENG;

  const [nominations, setNominations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeMockEmail, setActiveMockEmail] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Village Development Award');
  const [resultsReleased, setResultsReleased] = useState(false);
  const [submittedNomination, setSubmittedNomination] = useState(null);
  const [activeCert, setActiveCert] = useState(null);
  const [showQrVerification, setShowQrVerification] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Namaste! I am your AI Governance Assistant. How can I help you with your Bharat Gram Vikas Award application today?' }
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
      .then(res => {
        if (!res.ok) throw new Error('Submission failed');
        return res.json();
      })
      .then(saved => {
        setNominations(prev => [saved, ...prev]);
        setSubmittedNomination(saved); // Open success credentials popup
        if (saved.mockEmailSent) {
          setActiveMockEmail(saved.mockEmailSent);
        }
        
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

  const deleteNomination = (id) => {
    fetch(`/api/nominations/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Delete failed');
        return res.json();
      })
      .then(remaining => {
        setNominations(remaining);
        triggerToast('Nomination deleted successfully.');
      })
      .catch(err => {
        console.error('Error deleting nomination:', err);
        triggerToast('Failed to delete nomination.');
      });
  };

  return (
    <div className="flex flex-col min-h-screen text-slate-100 bg-grid-pattern relative">
      <div className="bg-mesh"></div>
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
        currentLanguage={currentLanguage} 
        setCurrentLanguage={setCurrentLanguage} 
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
                currentLanguage={currentLanguage}
              />
            )}
            
            {activeTab === 'about' && (
              <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center">
                  <h1 className="text-4xl font-extrabold text-white font-display">{it.aboutHeader}</h1>
                  <p className="text-xs text-gray-400 mt-2">{it.aboutSub}</p>
                </div>

                <div className="glass-panel p-8 rounded-3xl border-gray-800 space-y-6">
                  <h2 className="text-xl font-bold text-white font-display">{it.govStructure}</h2>
                  <p className="text-xs text-gray-300 leading-relaxed">{it.govDesc1}</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{it.govDesc2}</p>
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
                    <h3 className="font-bold text-white text-base">{it.viksitBharatTitle}</h3>
                    <p className="text-xs text-gray-400 mt-1.5">{it.viksitBharatDesc}</p>
                  </div>
                  <div className="p-6 bg-slate-900 border border-gray-800 rounded-2xl">
                    <h3 className="font-bold text-white text-sm">{it.govCollabTitle}</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{it.govCollabDesc}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'awards' && (
              <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center">
                  <h1 className="text-4xl font-extrabold text-white font-display">{it.awardsDirHeader}</h1>
                  <p className="text-xs text-gray-400 mt-2">{it.awardsDirSub}</p>
                </div>

                <div className="p-6 rounded-2xl bg-indigo-950/10 border border-indigo-900/30 text-center max-w-xl mx-auto">
                  <h3 className="text-sm font-bold text-white mb-1.5 flex items-center justify-center gap-1.5 font-display">
                    <Award className="h-4.5 w-4.5 text-amber-500" />
                    <span>{it.autoCheck}</span>
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{it.autoCheckDesc}</p>
                  <button 
                    onClick={() => { setActiveRole('nominee'); setActiveTab('nominate'); }} 
                    className="mt-4 inline-flex items-center gap-1 text-xs text-indigo-400 font-bold hover:underline"
                  >
                    <span>{it.openWizard}</span>
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
                        {it.evalJury}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <AnalyticsDashboard nominations={nominations} currentLanguage={currentLanguage} triggerToast={triggerToast} />
            )}
          </>
        )}

        {/* Render pages for Nominee Persona */}
        {activeRole === 'nominee' && (
          !authenticatedRoles.nominee ? (
            <LoginPage role="nominee" onLogin={handleLogin} currentLanguage={currentLanguage} />
          ) : (
            <>
              {activeTab === 'nominate' && (
                <NominationForm
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  onNominationSubmit={handleNominationSubmit}
                  triggerToast={triggerToast}
                  currentLanguage={currentLanguage}
                />
              )}

              {activeTab === 'my-status' && (
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8">
                  <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white font-display">{it.myStatusHeader}</h1>
                    <p className="text-xs text-gray-400 mt-2">{it.myStatusSub}</p>
                  </div>

                  <div className="space-y-6">
                    {nominations.length === 0 ? (
                      <div className="p-8 rounded-xl bg-gray-950/40 border border-gray-900 text-center text-gray-500 font-semibold">
                        {it.noAppsFound}
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
                                {nom.status === 'Award Winner' && resultsReleased && nom.certificateId && (
                                  <button
                                    onClick={() => {
                                      setActiveCert(nom);
                                    }}
                                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-white transition-all shadow-md shadow-emerald-900/20 hover:scale-105"
                                    title="Click to view and download your official award certificate"
                                  >
                                    <Award className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
                                    <span>Download Certificate</span>
                                  </button>
                                )}
                                <span className={['rounded-full px-3 py-1 text-xs font-bold border', statusBadge].join(' ')}>
                                  {nom.status}
                                </span>
                              </div>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-6 pt-5 text-xs text-gray-400">
                              <div className="space-y-1">
                                <p className="font-bold text-gray-300">{it.panchayatLocation}</p>
                                <p>{nom.village} GP, {nom.state}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="font-bold text-gray-300">{it.juryGrading}</p>
                                {score !== null ? (
                                  <div>
                                    <p className="text-emerald-400 font-bold mb-1.5">{score} / 100 {it.totalPoints}</p>
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
                                  <p>{it.pendingEval}</p>
                                )}
                              </div>
                              <div className="space-y-1">
                                <p className="font-bold text-gray-300">{it.fieldInspection}</p>
                                <p>{nom.fieldVisit ? (it.scheduledOn + nom.fieldVisit) : it.notScheduled}</p>
                              </div>
                            </div>

                            {nom.juryRemarks && (
                              <div className="mt-5 p-3 rounded-lg bg-gray-950 border border-gray-900 text-xs">
                                <span className="font-bold text-gray-300 block mb-1">{it.reviewRemarks}</span>
                                <p className="text-gray-400 italic">{nom.juryRemarks}</p>
                              </div>
                            )}

                            {/* Workflow Timeline */}
                            <div className="mt-6 border-t border-gray-900 pt-5">
                              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">{it.timelineTitle}</h4>
                              <div className="flex justify-between items-center relative z-0">
                                <div className="absolute left-0 top-[7px] w-full h-0.5 bg-gray-900 -z-10"></div>
                                <div className="flex flex-col items-center gap-2 w-16 text-center bg-gray-950/80">
                                  <div className="h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-gray-950 glow-emerald"></div>
                                  <span className="text-[9px] font-bold text-emerald-400 leading-tight">{it.stepSubmitted}</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-16 text-center bg-gray-950/80">
                                  <div className="h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-gray-950 glow-emerald"></div>
                                  <span className="text-[9px] font-bold text-emerald-400 leading-tight">{it.stepDistrict}</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-16 text-center bg-gray-950/80">
                                  <div className={stage3Class}></div>
                                  <span className={['text-[9px] font-bold leading-tight', stateStepActive ? 'text-emerald-400' : 'text-gray-600'].join(' ')}>{it.stepState}</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-16 text-center bg-gray-950/80">
                                  <div className={stage4Class}></div>
                                  <span className={['text-[9px] font-bold leading-tight', score ? 'text-emerald-400' : 'text-gray-600'].join(' ')}>{it.stepJury}</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-16 text-center bg-gray-950/80">
                                  <div className={stage5Class}></div>
                                  <span className={['text-[9px] font-bold leading-tight', nom.status === 'Award Winner' ? 'text-rose-400' : 'text-gray-600'].join(' ')}>{it.stepMinistry}</span>
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
            <LoginPage role="jury" onLogin={handleLogin} currentLanguage={currentLanguage} />
          ) : activeTab === 'jury-reviews' && (
            <JuryPortal 
              nominations={nominations} 
              updateNominationStatus={updateNominationStatus}
              addJuryScores={addJuryScores}
              triggerToast={triggerToast}
              currentLanguage={currentLanguage}
            />
          )
        )}

        {/* Render pages for Admin Persona */}
        {activeRole === 'admin' && (
          !authenticatedRoles.admin ? (
            <LoginPage role="admin" onLogin={handleLogin} currentLanguage={currentLanguage} />
          ) : activeTab === 'admin-dashboard' && (
            <AdminPanel 
              nominations={nominations} 
              updateNominationStatus={updateNominationStatus}
              triggerToast={triggerToast}
              resultsReleased={resultsReleased}
              setResultsReleased={setResultsReleased}
              currentLanguage={currentLanguage}
              deleteNomination={deleteNomination}
              setNominations={setNominations}
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
            className="h-14 w-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-xl shadow-emerald-900/40 flex items-center justify-center text-white hover:scale-105 transition-all border border-emerald-400/30 group hover:shadow-emerald-600/30 relative"
          >
            <Bot className="h-6 w-6 group-hover:animate-bounce" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </button>
        ) : (
          <div className="w-80 h-96 bg-slate-950/95 backdrop-blur-xl border border-emerald-500/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
            <div className="h-14 bg-gradient-to-r from-emerald-950/80 to-slate-900 flex items-center justify-between px-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-bold text-white font-display">AI Governance Assistant</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950/30">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
                    msg.role === 'ai' 
                      ? 'bg-slate-900/80 text-gray-200 border border-gray-800/80 rounded-tl-sm' 
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-sm'
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
          <span className="text-gray-300 font-semibold text-sm">Bharat Gram Vikas Awards</span>
        </div>
        <p className="text-gray-400">&quot;Recognize. Inspire. Transform. Sustain.&quot;</p>
        <p className="mt-2 text-[10px] text-gray-600">© 2026 Ministry of Panchayati Raj & Rural Development, Government of India | भारत सरकार</p>
        <div className="flex items-center justify-center gap-6 mt-4 text-[10px] text-gray-600">

          <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9933] transition-colors">india.gov.in</a>
          <span>|</span>
          <a href="https://panchayat.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9933] transition-colors">panchayat.gov.in</a>
        </div>
      </footer>

      {/* Mock Email Overlay */}
      {activeMockEmail && (
        <div className="fixed bottom-6 left-6 z-50 animate-float max-w-md w-full">
          <div className="glass-panel p-5 rounded-2xl border-indigo-500/40 bg-[#07161b]/95 shadow-2xl text-xs text-left relative">
            <button
              onClick={() => setActiveMockEmail(null)}
              className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white"
            >
              <X className="h-4.5 w-4.5" />
            </button>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-900">
              <div className="h-7 w-7 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shrink-0">
                <FileText className="h-4 w-4 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">✉️ New Inbox Message</p>
                <p className="text-[9px] text-gray-500">Sent to: {activeMockEmail.to}</p>
              </div>
            </div>

            {/* Email Body layout */}
            <div className="rounded-xl border border-gray-900 overflow-hidden bg-slate-950/60 shadow-inner">
              {/* Government Tricolor Header */}
              <div className="h-1.5 w-full flex">
                <div className="flex-1 bg-[#FF9933]"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-[#138808]"></div>
              </div>
              <div className="p-4 space-y-3.5 text-gray-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-white text-[11px] font-display">{activeMockEmail.subject}</h4>
                    <p className="text-[9px] text-gray-500 mt-0.5">From: awards-portal@bgvawards.gov.in</p>
                  </div>
                  <span className="text-[8px] bg-indigo-950/60 border border-indigo-900/60 px-2 py-0.5 rounded text-indigo-400 uppercase font-black">SMTP Log</span>
                </div>
                <div className="w-full h-px bg-gray-900"></div>
                <p className="whitespace-pre-line leading-relaxed text-[10.5px] font-mono text-gray-350">{activeMockEmail.body}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveMockEmail(null)}
              className="mt-3.5 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider transition-colors shadow-md shadow-indigo-600/10"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}
      {/* Nomination Success Credentials Modal Popup */}
      {submittedNomination && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 relative border-indigo-500/40 bg-[#09101b]/95 shadow-2xl animate-float">
            <button
              onClick={() => setSubmittedNomination(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>

            <h3 className="text-center text-lg font-bold text-white font-display">Nomination Submitted!</h3>
            <p className="text-center text-xs text-gray-400 mt-1">Below are your credentials to log in and track your application status.</p>

            <div className="mt-5 space-y-3">
              {/* Reference ID Block */}
              <div className="p-3.5 rounded-xl bg-gray-900 border border-gray-800 text-xs">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Application Reference ID</span>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-mono font-bold text-indigo-400 text-sm">{submittedNomination.id}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(submittedNomination.id);
                      triggerToast('Copied Reference ID to clipboard.');
                    }}
                    className="text-gray-400 hover:text-white hover:scale-105 transition-all"
                    title="Copy Reference ID"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Login Email Block */}
              <div className="p-3.5 rounded-xl bg-gray-900 border border-gray-800 text-xs">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Login Username (Email)</span>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-medium text-white">{submittedNomination.email}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(submittedNomination.email);
                      triggerToast('Copied Username to clipboard.');
                    }}
                    className="text-gray-400 hover:text-white hover:scale-105 transition-all"
                    title="Copy Username"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Generated Password Block */}
              <div className="p-3.5 rounded-xl bg-gray-900 border border-gray-800 text-xs">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Login Password</span>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-mono text-emerald-400 font-bold">BGVAwards@{submittedNomination.id.split('-')[1]}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`BGVAwards@${submittedNomination.id.split('-')[1]}`);
                      triggerToast('Copied Password to clipboard.');
                    }}
                    className="text-gray-400 hover:text-white hover:scale-105 transition-all"
                    title="Copy Password"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmittedNomination(null);
                  setActiveRole('nominee');
                  setActiveTab('my-status');
                  setAuthenticatedRoles(prev => ({ ...prev, nominee: true }));
                  triggerToast('Logged in to Nominee Dashboard.');
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-1.5"
              >
                <span>Access Dashboard Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setSubmittedNomination(null)}
                className="px-4 py-2.5 rounded-lg border border-gray-800 text-xs font-bold text-gray-400 hover:text-white hover:border-gray-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal Preview for Nominee */}
      {activeCert && activeCert.certificateId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 relative border-gray-800 bg-slate-950 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => {
                setActiveCert(null);
                setShowQrVerification(false);
              }}
              className="absolute right-4 top-4 text-gray-400 hover:text-white z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-200 uppercase tracking-widest font-display">Your Official Award Certificate</h3>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-lg bg-gray-900 border border-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white"
              >
                <Printer className="h-4 w-4" />
                <span>Print / Download</span>
              </button>
            </div>

            {/* Printable certificate design */}
            <div className="printable-certificate-canvas rounded-2xl border-8 border-double border-amber-900/60 bg-slate-900 p-8 text-center text-slate-100 shadow-2xl relative overflow-hidden select-none">
              {/* Tricolor Ribbon/Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 flex print:h-2">
                <div className="flex-1 bg-[#FF9933]"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-[#138808]"></div>
              </div>

              {/* Subtle watermarks / shapes */}
              <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-emerald-500/5 blur-xl"></div>
              <div className="absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-amber-500/5 blur-xl"></div>
              
              <div className="flex justify-center mb-3">
                <Award className="h-10 w-10 text-amber-500" />
              </div>
              
              <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase">
                {translations[currentLanguage]?.certPanchayatDept || translations.ENG.certPanchayatDept}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1.5 font-display">NATIONAL SOCIAL IMPACT CERTIFICATE</h2>
              
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-4"></div>
              
              <p className="text-xs text-gray-400 italic">
                {translations[currentLanguage]?.certPresented || translations.ENG.certPresented}
              </p>
              <p className="text-lg font-black text-white tracking-wide mt-2 font-display">{activeCert.fullName}</p>
              
              <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                {translations[currentLanguage]?.certText || translations.ENG.certText}
              </p>
              <p className="text-xs font-black text-amber-400 mt-1 uppercase tracking-wider">{activeCert.category}</p>
              
              <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">
                Project name: <span className="font-bold text-gray-300">"{activeCert.projectName}"</span> {translations[currentLanguage]?.certGramPanchayat || translations.ENG.certGramPanchayat} <span className="font-bold text-gray-300">{activeCert.village}</span>.
              </p>

              <div className="mt-8 flex justify-between items-center border-t border-gray-800 pt-6">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-gray-300">Shri R. K. Prasad</p>
                  <p className="text-[9px] text-gray-500">
                    {translations[currentLanguage]?.certSecretary || translations.ENG.certSecretary}
                  </p>
                </div>

                {/* QR Code Container */}
                <div 
                  onClick={() => setShowQrVerification(true)}
                  className="cursor-pointer p-1.5 rounded-lg bg-white hover:ring-2 hover:ring-emerald-500 transition-all flex flex-col items-center gap-0.5"
                  title="Click to Verify QR Code"
                >
                  <QrCode className="h-10 w-10 text-slate-900" />
                  <span className="text-[8px] text-slate-800 font-bold tracking-tighter">
                    {translations[currentLanguage]?.secureVerify || translations.ENG.secureVerify}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-300">
                    {translations[currentLanguage]?.certDateIssued || translations.ENG.certDateIssued}
                  </p>
                  <p className="text-[9px] text-gray-500">{new Date().toISOString().slice(0, 10)}</p>
                  <p className="text-[10px] font-bold text-gray-300 mt-1">Cert ID: {activeCert.certificateId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR VERIFICATION MODAL FOR NOMINEE */}
      {showQrVerification && activeCert && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
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

            <h3 className="text-center text-lg font-bold text-white font-display">
              {translations[currentLanguage]?.blockchainQrVerified || translations.ENG.blockchainQrVerified}
            </h3>
            <p className="text-center text-xs text-gray-400 mt-1">
              {translations[currentLanguage]?.blockchainQrSub || translations.ENG.blockchainQrSub}
            </p>

            <div className="mt-5 p-4 rounded-xl bg-gray-900 border border-gray-800 text-xs space-y-2 text-gray-300">
              <p><span className="font-bold text-gray-400">{translations[currentLanguage]?.registryRef || translations.ENG.registryRef}</span> PRD-VERIFY-{activeCert.id.toUpperCase().slice(0, 12)}</p>
              <p><span className="font-bold text-gray-400">{translations[currentLanguage]?.awardRecipient || translations.ENG.awardRecipient}</span> {activeCert.fullName}</p>
              <p><span className="font-bold text-gray-400">{translations[currentLanguage]?.orgTypeLabel || translations.ENG.orgTypeLabel}</span> {activeCert.orgType}</p>
              <p><span className="font-bold text-gray-400">{translations[currentLanguage]?.certProject || translations.ENG.certProject}</span> {activeCert.projectName}</p>
              <p><span className="font-bold text-gray-400">GP Location:</span> {activeCert.village} GP, {activeCert.state}</p>
              <p><span className="font-bold text-gray-400">Jury Verification Score:</span> {activeCert.juryScores ? Object.values(activeCert.juryScores).reduce((a,b)=>a+b, 0) : '85'} / 100</p>
              <p><span className="font-bold text-gray-400">{translations[currentLanguage]?.verifiedBy || translations.ENG.verifiedBy}</span> District Ground Verification Panel</p>
            </div>

            <button
              onClick={() => setShowQrVerification(false)}
              className="w-full mt-5 rounded-lg bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-500"
            >
              {translations[currentLanguage]?.closeDiagnostics || translations.ENG.closeDiagnostics}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
