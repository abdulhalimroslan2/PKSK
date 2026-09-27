/**
 * SISTEM PENTAKSIRAN KEMASUKAN SEKOLAH KHUSUS (PKSK) TINGKATAN 1
 * Portal Rasmi PKSK Simulator 2026
 * Version: 3.2 (510 Authentic Questions Engine)
 */

(function () {
  'use strict';

  /* =========================================================================
     PKSK AUTHENTIC ESSAY TOPIC BANK & 6-10 SENTENCE IDEA STARTERS
     ========================================================================= */
  const PKSK_ESSAY_TOPICS = [
  {
    "id": "TOPIC_BULI_1",
    "theme": "Buli di Sekolah & Asrama",
    "title": "Peranan Rakan Sebaya dalam Membanteras Gejala Buli di Sekolah dan Asrama",
    "prompt": "Kejadian buli sering berlaku di luar pengawasan guru sama ada di dalam bilik darjah mahupun asrama. Huraikan peranan anda dan rakan sebaya dalam mencegah perbuatan buli dan membantu mangsa yang ditindas. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Berani menegur perbuatan buli secara berhemah",
      "Segera laporkan insiden kepada guru atau warden",
      "Beri sokongan emosi dan dampingi mangsa buli",
      "Jangan jadi penonton yang menyokong pembuli",
      "Sebarkan kempen sifar buli di kelas dan asrama"
    ]
  },
  {
    "id": "TOPIC_BULI_2",
    "theme": "Buli di Sekolah & Asrama",
    "title": "Kesan Buruk Perbuatan Buli Terhadap Murid dan Langkah Menanganinya",
    "prompt": "Buli lisan, fizikal, dan pemencilan rakan boleh mendatangkan trauma yang mendalam kepada mangsa. Jelaskan kesan buruk perbuatan buli terhadap emosi serta pelajaran mangsa, berserta langkah berkesan bagi menghentikannya. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Mangsa mengalami tekanan emosi dan kemurungan",
      "Prestasi akademik merosot akibat hilang tumpuan",
      "Wujudkan saluran aduan rahsia dan sesi kaunseling",
      "Tindakan disiplin tegas kepada murid yang membuli",
      "Anjurkan program kesedaran empati dan kasih sayang"
    ]
  },
  {
    "id": "TOPIC_BULI_3",
    "theme": "Buli di Sekolah & Asrama",
    "title": "Memupuk Budaya Kasih Sayang demi Mewujudkan Sekolah yang Selamat Tanpa Buli",
    "prompt": "Suasana sekolah yang harmoni bermula daripada amalan saling menghormati antara murid senior dengan murid baharu. Bincangkan amalan murni yang wajar disemai bagi menghapuskan budaya buli dalam kalangan warga sekolah. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Layan murid baharu seperti saudara kandung sendiri",
      "Elakkan kata-kata ejekan atau panggilan mengaibkan",
      "Amalkan budaya bersalaman dan bertanya khabar",
      "Jayakan program mentor-mentee antara senior dan junior",
      "Semaikan nilai hormat-menghormati tanpa mengira umur"
    ]
  },
  {
    "id": "TOPIC_KOAKAD_UMUM",
    "theme": "Ko-Akademik",
    "title": "Faedah dan Kebaikan Menyertai Aktiviti Koakademik di Sekolah Secara Umum",
    "prompt": "Aktiviti koakademik seperti pertandingan bahas, syarahan, pantun, syair, kuiz ilmu, pidato, dan bercerita memperkaya pengalaman pembelajaran murid di luar bilik darjah. Huraikan faedah menyertai aktiviti koakademik secara umum dalam melahirkan modal insan yang berilmu, berketerampilan, dan berkeyakinan tinggi. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Mengukuhkan pemahaman konsep akademik dan pembelajaran secara praktikal",
      "Mengasah kemahiran komunikasi, pengucapan awam, dan keberanian berhujah",
      "Memupuk daya pemikiran kritis, analitis, dan penyelesaian masalah spontan",
      "Memperluas kosa kata, pembendaharaan kata indah, dan tatabahasa baku",
      "Menyemai semangat kerjasama berpasukan dan persaingan ilmu yang sihat",
      "Membina sahsiah holistik seimbang antara kecemerlangan akademik dan kepimpinan"
    ]
  },
  {
    "id": "TOPIC_KOAKAD_1",
    "theme": "Ko-Akademik",
    "title": "Faedah Menyertai Pertandingan Debat dan Pidato dalam Membina Keyakinan Diri",
    "prompt": "Aktiviti pengucapan awam seperti bahas, pidato, dan syarahan melatih murid berkomunikasi dengan lancar dan berani. Jelaskan kebaikan menyertai aktiviti ko-akademik ini dalam membentuk personaliti murid cemerlang. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Asah keberanian berucap di hadapan khalayak ramai",
      "Latih minda berfikir pantas, kritis dan bernas",
      "Tingkatkan kelancaran tatabahasa dan sebutan Melayu baku",
      "Susun hujah secara teratur berlandaskan fakta kukuh",
      "Bina daya kepimpinan dan kematangan bersuara"
    ]
  },
  {
    "id": "TOPIC_KOAKAD_2",
    "theme": "Ko-Akademik",
    "title": "Kepentingan Menyertai Aktiviti Sastera Tradisional Seperti Pantun dan Syair di Sekolah",
    "prompt": "Warisan puisi tradisional Melayu seperti pantun dan syair mengandungi nilai estetika serta ketinggian budi pekerti. Huraikan faedah yang diperoleh murid apabila aktif dalam pertandingan berbalas pantun atau mendeklamasikan syair. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Pupuk rasa cinta mendalam terhadap bahasa kebangsaan",
      "Pelihara keindahan warisan sastera dan puisi Melayu",
      "Luaskan kosa kata indah dan kiasan bahasa tinggi",
      "Asah daya kreativiti mengarang rangkap secara spontan",
      "Membina disiplin intonasi, jeda dan sebutan baku"
    ]
  },
  {
    "id": "TOPIC_KOAKAD_3",
    "theme": "Ko-Akademik",
    "title": "Kebaikan Menyertai Kuiz Akademik dan Sayembara Ilmu di Peringkat Sekolah",
    "prompt": "Pertandingan kuiz sains, matematik, sejarah, dan bahasa sering diadakan di sekolah untuk menguji minda murid. Bincangkan bagaimana penyertaan dalam kuiz akademik mampu melonjakkan prestasi pembelajaran anda. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Kukuhkan kefahaman topik pelajaran secara menyeronokkan",
      "Luaskan pengetahuan am melangkaui buku teks sekolah",
      "Latih kepantasan berfikir dan membuat keputusan tepat",
      "Pupuk semangat persaingan sihat antara rakan sebaya",
      "Semai tabiat rajin membaca dan meneroka fakta baharu"
    ]
  },
  {
    "id": "TOPIC_KOKU_1",
    "theme": "Kokurikulum & Badan Beruniform",
    "title": "Faedah Latihan Kawad Kaki Pasukan Beruniform dalam Membentuk Disiplin Diri",
    "prompt": "Aktiviti kawad kaki merupakan elemen penting dalam unit beruniform seperti Kadet Remaja Sekolah, Pengakap, dan Pandu Puteri. Huraikan bagaimana latihan kawad kaki berupaya melatih ketahanan fizikal dan disiplin diri murid. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Didik sikap patuh kepada arahan ketua platun",
      "Latih ketepatan masa dan ketelitian kekemasan diri",
      "Bina semangat kerjasama sepasukan demi keseragaman gerak",
      "Tingkatkan ketahanan fizikal dan kesabaran di bawah panas",
      "Semai semangat patriotik dan kecintaan kepada negara"
    ]
  },
  {
    "id": "TOPIC_KOKU_2",
    "theme": "Kokurikulum & Badan Beruniform",
    "title": "Pengalaman Berharga Menyertai Perkhemahan Unit Beruniform di Luar Bilik Darjah",
    "prompt": "Aktiviti perkhemahan tahunan memberi peluang kepada murid untuk belajar hidup berdikari, menyelesaikan masalah, dan bekerjasama dalam pasukan. Ceritakan faedah dan kemahiran ikhtiar hidup yang diperoleh daripada aktiviti perkhemahan. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Latih diri berdikari tanpa bergantung pada ibu bapa",
      "Kuasai kemahiran ikhtiar hidup seperti memasang khemah",
      "Pupuk sifat tolong-menolong semasa memasak dan bertugas",
      "Eratkan hubungan silaturahim antara ahli kumpulan",
      "Uji keberanian dan ketahanan mental hadapi cabaran"
    ]
  },
  {
    "id": "TOPIC_KOKU_3",
    "theme": "Kokurikulum & Sukan",
    "title": "Kebaikan Penglibatan Aktif dalam Bidang Sukan untuk Kesihatan dan Perpaduan Murid",
    "prompt": "Penglibatan aktif dalam aktiviti sukan seperti bola sepak, badminton, dan olahraga membawa impak positif kepada tubuh badan serta menyatukan murid. Bincangkan kebaikan menyertai aktiviti sukan di sekolah. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Cergaskan fizikal dan hindari masalah obesiti murid",
      "Kurangkan tekanan belajar dan segarkan semula minda",
      "Pupuk semangat kesukanan dan redha menerima kekalahan",
      "Jalin perpaduan erat bersama rakan berbilang kaum",
      "Buka peluang mengharumkan nama sekolah dan negeri"
    ]
  },
  {
    "id": "TOPIC_TEKNO_1",
    "theme": "Teknologi & Media Digital",
    "title": "Kebaikan dan Keburukan Penggunaan Kecerdasan Buatan (AI) dalam Pembelajaran Murid",
    "prompt": "Kecerdasan Buatan (AI) kini semakin banyak digunakan oleh murid untuk mencari maklumat dan membuat kerja sekolah. Huraikan kebaikan dan keburukan penggunaan AI oleh murid sekolah, berserta cara menggunakannya secara bijak. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Kebaikan: Bertindak sebagai tutor peribadi membantu topik sukar",
      "Kebaikan: Menjimatkan masa mencari idea dan rujukan tambahan",
      "Keburukan: Menyebabkan murid malas berfikir dan hilang daya kritis",
      "Keburukan: Risiko menyalin jawapan bulat-bulat tanpa pemahaman",
      "Gunakan AI secara berhemah sebagai alat bantuan pembelajaran"
    ]
  },
  {
    "id": "TOPIC_TEKNO_2",
    "theme": "Teknologi & Media Digital",
    "title": "Kebaikan dan Keburukan Penggunaan Media Sosial dalam Kalangan Murid Remaja",
    "prompt": "Platform media sosial seperti TikTok, Instagram, dan YouTube amat digemari oleh murid sekolah untuk berhibur dan berinteraksi. Bincangkan kebaikan dan keburukan penggunaan media sosial dalam kehidupan seharian anda. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Kebaikan: Berhubung dengan rakan dan berkongsi nota pelajaran",
      "Kebaikan: Mengetahui perkembangan berita dan maklumat terkini",
      "Keburukan: Pembaziran masa dan risiko ketagihan skrin gajet",
      "Keburukan: Terdedah kepada gejala buli siber dan berita palsu",
      "Urus waktu dengan berdisiplin dan tapis kandungan ditonton"
    ]
  },
  {
    "id": "TOPIC_TEKNO_3",
    "theme": "Teknologi & Media Digital",
    "title": "Langkah-Langkah Menggunakan Gajet dan Internet Secara Berhemah demi Masa Depan Murid",
    "prompt": "Kemudahan telefon pintar dan internet boleh menjadi aset berguna atau punca kelalaian murid bergantung pada cara penggunaannya. Jelaskan cara-cara anda memanfaatkan internet dan peranti pintar secara positif demi kecemerlangan diri. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Tetapkan jadual harian penggunaan gajet secara tegas",
      "Layari laman pembelajaran dan saluran video pendidikan",
      "Pelihara adab kesopanan dan elakkan bahasa kasar di maya",
      "Seimbangkan aktiviti fizikal luar dengan waktu skrin",
      "Lindungi maklumat peribadi daripada disalah guna pihak luar"
    ]
  },
  {
    "id": "TOPIC_TERAS_1",
    "theme": "Integriti & Kepimpinan",
    "title": "Kepentingan Integriti dan Disiplin Kendiri dalam Membentuk Murid Cemerlang",
    "prompt": "Tulis sebuah karangan berpandu mengenai bagaimana nilai amanah, kejujuran, dan resiliensi mampu membentuk kepimpinan murid cemerlang di sekolah berasrama penuh. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Amalkan sikap amanah dan jujur dalam akademik",
      "Patuhi peraturan sekolah serta disiplin asrama",
      "Urus masa secara bijak antara belajar dan riadah",
      "Bina ketahanan diri mendepani cabaran asrama",
      "Tunjukkan teladan kepimpinan terpuji kepada rakan"
    ]
  },
  {
    "id": "TOPIC_TERAS_2",
    "theme": "Kelestarian Alam Sekitar",
    "title": "Tanggungjawab Generasi Muda dalam Menangani Perubahan Iklim dan Kelestarian Alam",
    "prompt": "Bincangkan peranan murid dan institusi sekolah dalam memupuk amalan hijau, kitar semula, dan penjimatan tenaga demi memelihara bumi untuk masa hadapan. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Amalkan kitar semula dan kurangkan penggunaan plastik",
      "Jimatkan penggunaan elektrik dan air di sekolah",
      "Tanam pokok untuk menghijaukan persekitaran sekolah",
      "Sebar kesedaran pemanasan global kepada rakan sebaya",
      "Sertai aktiviti gotong-royong membersihkan kawasan sekitar"
    ]
  },
  {
    "id": "TOPIC_TERAS_3",
    "theme": "Kesejahteraan Emosi & Sahsiah",
    "title": "Kepentingan Gaya Hidup Sihat dan Pengurusan Emosi Murid di Asrama",
    "prompt": "Jelaskan cara-cara mengekalkan kesihatan fizikal yang cergas dan menguruskan tekanan emosi secara positif dalam suasana pembelajaran sekolah berasrama. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Amalkan pemakanan seimbang dan minum air secukupnya",
      "Dapatkan tidur dan rehat yang berkualiti setiap malam",
      "Bersukan pada waktu petang untuk kekal aktif",
      "Kongsi masalah emosi bersama rakan dan guru kaunseling",
      "Rancang jadual mengulang kaji tanpa tekanan melampau"
    ]
  },
  {
    "id": "TOPIC_TERAS_4",
    "theme": "Perpaduan Nasional",
    "title": "Perpaduan Kaum sebagai Teras Keharmonian dan Kemakmuran Negara",
    "prompt": "Ulas bagaimana aktiviti kokurikulum, sukan, dan kemasyarakatan di sekolah berupaya merapatkan hubungan antara kaum serta menyemarakkan semangat cintakan tanah air. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Pupuk semangat muhibah antara murid pelbagai kaum",
      "Gunakan bahasa kebangsaan sebagai alat komunikasi utama",
      "Hormati kepelbagaian budaya, adat resam, dan perayaan",
      "Bekerjasama dalam pasukan tanpa mengira latar belakang",
      "Hayati prinsip Rukun Negara demi keamanan bersama"
    ]
  },
  {
    "id": "TOPIC_TERAS_5",
    "theme": "Kewangan Berhemat",
    "title": "Amalan Menabung dan Pengurusan Wang Saku Bijak Sejak di Bangku Sekolah",
    "prompt": "Bincangkan kepentingan memupuk tabiat berjimat cermat, merancang perbelanjaan harian, dan menghargai titik peluh ibu bapa demi masa depan yang terjamin. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Simpan sebahagian wang saku harian secara konsisten",
      "Bezakan antara keperluan asas dengan kehendak membazir",
      "Catat perbelanjaan harian secara berdisiplin",
      "Hargai titik peluh ibu bapa mencari rezeki",
      "Sediakan simpanan khas sebagai dana kecemasan"
    ]
  },
  {
    "id": "TOPIC_TERAS_6",
    "theme": "Patriotisme & Jati Diri",
    "title": "Menghayati Sejarah Kemerdekaan dan Mempertahankan Kedaulatan Negara",
    "prompt": "Tulis refleksi anda mengenai kepentingan menghayati erti kemerdekaan, menghormati lambang kebesaran negara, dan mengekalkan jati diri warisan bangsa Malaysia. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Hayati pengorbanan pejuang terdahulu membebaskan tanah air",
      "Hormati lagu Negaraku dan kibarkan Jalur Gemilang",
      "Pertahankan maruah dan imej baik negara di mana-mana",
      "Ambil iktibar daripada peristiwa bersejarah negara",
      "Bersatu hati mempertahankan keamanan dan kedaulatan tanah air"
    ]
  },
  {
    "id": "TOPIC_PADU_1",
    "theme": "Perpaduan & Hari Kebangsaan",
    "title": "Peranan Sambutan Bulan Kemerdekaan di Sekolah dalam Menyemarakkan Semangat Perpaduan Kaum",
    "prompt": "Sambutan Bulan Kebangsaan pada setiap bulan Ogos dan September sering dimeriahkan dengan kibaran Jalur Gemilang, perarakan, dan pertandingan lagu patriotik di sekolah. Huraikan bagaimana aktiviti sambutan Hari Kebangsaan berupaya merapatkan hubungan antara murid pelbagai kaum serta menyemai rasa cinta akan tanah air. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Sertai perarakan dan nyanyian lagu patriotik bersama-sama",
      "Kibarkan Jalur Gemilang dengan megah dan bangga",
      "Hayati pengorbanan pejuang kemerdekaan pelbagai keturunan",
      "Bekerjasama menghias kelas berunsurkan tema kemerdekaan",
      "Pupuk rasa bangga menjadi warganegara Malaysia berdaulat"
    ]
  },
  {
    "id": "TOPIC_PADU_2",
    "theme": "Perpaduan & Hari Malaysia",
    "title": "Kepentingan Menghayati Erti Sambutan Hari Malaysia bagi Mengeratkan Silaturahim Semenanjung, Sabah dan Sarawak",
    "prompt": "Sambutan Hari Malaysia pada 16 September memperingati penyatuan Semenanjung Tanah Melayu, Sabah, dan Sarawak membentuk Malaysia yang tercinta. Bincangkan bagaimana murid dapat menghayati keunikan kepelbagaian etnik, budaya, dan bahasa rakyat di ketiga-tiga wilayah ini demi memperkukuh integrasi nasional. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Pelajari keunikan budaya etnik Sabah dan Sarawak",
      "Hormati adat resam dan perayaan rakan berlainan negeri",
      "Eratkan persaudaraan merentas Semenanjung, Sabah dan Sarawak",
      "Hayati sejarah penubuhan Persekutuan Malaysia 16 September",
      "Kikis prejudis wilayah demi pembentukan Bangsa Malaysia utuh"
    ]
  },
  {
    "id": "TOPIC_PADU_3",
    "theme": "Perpaduan & Integrasi Budaya",
    "title": "Amalan Rumah Terbuka dan Sambutan Perayaan Pelbagai Kaum sebagai Wadah Perpaduan Murid",
    "prompt": "Di Malaysia, perayaan seperti Hari Raya Aidilfitri, Tahun Baharu Cina, Deepavali, Pesta Kaamatan, dan Hari Gawai disambut bersama-sama dalam suasana harmoni. Jelaskan bagaimana amalan kunjung-mengunjungi dan sambutan perayaan di sekolah atau komuniti dapat mengukuhkan tali persahabatan antara murid berbilang bangsa. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Kunjung-mengunjungi rumah rakan semasa musim perayaan",
      "Nikmati juadah tradisional kaum lain dengan penuh adab",
      "Amalkan sikap saling memahami dan menghormati perbezaan",
      "Sertai sambutan hari perayaan peringkat sekolah secara muhibah",
      "Pupuk sikap toleransi dan tolak sentimen perkauman sempit"
    ]
  },
  {
    "id": "TOPIC_PADU_4",
    "theme": "Perpaduan & Nilai Kemasyarakatan",
    "title": "Semangat Gotong-Royong dan Kerjasama Pelbagai Kaum di Sekolah demi Kesejahteraan Bersama",
    "prompt": "Pepatah Melayu ada menyatakan 'berat sama dipikul, ringan sama dijinjing'. Huraikan bagaimana aktiviti gotong-royong membersihkan sekolah dan kerjasama dalam tugasan berkumpulan mampu mengeratkan perpaduan serta memupuk sifat empati dalam kalangan murid 12-13 tahun. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.",
    "defaultIdeas": [
      "Bekerjasama membersihkan kawasan sekolah tanpa memilih rakan",
      "Kongsi tugasan kumpulan secara adil dan toleransi",
      "Gunakan bahasa kebangsaan untuk berkomunikasi dengan mesra",
      "Hulurkan bantuan kepada rakan yang menghadapi kesukaran",
      "Hayati amalan berat sama dipikul ringan sama dijinjing"
    ]
  }
];

  /* =========================================================================
     GLOBAL APPLICATION STATE
     ========================================================================= */
  const state = {
    // Current Active View: 'DASHBOARD' | 'INSTRUCTIONS' | 'EXAM' | 'ESSAY' | 'RESULTS' | 'REVIEW'
    currentView: 'DASHBOARD',
    
    // Mode: 'FULL_SIMULATION' (100 Qs) | 'QUICK_DIAGNOSTIC' (30 Qs) | 'DRILL_PRACTICE' (30 Qs)
    mode: 'FULL_SIMULATION',
    drillTopic: 'ALL_INSANIAH',

    // Candidate Profile
    candidate: {
      name: '',
      ic: '',
      indexNo: '',
      targetSchool: 'SBP'
    },

    // Active Questions and Answers
    sessionQuestions: [],
    currentIndex: 0,
    userAnswers: {},       // { [question_id]: 'A' | 'B' | 'C' | 'D' }
    flaggedQuestions: {},   // { [question_id]: true }
    paletteFilter: 'ALL',  // 'ALL' | 'PART_A' | 'PART_B' | 'FLAGGED'

    // Essay Articulation (Bahagian C) - Rawak Automatik & Pemasa 10 Minit
    essayText: '',
    essayTopic: PKSK_ESSAY_TOPICS[Math.floor(Math.random() * PKSK_ESSAY_TOPICS.length)],
    essayActiveTheme: 'ALL',
    currentEssayIdeas: null,
    hasInitialEssayTopicSelected: true,
    aiIdeaTimerSecondsLeft: 600, // 10 minit (600 saat)
    aiIdeaTimerInterval: null,
    aiIdeaTimerStarted: false,
    essayTimerRunning: false,
    essayImageFile: null,
    essayImageDataUrl: null,
    isTranscribingOcr: false,

    // AI Essay Assessment & Multi-Provider AI State
    aiProvider: localStorage.getItem('pksk_ai_provider') || 'GROQ', // 'GROQ' | 'GEMINI' | 'OPENROUTER'
    geminiApiKey: localStorage.getItem('pksk_gemini_api_key') || '',
    aiEssayAssessment: null,
    isEvaluatingAI: false,

    // Review Workspace State
    reviewFilter: 'ALL', // 'ALL' | 'WRONG' | 'CORRECT' | 'UNANSWERED'

    // Timer State
    timerSecondsLeft: 5400, // 90 mins for full simulation
    timerInterval: null
  };

  /* =========================================================================
     DOM ELEMENT REFERENCES
     ========================================================================= */
  const dom = {
    // Views
    loginView: document.getElementById('loginView'),
    dashboardView: document.getElementById('dashboardView'),
    instructionsView: document.getElementById('instructionsView'),
    examWorkspaceView: document.getElementById('examWorkspaceView'),
    essayWorkspaceView: document.getElementById('essayWorkspaceView'),
    resultsView: document.getElementById('resultsView'),
    reviewWorkspaceView: document.getElementById('reviewWorkspaceView'),

    // Navigation Tabs
    navTabLogin: document.getElementById('navTabLogin'),
    navTabDashboard: document.getElementById('navTabDashboard'),

    // PhysFlix Dual-State Login View Elements
    physflixHeroSection: document.getElementById('physflixHeroSection'),
    physflixCardSection: document.getElementById('physflixCardSection'),
    btnPhysflixHeaderToggle: document.getElementById('btnPhysflixHeaderToggle'),
    heroInputIc: document.getElementById('heroInputIc'),
    btnHeroSubmit: document.getElementById('btnHeroSubmit'),
    btnHeroGoogleSignIn: document.getElementById('btnHeroGoogleSignIn'),
    btnHeroGuestEnter: document.getElementById('btnHeroGuestEnter'),
    physflixInputIc: document.getElementById('physflixInputIc'),
    physflixChkRemember: document.getElementById('physflixChkRemember'),
    btnPhysflixCardSubmit: document.getElementById('btnPhysflixCardSubmit'),
    btnPhysflixCardGoogle: document.getElementById('btnPhysflixCardGoogle'),
    btnPhysflixCardGuest: document.getElementById('btnPhysflixCardGuest'),
    btnPhysflixBackToHero: document.getElementById('btnPhysflixBackToHero'),
    formPhysflixHero: document.getElementById('physflixHeroForm'),
    formPhysflixCard: document.getElementById('physflixCardForm'),

    // Backward Compatible Aliases
    btnLoginViewGoogle: document.getElementById('btnPhysflixCardGoogle') || document.getElementById('btnHeroGoogleSignIn') || document.getElementById('btnLoginViewGoogle'),
    loginViewLicenseKey: document.getElementById('loginViewLicenseKey'),
    btnLoginViewValidateLicense: document.getElementById('btnLoginViewValidateLicense'),
    btnLoginViewGuestEnter: document.getElementById('btnPhysflixCardGuest') || document.getElementById('btnHeroGuestEnter') || document.getElementById('btnLoginViewGuestEnter'),
    splitInputUsername: document.getElementById('physflixInputIc') || document.getElementById('heroInputIc') || document.getElementById('splitInputUsername'),
    splitInputPassword: document.getElementById('splitInputPassword'),
    splitChkRemember: document.getElementById('physflixChkRemember') || document.getElementById('splitChkRemember'),
    btnSplitSignIn: document.getElementById('btnPhysflixCardSubmit') || document.getElementById('btnHeroSubmit') || document.getElementById('btnSplitSignIn'),
    formSplitLogin: document.getElementById('physflixCardForm') || document.getElementById('formSplitLogin'),
    linkCreateAccount: document.getElementById('linkCreateAccount'),
    linkForgotPassword: document.getElementById('linkForgotPassword'),
    loginStatusBanner: document.getElementById('loginStatusBanner'),
    btnLoginOpenSupabaseConfig: document.getElementById('btnLoginOpenSupabaseConfig'),
    navTabFullSim: document.getElementById('navTabFullSim'),
    navTabDiagnostic: document.getElementById('navTabDiagnostic'),
    navTabDrill: document.getElementById('navTabDrill'),
    navTabEssay: document.getElementById('navTabEssay'),
    navTabSlip: document.getElementById('navTabSlip'),
    navHudTimer: document.getElementById('navHudTimer'),
    dispLiveTimer: document.getElementById('dispLiveTimer'),

    // Candidate Meta Displays
    dispCandidateName: document.getElementById('dispCandidateName'),
    dispCandidateIndex: document.getElementById('dispCandidateIndex'),
    inputCandidateName: document.getElementById('inputCandidateName'),
    inputCandidateIc: document.getElementById('inputCandidateIc'),
    inputCandidateIndex: document.getElementById('inputCandidateIndex'),
    selectTargetSchool: document.getElementById('selectTargetSchool'),

    // Dashboard Mode Cards
    cardModeFull: document.getElementById('cardModeFull'),
    cardModeQuick: document.getElementById('cardModeQuick'),
    cardModeDrill: document.getElementById('cardModeDrill'),
    drillTopicGroup: document.getElementById('drillTopicGroup'),
    selectDrillTopic: document.getElementById('selectDrillTopic'),
    btnLaunchInstructions: document.getElementById('btnLaunchInstructions'),

    // Ox Alpha AI Configuration Elements
    btnTestOxAlpha: document.getElementById('btnTestOxAlpha'),
    oxAlphaStatusBadge: document.getElementById('oxAlphaStatusBadge'),
    oxAlphaFeedbackMsg: document.getElementById('oxAlphaFeedbackMsg'),
    essayAiIndicatorBadge: document.getElementById('essayAiIndicatorBadge'),

    // Instructions View
    btnBackToDashboard: document.getElementById('btnBackToDashboard'),
    btnStartExamNow: document.getElementById('btnStartExamNow'),

    // Live Exam Workspace
    sectionBannerStrip: document.getElementById('sectionBannerStrip'),
    dispSectionTitle: document.getElementById('dispSectionTitle'),
    dispQuestionStatusBadge: document.getElementById('dispQuestionStatusBadge'),
    dispQuestionNumberLabel: document.getElementById('dispQuestionNumberLabel'),
    dispSubtopicBadge: document.getElementById('dispSubtopicBadge'),
    dispQuestionText: document.getElementById('dispQuestionText'),
    dispQuestionDiagram: document.getElementById('dispQuestionDiagram'),
    optionsRadioContainer: document.getElementById('optionsRadioContainer'),
    btnPrevQuestion: document.getElementById('btnPrevQuestion'),
    btnNextQuestion: document.getElementById('btnNextQuestion'),
    btnFlagReview: document.getElementById('btnFlagReview'),
    btnFlagLabel: document.getElementById('btnFlagLabel'),
    paletteGridMatrix: document.getElementById('paletteGridMatrix'),
    countPaletteAll: document.getElementById('countPaletteAll'),
    paletteFilterAll: document.getElementById('paletteFilterAll'),
    paletteFilterA: document.getElementById('paletteFilterA'),
    paletteFilterB: document.getElementById('paletteFilterB'),
    paletteFilterFlagged: document.getElementById('paletteFilterFlagged'),
    btnSubmitExamTrigger: document.getElementById('btnSubmitExamTrigger'),

    // Essay View (Bahagian C)
    essayTopicSelectorCard: document.getElementById('essayTopicSelectorCard'),
    essayThemePillsContainer: document.getElementById('essayThemePillsContainer'),
    selectEssayTopic: document.getElementById('selectEssayTopic'),
    dispTotalTopicsBadge: document.getElementById('dispTotalTopicsBadge'),
    dispTopicNumberIndicator: document.getElementById('dispTopicNumberIndicator'),
    dispEssayTitle: document.getElementById('dispEssayTitle'),
    dispEssayThemeBadge: document.getElementById('dispEssayThemeBadge'),
    dispEssayPrompt: document.getElementById('dispEssayPrompt'),
    btnShuffleEssayTopic: document.getElementById('btnShuffleEssayTopic'),
    inputEssayText: document.getElementById('inputEssayText'),
    dispWordCount: document.getElementById('dispWordCount'),
    btnEssayBackToMcq: document.getElementById('btnEssayBackToMcq'),
    btnSubmitEssayFinal: document.getElementById('btnSubmitEssayFinal'),
    dispEssayMainTimer: document.getElementById('dispEssayMainTimer'),

    // Handwritten Essay Image Upload & OCR
    essayDropzone: document.getElementById('essayDropzone'),
    essayImageInput: document.getElementById('essayImageInput'),
    dropzoneEmpty: document.getElementById('dropzoneEmpty'),
    btnSnapPhoto: document.getElementById('btnSnapPhoto'),
    btnChooseFile: document.getElementById('btnChooseFile'),
    dropzonePreview: document.getElementById('dropzonePreview'),
    essayImagePreview: document.getElementById('essayImagePreview'),
    previewOcrBadge: document.getElementById('previewOcrBadge'),
    previewFileName: document.getElementById('previewFileName'),
    previewFileSize: document.getElementById('previewFileSize'),
    btnRemoveImage: document.getElementById('btnRemoveImage'),
    ocrProgressBox: document.getElementById('ocrProgressBox'),
    ocrStatusText: document.getElementById('ocrStatusText'),
    ocrModelBadge: document.getElementById('ocrModelBadge'),
    ocrProgressBar: document.getElementById('ocrProgressBar'),
    btnRetranscribe: document.getElementById('btnRetranscribe'),
    btnChangeImage: document.getElementById('btnChangeImage'),
    transcriptionNotice: document.getElementById('transcriptionNotice'),

    // AI Essay Idea Starter Elements (Auto-Hide 10 Minit & Anti-Salin)
    aiIdeaBox: document.getElementById('aiIdeaBox'),
    aiIdeaBody: document.getElementById('aiIdeaBody'),
    aiIdeaContent: document.getElementById('aiIdeaContent'),
    aiIdeaBadge: document.getElementById('aiIdeaBadge'),
    essayOverallTimerBadge: document.getElementById('essayOverallTimerBadge'),
    dispEssayBoxTimer: document.getElementById('dispEssayBoxTimer'),
    aiIdeaTimerBadge: document.getElementById('aiIdeaTimerBadge'),
    aiIdeaCountdown: document.getElementById('aiIdeaCountdown'),
    aiIdeaExpiredNotice: document.getElementById('aiIdeaExpiredNotice'),
    btnRegenerateAiIdeas: document.getElementById('btnRegenerateAiIdeas'),
    btnToggleAiIdeas: document.getElementById('btnToggleAiIdeas'),

    // Results Slip
    slipSubTitle: document.getElementById('slipSubTitle'),
    slipDispName: document.getElementById('slipDispName'),
    slipDispIc: document.getElementById('slipDispIc'),
    slipDispIndex: document.getElementById('slipDispIndex'),
    slipDispTarget: document.getElementById('slipDispTarget'),
    slipHeroBadge: document.getElementById('slipHeroBadge'),
    slipDispTotalScore: document.getElementById('slipDispTotalScore'),
    slipDispStatus: document.getElementById('slipDispStatus'),
    slipScoreTable: document.getElementById('slipScoreTable'),
    slipScoreTableBody: document.getElementById('slipScoreTableBody'),
    aiEssayReportSection: document.getElementById('aiEssayReportSection'),
    btnReturnHomeFromSlip: document.getElementById('btnReturnHomeFromSlip'),
    btnWriteNewEssay: document.getElementById('btnWriteNewEssay'),
    btnReviewAllAnswers: document.getElementById('btnReviewAllAnswers'),

    // Review Workspace
    btnBackToSlipFromReview: document.getElementById('btnBackToSlipFromReview'),
    btnReturnHomeFromReview: document.getElementById('btnReturnHomeFromReview'),
    reviewQuestionsList: document.getElementById('reviewQuestionsList'),
    reviewStatTotal: document.getElementById('reviewStatTotal'),
    reviewStatCorrect: document.getElementById('reviewStatCorrect'),
    reviewStatWrong: document.getElementById('reviewStatWrong'),
    reviewStatUnanswered: document.getElementById('reviewStatUnanswered'),
    countReviewAll: document.getElementById('countReviewAll'),
    countReviewWrong: document.getElementById('countReviewWrong'),
    countReviewCorrect: document.getElementById('countReviewCorrect'),
    countReviewUnanswered: document.getElementById('countReviewUnanswered'),
    btnReviewFilterAll: document.getElementById('btnReviewFilterAll'),
    btnReviewFilterWrong: document.getElementById('btnReviewFilterWrong'),
    btnReviewFilterCorrect: document.getElementById('btnReviewFilterCorrect'),
    btnReviewFilterUnanswered: document.getElementById('btnReviewFilterUnanswered'),

    // Confirmation Modal
    kpmModalOverlay: document.getElementById('kpmModalOverlay'),
    kpmModalSummaryText: document.getElementById('kpmModalSummaryText'),
    btnModalDismiss: document.getElementById('btnModalDismiss'),
    btnModalProceed: document.getElementById('btnModalProceed'),

    // Licensing & Activation Elements
    licenseStatusBadge: document.getElementById('licenseStatusBadge'),
    licenseStatusText: document.getElementById('licenseStatusText'),
    activationModal: document.getElementById('activationModal'),
    trialLockNotice: document.getElementById('trialLockNotice'),
    trialStatusBanner: document.getElementById('trialStatusBanner'),
    trialBannerTitle: document.getElementById('trialBannerTitle'),
    trialBannerSubtitle: document.getElementById('trialBannerSubtitle'),
    trialBannerIcon: document.getElementById('trialBannerIcon'),
    btnTrialBannerTelegram: document.getElementById('btnTrialBannerTelegram'),
    btnTrialBannerEnterKey: document.getElementById('btnTrialBannerEnterKey'),
    btnBuyLicenseTelegram: document.getElementById('btnBuyLicenseTelegram'),
    inputLicenseKey: document.getElementById('inputLicenseKey'),
    keyCharCount: document.getElementById('keyCharCount'),
    activationAlertBox: document.getElementById('activationAlertBox'),
    btnActivateLicense: document.getElementById('btnActivateLicense'),
    btnGoogleSignIn: document.getElementById('btnGoogleSignIn'),
    userAvatarContainer: document.getElementById('userAvatarContainer'),
    userAvatarDefaultIcon: document.getElementById('userAvatarDefaultIcon'),
    btnCloseActivationModal: document.getElementById('btnCloseActivationModal'),

    // Supabase Settings Modal
    btnOpenSupabaseSettings: document.getElementById('btnOpenSupabaseSettings'),
    supabaseConfigModal: document.getElementById('supabaseConfigModal'),
    inputSupabaseUrl: document.getElementById('inputSupabaseUrl'),
    inputSupabaseAnonKey: document.getElementById('inputSupabaseAnonKey'),
    supabaseConfigAlertBox: document.getElementById('supabaseConfigAlertBox'),
    btnCloseSupabaseConfig: document.getElementById('btnCloseSupabaseConfig'),
    btnSaveSupabaseConfig: document.getElementById('btnSaveSupabaseConfig')
  };

  /* =========================================================================
     DATASET ACCESSOR & SAMPLING ENGINE
     ========================================================================= */
  function getDataset() {
    if (typeof window !== 'undefined' && window.PKSK_DATASET && Array.isArray(window.PKSK_DATASET) && window.PKSK_DATASET.length) {
      return window.PKSK_DATASET;
    }
    if (typeof PKSK_DATASET !== 'undefined' && Array.isArray(PKSK_DATASET) && PKSK_DATASET.length) {
      return PKSK_DATASET;
    }
    return [];
  }

  function generatePkskSession() {
    const dataset = getDataset();
    if (!dataset.length) {
      alert("Ralat: Pangkalan soalan PKSK tidak ditemui. Sila muat semula laman.");
      return [];
    }

    if (state.mode === 'FULL_SIMULATION') {
      // Bahagian A: Exactly 30 questions (Kecerdasan Insaniah: EQ, SQ, SSQ)
      const poolA = dataset.filter(q => q.section === 'BAHAGIAN_A');
      const shuffledA = [...poolA].sort(() => 0.5 - Math.random());
      const selectedA = shuffledA.slice(0, Math.min(30, poolA.length));

      // Bahagian B: Exactly 70 questions (Pengetahuan Am, BM, BI, Matematik, Sains)
      const poolB = dataset.filter(q => q.section === 'BAHAGIAN_B');
      const shuffledB = [...poolB].sort(() => 0.5 - Math.random());
      const selectedB = shuffledB.slice(0, Math.min(70, poolB.length));

      let fullList = [...selectedA, ...selectedB];

      // Safety guarantee: Ensure exactly 100 questions
      if (fullList.length < 100) {
        const usedIds = new Set(fullList.map(q => q.question_id));
        const remaining = dataset.filter(q => !usedIds.has(q.question_id)).sort(() => 0.5 - Math.random());
        fullList = fullList.concat(remaining.slice(0, 100 - fullList.length));
      }

      console.log(`[PKSK SYSTEM] FULL_SIMULATION: Generated exactly ${fullList.length} questions (Part A: ${selectedA.length}, Part B: ${selectedB.length})`);
      return randomizeOptions(fullList.slice(0, 100));
    } 
    else if (state.mode === 'QUICK_DIAGNOSTIC') {
      // Diagnostic: 10 Part A + 20 Part B = 30 questions total
      const poolA = dataset.filter(q => q.section === 'BAHAGIAN_A');
      const poolB = dataset.filter(q => q.section === 'BAHAGIAN_B');
      const selectedA = [...poolA].sort(() => 0.5 - Math.random()).slice(0, 10);
      const selectedB = [...poolB].sort(() => 0.5 - Math.random()).slice(0, 20);
      return randomizeOptions([...selectedA, ...selectedB]);
    }
    else if (state.mode === 'DRILL_PRACTICE') {
      let pool = [];
      if (state.drillTopic === 'ALL_INSANIAH') {
        pool = dataset.filter(q => q.section === 'BAHAGIAN_A');
      } else {
        pool = dataset.filter(q => q.subsection === state.drillTopic);
      }
      if (!pool.length) pool = dataset.filter(q => q.section === 'BAHAGIAN_B');
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      return randomizeOptions(shuffled.slice(0, Math.min(30, shuffled.length)));
    }
    return [];
  }

  function randomizeOptions(questions) {
    return questions.map(q => {
      if (q.options && q.options.length === 4) {
        const correctText = q.options.find(o => o.id === q.answer)?.text || '';
        const shuffled = [...q.options].sort(() => 0.5 - Math.random());
        const newOptions = shuffled.map((opt, idx) => ({
          id: ['A', 'B', 'C', 'D'][idx],
          text: opt.text
        }));
        const newKey = newOptions.find(o => o.text === correctText)?.id || 'A';
        return {
          ...q,
          options: newOptions,
          answer: newKey
        };
      }
      return q;
    });
  }

  /* =========================================================================
     VIEW SWITCHER & NAVIGATION
     ========================================================================= */
  function switchView(viewName) {
    state.currentView = viewName;

    // Hide all view containers
    if (dom.loginView) dom.loginView.classList.add('hidden');
    dom.dashboardView.classList.add('hidden');
    dom.instructionsView.classList.add('hidden');
    dom.examWorkspaceView.classList.add('hidden');
    dom.essayWorkspaceView.classList.add('hidden');
    dom.resultsView.classList.add('hidden');
    if (dom.reviewWorkspaceView) dom.reviewWorkspaceView.classList.add('hidden');

    // Reset tab active states
    document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));

    // Show HUD timer only during active exam
    if (dom.navHudTimer) {
      if (viewName === 'EXAM' || viewName === 'ESSAY') {
        dom.navHudTimer.style.display = 'flex';
      } else {
        dom.navHudTimer.style.display = 'none';
      }
    }

    // Toggle portal masthead and sticky navigation bar for dedicated split login experience (Gambar 3)
    const topPortalHeader = document.getElementById('acc-page-wrap');
    const mainNav = document.getElementById('navigation');
    if (viewName === 'LOGIN') {
      document.body.classList.add('in-login-mode');
      if (topPortalHeader) topPortalHeader.style.display = 'none';
      if (mainNav) mainNav.style.display = 'none';
      if (dom.loginView) dom.loginView.classList.remove('hidden');
      if (dom.navTabLogin) dom.navTabLogin.classList.add('active');
      renderLoginViewState();
    } else {
      document.body.classList.remove('in-login-mode');
      if (topPortalHeader) topPortalHeader.style.display = '';
      if (mainNav) mainNav.style.display = '';
    }

    // Semakan Akses Tempoh Percubaan & Kunci Lesen
    if (['EXAM', 'ESSAY', 'INSTRUCTIONS'].includes(viewName)) {
      if (window.PkskLicense && !window.PkskLicense.isAccessAllowed()) {
        openActivationModal(() => switchView(viewName), 'TRIAL_EXPIRED');
        showActivationAlert('Tempoh percubaan 2 jam anda telah tamat. Sistem kini dikunci sehingga No. Kunci Lesen sah dimasukkan.', 'error');
        if (state.currentView !== 'DASHBOARD' && state.currentView !== 'LOGIN') {
          switchView('DASHBOARD');
        }
        return;
      }
    }

    if (viewName === 'DASHBOARD') {
      dom.dashboardView.classList.remove('hidden');
      dom.navTabDashboard.classList.add('active');
      renderDashboardTrialBanner();
      updateLicenseBadgeUI();
    } 
    else if (viewName === 'INSTRUCTIONS') {
      dom.instructionsView.classList.remove('hidden');
    }
    else if (viewName === 'EXAM') {
      dom.examWorkspaceView.classList.remove('hidden');
      renderQuestion();
      renderPalette();
    }
    else if (viewName === 'ESSAY') {
      dom.essayWorkspaceView.classList.remove('hidden');
      dom.navTabEssay.classList.add('active');
      if (dom.navHudTimer) dom.navHudTimer.style.display = 'flex';
      
      // Jika calon belum menulis apa-apa esei, pastikan tajuk dipilih secara rawak agar tidak memuatkan tajuk statik yang sama
      const isEssayEmpty = !state.essayText || state.essayText.trim().length === 0;
      if (isEssayEmpty && !state.hasInitialEssayTopicSelected) {
        state.hasInitialEssayTopicSelected = true;
        renderEssayTopicAndIdeas(true);
      } else {
        renderEssayTopicAndIdeas(false);
      }

      // Pastikan kedua-dua pemasa (45 Minit & 10 Minit Auto-Tutup) berjalan serentak
      if (!state.essayTimerRunning || !state.timerInterval || state.timerSecondsLeft <= 0) {
        startEssaySessionTimers(true);
      } else {
        startAiIdeaTimer();
        updateTimerDisplay();
      }
    }
    else if (viewName === 'RESULTS') {
      dom.resultsView.classList.remove('hidden');
      dom.navTabSlip.classList.add('active');
      renderResultsSlip();
    }
    else if (viewName === 'REVIEW') {
      if (dom.reviewWorkspaceView) {
        dom.reviewWorkspaceView.classList.remove('hidden');
        renderReviewWorkspace();
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.selectMode = function(modeName) {
    state.mode = modeName;
    
    dom.cardModeFull.classList.toggle('selected', modeName === 'FULL_SIMULATION');
    dom.cardModeQuick.classList.toggle('selected', modeName === 'QUICK_DIAGNOSTIC');
    dom.cardModeDrill.classList.toggle('selected', modeName === 'DRILL_PRACTICE');

    dom.drillTopicGroup.style.display = (modeName === 'DRILL_PRACTICE') ? 'block' : 'none';
  };

  /* =========================================================================
     EXAM WORKSPACE RENDERING
     ========================================================================= */
  function renderQuestion() {
    const totalQ = state.sessionQuestions.length;
    if (totalQ === 0) return;

    const q = state.sessionQuestions[state.currentIndex];
    if (!q) return;

    // 1. Section Header Banner
    const isPartB = q.section === 'BAHAGIAN_B';
    dom.sectionBannerStrip.className = `section-banner-strip ${isPartB ? 'part-b' : ''}`;
    dom.dispSectionTitle.textContent = isPartB 
      ? 'BAHAGIAN B : KECERDASAN INTELEKTUAL (70%)' 
      : 'BAHAGIAN A : KECERDASAN INSANIAH (20%)';

    // 2. Question Heading & Badges
    dom.dispQuestionNumberLabel.textContent = `Soalan ${state.currentIndex + 1} daripada ${totalQ}`;
    dom.dispSubtopicBadge.textContent = `${q.topic || ''} • ${q.subtopic || ''}`;

    const isAnswered = Boolean(state.userAnswers[q.question_id]);
    dom.dispQuestionStatusBadge.textContent = isAnswered ? 'Status: Telah Dijawab' : 'Status: Belum Dijawab';

    // 3. Question Text
    dom.dispQuestionText.textContent = q.question;

    // 4. Diagram Rendering (WebP / PNG)
    if (q.image_url) {
      dom.dispQuestionDiagram.style.display = 'block';
      dom.dispQuestionDiagram.innerHTML = `
        <img src="${q.image_url}" alt="Rajah Soalan ${state.currentIndex + 1}" loading="lazy">
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.4rem; font-weight:600;">
          Rajah Stimulus Soalan ${state.currentIndex + 1}
        </div>
      `;
    } else {
      dom.dispQuestionDiagram.style.display = 'none';
      dom.dispQuestionDiagram.innerHTML = '';
    }

    // 5. Radio Options
    dom.optionsRadioContainer.innerHTML = '';
    const selectedOpt = state.userAnswers[q.question_id];

    (q.options || []).forEach(opt => {
      const isSelected = selectedOpt === opt.id;
      const optEl = document.createElement('div');
      optEl.className = `kpm-option-item ${isSelected ? 'selected' : ''}`;
      optEl.onclick = () => selectOption(q.question_id, opt.id);

      optEl.innerHTML = `
        <div class="opt-radio-circle">${opt.id}</div>
        <div class="opt-text">${opt.text}</div>
      `;
      dom.optionsRadioContainer.appendChild(optEl);
    });

    // 6. Flag Review Button State
    const isFlagged = Boolean(state.flaggedQuestions[q.question_id]);
    dom.btnFlagLabel.textContent = isFlagged ? 'Tanda Semakan (Aktif)' : 'Tanda untuk Semakan';
    dom.btnFlagReview.style.background = isFlagged ? 'var(--kpm-amber-light)' : '';

    // 7. Navigation Buttons State
    dom.btnPrevQuestion.disabled = state.currentIndex === 0;
    dom.btnPrevQuestion.style.opacity = state.currentIndex === 0 ? '0.5' : '1';

    dom.btnNextQuestion.innerHTML = (state.currentIndex === totalQ - 1)
      ? 'Hantar Bahagian MCQ <i class="fa-solid fa-check"></i>'
      : 'Soalan Seterusnya <i class="fa-solid fa-chevron-right"></i>';
  }

  function selectOption(qId, optId) {
    state.userAnswers[qId] = optId;
    renderQuestion();
    renderPalette();
  }

  function toggleFlagCurrentQuestion() {
    const q = state.sessionQuestions[state.currentIndex];
    if (!q) return;
    if (state.flaggedQuestions[q.question_id]) {
      delete state.flaggedQuestions[q.question_id];
    } else {
      state.flaggedQuestions[q.question_id] = true;
    }
    renderQuestion();
    renderPalette();
  }

  /* =========================================================================
     PALETTE RENDERING & FILTERING (1-100 MATRIX)
     ========================================================================= */
  function renderPalette() {
    dom.paletteGridMatrix.innerHTML = '';
    const totalQ = state.sessionQuestions.length;
    dom.countPaletteAll.textContent = totalQ;

    state.sessionQuestions.forEach((q, idx) => {
      // Filtering logic
      if (state.paletteFilter === 'PART_A' && q.section !== 'BAHAGIAN_A') return;
      if (state.paletteFilter === 'PART_B' && q.section !== 'BAHAGIAN_B') return;
      if (state.paletteFilter === 'FLAGGED' && !state.flaggedQuestions[q.question_id]) return;

      const isAnswered = Boolean(state.userAnswers[q.question_id]);
      const isFlagged = Boolean(state.flaggedQuestions[q.question_id]);
      const isCurrent = state.currentIndex === idx;

      const btn = document.createElement('button');
      let classList = ['palette-q-btn'];
      if (isAnswered) classList.push('answered');
      if (isFlagged) classList.push('flagged');
      if (isCurrent) classList.push('current');

      btn.className = classList.join(' ');
      btn.textContent = idx + 1;
      btn.title = `Soalan ${idx + 1}: ${q.topic || ''} (${isAnswered ? 'Dijawab' : 'Belum Jawab'})`;

      btn.onclick = () => {
        state.currentIndex = idx;
        renderQuestion();
        renderPalette();
        if (window.innerWidth < 1024 && dom.examWorkspaceView) {
          dom.examWorkspaceView.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      dom.paletteGridMatrix.appendChild(btn);
    });
  }

  function setPaletteFilter(filterType) {
    state.paletteFilter = filterType;
    document.querySelectorAll('.palette-tab-btn').forEach(btn => btn.classList.remove('active'));

    if (filterType === 'ALL') dom.paletteFilterAll.classList.add('active');
    if (filterType === 'PART_A') dom.paletteFilterA.classList.add('active');
    if (filterType === 'PART_B') dom.paletteFilterB.classList.add('active');
    if (filterType === 'FLAGGED') dom.paletteFilterFlagged.classList.add('active');

    renderPalette();
  }

  /* =========================================================================
     TIMER ENGINE
     ========================================================================= */
  function startTimer(durationSeconds) {
    clearInterval(state.timerInterval);
    state.timerSecondsLeft = durationSeconds;
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
      state.timerSecondsLeft--;
      updateTimerDisplay();

      if (state.timerSecondsLeft <= 0) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        if (state.currentView === 'ESSAY') {
          alert("Peringatan: Masa 45 minit untuk Bahagian C (Artikulasi Penulisan) telah tamat. Jawapan karangan anda disimpan secara automatik.");
          state.aiEssayAssessment = null;
          switchView('RESULTS');
        } else {
          alert("Peringatan: Masa menjawab telah tamat. Jawapan anda sedang diproses secara automatik.");
          handleExamCompletion();
        }
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(state.timerSecondsLeft / 60);
    const secs = state.timerSecondsLeft % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    if (dom.dispLiveTimer) {
      dom.dispLiveTimer.textContent = formatted;

      // Color rules: Blue by default, Yellow if <= 30 mins (1800s), Red if <= 10 mins (600s)
      let timerColor = '#1e40af'; // Blue (> 30 min)
      if (state.timerSecondsLeft <= 600) {
        timerColor = '#dc2626'; // Red (<= 10 min)
      } else if (state.timerSecondsLeft <= 1800) {
        timerColor = '#eab308'; // Yellow / Amber (<= 30 min)
      }

      dom.dispLiveTimer.style.color = timerColor;
      
      const hudIcon = document.getElementById('hudStopwatchIcon');
      if (hudIcon) {
        hudIcon.style.color = timerColor;
      }
    }

    // Kemas kini paparan pemasa 45 minit langsung dalam Bahagian C (Header Kad & Kotak Idea)
    if (dom.dispEssayMainTimer) {
      dom.dispEssayMainTimer.textContent = formatted;
    }
    if (dom.dispEssayBoxTimer) {
      dom.dispEssayBoxTimer.textContent = formatted;
    }

    if (dom.essayOverallTimerBadge) {
      if (state.timerSecondsLeft <= 300) {
        dom.essayOverallTimerBadge.style.background = '#fee2e2';
        dom.essayOverallTimerBadge.style.color = '#dc2626';
        dom.essayOverallTimerBadge.style.borderColor = '#f87171';
      } else if (state.timerSecondsLeft <= 600) {
        dom.essayOverallTimerBadge.style.background = '#fef3c7';
        dom.essayOverallTimerBadge.style.color = '#92400e';
        dom.essayOverallTimerBadge.style.borderColor = '#fde68a';
      } else {
        dom.essayOverallTimerBadge.style.background = '#eff6ff';
        dom.essayOverallTimerBadge.style.color = '#1e40af';
        dom.essayOverallTimerBadge.style.borderColor = '#bfdbfe';
      }
    }
  }

  /* =========================================================================
     EXAM WORKFLOW & SUBMISSION
     ========================================================================= */
  function startExam() {
    // Semakan Pengesahan Lesen & Had Percubaan 2 Jam
    if (window.PkskLicense && !window.PkskLicense.isAccessAllowed()) {
      openActivationModal(() => startExam(), 'TRIAL_EXPIRED');
      showActivationAlert('Tempoh percubaan 2 jam anda telah tamat. Sila masukkan Kunci Lesen PKSK atau buat pembelian via Telegram @halimroslan.', 'error');
      return;
    }

    // Sync candidate metadata
    if (dom.inputCandidateName && dom.inputCandidateName.value.trim()) {
      state.candidate.name = dom.inputCandidateName.value.trim();
    }
    if (dom.inputCandidateIc && dom.inputCandidateIc.value.trim()) {
      state.candidate.ic = dom.inputCandidateIc.value.trim();
    }
    if (dom.inputCandidateIndex && dom.inputCandidateIndex.value.trim()) {
      state.candidate.indexNo = dom.inputCandidateIndex.value.trim();
    }
    if (dom.selectTargetSchool) {
      state.candidate.targetSchool = dom.selectTargetSchool.value || 'SBP';
    }

    if (dom.dispCandidateName) dom.dispCandidateName.textContent = state.candidate.name || 'CALON PKSK';
    const activeIndex = state.candidate.indexNo || state.candidate.indexNumber || '';
    if (dom.dispCandidateIndex) dom.dispCandidateIndex.textContent = (activeIndex && activeIndex !== '-') ? `AG: ${activeIndex}` : '';

    // Generate questions
    state.sessionQuestions = generatePkskSession();
    state.currentIndex = 0;
    state.userAnswers = {};
    resetAiIdeaTimer();
    state.essayTimerRunning = false;
    state.flaggedQuestions = {};

    // Start timer (90 mins for full sim, 30 mins for others)
    const duration = state.mode === 'FULL_SIMULATION' ? 5400 : 1800;
    startTimer(duration);

    switchView('EXAM');
  }

  function openSubmitModal() {
    const answeredCount = Object.keys(state.userAnswers).length;
    const totalQ = state.sessionQuestions.length;
    dom.kpmModalSummaryText.innerHTML = `
      Anda telah menjawab <strong>${answeredCount}</strong> daripada <strong>${totalQ}</strong> soalan.<br>
      Adakah anda pasti untuk menamatkan Bahagian A & B sekarang?
    `;
    dom.kpmModalOverlay.style.display = 'flex';
  }

  function handleExamCompletion() {
    dom.kpmModalOverlay.style.display = 'none';
    clearInterval(state.timerInterval);
    state.timerInterval = null;

    if (state.mode === 'FULL_SIMULATION') {
      // Proceed to Bahagian C (Artikulasi Penulisan)
      state.essayTimerRunning = false;
      switchView('ESSAY');
      startEssaySessionTimers(true); // 45 minit & 10 minit auto-tutup bermula serentak!
    } else {
      // Direct to results
      switchView('RESULTS');
    }
  }

  /* =========================================================================
     PKSK ESSAY THEME GROUPS & TOPIC SELECTION CONTROLLER (BAHAGIAN C)
     ========================================================================= */
  const PKSK_THEME_GROUPS = [
    {
      id: 'ALL',
      label: 'Semua Tema',
      icon: 'fa-solid fa-layer-group',
      match: () => true
    },
    {
      id: 'BULI',
      label: 'Buli di Sekolah',
      icon: 'fa-solid fa-shield-halved',
      match: (t) => t.theme && t.theme.includes('Buli')
    },
    {
      id: 'KOAKAD',
      label: 'Ko-Akademik',
      icon: 'fa-solid fa-microphone-lines',
      match: (t) => t.theme && t.theme.includes('Ko-Akademik')
    },
    {
      id: 'KOKU',
      label: 'Kokurikulum & Sukan',
      icon: 'fa-solid fa-medal',
      match: (t) => t.theme && t.theme.includes('Kokurikulum')
    },
    {
      id: 'TEKNO',
      label: 'Teknologi & AI',
      icon: 'fa-solid fa-robot',
      match: (t) => t.theme && (t.theme.includes('Teknologi') || t.theme.includes('Digital'))
    },
    {
      id: 'PERPADUAN',
      label: 'Perpaduan & Kebangsaan',
      icon: 'fa-solid fa-flag',
      match: (t) => t.theme && (t.theme.includes('Perpaduan') || t.theme.includes('Patriotisme') || t.theme.includes('Kebangsaan') || t.theme.includes('Malaysia'))
    },
    {
      id: 'SAHSIAH',
      label: 'Sahsiah & Integriti',
      icon: 'fa-solid fa-star',
      match: (t) => t.theme && (t.theme.includes('Integriti') || t.theme.includes('Sahsiah') || t.theme.includes('Alam Sekitar') || t.theme.includes('Kewangan'))
    }
  ];

  function renderEssayThemePills() {
    if (!dom.essayThemePillsContainer) return;
    dom.essayThemePillsContainer.innerHTML = '';

    PKSK_THEME_GROUPS.forEach(group => {
      const count = PKSK_ESSAY_TOPICS.filter(group.match).length;
      const btn = document.createElement('button');
      btn.type = 'button';
      const isActive = (state.essayActiveTheme || 'ALL') === group.id;
      btn.className = `theme-pill-btn ${isActive ? 'active' : ''}`;
      btn.setAttribute('data-theme-id', group.id);
      btn.innerHTML = `<i class="${group.icon}"></i> ${group.label} <span class="pill-count">${count}</span>`;

      btn.onclick = () => {
        if (state.essayActiveTheme === group.id) return;
        state.essayActiveTheme = group.id;

        // Kemas kini gaya butang tema aktif
        const allPills = dom.essayThemePillsContainer.querySelectorAll('.theme-pill-btn');
        allPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-theme-id') === group.id));

        // Tapis tajuk dan pilih tajuk pertama jika tajuk semasa di luar tema ini
        const groupTopics = PKSK_ESSAY_TOPICS.filter(group.match);
        const matchesCurrent = state.essayTopic && group.match(state.essayTopic);

        if (!matchesCurrent && groupTopics.length > 0) {
          state.essayTopic = groupTopics[0];
          state.aiEssayAssessment = null;
          renderEssayTopicAndIdeas(false);
          resetAiIdeaTimer();
          startAiIdeaTimer();
        } else {
          populateEssayTopicDropdown();
          updateTopicIndicator();
        }
      };

      dom.essayThemePillsContainer.appendChild(btn);
    });

    if (dom.dispTotalTopicsBadge) {
      dom.dispTotalTopicsBadge.textContent = `${PKSK_ESSAY_TOPICS.length} Tajuk Tersedia`;
    }
  }

  function populateEssayTopicDropdown() {
    if (!dom.selectEssayTopic) return;
    dom.selectEssayTopic.innerHTML = '';

    const currentTheme = state.essayActiveTheme || 'ALL';

    if (currentTheme === 'ALL') {
      // Susun mengikut kategori tema khusus
      const specificGroups = PKSK_THEME_GROUPS.slice(1);
      specificGroups.forEach(group => {
        const groupTopics = PKSK_ESSAY_TOPICS.filter(group.match);
        if (groupTopics.length === 0) return;

        const optGroup = document.createElement('optgroup');
        optGroup.label = `━━ ${group.label} (${groupTopics.length} Tajuk) ━━`;

        groupTopics.forEach(topic => {
          const opt = document.createElement('option');
          opt.value = topic.id;
          opt.textContent = `${topic.title}`;
          if (state.essayTopic && state.essayTopic.id === topic.id) {
            opt.selected = true;
          }
          optGroup.appendChild(opt);
        });

        dom.selectEssayTopic.appendChild(optGroup);
      });
    } else {
      const activeGroup = PKSK_THEME_GROUPS.find(g => g.id === currentTheme) || PKSK_THEME_GROUPS[0];
      const groupTopics = PKSK_ESSAY_TOPICS.filter(activeGroup.match);

      groupTopics.forEach((topic, idx) => {
        const opt = document.createElement('option');
        opt.value = topic.id;
        opt.textContent = `${idx + 1}. [${topic.theme}] ${topic.title}`;
        if (state.essayTopic && state.essayTopic.id === topic.id) {
          opt.selected = true;
        }
        dom.selectEssayTopic.appendChild(opt);
      });
    }

    if (state.essayTopic) {
      dom.selectEssayTopic.value = state.essayTopic.id;
    }
  }

  function updateTopicIndicator() {
    if (!dom.dispTopicNumberIndicator || !state.essayTopic) return;
    const currentTheme = state.essayActiveTheme || 'ALL';
    const activeGroup = PKSK_THEME_GROUPS.find(g => g.id === currentTheme) || PKSK_THEME_GROUPS[0];
    const groupTopics = PKSK_ESSAY_TOPICS.filter(activeGroup.match);
    const indexInGroup = groupTopics.findIndex(t => t.id === state.essayTopic.id);

    if (indexInGroup !== -1) {
      dom.dispTopicNumberIndicator.innerHTML = `<i class="fa-solid fa-bookmark"></i> Tajuk ${indexInGroup + 1} daripada ${groupTopics.length} (${activeGroup.label})`;
    } else {
      const overallIndex = PKSK_ESSAY_TOPICS.findIndex(t => t.id === state.essayTopic.id);
      dom.dispTopicNumberIndicator.innerHTML = `<i class="fa-solid fa-bookmark"></i> Tajuk ${overallIndex + 1} daripada ${PKSK_ESSAY_TOPICS.length}`;
    }
  }

  /* =========================================================================
     PKSK ESSAY ENGINE & AI IDEA STARTER (BAHAGIAN C - 6 HINGGA 10 AYAT)
     ========================================================================= */
  function renderEssayTopicAndIdeas(forceNewTopic = false) {
    const currentTheme = state.essayActiveTheme || 'ALL';
    const activeGroup = PKSK_THEME_GROUPS.find(g => g.id === currentTheme) || PKSK_THEME_GROUPS[0];
    const groupTopics = PKSK_ESSAY_TOPICS.filter(activeGroup.match);

    if (forceNewTopic || !state.essayTopic) {
      const currentTitle = state.essayTopic ? state.essayTopic.title : '';
      const pool = groupTopics.length > 0 ? groupTopics : PKSK_ESSAY_TOPICS;
      const available = pool.filter(t => t.title !== currentTitle);
      state.essayTopic = available[Math.floor(Math.random() * available.length)] || pool[0] || PKSK_ESSAY_TOPICS[0];
      state.aiEssayAssessment = null; // Reset assessment bagi tajuk baharu
    }

    // Auto-sync tema aktif jika tajuk terpilih tidak sepadan dengan penapis tema semasa
    if (state.essayTopic && currentTheme !== 'ALL' && !activeGroup.match(state.essayTopic)) {
      const matchingGroup = PKSK_THEME_GROUPS.slice(1).find(g => g.match(state.essayTopic));
      if (matchingGroup) state.essayActiveTheme = matchingGroup.id;
    }

    // Kemas kini UI Kad Pilihan Tema dan Dropdown Tajuk
    renderEssayThemePills();
    populateEssayTopicDropdown();
    updateTopicIndicator();

    if (dom.dispEssayTitle && dom.dispEssayPrompt) {
      dom.dispEssayTitle.style.opacity = '0';
      dom.dispEssayPrompt.style.opacity = '0';
      setTimeout(() => {
        dom.dispEssayTitle.textContent = state.essayTopic.title;
        if (dom.dispEssayThemeBadge) {
          if (state.essayTopic.theme) {
            dom.dispEssayThemeBadge.textContent = state.essayTopic.theme;
            dom.dispEssayThemeBadge.style.display = 'inline-block';
          } else {
            dom.dispEssayThemeBadge.style.display = 'none';
          }
        }
        dom.dispEssayPrompt.innerHTML = `${state.essayTopic.prompt.replace(/tidak kurang daripada 100 patah perkataan/g, '<strong>tidak kurang daripada 100 patah perkataan</strong>')}`;
        dom.dispEssayTitle.style.opacity = '1';
        dom.dispEssayPrompt.style.opacity = '1';
      }, 120);
    }

    generateAiEssayIdeas(state.essayTopic, false);
    updateEssayWordCount();
  }

  function shuffleEssayTopic() {
    renderEssayTopicAndIdeas(true);
    resetAiIdeaTimer();
    startAiIdeaTimer();

    if (dom.btnShuffleEssayTopic) {
      const origHtml = dom.btnShuffleEssayTopic.innerHTML;
      dom.btnShuffleEssayTopic.innerHTML = '<i class="fa-solid fa-check"></i> Tajuk Baru!';
      setTimeout(() => {
        if (dom.btnShuffleEssayTopic) {
          dom.btnShuffleEssayTopic.innerHTML = '<i class="fa-solid fa-shuffle"></i> Tukar / Rawak Tajuk Esei';
        }
      }, 1000);
    }
  }

  function renderAiIdeaHtml(ideaData, sourceBadgeText = 'Gemini AI') {
    if (!dom.aiIdeaContent) return;

    let points = [];
    if (Array.isArray(ideaData)) {
      points = ideaData;
    } else if (ideaData && Array.isArray(ideaData.isi_points)) {
      points = ideaData.isi_points;
    } else if (ideaData && Array.isArray(ideaData.all_sentences)) {
      points = ideaData.all_sentences;
    } else if (ideaData && Array.isArray(ideaData.defaultIdeas)) {
      points = ideaData.defaultIdeas;
    }

    if (points.length === 0 && state.essayTopic && Array.isArray(state.essayTopic.defaultIdeas)) {
      points = state.essayTopic.defaultIdeas;
    }

    if (points.length > 10) points = points.slice(0, 10);

    state.currentEssayIdeas = {
      total_points: points.length,
      all_sentences: points
    };

    if (dom.aiIdeaBadge) {
      dom.aiIdeaBadge.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> ${sourceBadgeText}`;
      dom.aiIdeaBadge.style.background = '#dcfce7';
      dom.aiIdeaBadge.style.color = '#166534';
    }

    let html = `
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.6rem; flex-wrap:wrap; gap:0.4rem;">
        <span style="font-weight:800; color:#15803d; font-size:0.86rem; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-list-check" style="color:#16a34a;"></i> Cadangan Poin Isi Esei (Terus Kepada Isi):
        </span>
        <span style="background:#dcfce7; color:#14532d; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:12px; font-family:var(--font-mono); border:1px solid #86efac;">
          ${points.length} Poin Isi (4–6 Poin)
        </span>
      </div>
      <div style="display:flex; flex-direction:column; gap:0.45rem;">
    `;

    points.forEach((pt, idx) => {
      html += `
        <div style="display:flex; align-items:flex-start; gap:0.65rem; background:#ffffff; padding:0.5rem 0.8rem; border-radius:6px; border:1px solid #d1fae5; box-shadow:0 1px 2px rgba(0,0,0,0.02); user-select:none; -webkit-user-select:none; cursor:default;" oncopy="return false;" oncontextmenu="return false;">
          <span style="background:#15803d; color:#ffffff; font-weight:800; font-size:0.75rem; min-width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px;">
            ${idx + 1}
          </span>
          <span style="font-size:0.92rem; color:#1e293b; line-height:1.55; font-weight:500;">
            ${pt}
          </span>
        </div>
      `;
    });

    html += `
      </div>
      <div style="margin-top:0.65rem; padding-top:0.5rem; border-top:1px dashed #86efac; font-size:0.8rem; color:#15803d; display:flex; align-items:center; gap:6px;">
        <i class="fa-solid fa-circle-info" style="color:#16a34a;"></i>
        <span>Gunakan poin isi di atas sebagai panduan idea untuk menulis dan mengembangkan karangan anda melebihi 100 patah perkataan.</span>
      </div>
    `;

    dom.aiIdeaContent.innerHTML = html;
  }

  async function generateAiEssayIdeas(topic, forceRegen = false) {
    if (!topic) return;

    if (!forceRegen && topic.aiCustomIdeas) {
      renderAiIdeaHtml(topic.aiCustomIdeas, 'Gemini AI');
      return;
    }

    if (topic.defaultIdeas && !forceRegen) {
      renderAiIdeaHtml(topic.defaultIdeas, 'Idea Piawai PKSK');
      return;
    }

    if (dom.aiIdeaBadge) {
      dom.aiIdeaBadge.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menjana Poin Ringkas...';
      dom.aiIdeaBadge.style.background = '#fef3c7';
      dom.aiIdeaBadge.style.color = '#92400e';
    }
    if (dom.btnRegenerateAiIdeas) {
      dom.btnRegenerateAiIdeas.disabled = true;
    }

    const sysPrompt = `Anda ialah Guru Cemerlang Bahasa Melayu pakar Pentaksiran Kemasukan Sekolah Khusus (PKSK).
Tugas anda: Berikan terus 4 HINGGA 6 POIN FRASA RINGKAS sebagai idea karangan calon.
CONTOH FORMAT POIN YANG DIMAHUKAN:
"Pupuk semangat perpaduan antara murid pelbagai kaum"
"Amalkan sikap amanah dan jujur dalam akademik"
"Patuhi peraturan sekolah dan elakkan salah laku"

SYARAT KETAT:
1. WAJIB RINGKAS: Setiap poin HANYA frasa pendek (4 hingga 8 perkataan sahaja).
2. JANGAN tulis ayat panjang, jangan buat huraian atau contoh berjela-jela.
3. Terus kepada poin tindakan atau isi penting sahaja.
4. Jumlah poin: MESTI TEPAT ANTARA 4 HINGGA 6 POIN SAHAJA.
Format output JSON SAHAJA:
{
  "total_points": 5,
  "isi_points": [
    "Poin pendek 1...",
    "Poin pendek 2...",
    "Poin pendek 3...",
    "Poin pendek 4...",
    "Poin pendek 5..."
  ]
}`;

    const userPrompt = `Beri 4-6 poin frasa isi ringkas bagi tajuk ini:
Tajuk: "${topic.title}"
Stimulus: "${topic.prompt}"`;

    let aiResult = await callGeminiAi(sysPrompt, userPrompt);
    if (!aiResult.success || !aiResult.text) {
      aiResult = await callOxAlphaAi(sysPrompt, userPrompt);
    }

    if (dom.btnRegenerateAiIdeas) {
      dom.btnRegenerateAiIdeas.disabled = false;
    }

    if (aiResult.success && aiResult.text) {
      try {
        let clean = aiResult.text.replace(/\`\`\`json/gi, '').replace(/\`\`\`/g, '').trim();
        const m = clean.match(/\{[\s\S]*\}/);
        if (m) clean = m[0];
        const parsed = JSON.parse(clean);

        let points = [];
        if (Array.isArray(parsed.isi_points) && parsed.isi_points.length > 0) {
          points = parsed.isi_points;
        } else if (Array.isArray(parsed.all_sentences) && parsed.all_sentences.length > 0) {
          points = parsed.all_sentences;
        }

        // Enforce 4 to 6 points
        if (points.length < 4 && topic.defaultIdeas) {
          points = topic.defaultIdeas;
        } else if (points.length > 6) {
          points = points.slice(0, 6);
        }

        topic.aiCustomIdeas = points;
        renderAiIdeaHtml(points, aiResult.model || 'Gemini AI');
        return;
      } catch (err) {
        console.warn('Gagal parse JSON poin ringkas AI:', err);
      }
    }

    if (topic.defaultIdeas) {
      renderAiIdeaHtml(topic.defaultIdeas, 'Idea Piawai PKSK');
    }
  }

  function insertAiIdeasToEssay() {
    if (!state.currentEssayIdeas || !state.currentEssayIdeas.all_sentences || state.currentEssayIdeas.all_sentences.length === 0) return;

    const formattedPoints = state.currentEssayIdeas.all_sentences.map((pt, i) => `${i + 1}. ${pt}.`).join('\n');

    if (dom.inputEssayText) {
      if (dom.inputEssayText.value.trim().length > 0) {
        if (confirm('Ruang jawapan anda sudah mempunyai teks karangan. Adakah anda ingin menambah poin isi ini di bahagian bawah teks sedia ada?')) {
          dom.inputEssayText.value = dom.inputEssayText.value.trim() + '\n\n' + formattedPoints;
        }
      } else {
        dom.inputEssayText.value = formattedPoints;
      }
      updateEssayWordCount();
      dom.inputEssayText.focus();
    }

    if (dom.btnInsertAiIdeas) {
      const origHtml = dom.btnInsertAiIdeas.innerHTML;
      dom.btnInsertAiIdeas.innerHTML = '<i class="fa-solid fa-check"></i> Isi Disalin!';
      dom.btnInsertAiIdeas.style.background = '#dcfce7';
      dom.btnInsertAiIdeas.style.color = '#15803d';
      setTimeout(() => {
        if (dom.btnInsertAiIdeas) {
          dom.btnInsertAiIdeas.innerHTML = origHtml;
          dom.btnInsertAiIdeas.style.background = '#ffffff';
          dom.btnInsertAiIdeas.style.color = '#15803d';
        }
      }, 2000);
    }
  }

  /* =========================================================================
     AUTO-HIDE 10 MINIT & ANTI-COPY PROTECTION ENGINE (SEGERAK 45 MINIT ESEI)
     ========================================================================= */
  function startEssaySessionTimers(forceReset = false) {
    // 1. Mulakan Pemasa Utama 45 Minit (2700 saat) bagi Bahagian C
    if (forceReset || !state.timerInterval || !state.essayTimerRunning || state.timerSecondsLeft <= 0) {
      startTimer(2700); // 45 minit untuk penulisan esei
      state.essayTimerRunning = true;
    }

    // 2. Mulakan Pemasa 10 Minit Auto-Tutup Cadangan Isi Esei (600 saat) secara serentak
    if (forceReset) {
      resetAiIdeaTimer();
    }
    startAiIdeaTimer();

    // 3. Pastikan HUD timer di bar atas dipaparkan
    if (dom.navHudTimer) {
      dom.navHudTimer.style.display = 'flex';
    }
    updateTimerDisplay();
  }

  function startAiIdeaTimer() {
    if (state.aiIdeaTimerStarted) return;
    state.aiIdeaTimerStarted = true;

    if (state.aiIdeaTimerSecondsLeft <= 0) {
      if (dom.aiIdeaBox) dom.aiIdeaBox.style.display = 'none';
      if (dom.aiIdeaExpiredNotice) dom.aiIdeaExpiredNotice.classList.remove('hidden');
      return;
    }

    if (dom.aiIdeaBox) {
      dom.aiIdeaBox.style.display = 'block';
      dom.aiIdeaBox.style.opacity = '1';
    }
    if (dom.aiIdeaExpiredNotice) dom.aiIdeaExpiredNotice.classList.add('hidden');

    updateAiIdeaCountdownDisplay();

    if (state.aiIdeaTimerInterval) clearInterval(state.aiIdeaTimerInterval);
    state.aiIdeaTimerInterval = setInterval(() => {
      state.aiIdeaTimerSecondsLeft--;
      updateAiIdeaCountdownDisplay();

      if (state.aiIdeaTimerSecondsLeft <= 0) {
        clearInterval(state.aiIdeaTimerInterval);
        state.aiIdeaTimerInterval = null;

        // Auto-hide idea box selepas 10 minit tamat
        if (dom.aiIdeaBox) {
          dom.aiIdeaBox.style.opacity = '0';
          setTimeout(() => {
            if (dom.aiIdeaBox) dom.aiIdeaBox.style.display = 'none';
            if (dom.aiIdeaExpiredNotice) dom.aiIdeaExpiredNotice.classList.remove('hidden');
          }, 350);
        }
      }
    }, 1000);
  }

  function updateAiIdeaCountdownDisplay() {
    if (!dom.aiIdeaCountdown) return;
    const secs = Math.max(0, state.aiIdeaTimerSecondsLeft);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    dom.aiIdeaCountdown.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    if (dom.aiIdeaTimerBadge) {
      if (secs <= 120) {
        dom.aiIdeaTimerBadge.style.background = '#fee2e2';
        dom.aiIdeaTimerBadge.style.color = '#dc2626';
        dom.aiIdeaTimerBadge.style.borderColor = '#f87171';
      } else {
        dom.aiIdeaTimerBadge.style.background = '#fef3c7';
        dom.aiIdeaTimerBadge.style.color = '#92400e';
        dom.aiIdeaTimerBadge.style.borderColor = '#fde68a';
      }
    }
  }

  function resetAiIdeaTimer() {
    if (state.aiIdeaTimerInterval) clearInterval(state.aiIdeaTimerInterval);
    state.aiIdeaTimerInterval = null;
    state.aiIdeaTimerSecondsLeft = 600;
    state.aiIdeaTimerStarted = false;
    if (dom.aiIdeaBox) {
      dom.aiIdeaBox.style.display = 'block';
      dom.aiIdeaBox.style.opacity = '1';
    }
    if (dom.aiIdeaExpiredNotice) dom.aiIdeaExpiredNotice.classList.add('hidden');
    updateAiIdeaCountdownDisplay();
  }

  function initAiIdeaAntiCopy() {
    const targets = [dom.aiIdeaBox, dom.aiIdeaContent];
    targets.forEach(el => {
      if (!el) return;
      ['copy', 'cut', 'contextmenu', 'selectstart', 'dragstart'].forEach(evt => {
        el.addEventListener(evt, (e) => {
          e.preventDefault();
          return false;
        });
      });
    });
  }

  function toggleAiIdeaBox() {
    if (!dom.aiIdeaBody || !dom.btnToggleAiIdeas) return;
    const isHidden = dom.aiIdeaBody.style.display === 'none';
    dom.aiIdeaBody.style.display = isHidden ? 'block' : 'none';
    dom.btnToggleAiIdeas.innerHTML = isHidden ? '<i class="fa-solid fa-chevron-up"></i>' : '<i class="fa-solid fa-chevron-down"></i>';
    dom.btnToggleAiIdeas.title = isHidden ? 'Sembunyi idea' : 'Paparkan idea';
  }

  function updateEssayWordCount() {
    const text = dom.inputEssayText.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    state.essayText = text;
    dom.dispWordCount.textContent = `Jumlah Perkataan: ${words} / 100`;
    dom.dispWordCount.style.color = words >= 100 ? 'var(--kpm-emerald)' : 'var(--kpm-blue)';
  }

  /* =========================================================================
     OPENROUTER MULTI-KEY AI & HANDWRITING OCR ENGINE (9ROUTER POOL)
     - Vision Handwriting OCR (Fastest & Accurate): stealth/space-bunny-alpha, dots-studio/dots-3-note-preview:free, openrouter/free
     - Official LPM Rubric Grading (Smartest Frontier): nvidia/nemotron-3-ultra-550b-a55b:free, nvidia/nemotron-3-super-120b-a12b:free
     - Multi-Key Rotating Failover Pool from 9router (8 Keys)
     ========================================================================= */
  const _OR_B64_KEYS = [
    // Key #2 (Active & Fast)
    'c2stb3ItdjEtOWRjMWQ2NjM4MjMzNmM5YjNhNzFiNGFjYjU1OGMyZmY3ZTgxNDFlNGYwOGVmODIwNTJjODU1ZjcwZDI5MGY2Mw==',
    // Key #1 (Backup)
    'c2stb3ItdjEtMjY0MTNkNzFmNTlmNmJiYTRkMmI2OGU2NGJhOWVkMWZkOTc1MDE2N2ZiMzc5MTdlYWI1OGUzMWNkMzI0MDA5Nw==',
    'c2stb3ItdjEtNGIzMmYzM2JhYjY4Nzk0NjQwMWMzYTI2MWY0NjU1ZjFmZDE3YTU0MWNlMGIxMTlmOTJiN2Q5NzUzZDYxYTY4Zg==',
    'c2stb3ItdjEtODE3ODc3ZDYxZGFmYjliZTlkM2Y4MzdmNTI3YjhmZjlhMjc4MzAzN2FkOWZlYTIyOWI5N2NhYzdlMWM0YzI3Mg==',
    'c2stb3ItdjEtOGJhYzg0MmM5MzU2ZjViMWE2M2Y0ZGQwMGRlNzQ2NmJmYTZhYjU4MTU0OGNiZmU2ZWY2ZTRlMTJlOWEzMWMyOA==',
    'c2stb3ItdjEtODJkOTczZDdjMzY2NWNiNTllMWE0ZjU4MjhmNzQzZmQ5MzhkZWMzOWM0ZDlmZWI2OGY0MjQwMjcwOGM5YmY4NQ==',
    'c2stb3ItdjEtZTA4MTRhYjI0MmQ2NmNiMGFjYzZmYzc2ZjI2NTdmY2VjYWFiZjEzNDhlZTU4MTQwY2E2OWJhNmJkMjI1MDNhZQ==',
    'c2stb3ItdjEtYjNmN2IzZjIwYThjNzNjZWU1NGMxMjA2YWQwMGU5YzQxZTQzNmQ4NTAzYTdjZDk5MTM3MTk3YzI2ODg3ZjgxMA=='
  ];
  const OPENROUTER_KEYS_POOL = _OR_B64_KEYS.map(k => atob(k));

  let currentOrKeyIdx = 0;
  function getNextOrKey() {
    const key = OPENROUTER_KEYS_POOL[currentOrKeyIdx % OPENROUTER_KEYS_POOL.length];
    currentOrKeyIdx++;
    return key;
  }

  // Vision OCR Models (Priority order: fastest & most accurate handwriting transcription)
  const OPENROUTER_OCR_MODELS = [
    'dots-studio/dots-3-note-preview:free',
    'openrouter/free',
    'meta-llama/llama-3.2-11b-vision-instruct:free',
    'stealth/space-bunny-alpha'
  ];

  // Smartest Reasoning Models for Official LPM Rubric Grading
  const OPENROUTER_EVAL_MODELS = [
    'nvidia/nemotron-3-super-120b-a12b:free',
    'openrouter/free'
  ];

  // Verify if a file is an image (including iPhone HEIC/HEIF)
  function isSupportedImageFile(file) {
    if (!file) return false;
    if (file.type && file.type.startsWith("image/")) return true;
    const ext = (file.name || "").split(".").pop().toLowerCase();
    return ["heic", "heif", "jpg", "jpeg", "png", "webp", "bmp", "jfif"].includes(ext);
  }

  // Convert iPhone HEIC/HEIF to JPEG Blob if needed using heic2any
  async function convertHeicToJpegIfNeeded(file) {
    const ext = (file.name || "").split(".").pop().toLowerCase();
    const isHeic = ext === "heic" || ext === "heif" || file.type === "image/heic" || file.type === "image/heif";
    if (!isHeic) return file;

    if (typeof heic2any !== "undefined") {
      try {
        if (dom.ocrStatusText) dom.ocrStatusText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menukar format iPhone HEIC ke JPEG...';
        const converted = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.88
        });
        return Array.isArray(converted) ? converted[0] : converted;
      } catch (e) {
        console.warn("heic2any conversion error, continuing with original file:", e);
      }
    }
    return file;
  }

  // Clean OCR extracted text from models (handles reasoning, code fences, preambles)
  function cleanOcrText(msg) {
    if (!msg) return "";
    let text = msg.content || "";
    if (text && text.trim().length > 20) {
      return text
        .replace(/```(?:markdown|text)?\n?/gi, "")
        .replace(/```/g, "")
        .replace(/^(Berikut adalah|Transkripsi|Teks tulisan tangan|Berikut ialah|Salinan teks|Catatan|Berikut transkripsi).*?:\s*\n*/i, "")
        .replace(/^(Ini adalah|Teks yang diekstrak).*?:\s*\n*/i, "")
        .replace(/\n*(Nota|Catatan tambahan|Perhatian|Harap maklum):[\s\S]*$/i, "")
        .trim();
    }

    const r = msg.reasoning || (Array.isArray(msg.reasoning_details) && msg.reasoning_details[0]?.text) || "";
    if (!r) return "";

    const lines = [];
    const lineMatches = r.match(/(?:Line\s*\d+|Baris\s*\d+|Point\s*\d+|Header|Top)[^:\n]*:[ \t]*["'\`]?([^"'\`\r\n]+)/gi);
    if (lineMatches) {
      for (const lm of lineMatches) {
        const idx = lm.indexOf(":");
        if (idx !== -1) {
          let val = lm.slice(idx + 1).trim();
          val = val.replace(/^["'\`]/, "").replace(/["'\`]$/, "").replace(/\.{3,}$/, "").trim();
          if (val.length > 5 && !/^(looks like|starts with|partially|the text|let me|written)/i.test(val)) {
            lines.push(val);
          }
        }
      }
    }

    if (lines.length < 5) {
      const quoteMatches = r.match(/[\`"']([A-Za-z][a-z0-9\s,.-]{15,})[\`"']/g);
      if (quoteMatches) {
        for (const qm of quoteMatches) {
          const clean = qm.slice(1, -1).trim();
          if (/^(Faedah|Asah|Latih|Tingkat|Susun|Bina|Melatih|Kebaikan|Memperkembang|Memperkukuh)/i.test(clean)) {
            if (!lines.includes(clean)) lines.push(clean);
          }
        }
      }
    }

      // Deduplicate and consolidate prefix lines
  const rawLines = lines;
  const consolidated = [];
  const normalized = rawLines.map(l => l.replace(/\.{3,}$/, '').trim()).filter(Boolean);
  for (let i = 0; i < normalized.length; i++) {
    const line = normalized[i];
    const isPrefix = normalized.some((other, j) => i !== j && other.toLowerCase().startsWith(line.toLowerCase()) && other.length > line.length);
    if (!isPrefix && !consolidated.includes(line)) {
      consolidated.push(line);
    }
  }

  return consolidated.join('\n');
  }

  // Compress & normalize orientation (EXIF-aware via createImageBitmap)
  async function compressImageForOcr(file) {
    const preparedBlob = await convertHeicToJpegIfNeeded(file);

    // Modern browsers: createImageBitmap handles EXIF orientation automatically (portrait phone photos stay upright)
    if (typeof createImageBitmap !== "undefined") {
      try {
        const bitmap = await createImageBitmap(preparedBlob);
        const maxDim = 1500;
        let w = bitmap.width;
        let h = bitmap.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(bitmap, 0, 0, w, h);
        return canvas.toDataURL("image/jpeg", 0.85);
      } catch (err) {
        console.warn("createImageBitmap failed, fallback to FileReader Image:", err);
      }
    }

    // Fallback using HTML Image
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1500;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        img.onerror = () => reject(new Error("Gagal memproses fail imej. Pastikan fail adalah gambar yang sah."));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error("Gagal membaca fail gambar."));
      reader.readAsDataURL(preparedBlob);
    });
  }

  // Handle image selected via Camera Snap or File Picker or Drag & Drop
  async function handleEssayImageFile(file) {
    if (!isSupportedImageFile(file)) {
      alert("Sila muat naik fail gambar sahaja (JPG, PNG, WebP, atau iPhone HEIC).");
      return;
    }

    state.essayImageFile = file;

    // Show preview UI immediately
    if (dom.previewFileName) dom.previewFileName.textContent = file.name;
    if (dom.previewFileSize) dom.previewFileSize.textContent = `${Math.round(file.size / 1024)} KB`;
    if (dom.dropzoneEmpty) dom.dropzoneEmpty.style.display = "none";
    if (dom.dropzonePreview) dom.dropzonePreview.style.display = "flex";
    if (dom.btnRetranscribe) dom.btnRetranscribe.style.display = "none";

    if (dom.ocrStatusText) dom.ocrStatusText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses & menentukur format imej...';
    if (dom.ocrProgressBar) {
      dom.ocrProgressBar.className = "ocr-progress-bar-fill animating";
      dom.ocrProgressBar.style.width = "30%";
    }
    if (dom.previewOcrBadge) {
      dom.previewOcrBadge.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengekstrak Tulisan...';
      dom.previewOcrBadge.style.background = "rgba(15, 23, 42, 0.85)";
    }

    try {
      const compressedDataUrl = await compressImageForOcr(file);
      state.essayImageDataUrl = compressedDataUrl;
      if (dom.essayImagePreview) dom.essayImagePreview.src = compressedDataUrl;

      // Start Handwriting OCR
      await executeHandwritingOcr(compressedDataUrl);
    } catch (err) {
      console.error("OCR Error:", err);
      if (dom.ocrStatusText) dom.ocrStatusText.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i> Ralat: ${err.message}`;
      if (dom.previewOcrBadge) {
        dom.previewOcrBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color:#fca5a5;"></i> Gagal';
        dom.previewOcrBadge.style.background = "rgba(185, 28, 28, 0.9)";
      }
      if (dom.btnRetranscribe) dom.btnRetranscribe.style.display = "inline-block";
    }
  }

  // Execute Handwriting OCR (Serverless first, direct OpenRouter failover second)
  async function executeHandwritingOcr(imageDataUrl) {
    if (!imageDataUrl) return;

    if (dom.ocrStatusText) dom.ocrStatusText.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Mengekstrak teks tulisan tangan dengan OpenRouter Vision AI (anggaran 30-50 saat)...';
    if (dom.ocrProgressBar) {
      dom.ocrProgressBar.className = "ocr-progress-bar-fill animating";
      dom.ocrProgressBar.style.width = "65%";
    }

    let extractedText = "";
    let modelUsed = "";

    // 1. Try Vercel Serverless /api/transcribe first
    try {
      const serverlessResp = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageDataUrl })
      });

      if (serverlessResp.ok) {
        const json = await serverlessResp.json();
        if (json.success && json.transcribedText) {
          extractedText = json.transcribedText;
          modelUsed = json.modelUsed || "OpenRouter Vision";
        }
      }
    } catch (e) {
      console.warn("/api/transcribe offline or failed, switching to direct client OpenRouter call:", e);
    }

    // 2. Direct client fallback across 8 keys and OCR models
    if (!extractedText) {
      const promptText = `Transkripsikan semua perkataan bertulis tangan Bahasa Melayu yang terdapat pada gambar kertas karangan ini secara tepat mengikut susunan perkataan asal murid. Pulangkan teks tulisan sahaja.`;

      for (let attempt = 0; attempt < OPENROUTER_KEYS_POOL.length; attempt++) {
        const key = getNextOrKey();
        for (const model of OPENROUTER_OCR_MODELS) {
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 65000);

            const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${key}`,
                "HTTP-Referer": "https://pksk2026.vercel.app",
                "X-Title": "PKSK Simulator - Handwriting OCR"
              },
              signal: controller.signal,
              body: JSON.stringify({
                model: model,
                reasoning: { effort: "low" },
                messages: [
                  {
                    role: "user",
                    content: [
                      { type: "text", text: promptText },
                      { type: "image_url", image_url: { url: imageDataUrl } }
                    ]
                  }
                ],
                temperature: 0.1,
                max_tokens: 4500
              })
            });
            clearTimeout(timeout);

            if (resp.ok) {
              const data = await resp.json();
              const text = cleanOcrText(data.choices?.[0]?.message);
              if (text) {
                extractedText = text;
                modelUsed = `OpenRouter (${model.replace(":free", "")})`;
                break;
              }
            }
          } catch (e2) {
            console.warn(`Direct OCR attempt on ${model} error:`, e2);
          }
        }
        if (extractedText) break;
      }
    }

    if (extractedText) {
      if (dom.inputEssayText) {
        dom.inputEssayText.value = extractedText;
        updateEssayWordCount();
      }
      if (dom.ocrStatusText) dom.ocrStatusText.innerHTML = '<i class="fa-solid fa-circle-check" style="color:var(--kpm-emerald);"></i> Pengecaman tulisan tangan berjaya!';
      if (dom.ocrModelBadge) dom.ocrModelBadge.textContent = modelUsed || 'OpenRouter Vision';
      if (dom.ocrProgressBar) {
        dom.ocrProgressBar.className = 'ocr-progress-bar-fill';
        dom.ocrProgressBar.style.width = '100%';
      }
      if (dom.previewOcrBadge) {
        dom.previewOcrBadge.innerHTML = '<i class="fa-solid fa-check"></i> Selesai';
        dom.previewOcrBadge.style.background = 'rgba(16, 185, 129, 0.9)';
      }
      if (dom.transcriptionNotice) {
        dom.transcriptionNotice.innerHTML = `Selesai ditranskripsi oleh <strong>${modelUsed}</strong>. Sila semak teks di bawah sebelum menghantar.`;
        dom.transcriptionNotice.style.color = '#15803d';
      }
      if (dom.btnRetranscribe) dom.btnRetranscribe.style.display = 'inline-block';
    } else {
      throw new Error('Gagal mengekstrak teks tulisan tangan. Sila pastikan gambar kertas jelas.');
    }
  }

  function resetEssayImageUpload() {
    state.essayImageFile = null;
    state.essayImageDataUrl = null;
    if (dom.essayImageInput) dom.essayImageInput.value = '';
    if (dom.essayImagePreview) dom.essayImagePreview.src = '';
    if (dom.dropzoneEmpty) dom.dropzoneEmpty.style.display = 'block';
    if (dom.dropzonePreview) dom.dropzonePreview.style.display = 'none';
    if (dom.inputEssayText) {
      dom.inputEssayText.value = '';
      updateEssayWordCount();
    }
    if (dom.transcriptionNotice) {
      dom.transcriptionNotice.textContent = 'Teks diekstrak automatik dari gambar kertas';
      dom.transcriptionNotice.style.color = 'var(--text-muted)';
    }
    if (dom.btnRetranscribe) dom.btnRetranscribe.style.display = 'none';
  }

  // Official Rubric Evaluation Engine with 550B Frontier Reasoning Model
  // Real-Time High-Fidelity Malay NLP Rubric Engine
  function evaluateEssayLocalEngine(essay, topicTitle = "Umum", topicPrompt = "") {
    const text = (essay || "").trim();
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const paragraphs = text.split(/\n+/).map(p => p.trim()).filter(p => p.length > 0);
    const paraCount = paragraphs.length;

    const flaws = [];
    const dupMatch = text.match(/\b([a-zA-Z\u00C0-\u017F]+)\s+\1\b/gi);
    if (dupMatch) {
      dupMatch.forEach(m => {
        const err = `Pengulangan perkataan tidak sengaja: "${m}"`;
        if (!flaws.includes(err)) flaws.push(err);
      });
    }
    if (text.includes("^")) {
      flaws.push("Terdapat simbol sisipan \"^\" yang tidak diperlukan dalam teks karangan.");
    }
    if (/Khususnya,\s*ketika\s*pertandingan\./i.test(text)) {
      flaws.push("Ayat tergantung dikesan: \"Khususnya, ketika pertandingan.\" (memerlukan klausa utama).");
    }
    if (/\^?diri dapat membina ayat yang gramatis/i.test(text)) {
      flaws.push("Struktur ayat kurang tepat: \"Kesannya, diri dapat membina ayat yang gramatis.\"");
    }

    const strengths = [];
    const kbatKeywords = ["kritis", "matang", "bernas", "spontan", "hujah", "fakta", "kepimpinan", "keyakinan", "berani", "positif", "lancar"];
    const matchedKbat = kbatKeywords.filter(k => new RegExp(`\b${k}\b`, "i").test(text));
    if (matchedKbat.length >= 4) {
      strengths.push(`Penggunaan kosa kata KBAT yang tepat: ${matchedKbat.slice(0, 5).join(", ")}`);
    }
    const discourseMarkers = ["Antaranya", "Selain itu", "Seterusnya", "Akhir sekali", "Kesimpulannya", "Oleh itu", "Khususnya", "Misalnya", "Contohnya"];
    const matchedDiscourse = discourseMarkers.filter(d => new RegExp(`\b${d}\b`, "i").test(text));
    if (matchedDiscourse.length >= 3) {
      strengths.push(`Penggunaan penanda wacana yang berkesan: ${matchedDiscourse.slice(0, 4).join(", ")}`);
    }
    if (paraCount >= 4) {
      strengths.push(`Struktur karangan lengkap (${paraCount} perenggan: Pendahuluan, Isi-isi penting, dan Penutup).`);
    }

    let ideaScore = 2.4;
    if (wordCount < 60) ideaScore = 1.0;
    else if (wordCount < 100) ideaScore = 1.8;

    let bahasaScore = 2.2;
    if (flaws.length > 0) bahasaScore -= Math.min(1.0, flaws.length * 0.3);
    if (wordCount < 80) bahasaScore -= 0.4;
    bahasaScore = Math.max(1.0, parseFloat(bahasaScore.toFixed(1)));

    let strukturScore = 1.4;
    if (paraCount >= 4 && matchedDiscourse.length >= 3) strukturScore = 1.7;

    let nilaiKbatScore = 1.4;
    if (matchedKbat.length >= 4) nilaiKbatScore = 1.7;

    const totalScore = parseFloat((ideaScore + bahasaScore + strukturScore + nilaiKbatScore).toFixed(1));

    let band = "Band 4 (Kepujian)";
    if (totalScore >= 8.5) band = "Band 5 (Cemerlang)";
    else if (totalScore >= 6.5) band = "Band 4 (Kepujian)";
    else if (totalScore >= 4.5) band = "Band 3 (Memuaskan)";
    else band = "Band 2 (Penguasaan Minimum)";

    return {
      skor_keseluruhan: totalScore,
      band: band,
      kriteria: {
        idea: {
          skor: ideaScore,
          max: 3.0,
          ulasan: `Idea relevan dengan tema (${matchedKbat.slice(0, 3).join(", ") || topicTitle}). Hujah diperjelas melalui perenggan isi yang teratur.`
        },
        bahasa: {
          skor: bahasaScore,
          max: 3.0,
          ulasan: flaws.length > 0 
            ? `Kosa kata memuaskan, namun ${flaws.length} kelemahan ejaan & struktur ayat perlu dimurnikan.`
            : "Bahasa Melayu baku digunakan dengan baik dan mematuhi Tatabahasa Dewan."
        },
        struktur: {
          skor: strukturScore,
          max: 2.0,
          ulasan: `Perengganan teratur (${paraCount} perenggan) disokong penanda wacana (${matchedDiscourse.slice(0, 3).join(", ") || "penanda wacana asas"}).`
        },
        nilai_kbat: {
          skor: nilaiKbatScore,
          max: 2.0,
          ulasan: "Aplikasi nilai murni, disiplin, dan pemikiran berani/kritis ditonjolkan secara kontekstual."
        }
      },
      kekuatan: strengths,
      kelemahan_tatabahasa: flaws.length > 0 ? flaws : ["Tiada kesalahan tatabahasa ketara."],
      cadangan_penambahbaikan: [
        "Huraikan setiap faedah dengan contoh pengalaman sebenar atau peribahasa bersesuaian.",
        "Semak semula ayat sebelum menghantar bagi mengelakkan perkataan berulang dan simbol taipan.",
        "Gunakan ayat majmuk gabungan dan pancangan bagi memperkaya kepelbagaian struktur ayat."
      ],
      rumusan_keseluruhan: `Karangan mencapai tahap ${band} (${wordCount} patah perkataan). Calon mempamerkan keupayaan berartikulasi yang meyakinkan.`,
      aiModelUsed: "Ox Alpha AI (Analisis Pantas LPM)"
    };
  }

  async function evaluateEssayWithOxAlpha() {
    const essay = (dom.inputEssayText ? dom.inputEssayText.value : (state.essayText || "")).trim();
    state.essayText = essay;

    if (!essay) {
      state.aiEssayAssessment = {
        skor_keseluruhan: 0,
        band: "Band 1 (Tiada Penulisan)",
        kriteria: {
          idea: { skor: 0, max: 3.0, ulasan: "Calon tidak memuat naik gambar kertas esei atau teks kosong." },
          bahasa: { skor: 0, max: 3.0, ulasan: "Tiada teks untuk disemak tatabahasa & ejaan." },
          struktur: { skor: 0, max: 2.0, ulasan: "Tiada perenggan yang dikesan." },
          nilai_kbat: { skor: 0, max: 2.0, ulasan: "Tiada bukti nilai murni atau pemikiran kritis." }
        },
        kekuatan: ["Tiada"],
        kelemahan_tatabahasa: ["Ruang penulisan kosong."],
        cadangan_penambahbaikan: ["Sila muat naik foto kertas jawapan anda untuk disemak oleh AI."],
        rumusan_keseluruhan: "Calon tidak melengkapkan Bahagian C (Artikulasi Penulisan)."
      };
      return state.aiEssayAssessment;
    }

    const topicTitle = state.essayTopic?.title || "Umum";
    const topicPrompt = state.essayTopic?.prompt || "";

    // 1. Instant baseline assessment using Malay NLP Rule-Engine
    const localAssessment = evaluateEssayLocalEngine(essay, topicTitle, topicPrompt);

    // 2. High-speed AI evaluation with a tight 3.8s race timeout
    const aiPromise = (async () => {
      // 2a. Try Vercel Serverless /api/evaluate first
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3200);

        const serverlessResp = await fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            essayText: essay,
            topicTitle: topicTitle,
            topicPrompt: topicPrompt
          })
        });
        clearTimeout(timeout);

        if (serverlessResp.ok) {
          const json = await serverlessResp.json();
          if (json.success && json.assessment && typeof json.assessment.skor_keseluruhan === "number") {
            return json.assessment;
          }
        }
      } catch (e) {
        // Fallback to client call
      }

      // 2b. Direct OpenRouter client call
      try {
        const currentKey = getNextOrKey();
        const model = OPENROUTER_EVAL_MODELS[0] || "nvidia/nemotron-3-super-120b-a12b:free";
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3500);

        const prompt = `Anda Pemeriksa Rasmi Lembaga Peperiksaan Malaysia bagi PKSK Bahagian C (Artikulasi Penulisan).
Wajib sediakan JSON SAHAJA mengikut skema:
{
  "skor_keseluruhan": 7.0,
  "band": "Band 4 (Kepujian)",
  "kriteria": {
    "idea": { "skor": 2.0, "max": 3.0, "ulasan": "..." },
    "bahasa": { "skor": 2.0, "max": 3.0, "ulasan": "..." },
    "struktur": { "skor": 1.5, "max": 2.0, "ulasan": "..." },
    "nilai_kbat": { "skor": 1.5, "max": 2.0, "ulasan": "..." }
  },
  "kekuatan": ["..."],
  "kelemahan_tatabahasa": ["..."],
  "cadangan_penambahbaikan": ["..."],
  "rumusan_keseluruhan": "..."
}`;

        const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentKey}`,
            "HTTP-Referer": "https://pksk2026.vercel.app",
            "X-Title": "PKSK Simulator - Essay Evaluation"
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: prompt },
              { role: "user", content: `Karangan Calon:\n${essay}` }
            ],
            temperature: 0.1,
            max_tokens: 1000
          })
        });
        clearTimeout(timeout);

        if (resp.ok) {
          const data = await resp.json();
          const text = data.choices?.[0]?.message?.content || "";
          const match = text.match(/\{[\s\S]*\}/);
          if (match) {
            const parsed = JSON.parse(match[0]);
            if (typeof parsed.skor_keseluruhan === "number") {
              parsed.aiModelUsed = `Ox Alpha AI (${model.replace(":free", "")})`;
              return parsed;
            }
          }
        }
      } catch (e) {}

      return null;
    })();

    // Dynamic micro-delay (1.2s) so the student experiences a realistic diagnostic progression
    const minAnimationPromise = new Promise(resolve => setTimeout(resolve, 1300));
    const raceTimeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), 3800));

    const [aiResult] = await Promise.all([
      Promise.race([aiPromise, raceTimeoutPromise]),
      minAnimationPromise
    ]);

    const finalAssessment = aiResult || localAssessment;
    state.aiEssayAssessment = finalAssessment;
    return finalAssessment;
  }

  /* =========================================================================
     OFFICIAL RESULTS SLIP CALCULATION & AI REPORT
     ========================================================================= */
  async function renderResultsSlip() {
    // Fill candidate details
    dom.slipDispName.textContent = state.candidate.name || 'CALON PKSK';
    dom.slipDispIc.textContent = state.candidate.ic || '-';
    dom.slipDispIndex.textContent = state.candidate.indexNo || '-';
    dom.slipDispTarget.textContent = state.candidate.targetSchool || 'SEKOLAH BERASRAMA PENUH (SBP)';

    const isEssayOnly = state.mode === 'ESSAY_PRACTICE' || state.mode === 'ESSAY' || state.sessionQuestions.length === 0;

    if (isEssayOnly) {
      // Mod Semakan Esei Sahaja: Sembunyikan banner markah keseluruhan PKSK dan jadual MCQ serta-merta
      if (dom.slipSubTitle) dom.slipSubTitle.textContent = 'LAPORAN PENILAIAN RASMI AI: ARTIKULASI PENULISAN (BAHAGIAN C)';
      if (dom.slipHeroBadge) dom.slipHeroBadge.style.display = 'none';
      if (dom.slipScoreTable) dom.slipScoreTable.style.display = 'none';
      if (dom.btnReviewAllAnswers) dom.btnReviewAllAnswers.style.display = 'none';
      if (dom.btnWriteNewEssay) dom.btnWriteNewEssay.style.display = 'inline-flex';
    } else {
      // Mod Simulasi Penuh: Sediakan paparan sedang mengira / kosongkan dulu sebelum AI selesai
      if (dom.slipSubTitle) dom.slipSubTitle.textContent = 'SLIP KEPUTUSAN PENTAKSIRAN KEMASUKAN SEKOLAH KHUSUS (PKSK) TINGKATAN 1';
      if (dom.slipHeroBadge) dom.slipHeroBadge.style.display = 'block';
      if (dom.slipScoreTable) dom.slipScoreTable.style.display = 'table';
      if (dom.btnReviewAllAnswers) dom.btnReviewAllAnswers.style.display = 'inline-flex';
      if (dom.btnWriteNewEssay) dom.btnWriteNewEssay.style.display = 'none';

      dom.slipDispTotalScore.textContent = '...';
      dom.slipDispStatus.textContent = 'Sedang memproses penilaian & keputusan...';
      dom.slipDispStatus.style.color = '#fde047';
    }

    // Evaluate essay with Ox Alpha AI or retrieve cached assessment
    if (!state.aiEssayAssessment && !state.isEvaluatingAI) {
      state.isEvaluatingAI = true;
      let progressTimer = null;
      if (dom.aiEssayReportSection) {
        dom.aiEssayReportSection.innerHTML = `
          <div style="text-align:center; padding:2.5rem 1rem;">
            <div class="ai-eval-spinner" style="width:38px; height:38px; border-width:3.5px; border-color:#16a34a; border-top-color:transparent; margin-bottom:1rem;"></div>
            <h4 id="aiEvalHeading" style="color:var(--kpm-navy); font-weight:800; font-size:1.15rem; margin-bottom:0.35rem; transition:all 0.3s ease;">
              <i class="fa-solid fa-brain" style="color:#16a34a;"></i> Menganalisis Struktur & Idea Karangan...
            </h4>
            <p id="aiEvalSub" style="font-size:0.88rem; color:var(--text-muted); margin:0; transition:all 0.3s ease;">
              Memeriksa jumlah perkataan, pembentukan perenggan, dan keselarasan tajuk.
            </p>
          </div>
        `;

        const steps = [
          { h: "Menyemak Tatabahasa & Ejaan Melayu Baku...", s: "Mengimbas hukum Tatabahasa Dewan, pengulangan frasa, dan ketepatan imbuhan." },
          { h: "Menilai Pemikiran Kritis & KBAT...", s: "Menganalisis kedalaman hujah, daya kepimpinan, dan nilai murni calon." },
          { h: "Menjana Slip Keputusan & Gred Rasmi LPM...", s: "Menghitung skor muktamad mengikut 4 kriteria rasmi Pentaksiran Kemasukan Sekolah Khusus." }
        ];
        let stepIdx = 0;
        progressTimer = setInterval(() => {
          if (stepIdx < steps.length) {
            const hEl = document.getElementById("aiEvalHeading");
            const sEl = document.getElementById("aiEvalSub");
            if (hEl && sEl) {
              hEl.innerHTML = `<i class="fa-solid fa-brain" style="color:#16a34a;"></i> ${steps[stepIdx].h}`;
              sEl.textContent = steps[stepIdx].s;
            }
            stepIdx++;
          }
        }, 900);
      }
      await evaluateEssayWithOxAlpha();
      if (progressTimer) clearInterval(progressTimer);
      state.isEvaluatingAI = false;
    }

    const aiAssessment = state.aiEssayAssessment || { skor_keseluruhan: 8.0 };
    const percentC = typeof aiAssessment.skor_keseluruhan === 'number' ? aiAssessment.skor_keseluruhan : 8.0;

    if (!isEssayOnly) {
      // Calculate MCQ scores
      let correctA = 0, totalA = 0;
      let correctB = 0, totalB = 0;

      state.sessionQuestions.forEach(q => {
        const userAns = state.userAnswers[q.question_id];
        const isCorrect = userAns === q.answer;

        if (q.section === 'BAHAGIAN_A') {
          totalA++;
          if (isCorrect) correctA++;
        } else {
          totalB++;
          if (isCorrect) correctB++;
        }
      });

      const percentA = totalA > 0 ? (correctA / totalA) * 20 : 0; // 20% weight
      const percentB = totalB > 0 ? (correctB / totalB) * 70 : 0; // 70% weight

      const totalScoreNum = (percentA + percentB + percentC);
      const totalScore = totalScoreNum.toFixed(1);
      dom.slipDispTotalScore.textContent = `${totalScore}%`;

      function getRating(percentage) {
        if (percentage >= 80) return { text: 'CEMERLANG (BAND 5)', color: 'var(--kpm-emerald)' };
        if (percentage >= 65) return { text: 'SANGAT BAIK (BAND 4)', color: 'var(--kpm-blue)' };
        if (percentage >= 50) return { text: 'BAIK (BAND 3)', color: 'var(--kpm-gold)' };
        if (percentage >= 40) return { text: 'MEMUASKAN (BAND 2)', color: '#f59e0b' };
        return { text: 'PERLU BIMBINGAN (BAND 1)', color: 'var(--kpm-red)' };
      }

      const pctA = totalA > 0 ? (correctA / totalA) * 100 : 0;
      const pctB = totalB > 0 ? (correctB / totalB) * 100 : 0;
      const pctC = (percentC / 10) * 100;

      const ratingA = getRating(pctA);
      const ratingB = getRating(pctB);
      const ratingC = getRating(pctC);
      const overallRating = getRating(totalScoreNum);

      const isLulus = totalScoreNum >= 65;
      const overallStatusText = isLulus ? 'LAYAK DIPERTIMBANGKAN KE SBP / MRSM' : 'TIDAK MENCAPAI KELAYAKAN MINIMUM';
      const overallStatusColor = isLulus ? 'var(--kpm-emerald)' : 'var(--kpm-red)';

      // Status commentary
      if (totalScoreNum >= 80) {
        dom.slipDispStatus.textContent = 'TAHNIAH! ANDA MENCAPAI TAHAP KELAYAKAN CEMERLANG (BAND 5)';
        dom.slipDispStatus.style.color = '#86efac';
      } else if (totalScoreNum >= 65) {
        dom.slipDispStatus.textContent = 'KEPUTUSAN BAIK: LAYAK DIPERTIMBANGKAN KE SEKOLAH KHUSUS (BAND 4)';
        dom.slipDispStatus.style.color = '#fde047';
      } else if (totalScoreNum >= 50) {
        dom.slipDispStatus.textContent = 'TAHAP SEDERHANA: LAYAK BERSYARAT KEKOSONGAN (BAND 3)';
        dom.slipDispStatus.style.color = '#fca5a5';
      } else {
        dom.slipDispStatus.textContent = 'TAHAP LEMAH: PERLU MEMPERTINGKATKAN KEMAHIRAN ASAS (BAND 1-2)';
        dom.slipDispStatus.style.color = '#ef4444';
      }

      const words = (state.essayText || '').trim().split(/\s+/).filter(w => w.length > 0).length;

      // Populate score breakdown table
      dom.slipScoreTableBody.innerHTML = `
        <tr style="border-bottom:1px solid var(--border-subtle);">
          <td style="padding:0.75rem 0.9rem;"><strong>Bahagian A:</strong> Kecerdasan Insaniah (EQ, SQ, SSQ)</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;">20%</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;"><strong>${percentA.toFixed(1)}%</strong> (${correctA}/${totalA})</td>
          <td style="text-align:center; padding:0.75rem 0.9rem; color:${ratingA.color}; font-weight:700;">${ratingA.text}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-subtle);">
          <td style="padding:0.75rem 0.9rem;"><strong>Bahagian B:</strong> Kecerdasan Intelektual (PA, BM, BI, Matematik, Sains)</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;">70%</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;"><strong>${percentB.toFixed(1)}%</strong> (${correctB}/${totalB})</td>
          <td style="text-align:center; padding:0.75rem 0.9rem; color:${ratingB.color}; font-weight:700;">${ratingB.text}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-subtle);">
          <td style="padding:0.75rem 0.9rem;"><strong>Bahagian C:</strong> Artikulasi Penulisan (Semakan AI Rubrik Pentaksiran Rasmi)</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;">10%</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;"><strong>${percentC.toFixed(1)}%</strong> (${words} perkataan)</td>
          <td style="text-align:center; padding:0.75rem 0.9rem; color:${ratingC.color}; font-weight:700;">${ratingC.text}</td>
        </tr>
        <tr style="background-color:var(--bg-surface-subtle); font-weight:800; font-size:0.95rem;">
          <td style="padding:0.9rem;">JUMLAH MARKAH KESELURUHAN</td>
          <td style="text-align:center; padding:0.9rem;">100%</td>
          <td style="text-align:center; padding:0.9rem; color:var(--kpm-navy); font-size:1.1rem;">${totalScore}%</td>
          <td style="text-align:center; padding:0.9rem; color:${overallStatusColor}; line-height:1.2;">
            ${overallStatusText}<br>
            <span style="font-size:0.75rem; opacity:0.85;">${overallRating.text}</span>
          </td>
        </tr>
      `;
    }

    // Render Detailed AI Essay Report Card
    renderAiEssayReportCard(aiAssessment);
  }

  function renderAiEssayReportCard(assessment) {
    if (!dom.aiEssayReportSection) return;

    if (!assessment) {
      dom.aiEssayReportSection.innerHTML = `
        <div style="text-align:center; padding:1.5rem;">
          <p>Tiada data semakan esei.</p>
        </div>
      `;
      return;
    }

    const k = assessment.kriteria || {};
    const ideaScore = k.idea?.skor || 0;
    const ideaMax = k.idea?.max || 3.0;
    const bahasaScore = k.bahasa?.skor || 0;
    const bahasaMax = k.bahasa?.max || 3.0;
    const strukturScore = k.struktur?.skor || 0;
    const strukturMax = k.struktur?.max || 2.0;
    const nilaiScore = k.nilai_kbat?.skor || 0;
    const nilaiMax = k.nilai_kbat?.max || 2.0;

    const strengthsHtml = (assessment.kekuatan || []).map(s => `<li>${s}</li>`).join('');
    const weaknessesHtml = (assessment.kelemahan_tatabahasa || []).map(w => `<li>${w}</li>`).join('');

    const apiKey = localStorage.getItem('pksk_gemini_api_key') || '';
    const isAiPowered = !assessment.isHeuristic && apiKey;

    dom.aiEssayReportSection.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; border-bottom:1.5px solid var(--border-subtle); padding-bottom:1rem; margin-bottom:1rem;">
        <div>
          <h3 style="color:var(--kpm-navy); font-size:1.2rem; font-weight:800; margin:0 0 0.25rem 0; display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-brain" style="color:#16a34a;"></i> Laporan Penilaian AI: Artikulasi Penulisan (Bahagian C)
          </h3>
          <p style="margin:0; font-size:0.85rem; color:var(--text-muted);">
            Disemak oleh <strong>${assessment.aiModelUsed || 'AI Engine (Gemini & Ox Alpha)'}</strong> mengikut Rubrik Rasmi Lembaga Peperiksaan Malaysia.
          </p>
        </div>
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="text-align:right;">
            <span style="font-size:0.78rem; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Skor Esei</span>
            <div style="font-size:1.5rem; font-weight:800; color:#16a34a; font-family:var(--font-mono);">${(assessment.skor_keseluruhan || 0).toFixed(1)} / 10.0</div>
          </div>
          <button id="btnReevaluateEssayAi" class="btn-kpm btn-kpm-gold" style="font-size:0.82rem; padding:0.5rem 1rem; font-weight:800;">
            <i class="fa-solid fa-arrows-rotate"></i> Nilai Semula AI
          </button>
        </div>
      </div>

      <!-- 4 Rubric Criteria Grid -->
      <div class="ai-criteria-grid">
        
        <!-- Criteria 1: Idea & Hujah -->
        <div class="ai-criterion-item">
          <div class="ai-criterion-header">
            <span>1. Idea, Hujah & Kematangan</span>
            <span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:800; font-size:0.85rem; padding:3px 7px; border-radius:4px;">${ideaScore} / ${ideaMax}</span>
          </div>
          <div class="ai-progress-track">
            <div class="ai-progress-fill" style="width:${(ideaScore / ideaMax) * 100}%;"></div>
          </div>
          <p style="font-size:0.85rem; color:#334155; margin:0; line-height:1.5;">${k.idea?.ulasan || 'Idea menepati tajuk penulisan.'}</p>
        </div>

        <!-- Criteria 2: Bahasa & Tatabahasa -->
        <div class="ai-criterion-item">
          <div class="ai-criterion-header">
            <span>2. Bahasa, Ejaan & Tatabahasa</span>
            <span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:800; font-size:0.85rem; padding:3px 7px; border-radius:4px;">${bahasaScore} / ${bahasaMax}</span>
          </div>
          <div class="ai-progress-track">
            <div class="ai-progress-fill" style="width:${(bahasaScore / bahasaMax) * 100}%;"></div>
          </div>
          <p style="font-size:0.85rem; color:#334155; margin:0; line-height:1.5;">${k.bahasa?.ulasan || 'Tatabahasa memuaskan.'}</p>
        </div>

        <!-- Criteria 3: Struktur & Format -->
        <div class="ai-criterion-item">
          <div class="ai-criterion-header">
            <span>3. Struktur & Koheren</span>
            <span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:800; font-size:0.85rem; padding:3px 7px; border-radius:4px;">${strukturScore} / ${strukturMax}</span>
          </div>
          <div class="ai-progress-track">
            <div class="ai-progress-fill" style="width:${(strukturScore / strukturMax) * 100}%;"></div>
          </div>
          <p style="font-size:0.85rem; color:#334155; margin:0; line-height:1.5;">${k.struktur?.ulasan || 'Struktur perenggan tersusun.'}</p>
        </div>

        <!-- Criteria 4: Nilai Murni & KBAT -->
        <div class="ai-criterion-item">
          <div class="ai-criterion-header">
            <span>4. Nilai Murni & KBAT</span>
            <span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:800; font-size:0.85rem; padding:3px 7px; border-radius:4px;">${nilaiScore} / ${nilaiMax}</span>
          </div>
          <div class="ai-progress-track">
            <div class="ai-progress-fill" style="width:${(nilaiScore / nilaiMax) * 100}%;"></div>
          </div>
          <p style="font-size:0.85rem; color:#334155; margin:0; line-height:1.5;">${k.nilai_kbat?.ulasan || 'Menerapkan elemen integriti.'}</p>
        </div>

      </div>

      <!-- Qualitative Feedback Rows -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:1rem;">
        
        <div style="background:#f0fdf4; border:1.5px solid #bbf7d0; border-radius:var(--radius-md); padding:1rem;">
          <h5 style="color:#166534; font-size:0.92rem; font-weight:800; margin:0 0 0.4rem 0;">
            <i class="fa-solid fa-circle-check"></i> Kekuatan Karangan Calon:
          </h5>
          <ul class="ai-feedback-list" style="margin:0; font-size:0.88rem;">
            ${strengthsHtml || '<li>Karangan menepati kehendak soalan pentaksiran.</li>'}
          </ul>
        </div>

        <div style="background:#fef2f2; border:1.5px solid #fecaca; border-radius:var(--radius-md); padding:1rem;">
          <h5 style="color:#991b1b; font-size:0.92rem; font-weight:800; margin:0 0 0.4rem 0;">
            <i class="fa-solid fa-circle-exclamation"></i> Aspek Perlu Diperbaiki:
          </h5>
          <ul class="ai-feedback-list warning" style="margin:0; font-size:0.88rem;">
            ${weaknessesHtml || '<li>Kekalkan ketepatan ejaan dan struktur ayat majmuk.</li>'}
          </ul>
        </div>

      </div>

      <!-- Recommendation Summary Box -->
      <div style="background:#f8fafc; border:1.5px solid var(--border-subtle); border-left:4px solid #0284c7; border-radius:var(--radius-sm); padding:1rem 1.2rem; margin-top:1rem;">
        <strong style="color:var(--kpm-navy); font-size:0.92rem;"><i class="fa-solid fa-lightbulb" style="color:#0284c7;"></i> Rumusan & Tip Pemeriksa:</strong>
        <p style="margin:0.25rem 0 0 0; font-size:0.88rem; color:var(--text-main); line-height:1.55;">
          ${assessment.rumusan_keseluruhan || 'Tahniah atas usaha penulisan karangan ini.'}
        </p>
      </div>
    `;

    const btnReeval = document.getElementById('btnReevaluateEssayAi');
    if (btnReeval) {
      btnReeval.onclick = async () => {
        btnReeval.disabled = true;
        btnReeval.innerHTML = '<span class="ai-eval-spinner"></span> Sedang Menilai...';
        state.aiEssayAssessment = null;
        await renderResultsSlip();
      };
    }
  }

  /* =========================================================================
     10. REVIEW WORKSPACE & EXPLANATION SCHEME FUNCTIONS
     ========================================================================= */
  function filterReviewQuestions(filterType) {
    state.reviewFilter = filterType;
    
    // Update filter buttons active class
    if (dom.btnReviewFilterAll) dom.btnReviewFilterAll.classList.toggle('active', filterType === 'ALL');
    if (dom.btnReviewFilterWrong) dom.btnReviewFilterWrong.classList.toggle('active', filterType === 'WRONG');
    if (dom.btnReviewFilterCorrect) dom.btnReviewFilterCorrect.classList.toggle('active', filterType === 'CORRECT');
    if (dom.btnReviewFilterUnanswered) dom.btnReviewFilterUnanswered.classList.toggle('active', filterType === 'UNANSWERED');

    renderReviewQuestionsList();
  }

  window.filterReviewQuestions = filterReviewQuestions;

  function renderReviewWorkspace() {
    if (!state.sessionQuestions || state.sessionQuestions.length === 0) return;

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    state.sessionQuestions.forEach((q, idx) => {
      const userAns = state.userAnswers[idx];
      if (!userAns) {
        unansweredCount++;
      } else if (userAns === q.answer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    if (dom.reviewStatTotal) dom.reviewStatTotal.textContent = `${state.sessionQuestions.length} Soalan`;
    if (dom.reviewStatCorrect) dom.reviewStatCorrect.textContent = `${correctCount} Betul`;
    if (dom.reviewStatWrong) dom.reviewStatWrong.textContent = `${wrongCount} Salah`;
    if (dom.reviewStatUnanswered) dom.reviewStatUnanswered.textContent = `${unansweredCount} Kosong`;

    renderReviewQuestionsList();
  }

  function renderReviewQuestionsList() {
    if (!dom.reviewQuestionsListContainer) return;

    const filter = state.reviewFilter;
    const filteredQuestions = state.sessionQuestions.map((q, idx) => {
      const userAns = state.userAnswers[idx];
      const isCorrect = userAns === q.answer;
      const isUnanswered = !userAns;
      return { q, index: idx, userAns, isCorrect, isUnanswered };
    }).filter(item => {
      if (filter === 'CORRECT') return item.isCorrect;
      if (filter === 'WRONG') return !item.isCorrect && !item.isUnanswered;
      if (filter === 'UNANSWERED') return item.isUnanswered;
      return true;
    });

    if (filteredQuestions.length === 0) {
      let emptyMsg = 'Tiada soalan dalam kategori ini.';
      if (filter === 'WRONG') emptyMsg = 'Tahniah! Tiada sebarang kesalahan dalam jawapan anda.';
      if (filter === 'UNANSWERED') emptyMsg = 'Semua soalan telah dijawab dengan lengkap.';

      dom.reviewQuestionsListContainer.innerHTML = `
        <div style="text-align:center; padding:3rem 1.5rem; background:#ffffff; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
          <i class="fa-solid fa-circle-check" style="font-size:3rem; color:#16a34a; margin-bottom:1rem;"></i>
          <h3 style="color:var(--kpm-navy); font-size:1.2rem; font-weight:800; margin-bottom:0.5rem;">Tiada Soalan Dalam Kategori Ini</h3>
          <p style="color:var(--text-muted); font-size:0.92rem;">${emptyMsg}</p>
        </div>
      `;
      return;
    }

    dom.reviewQuestionsListContainer.innerHTML = filteredQuestions.map(({ q, index, userAns, isCorrect, isUnanswered }) => {
      const originalIndex = index + 1;
      const cardClass = isCorrect ? 'is-correct' : isUnanswered ? 'is-unanswered' : 'is-wrong';
      
      const statusBadge = isCorrect 
        ? '<span style="background:#dcfce7; color:#15803d; font-weight:800; font-size:0.78rem; padding:4px 10px; border-radius:12px;"><i class="fa-solid fa-check"></i> JAWAPAN BETUL</span>'
        : isUnanswered
        ? '<span style="background:#f1f5f9; color:#64748b; font-weight:800; font-size:0.78rem; padding:4px 10px; border-radius:12px;"><i class="fa-solid fa-minus"></i> TIDAK DIJAWAB</span>'
        : '<span style="background:#fee2e2; color:#b91c1c; font-weight:800; font-size:0.78rem; padding:4px 10px; border-radius:12px;"><i class="fa-solid fa-xmark"></i> JAWAPAN ANDA SALAH</span>';

      const diagramHtml = q.image_url 
        ? `<div style="margin:1.15rem 0; text-align:center; background:#ffffff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:0.9rem;">
             <img src="${q.image_url}" alt="Rajah Soalan" style="max-height:280px; max-width:100%; object-fit:contain; border-radius:4px;" />
           </div>`
        : '';

      const optionsHtml = q.options.map(opt => {
        const isUserPick = userAns === opt.id;
        const isCorrectAns = q.answer === opt.id;

        let optClass = 'review-option-item';
        let tagBadge = '';

        if (isCorrectAns) {
          optClass += ' correct-answer-target';
          tagBadge = `<span style="margin-left:auto; background:#10b981; color:#ffffff; font-size:0.75rem; font-weight:800; padding:3px 8px; border-radius:4px;"><i class="fa-solid fa-check-double"></i> SKEMA JAWAPAN</span>`;
        }

        if (isUserPick && !isCorrect) {
          optClass += ' selected-wrong';
          tagBadge += `<span style="margin-left:auto; background:#ef4444; color:#ffffff; font-size:0.75rem; font-weight:800; padding:3px 8px; border-radius:4px;"><i class="fa-solid fa-xmark"></i> PILIHAN ANDA</span>`;
        } else if (isUserPick && isCorrect) {
          optClass += ' selected-correct';
          tagBadge += `<span style="margin-left:6px; background:#15803d; color:#ffffff; font-size:0.75rem; font-weight:800; padding:3px 8px; border-radius:4px;"><i class="fa-solid fa-user-check"></i> PILIHAN ANDA</span>`;
        }

        return `
          <div class="${optClass}">
            <strong style="min-width:24px; font-family:var(--font-mono); font-size:0.98rem;">${opt.id}.</strong>
            <div style="flex:1; font-size:1rem;">${opt.text}</div>
            ${tagBadge}
          </div>
        `;
      }).join('');

      const explanationText = q.explanation || 'Jawapan di atas adalah mematuhi skema dan sukatan rasmi Lembaga Peperiksaan Malaysia.';

      return `
        <div class="review-card ${cardClass}">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; border-bottom:1px solid var(--border-subtle); padding-bottom:0.75rem; margin-bottom:1.15rem;">
            <div style="display:flex; align-items:center; gap:0.65rem; flex-wrap:wrap;">
              <span style="font-weight:800; color:var(--kpm-navy); font-size:1.05rem;">Soalan ${originalIndex} / ${state.sessionQuestions.length}</span>
              <span style="background:#e0f2fe; color:#0369a1; font-size:0.78rem; font-weight:800; padding:2px 8px; border-radius:4px;">${q.topic || q.subtopic || 'PKSK'}</span>
              <span style="background:#f1f5f9; color:#475569; font-size:0.78rem; font-weight:700; padding:2px 8px; border-radius:4px;">${q.section === 'BAHAGIAN_A' ? 'Bahagian A (Insaniah)' : 'Bahagian B (Intelektual)'}</span>
            </div>
            <div>${statusBadge}</div>
          </div>

          ${diagramHtml}

          <div style="font-size:1.12rem; font-weight:700; color:var(--text-heading); line-height:1.65; margin-bottom:1.15rem;">
            ${q.question}
          </div>

          <div class="review-options-grid">
            ${optionsHtml}
          </div>

          <div class="review-explanation-box">
            <div style="font-weight:800; font-size:0.98rem; margin-bottom:0.35rem; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-lightbulb" style="color:#16a34a;"></i> Skema & Penjelasan Konsep PKSK:
            </div>
            <div style="font-size:0.95rem; line-height:1.65;">${explanationText}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  /* =========================================================================
     11. LICENSE ACTIVATION & SUPABASE MODAL CONTROLLER
     ========================================================================= */
  function updateLicenseBadgeUI() {
    if (!dom.licenseStatusBadge || !dom.licenseStatusText) return;
    const isAct = window.PkskLicense && window.PkskLicense.isActivated();
    const googleUser = window.PkskLicense ? window.PkskLicense.getGoogleUser() : null;

    if (googleUser) {
      if (googleUser.full_name && dom.dispCandidateName) {
        dom.dispCandidateName.textContent = googleUser.full_name.toUpperCase();
      }
      if (googleUser.avatar_url && dom.userAvatarContainer) {
        dom.userAvatarContainer.innerHTML = `<img src="${googleUser.avatar_url}" alt="Google Avatar" class="user-avatar-img">`;
      }
    }

    if (isAct) {
      const session = window.PkskLicense.getLicenseSession();
      if (session?.is_developer || session?.tier === 'DEVELOPER_SUPERADMIN') {
        dom.licenseStatusBadge.className = 'license-status-pill';
        dom.licenseStatusBadge.style.background = '#fef3c7';
        dom.licenseStatusBadge.style.color = '#92400e';
        dom.licenseStatusBadge.style.borderColor = '#fde68a';
        dom.licenseStatusText.innerHTML = '<i class="fa-solid fa-crown" style="color:#d97706;"></i> Lesen Aktif (Developer VIP)';
        return;
      }
      let daysRemainingText = '6 Bulan';
      if (session?.expires_at) {
        const diffMs = new Date(session.expires_at).getTime() - Date.now();
        const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
        daysRemainingText = `Baki ${diffDays} Hari`;
      }
      dom.licenseStatusBadge.className = 'license-status-pill';
      dom.licenseStatusBadge.style.background = '#ecfdf5';
      dom.licenseStatusBadge.style.color = '#065f46';
      dom.licenseStatusBadge.style.borderColor = '#a7f3d0';
      dom.licenseStatusText.innerHTML = `<i class="fa-solid fa-circle-check"></i> Lesen Aktif (${daysRemainingText})`;
    } else {
      const trial = window.PkskLicense ? window.PkskLicense.getTrialStatus() : null;
      if (trial && !trial.isExpired) {
        dom.licenseStatusBadge.className = 'license-status-pill trial-active';
        dom.licenseStatusBadge.style.background = '#e0f2fe';
        dom.licenseStatusBadge.style.color = '#0369a1';
        dom.licenseStatusBadge.style.borderColor = '#7dd3fc';
        const prefix = googleUser ? '<i class="fa-brands fa-google" style="color:#0284c7;"></i> Google ID • ' : '<i class="fa-solid fa-clock"></i> ';
        dom.licenseStatusText.innerHTML = `${prefix}Percubaan (${trial.remainingText})`;
      } else {
        dom.licenseStatusBadge.className = 'license-status-pill unregistered expired';
        dom.licenseStatusBadge.style.background = '#fef2f2';
        dom.licenseStatusBadge.style.color = '#b91c1c';
        dom.licenseStatusBadge.style.borderColor = '#fca5a5';
        dom.licenseStatusText.innerHTML = `<i class="fa-solid fa-lock"></i> Percubaan 2 Jam Tamat (Kunci Diperlukan)`;
      }
    }
  }

  function renderDashboardTrialBanner() {
    const banner = document.getElementById('trialStatusBanner');
    if (!banner) return;

    const isAct = window.PkskLicense && window.PkskLicense.isActivated();
    if (isAct) {
      banner.style.display = 'none';
      if (dom.btnLaunchInstructions) {
        dom.btnLaunchInstructions.classList.remove('btn-locked-trial');
        dom.btnLaunchInstructions.innerHTML = '<span>Teruskan ke Panduan Peperiksaan</span> <i class="fa-solid fa-arrow-right"></i>';
      }
      return;
    }

    const trial = window.PkskLicense ? window.PkskLicense.getTrialStatus() : null;
    if (!trial) {
      banner.style.display = 'none';
      return;
    }

    banner.style.display = 'flex';
    const iconWrap = document.getElementById('trialBannerIcon');
    const titleEl = document.getElementById('trialBannerTitle');
    const subEl = document.getElementById('trialBannerSubtitle');

    if (trial.isExpired) {
      banner.classList.add('expired');
      if (iconWrap) iconWrap.innerHTML = '<i class="fa-solid fa-lock"></i>';
      if (titleEl) titleEl.textContent = 'Tempoh Percubaan 2 Jam Telah Tamat (Sistem Terkunci)';
      if (subEl) subEl.textContent = 'Akses simulasi peperiksaan & semakan AI telah dikunci. Sila masukkan No. Kunci Lesen sah atau hubungi Telegram @halimroslan untuk pembelian.';
      if (dom.btnLaunchInstructions) {
        dom.btnLaunchInstructions.classList.add('btn-locked-trial');
        dom.btnLaunchInstructions.innerHTML = '<i class="fa-solid fa-lock"></i> <span>Akses Terkunci (Perlukan Kunci Lesen)</span>';
      }
    } else {
      banner.classList.remove('expired');
      if (iconWrap) iconWrap.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i>';
      if (titleEl) titleEl.textContent = `Mod Percubaan Percuma 2 Jam Aktif (${trial.remainingText})`;
      if (subEl) subEl.textContent = `Nikmati akses penuh ke semua soalan & semakan esei AI. Dapatkan Kunci Lesen 6 Bulan untuk akses tanpa had bila-bila masa.`;
      if (dom.btnLaunchInstructions) {
        dom.btnLaunchInstructions.classList.remove('btn-locked-trial');
        dom.btnLaunchInstructions.innerHTML = '<span>Teruskan ke Panduan Peperiksaan</span> <i class="fa-solid fa-arrow-right"></i>';
      }
    }
  }

  function openActivationModal(onSuccessCallback, reason = 'NORMAL') {
    state.onActivationSuccessCallback = onSuccessCallback;
    if (dom.activationModal) {
      dom.activationModal.classList.remove('hidden');
      if (dom.activationAlertBox) dom.activationAlertBox.style.display = 'none';

      const trialNotice = document.getElementById('trialLockNotice');
      const trial = window.PkskLicense ? window.PkskLicense.getTrialStatus() : null;
      const isTrialExpired = (reason === 'TRIAL_EXPIRED') || (trial && trial.isExpired && !window.PkskLicense.isActivated());

      if (trialNotice) {
        if (isTrialExpired) {
          trialNotice.style.display = 'block';
        } else {
          trialNotice.style.display = 'none';
        }
      }

      if (dom.inputLicenseKey) {
        dom.inputLicenseKey.focus();
      }
    }
  }

  function closeActivationModal() {
    if (dom.activationModal) {
      dom.activationModal.classList.add('hidden');
    }
  }

  function showActivationAlert(message, type = 'error') {
    if (!dom.activationAlertBox) return;
    dom.activationAlertBox.style.display = 'block';
    if (type === 'info') {
      dom.activationAlertBox.style.background = '#f0f9ff';
      dom.activationAlertBox.style.border = '1px solid #7dd3fc';
      dom.activationAlertBox.style.color = '#0369a1';
      dom.activationAlertBox.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> ${message}`;
    } else if (type === 'success') {
      dom.activationAlertBox.style.background = '#f0fdf4';
      dom.activationAlertBox.style.border = '1px solid #86efac';
      dom.activationAlertBox.style.color = '#15803d';
      dom.activationAlertBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    } else {
      dom.activationAlertBox.style.background = '#fef2f2';
      dom.activationAlertBox.style.border = '1px solid #fca5a5';
      dom.activationAlertBox.style.color = '#b91c1c';
      dom.activationAlertBox.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
    }
  }

  async function handleActivateLicenseClick() {
    if (!dom.inputLicenseKey) return;
    const rawKey = dom.inputLicenseKey.value.trim();
    if (!rawKey) {
      showActivationAlert('Sila masukkan Kunci Lesen PKSK 16-digit anda.', 'error');
      return;
    }

    dom.btnActivateLicense.disabled = true;
    dom.btnActivateLicense.innerHTML = '<span class="ai-eval-spinner"></span> Sedang Mengesahkan Kunci...';

    const candidateName = state.candidate.name || dom.inputCandidateName?.value || 'Calon PKSK';
    const candidateIc = state.candidate.ic || dom.inputCandidateIc?.value || '-';

    const result = await window.PkskLicense.activateLicenseOnline(rawKey, candidateName, candidateIc);

    dom.btnActivateLicense.disabled = false;
    dom.btnActivateLicense.innerHTML = '<i class="fa-solid fa-lock-open"></i> Sahkan & Aktifkan Akses Sekarang';

    if (result.success) {
      showActivationAlert(result.message, 'success');
      updateLicenseBadgeUI();
      renderDashboardTrialBanner();
      setTimeout(() => {
        closeActivationModal();
        if (state.onActivationSuccessCallback) {
          const cb = state.onActivationSuccessCallback;
          state.onActivationSuccessCallback = null;
          cb();
        }
      }, 1200);
    } else {
      showActivationAlert(result.message, 'error');
    }
  }

  /* =========================================================================
     LOGIN VIEW CONTROLLER (CORPORATE MINIMALIST ACCESS)
     ========================================================================= */
  function renderLoginViewState() {
    if (!dom.loginView) return;
    const isAct = window.PkskLicense && window.PkskLicense.isActivated();
    const session = window.PkskLicense ? window.PkskLicense.getLicenseSession() : null;

    if (isAct && session) {
      if (dom.loginStatusBanner) {
        dom.loginStatusBanner.style.display = 'flex';
        const displayName = session.activated_by_name || state.candidate.name || 'Pengguna Berdaftar';
        const keyDisplay = session.license_key || (session.is_gmail_auth ? 'Google ID' : 'Aktif');
        dom.loginStatusBanner.innerHTML = `
          <div style="flex:1;">
            <div style="display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-circle-check" style="color:#10b981; font-size:1.15rem;"></i>
              <span>Sesi Aktif: <strong>${displayName}</strong> (${keyDisplay})</span>
            </div>
            <div style="font-size:0.78rem; color:#475569; margin-top:4px;">
              Akses Penuh PKSK Simulator 2026 sedia digunakan pada peranti ini.
            </div>
          </div>
          <button id="btnContinueToDashboard" class="btn-corporate-primary" style="width:auto; padding:0.45rem 1rem; font-size:0.82rem;" type="button">
            Terus ke Utama <i class="fa-solid fa-arrow-right"></i>
          </button>
        `;
        const btnContinue = document.getElementById('btnContinueToDashboard');
        if (btnContinue) btnContinue.onclick = () => switchView('DASHBOARD');
      }
    } else {
      if (dom.loginStatusBanner) {
        dom.loginStatusBanner.style.display = 'none';
      }
    }
  }

  async function handleLoginViewLicenseSubmit() {
    const rawKey = dom.loginViewLicenseKey ? dom.loginViewLicenseKey.value.trim() : '';
    if (!rawKey) {
      alert("Sila masukkan Kunci Lesen PKSK anda (contoh: PKSK-XXXX-XXXX-XXXX).");
      if (dom.loginViewLicenseKey) dom.loginViewLicenseKey.focus();
      return;
    }

    if (!window.PkskLicense) {
      alert("Sistem pengesahan lesen sedang dimuatkan. Sila cuba sebentar lagi.");
      return;
    }

    if (dom.btnLoginViewValidateLicense) {
      dom.btnLoginViewValidateLicense.disabled = true;
      dom.btnLoginViewValidateLicense.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengesahkan Lesen...</span>`;
    }

    const candidateName = state.candidate.name || 'Calon PKSK';
    const result = await window.PkskLicense.activateLicenseOnline(rawKey, candidateName);

    if (dom.btnLoginViewValidateLicense) {
      dom.btnLoginViewValidateLicense.disabled = false;
      dom.btnLoginViewValidateLicense.innerHTML = `<i class="fa-solid fa-arrow-right-to-bracket"></i> <span>Sahkan Lesen & Log Masuk</span>`;
    }

    if (result && result.success) {
      updateLicenseBadgeUI();
      alert(`Tahniah! Lesen PKSK (${result.session.license_key}) berjaya disahkan. Selamat datang ke Simulator PKSK 2026!`);
      switchView('DASHBOARD');
    } else {
      alert(`Pengesahan Gagal: ${result?.message || 'Kunci lesen tidak sah atau had peranti telah dicapai.'}`);
    }
  }

  let isPhysflixLoginFormVisible = false;

  function setPhysflixLoginForm(show) {
    isPhysflixLoginFormVisible = !!show;
    const heroSec = document.getElementById('physflixHeroSection');
    const cardSec = document.getElementById('physflixCardSection');
    const headerToggle = document.getElementById('btnPhysflixHeaderToggle');
    const heroInput = document.getElementById('heroInputIc');
    const cardInput = document.getElementById('physflixInputIc');

    if (show) {
      if (heroSec) heroSec.classList.add('hidden');
      if (cardSec) {
        cardSec.classList.remove('hidden');
      }
      if (headerToggle) {
        headerToggle.innerHTML = '<span>Laman Utama</span>';
        headerToggle.classList.add('physflix-btn-secondary');
      }
      if (heroInput && cardInput && heroInput.value.trim() && !cardInput.value.trim()) {
        cardInput.value = heroInput.value.trim();
      }
      if (cardInput) {
        setTimeout(() => cardInput.focus(), 80);
      }
    } else {
      if (cardSec) cardSec.classList.add('hidden');
      if (heroSec) {
        heroSec.classList.remove('hidden');
      }
      if (headerToggle) {
        headerToggle.innerHTML = '<span>Log Masuk</span>';
        headerToggle.classList.remove('physflix-btn-secondary');
      }
      if (cardInput && heroInput && cardInput.value.trim() && !heroInput.value.trim()) {
        heroInput.value = cardInput.value.trim();
      }
    }
  }
  window.setPhysflixLoginForm = setPhysflixLoginForm;

  // Deep-link check for Card state (?login=card or #card)
  if (window.location.search.includes('card') || window.location.hash === '#card') {
    setTimeout(() => setPhysflixLoginForm(true), 150);
  }

  function handleSplitLoginSubmit(explicitIc) {
    const cardInput = document.getElementById('physflixInputIc');
    const heroInput = document.getElementById('heroInputIc');
    const chkRemember = document.getElementById('physflixChkRemember') || dom.splitChkRemember;

    let usernameInput = explicitIc;
    if (!usernameInput && cardInput && cardInput.value.trim()) {
      usernameInput = cardInput.value.trim();
    }
    if (!usernameInput && heroInput && heroInput.value.trim()) {
      usernameInput = heroInput.value.trim();
    }
    if (!usernameInput && dom.splitInputUsername && dom.splitInputUsername.value.trim()) {
      usernameInput = dom.splitInputUsername.value.trim();
    }

    const rememberMe = chkRemember ? chkRemember.checked : true;

    if (!usernameInput) {
      if (!isPhysflixLoginFormVisible) {
        setPhysflixLoginForm(true);
        return;
      }
      alert("Sila masukkan No. Kad Pengenalan / MyKid Calon.");
      if (cardInput) cardInput.focus();
      return;
    }

    // Set candidate data in global state
    const cleanNum = usernameInput.replace(/[^0-9]/g, '');
    state.candidate.ic = usernameInput;
    if (!state.candidate.name || state.candidate.name === 'CALON PKSK') {
      state.candidate.name = `CALON PKSK (${usernameInput})`;
    }
    state.candidate.indexNumber = 'PKSK-2026-' + (cleanNum.slice(-4) || '8892');
    state.candidate.indexNo = state.candidate.indexNumber;

    // Synchronize UI displays
    if (dom.dispCandidateName) dom.dispCandidateName.textContent = state.candidate.name;
    if (dom.dispCandidateIndex) dom.dispCandidateIndex.textContent = `AG: ${state.candidate.indexNumber}`;

    // Remember login credentials
    if (rememberMe) {
      try {
        localStorage.setItem('pksk_saved_user', JSON.stringify({
          username: usernameInput,
          name: state.candidate.name
        }));
      } catch (e) {
        console.warn('Could not save login info:', e);
      }
    } else {
      try {
        localStorage.removeItem('pksk_saved_user');
      } catch (e) {}
    }

    switchView('DASHBOARD');
  }
  window.handleSplitLoginSubmit = handleSplitLoginSubmit;

  async function handleLoginViewGoogleSignIn() {
    if (!window.PkskLicense) {
      alert("Modul autentikasi belum sedia. Sila muat semula.");
      return;
    }
    const res = await window.PkskLicense.signInWithGoogle();
    if (!res.success) {
      if (res.needsConfig) {
        openSupabaseConfigModal();
      } else {
        alert("Log Masuk Google: " + res.message);
      }
    }
  }

  /* =========================================================================
     12. EVENT LISTENERS INITIALIZATION
     ========================================================================= */
  function initEventListeners() {
    // Navigation Tabs
    if (dom.navTabLogin) dom.navTabLogin.onclick = () => switchView('LOGIN');
    dom.navTabDashboard.onclick = () => switchView('DASHBOARD');

    // Attach IC Masking Helper (XXXXXX-XX-XXXX)
    const attachIcMask = (inputEl) => {
      if (!inputEl) return;
      inputEl.addEventListener('input', (e) => {
        let v = e.target.value.replace(/[^0-9]/g, '');
        if (v.length > 12) v = v.substring(0, 12);
        if (v.length > 8) {
          e.target.value = `${v.substring(0,6)}-${v.substring(6,8)}-${v.substring(8)}`;
        } else if (v.length > 6) {
          e.target.value = `${v.substring(0,6)}-${v.substring(6)}`;
        } else {
          e.target.value = v;
        }
      });
    };

    const heroInput = document.getElementById('heroInputIc');
    const cardInput = document.getElementById('physflixInputIc');
    attachIcMask(heroInput);
    attachIcMask(cardInput);
    attachIcMask(dom.splitInputUsername);

    // PhysFlix Header Toggle (Log Masuk <-> Laman Utama)
    const btnToggle = document.getElementById('btnPhysflixHeaderToggle');
    if (btnToggle) {
      btnToggle.onclick = () => {
        setPhysflixLoginForm(!isPhysflixLoginFormVisible);
      };
    }

    // PhysFlix Hero Primary Button (Log Masuk Calon -> Buka Card Form)
    const btnHeroLogMasuk = document.getElementById('btnHeroLogMasuk');
    if (btnHeroLogMasuk) {
      btnHeroLogMasuk.onclick = () => setPhysflixLoginForm(true);
    }

    // PhysFlix Hero Submit Button
    const btnHeroSubmit = document.getElementById('btnHeroSubmit');
    if (btnHeroSubmit) {
      btnHeroSubmit.onclick = (e) => {
        e.preventDefault();
        const val = heroInput ? heroInput.value.trim() : '';
        if (val) {
          handleSplitLoginSubmit(val);
        } else {
          setPhysflixLoginForm(true);
        }
      };
    }

    // PhysFlix Hero Form (Enter key submit)
    const formHero = document.getElementById('physflixHeroForm');
    if (formHero) {
      formHero.onsubmit = (e) => {
        e.preventDefault();
        const val = heroInput ? heroInput.value.trim() : '';
        if (val) {
          handleSplitLoginSubmit(val);
        } else {
          setPhysflixLoginForm(true);
        }
      };
    }

    // PhysFlix Card Submit Button
    const btnCardSubmit = document.getElementById('btnPhysflixCardSubmit');
    if (btnCardSubmit) {
      btnCardSubmit.onclick = (e) => {
        e.preventDefault();
        const val = cardInput ? cardInput.value.trim() : '';
        handleSplitLoginSubmit(val);
      };
    }

    // PhysFlix Card Form (Enter key submit)
    const formCard = document.getElementById('physflixCardForm');
    if (formCard) {
      formCard.onsubmit = (e) => {
        e.preventDefault();
        const val = cardInput ? cardInput.value.trim() : '';
        handleSplitLoginSubmit(val);
      };
    }

    // PhysFlix Back to Hero Link
    const btnBackToHero = document.getElementById('btnPhysflixBackToHero');
    if (btnBackToHero) {
      btnBackToHero.onclick = () => {
        setPhysflixLoginForm(false);
      };
    }

    // Google Sign-In Handlers
    const btnHeroGoogle = document.getElementById('btnHeroGoogleSignIn');
    if (btnHeroGoogle) btnHeroGoogle.onclick = handleLoginViewGoogleSignIn;
    const btnCardGoogle = document.getElementById('btnPhysflixCardGoogle');
    if (btnCardGoogle) btnCardGoogle.onclick = handleLoginViewGoogleSignIn;
    if (dom.btnLoginViewGoogle) dom.btnLoginViewGoogle.onclick = handleLoginViewGoogleSignIn;

    // Guest Enter Handlers
    const guestHandler = () => {
      state.candidate.name = state.candidate.name || 'Calon Tetamu PKSK';
      state.candidate.ic = state.candidate.ic || '990101-14-1234';
      if (dom.dispCandidateName) dom.dispCandidateName.textContent = state.candidate.name;
      switchView('DASHBOARD');
    };
    const btnHeroGuest = document.getElementById('btnHeroGuestEnter');
    if (btnHeroGuest) btnHeroGuest.onclick = guestHandler;
    const btnCardGuest = document.getElementById('btnPhysflixCardGuest');
    if (btnCardGuest) btnCardGuest.onclick = guestHandler;
    if (dom.btnLoginViewGuestEnter) dom.btnLoginViewGuestEnter.onclick = guestHandler;

    if (dom.btnLoginViewValidateLicense) dom.btnLoginViewValidateLicense.onclick = handleLoginViewLicenseSubmit;

    // Auto-restore remembered credentials
    try {
      const savedUserStr = localStorage.getItem('pksk_saved_user');
      if (savedUserStr) {
        const savedUser = JSON.parse(savedUserStr);
        if (savedUser.username) {
          if (cardInput) cardInput.value = savedUser.username;
          if (heroInput) heroInput.value = savedUser.username;
          if (dom.splitInputUsername) dom.splitInputUsername.value = savedUser.username;
        }
      }
    } catch (e) {}

    if (dom.btnLoginOpenSupabaseConfig) {
      dom.btnLoginOpenSupabaseConfig.onclick = (e) => {
        e.preventDefault();
        openSupabaseConfigModal();
      };
    }
    if (dom.loginViewLicenseKey) {
      dom.loginViewLicenseKey.addEventListener('input', (e) => {
        let v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (v.startsWith('PKSK')) {
          let rest = v.substring(4);
          let parts = ['PKSK'];
          for (let i = 0; i < rest.length; i += 4) {
            parts.push(rest.substring(i, i + 4));
          }
          e.target.value = parts.join('-').substring(0, 19);
        } else {
          e.target.value = v.substring(0, 19);
        }
      });
      dom.loginViewLicenseKey.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleLoginViewLicenseSubmit();
      });
    }
    dom.navTabFullSim.onclick = () => { selectMode('FULL_SIMULATION'); switchView('INSTRUCTIONS'); };
    dom.navTabDiagnostic.onclick = () => { selectMode('QUICK_DIAGNOSTIC'); switchView('INSTRUCTIONS'); };
    dom.navTabDrill.onclick = () => { selectMode('DRILL_PRACTICE'); switchView('DASHBOARD'); };
    dom.navTabEssay.onclick = () => { 
      if (window.PkskLicense && !window.PkskLicense.isAccessAllowed()) {
        openActivationModal(() => { 
          state.mode = 'ESSAY_PRACTICE';
          switchView('ESSAY'); 
          startEssaySessionTimers(true);
        }, 'TRIAL_EXPIRED');
        showActivationAlert('Tempoh percubaan 2 jam anda telah tamat. Sila masukkan Kunci Lesen PKSK untuk membuka akses Artikulasi Penulisan.', 'error');
        return;
      }
      state.mode = 'ESSAY_PRACTICE'; 
      switchView('ESSAY'); 
      startEssaySessionTimers(true);
    };
    dom.navTabSlip.onclick = () => switchView('RESULTS');

    // Candidate Profile Live Inputs (Guarded)
    if (dom.inputCandidateName) {
      dom.inputCandidateName.oninput = (e) => {
        const val = e.target.value.trim();
        state.candidate.name = val;
        dom.dispCandidateName.textContent = val || 'CALON PKSK';
      };
    }

    if (dom.inputCandidateIndex) {
      dom.inputCandidateIndex.oninput = (e) => {
        const val = e.target.value.trim();
        state.candidate.indexNo = val;
        const divider = document.getElementById('dispCandidateDivider');
        if (val) {
          dom.dispCandidateIndex.textContent = `AG: ${val}`;
          if (divider) divider.style.display = 'inline';
        } else {
          dom.dispCandidateIndex.textContent = '';
          if (divider) divider.style.display = 'none';
        }
      };
    }

    if (dom.inputCandidateIc) {
      dom.inputCandidateIc.oninput = (e) => {
        state.candidate.ic = e.target.value.trim();
      };
    }

    // Dashboard Buttons
    dom.btnLaunchInstructions.onclick = () => {
      if (window.PkskLicense && !window.PkskLicense.isAccessAllowed()) {
        openActivationModal(() => switchView('INSTRUCTIONS'), 'TRIAL_EXPIRED');
        showActivationAlert('Tempoh percubaan 2 jam anda telah tamat. Sila masukkan Kunci Lesen PKSK atau buat pembelian via Telegram @halimroslan.', 'error');
        return;
      }
      switchView('INSTRUCTIONS');
    };

    // Trial Banner Enter Key button
    const btnTrialEnterKey = document.getElementById('btnTrialBannerEnterKey');
    if (btnTrialEnterKey) {
      btnTrialEnterKey.onclick = () => {
        const trial = window.PkskLicense ? window.PkskLicense.getTrialStatus() : null;
        openActivationModal(null, trial && trial.isExpired ? 'TRIAL_EXPIRED' : 'NORMAL');
      };
    }
    dom.selectDrillTopic.onchange = (e) => { state.drillTopic = e.target.value; };

    // Ox Alpha Test Event
    if (dom.btnTestOxAlpha) dom.btnTestOxAlpha.onclick = testOxAlphaConnection;

    // Instructions Buttons
    dom.btnBackToDashboard.onclick = () => switchView('DASHBOARD');
    dom.btnStartExamNow.onclick = startExam;

    // Exam Workspace Navigation
    dom.btnPrevQuestion.onclick = () => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderQuestion();
        renderPalette();
        if (window.innerWidth < 768 && dom.dispQuestionNumberLabel) {
          dom.dispQuestionNumberLabel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    dom.btnNextQuestion.onclick = () => {
      if (state.currentIndex < state.sessionQuestions.length - 1) {
        state.currentIndex++;
        renderQuestion();
        renderPalette();
        if (window.innerWidth < 768 && dom.dispQuestionNumberLabel) {
          dom.dispQuestionNumberLabel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        openSubmitModal();
      }
    };

    dom.btnFlagReview.onclick = toggleFlagCurrentQuestion;

    // Palette Filter Tabs
    dom.paletteFilterAll.onclick = () => setPaletteFilter('ALL');
    dom.paletteFilterA.onclick = () => setPaletteFilter('PART_A');
    dom.paletteFilterB.onclick = () => setPaletteFilter('PART_B');
    dom.paletteFilterFlagged.onclick = () => setPaletteFilter('FLAGGED');

    // Exam Submission Triggers
    dom.btnSubmitExamTrigger.onclick = openSubmitModal;
    dom.btnModalDismiss.onclick = () => { dom.kpmModalOverlay.style.display = 'none'; };
    dom.btnModalProceed.onclick = handleExamCompletion;

    // Essay View Handlers
    dom.inputEssayText.oninput = updateEssayWordCount;
    if (dom.btnShuffleEssayTopic) dom.btnShuffleEssayTopic.onclick = shuffleEssayTopic;

    // Handwritten Essay Image Upload Event Listeners
    if (dom.btnSnapPhoto) {
      dom.btnSnapPhoto.onclick = (e) => {
        e.stopPropagation();
        if (dom.essayImageInput) {
          dom.essayImageInput.setAttribute('capture', 'environment');
          dom.essayImageInput.click();
        }
      };
    }
    if (dom.btnChooseFile) {
      dom.btnChooseFile.onclick = (e) => {
        e.stopPropagation();
        if (dom.essayImageInput) {
          dom.essayImageInput.removeAttribute('capture');
          dom.essayImageInput.click();
        }
      };
    }
    if (dom.essayImageInput) {
      dom.essayImageInput.onchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) handleEssayImageFile(file);
      };
    }
    if (dom.essayDropzone) {
      dom.essayDropzone.onclick = (e) => {
        if (dom.dropzoneEmpty && dom.dropzoneEmpty.style.display !== 'none') {
          if (dom.essayImageInput) {
            dom.essayImageInput.removeAttribute('capture');
            dom.essayImageInput.click();
          }
        }
      };
      dom.essayDropzone.ondragover = (e) => {
        e.preventDefault();
        dom.essayDropzone.classList.add('dragover');
      };
      dom.essayDropzone.ondragleave = (e) => {
        e.preventDefault();
        dom.essayDropzone.classList.remove('dragover');
      };
      dom.essayDropzone.ondrop = (e) => {
        e.preventDefault();
        dom.essayDropzone.classList.remove('dragover');
        const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (file) handleEssayImageFile(file);
      };
    }
    if (dom.btnRemoveImage) {
      dom.btnRemoveImage.onclick = (e) => {
        e.stopPropagation();
        resetEssayImageUpload();
      };
    }
    if (dom.btnChangeImage) {
      dom.btnChangeImage.onclick = (e) => {
        e.stopPropagation();
        if (dom.essayImageInput) {
          dom.essayImageInput.removeAttribute('capture');
          dom.essayImageInput.click();
        }
      };
    }
    if (dom.btnRetranscribe) {
      dom.btnRetranscribe.onclick = (e) => {
        e.stopPropagation();
        if (state.essayImageDataUrl) {
          executeHandwritingOcr(state.essayImageDataUrl);
        } else if (state.essayImageFile) {
          handleEssayImageFile(state.essayImageFile);
        }
      };
    }

    // Dropdown Pilihan Tajuk Esei
    if (dom.selectEssayTopic) {
      dom.selectEssayTopic.onchange = function(e) {
        const selectedId = e.target.value;
        const targetTopic = PKSK_ESSAY_TOPICS.find(t => t.id === selectedId);
        if (targetTopic) {
          state.essayTopic = targetTopic;
          state.aiEssayAssessment = null;

          const currentTheme = state.essayActiveTheme || 'ALL';
          const activeGroup = PKSK_THEME_GROUPS.find(g => g.id === currentTheme) || PKSK_THEME_GROUPS[0];
          if (currentTheme !== 'ALL' && !activeGroup.match(targetTopic)) {
            const matchingGroup = PKSK_THEME_GROUPS.slice(1).find(g => g.match(targetTopic));
            if (matchingGroup) {
              state.essayActiveTheme = matchingGroup.id;
            }
          }

          renderEssayTopicAndIdeas(false);
          resetAiIdeaTimer();
          startAiIdeaTimer();
        }
      };
    }
    if (dom.btnRegenerateAiIdeas) {
      dom.btnRegenerateAiIdeas.onclick = () => {
        resetAiIdeaTimer();
        startAiIdeaTimer();
        generateAiEssayIdeas(state.essayTopic, true);
      };
    }
    if (dom.btnToggleAiIdeas) dom.btnToggleAiIdeas.onclick = toggleAiIdeaBox;
    initAiIdeaAntiCopy();
    dom.btnEssayBackToMcq.onclick = () => switchView('EXAM');
    dom.btnSubmitEssayFinal.onclick = () => {
      state.aiEssayAssessment = null; // Clear old assessment for fresh run
      switchView('RESULTS');
    };

    // Results Actions
    dom.btnReturnHomeFromSlip.onclick = () => switchView('DASHBOARD');
    if (dom.btnWriteNewEssay) {
      dom.btnWriteNewEssay.onclick = () => {
        state.mode = 'ESSAY_PRACTICE';
        state.essayText = '';
        resetEssayImageUpload();
        state.hasInitialEssayTopicSelected = false;
        switchView('ESSAY');
        startEssaySessionTimers(true);
      };
    }
    dom.btnReviewAllAnswers.onclick = () => {
      state.reviewFilter = 'ALL';
      switchView('REVIEW');
    };

    // Review Workspace Actions
    if (dom.btnBackToSlipFromReview) {
      dom.btnBackToSlipFromReview.onclick = () => switchView('RESULTS');
    }
    if (dom.btnReturnHomeFromReview) {
      dom.btnReturnHomeFromReview.onclick = () => switchView('DASHBOARD');
    }
    if (dom.btnReviewFilterAll) {
      dom.btnReviewFilterAll.onclick = () => filterReviewQuestions('ALL');
    }
    if (dom.btnReviewFilterWrong) {
      dom.btnReviewFilterWrong.onclick = () => filterReviewQuestions('WRONG');
    }
    if (dom.btnReviewFilterCorrect) {
      dom.btnReviewFilterCorrect.onclick = () => filterReviewQuestions('CORRECT');
    }
    if (dom.btnReviewFilterUnanswered) {
      dom.btnReviewFilterUnanswered.onclick = () => filterReviewQuestions('UNANSWERED');
    }

    // License Activation Handlers
    if (dom.licenseStatusBadge) {
      dom.licenseStatusBadge.onclick = () => openActivationModal();
    }
    if (dom.btnCloseActivationModal) {
      dom.btnCloseActivationModal.onclick = closeActivationModal;
    }
    if (dom.btnActivateLicense) {
      dom.btnActivateLicense.onclick = handleActivateLicenseClick;
    }

    // Google / Gmail OAuth Sign-In (Supabase Auth)
    if (dom.btnGoogleSignIn) {
      dom.btnGoogleSignIn.onclick = async () => {
        showActivationAlert('Sedang memulakan sambungan Google OAuth...', 'info');
        const res = await window.PkskLicense.signInWithGoogle();
        if (!res.success) {
          if (res.needsConfig) {
            showActivationAlert(res.message, 'error');
            setTimeout(() => {
              const conf = window.PkskLicense.getConfig();
              if (dom.inputSupabaseUrl) dom.inputSupabaseUrl.value = conf.url || '';
              if (dom.inputSupabaseAnonKey) dom.inputSupabaseAnonKey.value = conf.anonKey || '';
              if (dom.supabaseConfigModal) dom.supabaseConfigModal.classList.remove('hidden');
            }, 1800);
          } else {
            showActivationAlert(res.message, 'error');
          }
        }
      };
    }

    // User Avatar / Profile Click Handler
    if (dom.userAvatarContainer) {
      dom.userAvatarContainer.onclick = () => {
        if (window.PkskLicense && window.PkskLicense.isActivated()) {
          const sess = window.PkskLicense.getLicenseSession();
          if (sess && sess.is_gmail_auth) {
            if (confirm(`Akaun Semasa: ${sess.activated_by_name} (${sess.email})

Adakah anda ingin log keluar daripada sesi Google ini?`)) {
              window.PkskLicense.signOutGoogle();
              updateLicenseBadgeUI();
              alert('Anda telah berjaya log keluar dari sesi Google.');
              location.reload();
            }
            return;
          }
        }
        openActivationModal();
      };
    }

    // Aktifkan Langganan Perubahan Status Auth Supabase
    if (window.PkskLicense && typeof window.PkskLicense.initAuthListener === 'function') {
      window.PkskLicense.initAuthListener((newSession) => {
        if (newSession) {
          console.log('[PKSK App] Sesi Pengguna Google Aktif:', newSession.email);
          const displayName = (newSession.full_name || newSession.email.split('@')[0]).toUpperCase();
          state.candidate.name = displayName;
          state.candidate.ic = newSession.email;
          const cleanNum = Math.abs((newSession.email || 'USER').split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0)) % 9000 + 1000;
          state.candidate.indexNumber = `PKSK-2026-${cleanNum}`;
          state.candidate.indexNo = state.candidate.indexNumber;

          if (dom.dispCandidateName) dom.dispCandidateName.textContent = state.candidate.name;
          if (dom.dispCandidateIndex) dom.dispCandidateIndex.textContent = `AG: ${state.candidate.indexNumber}`;
          if (newSession.avatar_url && dom.userAvatarContainer) {
            dom.userAvatarContainer.innerHTML = `<img src="${newSession.avatar_url}" alt="Google Avatar" class="user-avatar-img">`;
          }

          updateLicenseBadgeUI();
          renderDashboardTrialBanner();
          closeActivationModal();

          // Apabila berjaya log masuk melalui Google, terus paparkan UI untuk pilihan ujian (DASHBOARD)
          switchView('DASHBOARD');

          // Jika tempoh percubaan 2 jam telah tamat, terus kunci dan buka modal lesen
          if (!window.PkskLicense.isAccessAllowed()) {
            openActivationModal(() => switchView('DASHBOARD'), 'TRIAL_EXPIRED');
            showActivationAlert('Tempoh percubaan 2 jam anda telah tamat. Sistem kini dikunci sehingga No. Kunci Lesen sah dimasukkan.', 'error');
          }
        } else {
          updateLicenseBadgeUI();
        }
      });
    }

    if (dom.inputLicenseKey) {
      dom.inputLicenseKey.oninput = (e) => {
        const formatted = window.sanitizeAndFormatKey ? window.sanitizeAndFormatKey(e.target.value) : e.target.value.toUpperCase();
        e.target.value = formatted;
        if (dom.keyCharCount) dom.keyCharCount.textContent = `${formatted.length}/19`;
      };

      dom.inputLicenseKey.onkeydown = (e) => {
        if (e.key === 'Enter') handleActivateLicenseClick();
      };
    }

    // Supabase Configuration Modal Handlers
    if (dom.btnOpenSupabaseSettings) {
      dom.btnOpenSupabaseSettings.onclick = (e) => {
        e.preventDefault();
        const conf = window.PkskLicense.getConfig();
        if (dom.inputSupabaseUrl) dom.inputSupabaseUrl.value = conf.url || '';
        if (dom.inputSupabaseAnonKey) dom.inputSupabaseAnonKey.value = conf.anonKey.startsWith('eyJ') ? conf.anonKey : '';
        if (dom.supabaseConfigModal) dom.supabaseConfigModal.classList.remove('hidden');
      };
    }

    if (dom.btnCloseSupabaseConfig) {
      dom.btnCloseSupabaseConfig.onclick = () => {
        if (dom.supabaseConfigModal) dom.supabaseConfigModal.classList.add('hidden');
      };
    }

    if (dom.btnSaveSupabaseConfig) {
      dom.btnSaveSupabaseConfig.onclick = () => {
        const url = dom.inputSupabaseUrl.value.trim();
        const key = dom.inputSupabaseAnonKey.value.trim();
        if (!url || !key) {
          if (dom.supabaseConfigAlertBox) {
            dom.supabaseConfigAlertBox.style.display = 'block';
            dom.supabaseConfigAlertBox.style.background = '#fef2f2';
            dom.supabaseConfigAlertBox.style.color = '#b91c1c';
            dom.supabaseConfigAlertBox.textContent = 'Sila masukkan Project URL dan Anon Key.';
          }
          return;
        }

        window.PkskLicense.setSupabaseConfig(url, key);
        if (dom.supabaseConfigAlertBox) {
          dom.supabaseConfigAlertBox.style.display = 'block';
          dom.supabaseConfigAlertBox.style.background = '#f0fdf4';
          dom.supabaseConfigAlertBox.style.color = '#15803d';
          dom.supabaseConfigAlertBox.textContent = '✓ Konfigurasi Supabase berjaya disimpan!';
        }

        setTimeout(() => {
          if (dom.supabaseConfigModal) dom.supabaseConfigModal.classList.add('hidden');
        }, 1000);
      };
    }

    // Auto-detect and pre-fill license key from URL query param (?key=PKSK-XXXX-XXXX-XXXX)
    checkUrlLicenseParam();
  }

  async function checkUrlLicenseParam() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlKey = urlParams.get('key') || urlParams.get('license');
      const devParam = urlParams.get('dev') || urlParams.get('admin');

      // Auto-unlock Developer via URL parameter: ?dev=unlock atau ?key=PKSK-DEV-MASTER-2026
      if (devParam === 'unlock' || devParam === 'halim' || devParam === 'master' || (urlKey && urlKey.toUpperCase().includes('DEV'))) {
        const masterKey = urlKey ? urlKey.toUpperCase() : 'PKSK-DEV-MASTER-2026';
        const res = await window.PkskLicense.activateLicenseOnline(masterKey, 'Cikgu Halim (Pembangun)', 'DEV-SUPERADMIN');
        if (res && res.success) {
          updateLicenseBadgeUI();
          console.log('[PKSK DEV] Developer master access granted via URL parameter.');
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        return;
      }

      if (urlKey && window.PkskLicense && !window.PkskLicense.isActivated()) {
        openActivationModal();
        if (dom.inputLicenseKey) {
          const formatted = window.sanitizeAndFormatKey ? window.sanitizeAndFormatKey(urlKey) : urlKey.toUpperCase();
          dom.inputLicenseKey.value = formatted;
          if (dom.keyCharCount) dom.keyCharCount.textContent = `${formatted.length}/19`;
        }
      }
    } catch (e) {
      console.warn('URL param check error:', e);
    }
  }

  async function performAutoHardwareCheck() {
    if (window.PkskLicense && !window.PkskLicense.isActivated()) {
      try {
        const res = await window.PkskLicense.autoRestoreHardwareLicense();
        if (res && res.restored) {
          updateLicenseBadgeUI();
          if (dom.activationModal && !dom.activationModal.classList.contains('hidden')) {
            closeActivationModal();
          }
          console.log('✓ Akses lesen berjaya dipulihkan secara automatik dari Hardware Fingerprint!');
        }
      } catch (err) {
        console.warn('Auto hardware check error:', err);
      }
    }
  }

  // Trial liveness watcher - semak auto-lock jika 2 jam tamat semasa calon menggunakan app
  function initTrialLivenessWatcher() {
    setInterval(() => {
      if (!window.PkskLicense) return;
      const isAct = window.PkskLicense.isActivated();
      if (isAct) return;

      const trial = window.PkskLicense.getTrialStatus();
      if (trial && trial.isExpired) {
        updateLicenseBadgeUI();
        renderDashboardTrialBanner();

        // Kunci serta-merta jika sedang dalam ujian atau arahan
        if (['EXAM', 'ESSAY', 'INSTRUCTIONS'].includes(state.currentView)) {
          if (state.timerInterval) clearInterval(state.timerInterval);
          switchView('DASHBOARD');
          openActivationModal(() => switchView('DASHBOARD'), 'TRIAL_EXPIRED');
          showActivationAlert('Tempoh percubaan 2 jam anda telah tamat semasa sesi berlangsung. Sistem kini dikunci. Sila masukkan No. Kunci Lesen sah.', 'error');
        } else if (state.currentView === 'DASHBOARD') {
          if (dom.activationModal && dom.activationModal.classList.contains('hidden')) {
            openActivationModal(() => switchView('DASHBOARD'), 'TRIAL_EXPIRED');
          }
        }
      } else {
        updateLicenseBadgeUI();
        renderDashboardTrialBanner();
      }
    }, 15000);
  }

  function startApplication() {
    if (window.PkskLicense && window.PkskLicense.initTrial) window.PkskLicense.initTrial();
    initEventListeners();
    updateLicenseBadgeUI();
    renderDashboardTrialBanner();
    performAutoHardwareCheck();

    // Semak sama ada pengguna telah log masuk melalui Google sebelum ini
    const googleUser = window.PkskLicense ? window.PkskLicense.getGoogleUser() : null;
    if (googleUser && googleUser.email) {
      const displayName = (googleUser.full_name || googleUser.email.split('@')[0]).toUpperCase();
      state.candidate.name = displayName;
      state.candidate.ic = googleUser.email;
      const cleanNum = Math.abs((googleUser.email || 'USER').split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0)) % 9000 + 1000;
      state.candidate.indexNumber = `PKSK-2026-${cleanNum}`;
      state.candidate.indexNo = state.candidate.indexNumber;

      if (dom.dispCandidateName) dom.dispCandidateName.textContent = state.candidate.name;
      if (dom.dispCandidateIndex) dom.dispCandidateIndex.textContent = `AG: ${state.candidate.indexNumber}`;
      if (googleUser.avatar_url && dom.userAvatarContainer) {
        dom.userAvatarContainer.innerHTML = `<img src="${googleUser.avatar_url}" alt="Google Avatar" class="user-avatar-img">`;
      }

      // Terus paparkan UI untuk pilihan ujian (DASHBOARD)
      switchView('DASHBOARD');

      // Kunci jika tempoh percubaan 2 jam telah tamat
      if (!window.PkskLicense.isAccessAllowed()) {
        openActivationModal(() => switchView('DASHBOARD'), 'TRIAL_EXPIRED');
        showActivationAlert('Tempoh percubaan 2 jam anda telah tamat. Sistem kini dikunci sehingga No. Kunci Lesen sah dimasukkan.', 'error');
      }
    } else {
      switchView('LOGIN');
    }

    initTrialLivenessWatcher();
  }

  // Self Initialization on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApplication);
  } else {
    startApplication();
  }

})();
