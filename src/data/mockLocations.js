/**
 * MakanSini — Hyper-Local Mock Data
 * Real food spots around UNS Surakarta campus.
 * Each location has accurate coordinates for Haversine distance filtering.
 *
 * UNS Campus Center: -7.5589, 110.8283
 */

const mockLocations = [
  // ── WALK + LOW ──
  {
    id: "loc_01",
    name: "Ayam Geprek Fortuner UNS",
    category: "Heavy Meal",
    budget: "LOW",
    distance: "WALK",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80",
    mapsQuery: "Ayam+Geprek+Fortuner+UNS",
    lat: -7.5592,
    lng: 110.8260
  },
  {
    id: "loc_02",
    name: "Warung Bu Pur UNS",
    category: "Heavy Meal",
    budget: "LOW",
    distance: "WALK",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
    mapsQuery: "Warung+Bu+Pur+UNS",
    lat: -7.5585,
    lng: 110.8275
  },
  {
    id: "loc_03",
    name: "Angkringan Depan FKIP",
    category: "Vibe / Snack",
    budget: "LOW",
    distance: "WALK",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    mapsQuery: "Angkringan+Depan+FKIP+UNS",
    lat: -7.5598,
    lng: 110.8290
  },
  {
    id: "loc_04",
    name: "Es Teh Jumbo Kentingan",
    category: "Caffeine",
    budget: "LOW",
    distance: "WALK",
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    mapsQuery: "Es+Teh+Jumbo+Kentingan",
    lat: -7.5580,
    lng: 110.8295
  },
  // ── WALK + MED ──
  {
    id: "loc_05",
    name: "Warung Makan Sekar Tanjung",
    category: "Heavy Meal",
    budget: "MED",
    distance: "WALK",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=600&q=80",
    mapsQuery: "Warung+Makan+Sekar+Tanjung",
    lat: -7.5575,
    lng: 110.8270
  },
  {
    id: "loc_06",
    name: "Kopi Janji Jiwa Kentingan",
    category: "Caffeine",
    budget: "MED",
    distance: "WALK",
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    mapsQuery: "Janji+Jiwa+Kentingan+Solo",
    lat: -7.5570,
    lng: 110.8280
  },
  // ── RIDE + LOW ──
  {
    id: "loc_07",
    name: "Wedangan Sor Pelem",
    category: "Vibe / Snack",
    budget: "LOW",
    distance: "RIDE",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80",
    mapsQuery: "Wedangan+Sor+Pelem",
    lat: -7.5690,
    lng: 110.8200
  },
  {
    id: "loc_08",
    name: "Soto Triwindu Solo",
    category: "Heavy Meal",
    budget: "LOW",
    distance: "RIDE",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    mapsQuery: "Soto+Triwindu+Solo",
    lat: -7.5720,
    lng: 110.8220
  },
  // ── RIDE + MED ──
  {
    id: "loc_09",
    name: "Bakso Kadipolo Solo",
    category: "Heavy Meal",
    budget: "MED",
    distance: "RIDE",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?w=600&q=80",
    mapsQuery: "Bakso+Kadipolo+Solo",
    lat: -7.5650,
    lng: 110.8150
  },
  {
    id: "loc_10",
    name: "Roti Bakar Eddy",
    category: "Vibe / Snack",
    budget: "MED",
    distance: "RIDE",
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80",
    mapsQuery: "Roti+Bakar+Eddy+Solo",
    lat: -7.5700,
    lng: 110.8180
  },
  {
    id: "loc_11",
    name: "Kopi Tuku Solo",
    category: "Caffeine",
    budget: "MED",
    distance: "RIDE",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    mapsQuery: "Kopi+Tuku+Solo",
    lat: -7.5680,
    lng: 110.8190
  },
  // ── RIDE + HIGH ──
  {
    id: "loc_12",
    name: "Shihlin Taiwan Street Snacks",
    category: "Vibe / Snack",
    budget: "HIGH",
    distance: "RIDE",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    mapsQuery: "Shihlin+Taiwan+Street+Snacks+Solo",
    lat: -7.5750,
    lng: 110.8240
  },
  {
    id: "loc_13",
    name: "The Sunan Hotel Café",
    category: "Caffeine",
    budget: "HIGH",
    distance: "RIDE",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
    mapsQuery: "The+Sunan+Hotel+Solo",
    lat: -7.5710,
    lng: 110.8130
  },
  // ── GLOBAL + HIGH ──
  {
    id: "loc_14",
    name: "Aston Solo Hotel Dining",
    category: "Heavy Meal",
    budget: "HIGH",
    distance: "GLOBAL",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    mapsQuery: "Aston+Solo+Hotel",
    lat: -7.5800,
    lng: 110.8100
  },
  {
    id: "loc_15",
    name: "Starbucks Solo Paragon",
    category: "Caffeine",
    budget: "HIGH",
    distance: "GLOBAL",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80",
    mapsQuery: "Starbucks+Solo+Paragon",
    lat: -7.5850,
    lng: 110.8050
  },
  {
    id: "loc_16",
    name: "Serabi Solo Notosuman",
    category: "Vibe / Snack",
    budget: "LOW",
    distance: "GLOBAL",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    mapsQuery: "Serabi+Notosuman+Solo",
    lat: -7.5780,
    lng: 110.8120
  },
];

export default mockLocations;
