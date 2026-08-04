import React from 'react';
import { Heart, Sparkles, ShieldCheck, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="animate-fade" style={{ padding: '60px 24px', maxWidth: '1000px', margin: '0 auto', color: '#fff' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge badge-secondary" style={{ backgroundColor: 'rgba(236,72,153,0.15)', color: 'var(--secondary)' }}>
          OUR STORY
        </span>
        <h1 className="text-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#fff', marginTop: '12px' }}>
          ABOUT ZAKI GARMENTS
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '12px auto 0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Born out of a parent's quest for skin-safe, active playwear. We believe children's apparel should be as imaginative as it is durable.
        </p>
      </div>

      {/* Grid: Mission, Materials, Stitching */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
        
        <div className="titanium-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: 'rgba(99,102,241,0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Heart size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>Parent-Driven Design</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
            We understand that kids run, climb, and play. Every collar, waistband, and sleeve length is calculated for maximum motion tolerance. We test all prototypes on active toddlers before production.
          </p>
        </div>

        <div className="titanium-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: 'rgba(236,72,153,0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>GOTS-Certified Fabrics</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
            A child's skin is thin and absorbs toxins easily. That is why we use only 100% GOTS-certified organic combed cotton, dyed with skin-safe water-based inks that contain zero harsh heavy metals.
          </p>
        </div>

        <div className="titanium-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: 'rgba(99,102,241,0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Award size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>Play-Resistant Stitching</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
            Instead of standard itchy overlocked seams, we construct all items with premium flatlock stitch layouts. This creates flat, zero-friction edges that do not chafe sensitive skin during runs.
          </p>
        </div>

      </div>

      {/* Sourcing Timeline */}
      <div className="titanium-card" style={{ padding: '40px', borderRadius: '16px' }}>
        <h2 className="text-display" style={{ fontSize: '1.75rem', marginBottom: '24px', textAlign: 'center' }}>
          OUR FABRICATION VALUES
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--secondary)', fontWeight: 'bold', fontFamily: 'monospace' }}>01</span>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold' }}>Ethically Grown Crops</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                We source raw organic cotton fibers directly from certified cooperative farms in Turkey and India that treat local farmers with respect.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 'bold', fontFamily: 'monospace' }}>02</span>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold' }}>Zero Chemical Treatment</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                No chemical softeners, pesticides, or formaldehyde resins are used at any step of weaving. The natural softness comes from pre-combing yarn.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--secondary)', fontWeight: 'bold', fontFamily: 'monospace' }}>03</span>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold' }}>Clean-Water Dye Facilities</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                All fabric coloration facilities operate closed-loop water treatment filters, preventing any dyes from leaking into local clean streams.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
