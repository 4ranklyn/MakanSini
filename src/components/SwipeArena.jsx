import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SwipeCard from './SwipeCard';

/**
 * Phase 2 — SwipeArena ("The Decider")
 * A card stack where users swipe right (Savor) or left (Reject).
 * Tracks accepted locations and auto-transitions when the stack is exhausted.
 */

export default function SwipeArena({ locations, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accepted, setAccepted] = useState([]);
  const [lastAction, setLastAction] = useState(null); // 'savor' | 'reject' | null

  const totalCards = locations.length;
  const isFinished = currentIndex >= totalCards;

  // Safety: if 0 locations, immediately go to verdict
  useEffect(() => {
    if (totalCards === 0) {
      onComplete([]);
    }
  }, [totalCards, onComplete]);

  const handleSwipe = useCallback(
    (direction) => {
      const currentLoc = locations[currentIndex];
      const action = direction === 'right' ? 'savor' : 'reject';
      setLastAction(action);

      let newAccepted = accepted;
      if (direction === 'right') {
        newAccepted = [...accepted, currentLoc];
        setAccepted(newAccepted);
      }

      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      // Auto-transition when stack is exhausted
      if (nextIndex >= totalCards) {
        setTimeout(() => {
          onComplete(direction === 'right' ? newAccepted : accepted);
        }, 400);
      }
    },
    [currentIndex, accepted, locations, totalCards, onComplete]
  );

  // Show remaining cards (current + up to 2 behind for deck effect)
  const visibleCards = [];
  for (let i = Math.min(currentIndex + 2, totalCards - 1); i >= currentIndex; i--) {
    if (i < totalCards) {
      visibleCards.push({ location: locations[i], stackIndex: i - currentIndex });
    }
  }

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '8px',
      }}
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        <span className="text-caption" style={{ color: 'var(--color-accent)' }}>
          Phase 02 — Decide
        </span>
        <h2
          className="text-headline"
          style={{ marginTop: '4px', fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)' }}
        >
          Swipe Arena
        </h2>
      </motion.div>

      {/* ── Progress Bar ── */}
      <div
        style={{
          width: '100%',
          height: '4px',
          background: 'var(--color-canvas-dark)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginBottom: '8px',
        }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${(currentIndex / totalCards) * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          style={{
            height: '100%',
            background: 'var(--color-accent)',
            borderRadius: 'var(--radius-full)',
          }}
        />
      </div>

      {/* ── Counter ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          padding: '0 4px',
        }}
      >
        <span
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--color-ink-muted)',
          }}
        >
          {Math.min(currentIndex + 1, totalCards)}/{totalCards}
        </span>

        <AnimatePresence mode="wait">
          {lastAction && (
            <motion.span
              key={`${lastAction}-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                color:
                  lastAction === 'savor'
                    ? 'var(--color-savor)'
                    : 'var(--color-reject)',
              }}
            >
              {lastAction === 'savor' ? '✓ Savored!' : '✗ Rejected'}
            </motion.span>
          )}
        </AnimatePresence>

        <span
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--color-savor)',
          }}
        >
          {accepted.length} saved
        </span>
      </div>

      {/* ── Card Stack ── */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}
      >
        <AnimatePresence>
          {!isFinished &&
            visibleCards.map(({ location, stackIndex }) => (
              <SwipeCard
                key={location.id}
                location={location}
                stackIndex={stackIndex}
                isTop={stackIndex === 0}
                onSwipe={handleSwipe}
              />
            ))}
        </AnimatePresence>

        {isFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: 'center',
              padding: '40px 20px',
            }}
          >
            <span style={{ fontSize: '3rem' }}>🎯</span>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.125rem',
                color: 'var(--color-ink)',
                marginTop: '12px',
              }}
            >
              Processing verdict...
            </p>
          </motion.div>
        )}
      </div>

      {/* ── Swipe Hints ── */}
      {!isFinished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px 20px 20px',
          }}
        >
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-reject)',
              opacity: 0.7,
            }}
          >
            ← Reject
          </span>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-ink-subtle)',
            }}
          >
            Drag to decide
          </span>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-savor)',
              opacity: 0.7,
            }}
          >
            Savor →
          </span>
        </motion.div>
      )}
    </div>
  );
}
