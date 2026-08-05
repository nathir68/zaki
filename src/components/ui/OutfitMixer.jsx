import React, { useState } from 'react';
import { Sparkles, Compass, Check, ArrowRight } from 'lucide-react';

const OUTFITS = {
  playground: {
    title: 'PLAYGROUND ACTIVE',
    badge: 'High Energy',
    desc: 'Designed for running, jumping, and climbing. Features our quick-dry breathable active mesh fabric that prevents overheating.',
    pairing: 'Minty Dino T-Shirt + Sunshine Yellow Active Shorts',
    fabric: 'Active Mesh / Stretch Jersey',
    accentColor: '#10b981', // green
    loadout: {
      type: 'shorts',
      colors: {
        body: '#fef08a', 
        waistband: '#ec4899', 
        stripes: '#ffffff',
        hem: '#ec4899'
      },
      fabric: 'mesh',
      decal: null,
      image: '/images/sunny_shorts.jpg'
    },
    tips: [
      'Stain-resistant fabric blends',
      'Waistband drawstrings for snug fit',
      'Reflective stripes for outdoor visibility'
    ]
  },
  party: {
    title: 'PARTY SPARKLE',
    badge: 'Cute & Smart',
    desc: 'Ideal for birthdays, family gatherings, and photo sessions. Keeps them looking stylish, smart, and photo-ready.',
    pairing: 'Space Scout Tee + Indigo Magic Jogger Pants',
    fabric: 'Organic Cotton / Stretch Jersey',
    accentColor: '#ec4899', // pink
    loadout: {
      type: 'tshirt',
      colors: {
        body: '#f8fafc', 
        sleeves: '#bae6fd', 
        collar: '#6366f1', 
        hem: '#bae6fd'
      },
      fabric: 'cotton',
      decal: 'rocket',
      image: '/images/space_tee.jpg'
    },
    tips: [
      'Ultra-soft premium cotton base',
      'Vibrant color blocks for photos',
      'Cute decal graphic for conversation starters'
    ]
  },
  cozy: {
    title: 'COZY LOUNGE & NAP',
    badge: 'Soft & Warm',
    desc: 'Tailored for weekend reading, cartoon mornings, and peaceful naps. Thick looped cozy fleece provides a soothing warm hug.',
    pairing: 'Lavender Dream Tee + Cozy Fleece Track Pants',
    fabric: 'Cozy Fleece / Soft Cotton',
    accentColor: '#8b5cf6', // purple
    loadout: {
      type: 'trackpants',
      colors: {
        body: '#6366f1', 
        waistband: '#1e1b4b', 
        stripes: '#ffffff',
        hem: '#f8fafc' 
      },
      fabric: 'fleece',
      decal: null,
      image: '/images/sky_joggers.jpg'
    },
    tips: [
      'Tag-free comfort lining',
      'Loose relaxed fit options',
      'Extra soft seams to prevent skin scratching'
    ]
  }
};

export default function OutfitMixer({ onLoadOutfit }) {
  const [selectedTheme, setSelectedTheme] = useState('playground');
  
  const currentOutfit = OUTFITS[selectedTheme];

  const handleApplyOutfit = () => {
    // Determine decal URL based on loadout presets
    let decalUrl = null;
    if (currentOutfit.loadout.decal === 'rocket') {
      decalUrl = 'rocket'; // App.jsx will intercept and load the actual rocket logo URL
    }
    
    onLoadOutfit({
      type: currentOutfit.loadout.type,
      colors: { ...currentOutfit.loadout.colors },
      fabric: currentOutfit.loadout.fabric,
      decal: decalUrl,
      image: currentOutfit.loadout.image,
      decalScale: 0.28,
      decalPosition: { x: 0, y: 0 }
    });

    // Smooth scroll back to top catalog or trigger viewer
    const catalogSection = document.getElementById('catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="outfit-mixer-section" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <span className="badge badge-primary" style={{ backgroundColor: 'rgba(99,102,241,0.15)', color: 'var(--primary)' }}>PLAYDAY MIXER</span>
        <h3 className="text-display" style={{ fontSize: '2.5rem', color: '#fff', marginTop: '10px' }}>
          OUTFIT THEME MATCHMAKER
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '8px auto 0 auto', fontSize: '0.85rem' }}>
          Choose a playday theme to discover custom outfits designed to meet kids' activity demands, and view the matching garments instantly.
        </p>
      </div>

      {/* Selector and Display Split */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        
        {/* Buttons Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { id: 'playground', label: '🛝 Playground Active', desc: 'Climbing, running, and play active-wear' },
            { id: 'party', label: '🎂 Birthday Party Sparkle', desc: 'Sleek, stylish, and photo-ready casuals' },
            { id: 'cozy', label: '💤 Cozy Lounge & Nap', desc: 'Warm fleece, comfy seams, and soft lounge-wear' }
          ].map((theme) => {
            const isSelected = selectedTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className="titanium-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '4px',
                  padding: '20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  width: '100%',
                  backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'rgba(20, 21, 38, 0.6)',
                  borderColor: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.06)'
                }}
              >
                <span style={{ fontSize: '1rem', fontWeight: 'bold', color: isSelected ? 'var(--primary)' : '#fff' }}>
                  {theme.label}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {theme.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Display Panel */}
        <div className="titanium-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(15,16,35,0.3)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
                {currentOutfit.title}
              </h4>
              <span className="badge badge-secondary" style={{ backgroundColor: 'rgba(236,72,153,0.1)', color: 'var(--secondary)' }}>
                {currentOutfit.badge}
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '12px', lineHeight: '1.5' }}>
              {currentOutfit.desc}
            </p>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Pairing: </span>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>{currentOutfit.pairing}</span>
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Fabric Blend: </span>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>{currentOutfit.fabric}</span>
              </div>
            </div>

            {/* Checklist tips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
              {currentOutfit.tips.map((tip, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                  <div style={{ backgroundColor: 'rgba(16,185,129,0.15)', color: '#10b981', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={10} />
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleApplyOutfit}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', borderRadius: '8px', padding: '12px' }}
          >
            QUICK VIEW OUTFIT COMBO
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
