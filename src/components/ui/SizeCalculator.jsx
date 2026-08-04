import React, { useState } from 'react';
import { Sparkles, HelpCircle, CheckCircle } from 'lucide-react';

export default function SizeCalculator() {
  const [age, setAge] = useState(5);
  const [height, setHeight] = useState(110); // in cm
  const [build, setBuild] = useState('standard'); // slim, standard, roomy
  const [recommendation, setRecommendation] = useState(null);

  const calculateSize = (e) => {
    e.preventDefault();
    
    // Core sizing logic based on height
    let sizeStr = '';
    let baseChest = 0;
    let baseWaist = 0;
    let baseInseam = 0;

    if (height < 95) {
      sizeStr = '2-3Y';
      baseChest = 52;
      baseWaist = 50;
      baseInseam = 34;
    } else if (height < 105) {
      sizeStr = '3-4Y';
      baseChest = 56;
      baseWaist = 53;
      baseInseam = 40;
    } else if (height < 115) {
      sizeStr = '5-6Y';
      baseChest = 60;
      baseWaist = 55;
      baseInseam = 47;
    } else if (height < 125) {
      sizeStr = '7-8Y';
      baseChest = 64;
      baseWaist = 58;
      baseInseam = 55;
    } else if (height < 135) {
      sizeStr = '9-10Y';
      baseChest = 70;
      baseWaist = 62;
      baseInseam = 62;
    } else {
      sizeStr = '11-12Y';
      baseChest = 76;
      baseWaist = 66;
      baseInseam = 70;
    }

    // Apply adjustments based on build type
    let finalSize = sizeStr;
    let advice = '';
    
    if (build === 'roomy') {
      advice = 'Since you prefer a roomy fit, we recommend sizing up one level to ensure maximum comfort and growth headroom.';
      // Suggest next size up
      if (sizeStr === '2-3Y') finalSize = '3-4Y';
      else if (sizeStr === '3-4Y') finalSize = '5-6Y';
      else if (sizeStr === '5-6Y') finalSize = '7-8Y';
      else if (sizeStr === '7-8Y') finalSize = '9-10Y';
      else if (sizeStr === '9-10Y') finalSize = '11-12Y';
      else finalSize = '11-12Y (XL)';
    } else if (build === 'slim') {
      advice = `Our standard ${sizeStr} is designed with dynamic tailoring and will fit your child perfectly with a neat, sleek profile.`;
    } else {
      advice = `Our standard ${sizeStr} is the perfect choice, providing a balanced profile for play, lounging, and movement.`;
    }

    setRecommendation({
      size: finalSize,
      chest: build === 'roomy' ? baseChest + 3 : baseChest,
      waist: build === 'slim' ? baseWaist - 2 : baseWaist,
      inseam: baseInseam,
      advice
    });
  };

  return (
    <div className="titanium-card" style={{ padding: '40px 24px', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="badge badge-secondary" style={{ backgroundColor: 'rgba(236,72,153,0.15)', color: 'var(--secondary)' }}>FIT & MEASUREMENT HELPER</span>
        <h3 className="text-display" style={{ fontSize: '2.5rem', color: '#fff', marginTop: '10px' }}>
          KID-SMART SIZE CALCULATOR
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '8px auto 0 auto', fontSize: '0.85rem' }}>
          Avoid the guesswork! Enter your child's height and fit preference, and our system will calculate the ideal size.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'start' }}>
        
        {/* Form Input Section */}
        <form onSubmit={calculateSize} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Height Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                CHILD'S HEIGHT (CM)
              </label>
              <span style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 'bold' }}>{height} cm</span>
            </div>
            <input 
              type="range"
              min="80"
              max="160"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="custom-range"
              style={{ background: '#1c1c30' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>Toddler (80cm)</span>
              <span>Junior (120cm)</span>
              <span>Youth (160cm)</span>
            </div>
          </div>

          {/* Age Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.05em' }}>
              APPROXIMATE AGE (YEARS)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
              {[2, 3, 5, 7, 9, 11].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setAge(val);
                    // Autofill height estimation
                    if (val === 2) setHeight(90);
                    else if (val === 3) setHeight(100);
                    else if (val === 5) setHeight(110);
                    else if (val === 7) setHeight(122);
                    else if (val === 9) setHeight(134);
                    else if (val === 11) setHeight(146);
                  }}
                  style={{
                    backgroundColor: age === val ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                    border: age === val ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                    color: '#fff',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {val === 2 ? '2-3' : val === 3 ? '3-4' : val === 5 ? '5-6' : val === 7 ? '7-8' : val === 9 ? '9-10' : '11-12'}
                </button>
              ))}
            </div>
          </div>

          {/* Fit preference */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.05em' }}>
              FIT PREFERENCE
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {[
                { id: 'slim', label: 'Snug Fit' },
                { id: 'standard', label: 'Regular' },
                { id: 'roomy', label: 'Roomy (Size Up)' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBuild(item.id)}
                  style={{
                    backgroundColor: build === item.id ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                    border: build === item.id ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                    color: build === item.id ? 'var(--primary)' : '#fff',
                    padding: '10px 6px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '8px', display: 'flex', gap: '8px', justifyContent: 'center' }}
          >
            <Sparkles size={16} />
            CALCULATE PERFECT SIZE
          </button>
        </form>

        {/* Results Panel */}
        <div style={{ minHeight: '310px', display: 'flex', flexDirection: 'column' }}>
          {recommendation ? (
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.15)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgba(15,16,35,0.4)', animation: 'fadeIn 0.3s ease-out' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  OUR RECOMMENDATION
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
                  <h4 style={{ fontSize: '3rem', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: '800', lineHeight: 1 }}>
                    {recommendation.size}
                  </h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Standard Fit</span>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '12px', lineHeight: '1.4' }}>
                  {recommendation.advice}
                </p>
              </div>

              {/* Estimate metrics */}
              <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  ESTIMATED GARMENT MEASUREMENTS:
                </span>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>CHEST</span>
                    <span style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold', fontFamily: 'monospace' }}>{recommendation.chest} cm</span>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>WAIST</span>
                    <span style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold', fontFamily: 'monospace' }}>{recommendation.waist} cm</span>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>INSEAM</span>
                    <span style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold', fontFamily: 'monospace' }}>{recommendation.inseam} cm</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, border: '2px dashed rgba(255,255,255,0.05)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
              <HelpCircle size={40} color="var(--text-muted)" style={{ opacity: 0.5, marginBottom: '12px' }} />
              <h4 style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 'bold' }}>Awaiting Telemetry</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', maxWidth: '240px', marginTop: '4px' }}>
                Fill in your child's parameters on the left to see size metrics and fitting insights.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
