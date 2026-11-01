// ============================================================================
// ANVAYA NĀDU (ಅನ್ವಯ ನಾಡು) — CENTRAL KARNATAKA HERITAGE CATALOGUE
// ============================================================================

export const REGIONS = [
  { id: 'all', name: 'All Regions' },
  { id: 'northern', name: 'Northern Karnataka' },
  { id: 'southern', name: 'Southern Karnataka' },
  { id: 'central', name: 'Central Karnataka' },
  { id: 'coastal', name: 'Coastal Karnataka' }
];

export const TRADITIONS = [
  { id: 'all', name: 'All Traditions' },
  { id: 'vijayanagara', name: 'Vijayanagara Empire' },
  { id: 'hoysala', name: 'Hoysala Dynasty' },
  { id: 'chalukya', name: 'Badami & Early Chalukyas' },
  { id: 'deccan-sultanate', name: 'Deccan Sultanates' },
  { id: 'ganga-jain', name: 'Western Ganga & Jain Heritage' },
  { id: 'wadiyar', name: 'Mysore Wadiyars' }
];

export const DESTINATIONS = [
  {
    id: 'hampi',
    slug: 'hampi',
    name: 'Hampi',
    kannadaName: 'ಹಂಪಿ',
    region: 'central',
    regionName: 'Central Karnataka',
    district: 'Vijayanagara',
    tradition: 'vijayanagara',
    traditionName: 'Vijayanagara Empire',
    period: '14th–16th Century CE',
    description: 'Capital of the Vijayanagara Empire situated on the southern bank of the Tungabhadra River, renowned for monolithic granite shrines, boulder-strewn sacred hills, and grand ceremonial temple complexes.',
    stone: 'Granite Monoliths',
    unesco: true,
    thumbnail: './dest_hampi.jpg',
    featured: true,
    categories: ['Temples & Shrines', 'Monolithic Sculptures', 'Royal Architecture', 'Water Architecture']
  },
  {
    id: 'belur',
    slug: 'belur',
    name: 'Belur',
    kannadaName: 'ಬೇಲೂರು',
    region: 'southern',
    regionName: 'Southern Karnataka',
    district: 'Hassan',
    tradition: 'hoysala',
    traditionName: 'Hoysala Dynasty',
    period: '12th Century CE (1117 CE)',
    description: 'The ancient capital of the Hoysala dynasty along the Yagachi River, celebrated for the Chennakeshava Temple featuring microscopic filigree stone carvings, bracket Madanikas, and stellate plinths.',
    stone: 'Chloritic Schist (Soapstone)',
    unesco: true,
    thumbnail: './dest_belur.jpg',
    featured: true,
    categories: ['Temples & Shrines', 'Sculptural Panels', 'Pillars & Mandapas']
  },
  {
    id: 'halebidu',
    slug: 'halebidu',
    name: 'Halebidu',
    kannadaName: 'ಹಳೇಬೀಡು',
    region: 'southern',
    regionName: 'Southern Karnataka',
    district: 'Hassan',
    tradition: 'hoysala',
    traditionName: 'Hoysala Dynasty',
    period: '12th Century CE',
    description: 'Historic Dwarasamudra, featuring the twin Hoysaleshwara temple ensemble adorned with over 20,000 horizontal relief friezes depicting epics, mythic beasts, and celestial iconography.',
    stone: 'Chloritic Schist',
    unesco: true,
    thumbnail: './dest_halebidu.jpg',
    featured: false,
    categories: ['Temples & Shrines', 'Decorative Friezes', 'Pillars & Mandapas']
  },
  {
    id: 'badami',
    slug: 'badami',
    name: 'Badami',
    kannadaName: 'ಬಾದಾಮಿ',
    region: 'northern',
    regionName: 'Northern Karnataka',
    district: 'Bagalkot',
    tradition: 'chalukya',
    traditionName: 'Badami Chalukyas',
    period: '6th–8th Century CE',
    description: 'Ancient Vatapi carved into red sandstone cliffs surrounding the sacred Agastya Lake, known for four magnificent rock-cut cave temples dedicated to Shiva, Vishnu, and the Jain Tirthankaras.',
    stone: 'Red Sandstone',
    unesco: false,
    thumbnail: './dest_badami.jpg',
    featured: true,
    categories: ['Rock-Cut Caves', 'Structural Temples', 'Fortifications']
  },
  {
    id: 'pattadakal',
    slug: 'pattadakal',
    name: 'Pattadakal',
    kannadaName: 'ಪಟ್ಟದಕಲ್ಲು',
    region: 'northern',
    regionName: 'Northern Karnataka',
    district: 'Bagalkot',
    tradition: 'chalukya',
    traditionName: 'Badami Chalukyas',
    period: '7th–8th Century CE',
    description: 'The royal coronation sanctuary on the banks of the Malaprabha River, recognized as a UNESCO World Heritage site for its unique harmonious synthesis of southern Dravidian and northern Nagara architectural forms.',
    stone: 'Sandstone Masonry',
    unesco: true,
    thumbnail: './dest_pattadakal.jpg',
    featured: false,
    categories: ['Dravidian Forms', 'Nagara Forms', 'Coronation Temples']
  },
  {
    id: 'aihole',
    slug: 'aihole',
    name: 'Aihole',
    kannadaName: 'ಐಹೊಳೆ',
    region: 'northern',
    regionName: 'Northern Karnataka',
    district: 'Bagalkot',
    tradition: 'chalukya',
    traditionName: 'Early Chalukyas',
    period: '5th–12th Century CE',
    description: 'Acknowledged as the cradle of Indian temple architecture, hosting over 120 historic structural and rock-cut shrines showcasing the evolutionary transitions of medieval Indian temple designs.',
    stone: 'Sandstone & Laterite',
    unesco: false,
    thumbnail: './dest_aihole.jpg',
    featured: false,
    categories: ['Early Structural Shrines', 'Rock-Cut Caves', 'Jain Architecture']
  },
  {
    id: 'somanathapura',
    slug: 'somanathapura',
    name: 'Somanathapura',
    kannadaName: 'ಸೋಮನಾಥಪುರ',
    region: 'southern',
    regionName: 'Southern Karnataka',
    district: 'Mysuru',
    tradition: 'hoysala',
    traditionName: 'Hoysala Dynasty',
    period: '13th Century CE (1268 CE)',
    description: 'Home to the pristine trikuta (three-sanctum) Prasanna Chennakeshava Temple standing on a symmetrical 16-pointed star platform on the banks of the Kaveri River.',
    stone: 'Chloritic Schist',
    unesco: true,
    thumbnail: './dest_belur.jpg',
    featured: false,
    categories: ['Temples & Shrines', 'Star-Shaped Plinths', 'Outer Wall Sculptures']
  },
  {
    id: 'mysuru',
    slug: 'mysuru',
    name: 'Mysuru (Mysore)',
    kannadaName: 'ಮೈಸೂರು',
    region: 'southern',
    regionName: 'Southern Karnataka',
    district: 'Mysuru',
    tradition: 'wadiyar',
    traditionName: 'Mysore Wadiyars',
    period: '14th–20th Century CE',
    description: 'The royal cultural capital of Karnataka, celebrated for the Indo-Saracenic masterpiece Amba Vilas Palace, royal heritage courts, and sacred shrines atop Chamundi Hill.',
    stone: 'Granite & Soapstone',
    unesco: false,
    thumbnail: './dest_mysuru.jpg',
    featured: true,
    categories: ['Royal Palaces', 'Civic Architecture', 'Sacred Shrines']
  },
  {
    id: 'vijayapura',
    slug: 'vijayapura',
    name: 'Vijayapura (Bijapur)',
    kannadaName: 'ವಿಜಯಪುರ',
    region: 'northern',
    regionName: 'Northern Karnataka',
    district: 'Vijayapura',
    tradition: 'deccan-sultanate',
    traditionName: 'Deccan Sultanates',
    period: '15th–17th Century CE',
    description: 'The monumental bastion of the Adil Shahi dynasty, famed for Gol Gumbaz—possessing one of the world’s largest unsupported masonry domes and acoustic whispering galleries.',
    stone: 'Basalt & Mortar',
    unesco: false,
    thumbnail: './dest_bijapur.jpg',
    featured: false,
    categories: ['Domes & Mausoleums', 'Acoustic Architecture', 'Fortifications']
  },
  {
    id: 'bidar',
    slug: 'bidar',
    name: 'Bidar',
    kannadaName: 'ಬೀದರ್',
    region: 'northern',
    regionName: 'Northern Karnataka',
    district: 'Bidar',
    tradition: 'deccan-sultanate',
    traditionName: 'Bahmani & Barid Shahi',
    period: '15th–16th Century CE',
    description: 'The historic plateau citadel featuring the triple-moated Bidar Fort, Mahmud Gawan Islamic Madrasa, and exquisite Persian tilework at Rangin Mahal.',
    stone: 'Red Laterite & Inlay',
    unesco: false,
    thumbnail: './dest_bijapur.jpg',
    featured: false,
    categories: ['Fortifications', 'Islamic Madrasas', 'Tile & Wood Inlay']
  },
  {
    id: 'shravanabelagola',
    slug: 'shravanabelagola',
    name: 'Shravanabelagola',
    kannadaName: 'ಶ್ರವಣಬೆಳಗೊಳ',
    region: 'southern',
    regionName: 'Southern Karnataka',
    district: 'Hassan',
    tradition: 'ganga-jain',
    traditionName: 'Western Ganga Dynasty',
    period: '10th Century CE (981 CE)',
    description: 'A preeminent Jain pilgrimage hill sanctuary housing the colossal 57-foot free-standing monolithic statue of Gommateshwara (Bahubali) chiseled from a single grey granite tor atop Vindhyagiri.',
    stone: 'Grey Granite Monolith',
    unesco: false,
    thumbnail: './dest_shravanabelagola.jpg',
    featured: false,
    categories: ['Monolithic Sculptures', 'Jain Basadis', 'Hill Sanctuaries']
  },
  {
    id: 'srirangapatna',
    slug: 'srirangapatna',
    name: 'Srirangapatna',
    kannadaName: 'ಶ್ರೀರಂಗಪಟ್ಟಣ',
    region: 'southern',
    regionName: 'Southern Karnataka',
    district: 'Mandya',
    tradition: 'wadiyar',
    traditionName: 'Vijayanagara & Mysore Era',
    period: '9th–18th Century CE',
    description: 'An island fortress surrounded by the Kaveri River, housing the ancient Sri Ranganathaswamy Temple, Tipu Sultan’s Dariya Daulat Bagh teak palace, and historic riverside battlements.',
    stone: 'Granite & Teakwood',
    unesco: false,
    thumbnail: './dest_srirangapatna.jpg',
    featured: false,
    categories: ['Island Fortifications', 'River Temples', 'Summer Palaces']
  }
];

export const MONUMENTS = [
  // AVAILABLE 3D MODELS
  {
    id: 'hampi-stone-chariot',
    slug: 'stone-chariot',
    name: 'Stone Chariot of Vittala',
    kannadaName: 'ಕಲ್ಲಿನ ರಥ',
    destinationSlug: 'hampi',
    destinationName: 'Hampi',
    category: 'Temples & Shrines',
    tradition: 'Vijayanagara Empire',
    period: '16th Century CE (King Krishnadevaraya)',
    description: 'Consecrated inside the sacred enclosure of the Vijaya Vittala Temple, this iconic stone chariot is dedicated to Garuda, the vahana (mount) of Lord Vishnu. While appearing monolithic, it is built from individually carved granite slabs fitted with concealed mortise-and-tenon interlocking joints.',
    thumbnail: './chariot_thumb.jpg',
    modelStatus: 'available',
    modelAssetPath: './hampistonechariot.glb',
    points: [
      { title: 'Rotating Granite Wheels', text: 'The four stone wheels originally turned freely on stone axles prior to modern preservation stabilization.' },
      { title: 'Concealed Interlocking Joints', text: 'Constructed from carved granite slabs bonded using mortise-and-tenon stone joinery without lime mortar.' },
      { title: 'Elephant Guardians', text: 'Two carved stone elephants flank the ramp, relocated during historical restoration to replace stone horses.' },
      { title: 'Dravidian Shikhara Remnants', text: 'A brick-and-stucco Dravidian tower originally crested the upper sanctum prior to the late 19th century.' }
    ]
  },
  {
    id: 'belur-chennakeshava',
    slug: 'chennakeshava-temple',
    name: 'Chennakeshava Temple',
    kannadaName: 'ಚನ್ನಕೇಶವ ದೇವಾಲಯ',
    destinationSlug: 'belur',
    destinationName: 'Belur',
    category: 'Temples & Shrines',
    tradition: 'Hoysala Dynasty',
    period: '12th Century CE (1117 CE)',
    description: 'Commissioned by Hoysala King Vishnuvardhana to commemorate a landmark military victory, this star-shaped temple is the pinnacle of soapstone filigree. Forty-two carved Madanika (bracket celestial maiden) figures adorn the roof eaves, each chiseled with microscopic lace-like anatomical precision.',
    thumbnail: './temple_thumb.jpg',
    modelStatus: 'available',
    modelAssetPath: './Chennakeshava.glb',
    points: [
      { title: 'Stellate Jagati Platform', text: 'The temple rests upon a 32-cornered star-shaped platform providing an elevated circumambulatory path.' },
      { title: 'Chloritic Schist Medium', text: 'Sculpted from green soapstone that remained pliant underground and hardened upon ambient sun exposure.' },
      { title: 'Madanika Bracket Figures', text: 'Masterpieces depicting celestial dancers, musicians, and huntresses with undercut stone filigree jewelry.' },
      { title: 'Horizontal Narrative Friezes', text: 'Continuous horizontal tiers around the basement portraying processions of elephants, lions, and horses.' }
    ]
  },
  {
    id: 'hampi-lakshmi-narasimha',
    slug: 'lakshmi-narasimha',
    name: 'Monolithic Lakshmi Narasimha',
    kannadaName: 'ಉಗ್ರ ನರಸಿಂಹ ವಿಗ್ರಹ',
    destinationSlug: 'hampi',
    destinationName: 'Hampi',
    category: 'Monolithic Sculptures',
    tradition: 'Vijayanagara Empire',
    period: '1528 CE (King Krishnadevaraya)',
    description: 'A colossal 6.7-meter monolithic statue sculpted in situ from a single natural granite boulder. Lord Narasimha sits in Utkutikasana with bulging eyes and fierce countenance beneath the protective canopy of the seven-headed serpent Adisesha.',
    thumbnail: './narasimha_thumb.jpg',
    modelStatus: 'available',
    modelAssetPath: './Narasimhaswamy.glb',
    points: [
      { title: 'Seven-Headed Adisesha Canopy', text: 'The serpent hoods fan out over the deity like a protective royal umbrella carved in unbroken stone.' },
      { title: 'Yoga-Patta Meditation Strap', text: 'A carved stone band supports the crossed knees in deep yogic equilibrium.' },
      { title: 'Monolithic Bedrock Scale', text: 'Chiseled directly from a natural granite tor without additional foundation stones or mortar joints.' },
      { title: 'Ugra Narasimha Iconography', text: 'Portrays the fierce lion avatar of Vishnu with protruding fangs, wide celestial gaze, and ornate crown.' }
    ]
  },

  // COMING SOON MONUMENTS (REAL KARNATAKA SITES, LABELED CLEARLY)
  {
    id: 'hampi-virupaksha',
    slug: 'virupaksha-temple',
    name: 'Virupaksha Temple Complex',
    kannadaName: 'ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ',
    destinationSlug: 'hampi',
    destinationName: 'Hampi',
    category: 'Temples & Shrines',
    tradition: 'Vijayanagara Empire',
    period: '7th–16th Century CE',
    description: 'The oldest active shrine in Hampi, dedicated to Lord Shiva as Virupaksha, crowned by a soaring 50-meter eastern gopura overlooking the historic Hampi Bazaar and Tungabhadra waters.',
    thumbnail: './dest_hampi.jpg',
    modelStatus: 'coming-soon',
    modelAssetPath: null,
    points: [
      { title: 'Pin-Hole Inversion Chamber', text: 'A natural camera obscura effect projects the inverted shadow of the main gopura onto the sanctum wall.' },
      { title: 'Ranga Mandapa Ceiling Murals', text: 'Fresco paintings illustrating the Mahabharata, Ramayana, and royal processions of Vidyaranya.' }
    ]
  },
  {
    id: 'hampi-lotus-mahal',
    slug: 'lotus-mahal',
    name: 'Lotus Mahal & Zenana Enclosure',
    kannadaName: 'ಕಮಲ ಮಹಲ್',
    destinationSlug: 'hampi',
    destinationName: 'Hampi',
    category: 'Royal Architecture',
    tradition: 'Vijayanagara Empire',
    period: '16th Century CE',
    description: 'A secular royal pavilion synthesizing Indo-Islamic cusped archways with recessed multi-tiered eaves resembling an unfurled lotus flower.',
    thumbnail: './dest_hampi.jpg',
    modelStatus: 'coming-soon',
    modelAssetPath: null,
    points: [
      { title: 'Passive Cooling Geometry', text: 'Water pipes embedded within pillars and multi-directional arched bays provided natural summer cooling.' }
    ]
  },
  {
    id: 'badami-cave-1',
    slug: 'badami-cave-1',
    name: 'Badami Cave Temple 1 (Nataraja)',
    kannadaName: 'ಬಾದಾಮಿ ಗುಹೆ ೧',
    destinationSlug: 'badami',
    destinationName: 'Badami',
    category: 'Rock-Cut Caves',
    tradition: 'Badami Chalukyas',
    period: '6th Century CE (c. 578 CE)',
    description: 'The lowest of the four rock-cut sanctuaries chiseled into the red sandstone cliff, famous for the 18-armed dancing Shiva Nataraja demonstrating 81 classical Bharatanatyam mudras.',
    thumbnail: './dest_badami.jpg',
    modelStatus: 'coming-soon',
    modelAssetPath: null,
    points: [
      { title: '18-Armed Nataraja Relief', text: 'Carved with extraordinary geometric rhythm so that any pair of hands forms a complete classical dance mudra.' }
    ]
  },
  {
    id: 'badami-cave-3',
    slug: 'badami-cave-3',
    name: 'Badami Cave Temple 3 (Vishnu)',
    kannadaName: 'ಬಾದಾಮಿ ಗುಹೆ ೩',
    destinationSlug: 'badami',
    destinationName: 'Badami',
    category: 'Rock-Cut Caves',
    tradition: 'Badami Chalukyas',
    period: '578 CE (Dated Inscription of Mangalesha)',
    description: 'The largest and most intricately sculpted cave temple at Badami, bearing an authentic dated Old Kannada inscription of Chalukya King Mangalesha.',
    thumbnail: './dest_badami.jpg',
    modelStatus: 'coming-soon',
    modelAssetPath: null,
    points: [
      { title: 'Anantasayana Relief', text: 'Monumental relief of Vishnu reclining on Adisesha with celestial attendants.' }
    ]
  },
  {
    id: 'pattadakal-virupaksha',
    slug: 'pattadakal-virupaksha',
    name: 'Virupaksha Temple (Lokeshwara)',
    kannadaName: 'ಪಟ್ಟದಕಲ್ಲು ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ',
    destinationSlug: 'pattadakal',
    destinationName: 'Pattadakal',
    category: 'Dravidian Forms',
    tradition: 'Badami Chalukyas',
    period: '8th Century CE (c. 740 CE)',
    description: 'Commissioned by Queen Lokamahadevi to celebrate King Vikramaditya II’s victory, this grand sandstone shrine represents the peak of southern Dravida vimana architecture.',
    thumbnail: './dest_pattadakal.jpg',
    modelStatus: 'coming-soon',
    modelAssetPath: null,
    points: [
      { title: 'Inscribed Architects', text: 'Bears epigraphs celebrating master architects Gundan Anivaritachari and Sarvasiddhi Achari.' }
    ]
  },
  {
    id: 'aihole-durga',
    slug: 'durga-temple',
    name: 'Apsidal Durga Temple',
    kannadaName: 'ದುರ್ಗಾ ದೇವಾಲಯ',
    destinationSlug: 'aihole',
    destinationName: 'Aihole',
    category: 'Early Structural Shrines',
    tradition: 'Early Chalukyas',
    period: '7th–8th Century CE',
    description: 'A celebrated temple exhibiting a rare semi-circular apsidal (Gajaprishtha / elephant-back) plan, surrounded by an open pillared circumambulatory verandah.',
    thumbnail: './dest_aihole.jpg',
    modelStatus: 'coming-soon',
    modelAssetPath: null,
    points: [
      { title: 'Apsidal Peristyle Verandah', text: 'Peristyle colonnade wrapping around the curved sanctum with intricate narrative bracket carvings.' }
    ]
  },
  {
    id: 'halebidu-hoysaleshwara',
    slug: 'hoysaleshwara-temple',
    name: 'Hoysaleshwara Twin Temple',
    kannadaName: 'ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯ',
    destinationSlug: 'halebidu',
    destinationName: 'Halebidu',
    category: 'Temples & Shrines',
    tradition: 'Hoysala Dynasty',
    period: '12th Century CE',
    description: 'A twin-shrine Dvikuta temple dedicated to Shiva, featuring thousands of continuous horizontal friezes depicting epics, mythic beasts, and celestial musicians.',
    thumbnail: './dest_halebidu.jpg',
    modelStatus: 'coming-soon',
    modelAssetPath: null,
    points: [
      { title: 'Continuous Epic Friezes', text: 'Tiers of elephants (stability), lions (courage), horses (speed), and floral vines (beauty).' }
    ]
  },
  {
    id: 'mysuru-palace',
    slug: 'mysore-palace',
    name: 'Amba Vilas Palace (Mysore Palace)',
    kannadaName: 'ಮೈಸೂರು ಅರಮನೆ',
    destinationSlug: 'mysuru',
    destinationName: 'Mysuru',
    category: 'Royal Palaces',
    tradition: 'Mysore Wadiyars',
    period: '1912 CE (Designed by Henry Irwin)',
    description: 'A world-famous three-story stone palace crowned with marble domes and a 145-foot tower, harmonizing Hindu, Muslim, Rajput, and Gothic architectural styles.',
    thumbnail: './dest_mysuru.jpg',
    modelStatus: 'coming-soon',
    modelAssetPath: null,
    points: [
      { title: 'Durbar Hall Stained Glass', text: 'Peacock-motif Belgian stained glass ceilings illuminate the royal durbar floor.' }
    ]
  },
  {
    id: 'vijayapura-gol-gumbaz',
    slug: 'gol-gumbaz',
    name: 'Gol Gumbaz (Whispering Gallery)',
    kannadaName: 'ಗೋಲ್ ಗುಂಬಜ್',
    destinationSlug: 'vijayapura',
    destinationName: 'Vijayapura',
    category: 'Domes & Mausoleums',
    tradition: 'Deccan Sultanates',
    period: '1656 CE (Muhammad Adil Shah)',
    description: 'The monumental mausoleum of Sultan Muhammad Adil Shah, boasting an unsupported hemispherical dome 44 meters in diameter and an extraordinary acoustic whispering gallery.',
    thumbnail: './dest_bijapur.jpg',
    modelStatus: 'coming-soon',
    modelAssetPath: null,
    points: [
      { title: 'Acoustic Whispering Gallery', text: 'Even the faintest whisper at one corner reflects repeatedly across the vast internal circumference.' }
    ]
  },
  {
    id: 'shravanabelagola-bahubali',
    slug: 'gommateshwara-monolith',
    name: 'Gommateshwara (Bahubali) Monolith',
    kannadaName: 'ಗೊಮ್ಮಟೇಶ್ವರ ಬಾಹುಬಲಿ',
    destinationSlug: 'shravanabelagola',
    destinationName: 'Shravanabelagola',
    category: 'Monolithic Sculptures',
    tradition: 'Western Ganga Dynasty',
    period: '981 CE (Chavundaraya)',
    description: 'A 57-foot free-standing monolithic statue sculpted from fine grey granite atop Vindhyagiri hill, celebrated worldwide for the Mahamastakabhisheka festival.',
    thumbnail: './dest_shravanabelagola.jpg',
    modelStatus: 'coming-soon',
    modelAssetPath: null,
    points: [
      { title: 'Monolithic Proportions', text: 'Carved in Kayotsarga posture with anthills and creeper vines twining around the legs.' }
    ]
  }
];

// Helper functions for data lookups
export function getDestination(slug) {
  return DESTINATIONS.find(d => d.slug === slug || d.id === slug) || null;
}

export function getMonument(destSlug, monumentSlug) {
  return MONUMENTS.find(m => m.destinationSlug === destSlug && m.slug === monumentSlug) || null;
}

export function getMonumentsForDestination(destSlug) {
  return MONUMENTS.filter(m => m.destinationSlug === destSlug);
}

export function getAllAvailableMonuments() {
  return MONUMENTS.filter(m => m.modelStatus === 'available');
}
