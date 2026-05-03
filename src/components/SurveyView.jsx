import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Wallet,
  CreditCard,
  Crown,
  Footprints,
  Bike,
  Globe,
  UtensilsCrossed,
  Popcorn,
  Coffee,
  Zap,
  MapPin,
} from 'lucide-react';

/**
 * Phase 1 — SurveyView ("Initialize")
 * Three filter groups with animated chip toggles + "Generate Options" CTA.
 */

const FILTER_GROUPS = [
  {
    id: 'budget',
    label: 'Budget Allocation',
    subtitle: 'How much are you willing to spend?',
    options: [
      { value: 'LOW', label: 'Low', icon: Wallet, description: '< 15K' },
      { value: 'MED', label: 'Med', icon: CreditCard, description: '15-35K' },
      { value: 'HIGH', label: 'High', icon: Crown, description: '35K+' },
    ],
  },
  {
    id: 'distance',
    label: 'Operational Radius',
    subtitle: 'How far will you go?',
    options: [
      { value: 'WALK', label: 'Walk', icon: Footprints, description: '< 1.5km' },
      { value: 'RIDE', label: 'Ride', icon: Bike, description: '< 5km' },
      { value: 'GLOBAL', label: 'Global', icon: Globe, description: 'Anywhere' },
    ],
  },
  {
    id: 'mood',
    label: 'Sustenance Vector',
    subtitle: 'What are you craving?',
    options: [
      { value: 'Heavy Meal', label: 'Heavy', icon: UtensilsCrossed, description: 'Full meal' },
      { value: 'Vibe / Snack', label: 'Snack', icon: Popcorn, description: 'Light bite' },
      { value: 'Caffeine', label: 'Caffeine', icon: Coffee, description: 'Drinks' },
    ],
  },
];

/* ── Animation variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
};

export default function SurveyView({ filters, onFiltersChange, onGenerate }) {
  const [isLocating, setIsLocating] = useState(false);

  const isComplete = filters.budget && filters.distance && filters.mood;

  const handleSelect = (groupId, value) => {
    onFiltersChange((prev) => ({ ...prev, [groupId]: value }));
  };

  const handleGenerate = () => {
    setIsLocating(true);
    onGenerate();
    // Reset locating state after a short delay (geolocation will handle transition)
    setTimeout(() => setIsLocating(false), 3000);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        paddingTop: '16px',
      }}
    >
      {/* ── Phase Label ── */}
      <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
        <span className="text-caption" style={{ color: 'var(--color-accent)' }}>
          Phase 01 — Initialize
        </span>
        <h2
          className="text-headline"
          style={{ marginTop: '6px', color: 'var(--color-ink)' }}
        >
          Set your constraints
        </h2>
        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--color-ink-muted)',
            marginTop: '4px',
          }}
        >
          3 taps to narrow down your options
        </p>
      </motion.div>

      {/* ── Filter Groups ── */}
      {FILTER_GROUPS.map((group, groupIndex) => (
        <motion.div key={group.id} variants={itemVariants}>
          <div style={{ marginBottom: '12px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: 'var(--color-ink)',
                marginBottom: '2px',
              }}
            >
              {group.label}
            </h3>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--color-ink-muted)',
              }}
            >
              {group.subtitle}
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            {group.options.map((option) => {
              const Icon = option.icon;
              const isActive = filters[group.id] === option.value;

              return (
                <motion.button
                  key={option.value}
                  variants={chipVariants}
                  whileTap={{ scale: 0.93 }}
                  className={`chip-toggle ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelect(group.id, option.value)}
                  id={`chip-${group.id}-${option.value}`}
                  style={{ flex: '1 1 0', minWidth: '90px', flexDirection: 'column', gap: '4px', padding: '14px 12px' }}
                >
                  <Icon size={20} strokeWidth={2.2} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                    {option.label}
                  </span>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      opacity: isActive ? 0.9 : 0.5,
                    }}
                  >
                    {option.description}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      ))}

      {/* ── Spacer ── */}
      <div style={{ flex: 1 }} />

      {/* ── Generate CTA ── */}
      <motion.div
        variants={itemVariants}
        style={{ paddingBottom: '20px' }}
      >
        <motion.button
          className={`btn-primary ${isComplete ? 'animate-pulse-glow' : ''}`}
          disabled={!isComplete || isLocating}
          onClick={handleGenerate}
          whileTap={isComplete ? { scale: 0.96 } : {}}
          id="btn-generate-options"
          style={{
            width: '100%',
            fontSize: '1.0625rem',
            padding: '18px 32px',
          }}
        >
          {isLocating ? (
            <>
              <MapPin size={20} className="animate-float" />
              Locating you...
            </>
          ) : (
            <>
              <Zap size={20} />
              Generate Options
            </>
          )}
        </motion.button>

        {!isComplete && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              fontSize: '0.8125rem',
              color: 'var(--color-ink-subtle)',
              marginTop: '10px',
            }}
          >
            Select one option from each category
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
