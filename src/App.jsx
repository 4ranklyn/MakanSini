import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SurveyView from './components/SurveyView';
import SwipeArena from './components/SwipeArena';
import ResultView from './components/ResultView';
import mockLocations from './data/mockLocations';
import { haversineDistance, DISTANCE_THRESHOLDS, DEFAULT_LOCATION } from './utils/haversine';

/**
 * MakanSini — The Hunger Protocol
 *
 * State Machine:
 *   SURVEY  → user sets filters, clicks "Generate Options"
 *   ARENA   → user swipes through 10 cards
 *   VERDICT → top matches displayed (or Desperation Protocol)
 */

/* ── Page transition variants ── */
const pageVariants = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.96,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function App() {
  /* ── Global State ── */
  const [appState, setAppState] = useState('SURVEY');
  const [userFilters, setUserFilters] = useState({
    budget: null,
    distance: null,
    mood: null,
  });
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [acceptedLocations, setAcceptedLocations] = useState([]);

  /* ── Phase 1 → 2 transition ── */
  const handleGenerateOptions = useCallback(() => {
    // Request geolocation
    const proceed = (location) => {
      setUserLocation(location);

      // Helper: check if a location's distance tag is within the selected radius
      // WALK includes only WALK, RIDE includes WALK+RIDE, GLOBAL includes all
      const distanceHierarchy = { WALK: 1, RIDE: 2, GLOBAL: 3 };
      const selectedLevel = distanceHierarchy[userFilters.distance] || 3;
      const isWithinRadius = (loc) => (distanceHierarchy[loc.distance] || 3) <= selectedLevel;

      // Step 1: Strict match — budget + mood + distance tag
      let candidates = mockLocations.filter(
        (loc) => loc.budget === userFilters.budget && loc.category === userFilters.mood && isWithinRadius(loc)
      );

      // Step 2: Relax budget — same mood + within distance
      if (candidates.length < 3) {
        const relaxed = mockLocations.filter(
          (loc) => loc.category === userFilters.mood && isWithinRadius(loc)
        );
        const existingIds = new Set(candidates.map((c) => c.id));
        for (const loc of relaxed) {
          if (!existingIds.has(loc.id)) { candidates.push(loc); existingIds.add(loc.id); }
        }
      }

      // Step 3: Relax mood — same budget + within distance
      if (candidates.length < 3) {
        const relaxed2 = mockLocations.filter(
          (loc) => loc.budget === userFilters.budget && isWithinRadius(loc)
        );
        const existingIds = new Set(candidates.map((c) => c.id));
        for (const loc of relaxed2) {
          if (!existingIds.has(loc.id)) { candidates.push(loc); existingIds.add(loc.id); }
        }
      }

      // Step 4: Relax everything — just within distance
      if (candidates.length < 3) {
        const relaxed3 = mockLocations.filter((loc) => isWithinRadius(loc));
        const existingIds = new Set(candidates.map((c) => c.id));
        for (const loc of relaxed3) {
          if (!existingIds.has(loc.id)) { candidates.push(loc); existingIds.add(loc.id); }
        }
      }

      // Step 5: Absolute safety net — if still empty, use ALL locations
      if (candidates.length === 0) {
        candidates = [...mockLocations];
      }

      // Sort by relevance: exact matches first, then by Haversine distance to user
      candidates.sort((a, b) => {
        const aExact = (a.budget === userFilters.budget ? 2 : 0) + (a.category === userFilters.mood ? 1 : 0);
        const bExact = (b.budget === userFilters.budget ? 2 : 0) + (b.category === userFilters.mood ? 1 : 0);
        if (bExact !== aExact) return bExact - aExact;
        // Tie-break by distance to user
        const aDist = haversineDistance(location.lat, location.lng, a.lat, a.lng);
        const bDist = haversineDistance(location.lat, location.lng, b.lat, b.lng);
        return aDist - bDist;
      });

      // Take max 10
      const finalSelection = candidates.slice(0, 10);
      setFilteredLocations(finalSelection);
      setAcceptedLocations([]);
      setAppState('ARENA');
    };

    // Try HTML5 Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          proceed({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          // Permission denied or error → fallback
          proceed(DEFAULT_LOCATION);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    } else {
      proceed(DEFAULT_LOCATION);
    }
  }, [userFilters]);

  /* ── Arena → Verdict ── */
  const handleArenaComplete = useCallback((accepted) => {
    setAcceptedLocations(accepted);
    setAppState('VERDICT');
  }, []);

  /* ── Restart Protocol ── */
  const handleRestart = useCallback(() => {
    setAppState('SURVEY');
    setUserFilters({ budget: null, distance: null, mood: null });
    setUserLocation({ lat: null, lng: null });
    setFilteredLocations([]);
    setAcceptedLocations([]);
  }, []);

  return (
    <div className="page-container">
      {/* ── Brand Header ── */}
      <header style={{ textAlign: 'center', paddingTop: '12px', paddingBottom: '8px' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span style={{ fontSize: '1.5rem' }}>🍜</span>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
              margin: '4px 0 0',
            }}
          >
            Makan<span style={{ color: 'var(--color-accent)' }}>Sini</span>
          </h1>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-muted)',
              marginTop: '2px',
            }}
          >
            The Hunger Protocol
          </p>
        </motion.div>
      </header>

      {/* ── Phase Router ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {appState === 'SURVEY' && (
            <motion.div
              key="survey"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <SurveyView
                filters={userFilters}
                onFiltersChange={setUserFilters}
                onGenerate={handleGenerateOptions}
              />
            </motion.div>
          )}

          {appState === 'ARENA' && (
            <motion.div
              key="arena"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <SwipeArena
                locations={filteredLocations}
                onComplete={handleArenaComplete}
              />
            </motion.div>
          )}

          {appState === 'VERDICT' && (
            <motion.div
              key="verdict"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <ResultView
                acceptedLocations={acceptedLocations}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
