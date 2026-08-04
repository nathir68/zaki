import React, { useState } from 'react';
import { Sparkles, Edit2, Play, Eye } from 'lucide-react';

// Generates high-definition PNG data URLs programmatically using HTML Canvas.
const generateLogoPng = (type) => {
  if (typeof window === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Clear to transparent
  ctx.clearRect(0, 0, 512, 512);
  
  if (type === 'dino') {
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(210, 270, 80, 0, Math.PI * 2); 
    ctx.arc(280, 170, 50, 0, Math.PI * 2); 
    ctx.fill();
    ctx.lineWidth = 45;
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(210, 240);
    ctx.lineTo(280, 170);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(150, 310);
    ctx.quadraticCurveTo(90, 340, 70, 280);
    ctx.quadraticCurveTo(110, 270, 150, 310);
    ctx.fill();
    ctx.fillStyle = '#f97316';
    for (let angle = Math.PI; angle < Math.PI * 1.5; angle += 0.25) {
      let sx = 210 + 90 * Math.cos(angle);
      let sy = 270 + 90 * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx - 18, sy - 18);
      ctx.lineTo(sx + 12, sy - 22);
      ctx.fill();
    }
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(295, 155, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath(); ctx.arc(297, 155, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a7f3d0';
    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('DINO', 256, 420);
    
  } else if (type === 'rocket') {
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(225, 330);
    ctx.lineTo(256, 400);
    ctx.lineTo(287, 330);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(235, 330);
    ctx.lineTo(256, 380);
    ctx.lineTo(277, 330);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.moveTo(256, 110);
    ctx.quadraticCurveTo(200, 190, 210, 330);
    ctx.lineTo(302, 330);
    ctx.quadraticCurveTo(312, 190, 256, 110);
    ctx.fill();
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.moveTo(256, 110);
    ctx.quadraticCurveTo(225, 150, 222, 175);
    ctx.lineTo(290, 175);
    ctx.quadraticCurveTo(287, 150, 256, 110);
    ctx.fill();
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.moveTo(210, 280);
    ctx.lineTo(170, 330);
    ctx.lineTo(210, 330);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(302, 280);
    ctx.lineTo(342, 330);
    ctx.lineTo(302, 330);
    ctx.fill();
    ctx.fillStyle = '#bae6fd';
    ctx.beginPath(); ctx.arc(256, 230, 22, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(130, 160, 6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(380, 220, 8, 0, Math.PI * 2); ctx.fill();
    
  } else if (type === 'star') {
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * 140 + 256,
                 -Math.sin((18 + i * 72) * Math.PI / 180) * 140 + 256);
      ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * 60 + 256,
                 -Math.sin((54 + i * 72) * Math.PI / 180) * 60 + 256);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath(); ctx.arc(220, 240, 8, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(292, 240, 8, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(256, 250, 20, 0, Math.PI);
    ctx.stroke();
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath(); ctx.arc(195, 255, 12, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(317, 255, 12, 0, Math.PI*2); ctx.fill();
    
  } else if (type === 'heart') {
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.moveTo(256, 200);
    ctx.bezierCurveTo(256, 170, 200, 120, 160, 180);
    ctx.bezierCurveTo(120, 240, 200, 330, 256, 390);
    ctx.bezierCurveTo(312, 330, 392, 240, 352, 180);
    ctx.bezierCurveTo(312, 120, 256, 170, 256, 200);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(215, 220, 8, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(297, 220, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath(); ctx.arc(216, 220, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(298, 220, 4, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(256, 235, 15, 0.2, Math.PI - 0.2);
    ctx.stroke();
    
  } else if (type === 'zaki') {
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(120, 320);
    ctx.lineTo(120, 170);
    ctx.lineTo(188, 250);
    ctx.lineTo(256, 120);
    ctx.lineTo(324, 250);
    ctx.lineTo(392, 170);
    ctx.lineTo(392, 320);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(120, 170, 14, 0, Math.PI*2);
    ctx.arc(256, 120, 14, 0, Math.PI*2);
    ctx.arc(392, 170, 14, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(140, 300);
    ctx.lineTo(372, 300);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ZAKI', 256, 400);
  }
  
  return canvas.toDataURL('image/png');
};

export const LOGO_PRESETS = [
  { id: 'dino', name: 'Happy Dino', url: generateLogoPng('dino') },
  { id: 'rocket', name: 'Space Scout', url: generateLogoPng('rocket') },
  { id: 'star', name: 'Dreamer Star', url: generateLogoPng('star') },
  { id: 'heart', name: 'Playful Heart', url: generateLogoPng('heart') },
  { id: 'zaki', name: 'Zaki Crest', url: generateLogoPng('zaki') }
];

export const FABRICS = [
  { id: 'cotton', name: 'Organic Cotton', price: 0, desc: 'Soft, breathable 100% organic cotton for everyday play.' },
  { id: 'fleece', name: 'Cozy Fleece', price: 5, desc: 'Thick, warm looped-back fleece perfect for chilly days.' },
  { id: 'mesh', name: 'Active Mesh', price: 8, desc: 'Highly breathable grid mesh ideal for playground athletics.' },
  { id: 'jersey', name: 'Stretch Jersey', price: 12, desc: 'Smooth, stretchy active knit designed for high flexibility.' }
];

// Helper to generate custom styled SVG preview representing Kids Wear
export const ProductSVGPreview = ({ colors, type, style }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="product-image-svg" 
      style={style}
    >
      {type === 'shorts' ? (
        <g>
          <rect x="28" y="28" width="44" height="8" rx="2" fill={colors.waistband || colors.body} />
          <path d="M29,35 L71,35 L73,58 L59,58 L50,46 L41,58 L27,58 Z" fill={colors.body} />
          <rect x="27" y="56" width="14" height="4" rx="1" fill={colors.hem || colors.body} />
          <rect x="59" y="56" width="14" height="4" rx="1" fill={colors.hem || colors.body} />
          <rect x="29" y="36" width="2.5" height="20" fill={colors.stripes || '#ffffff'} />
          <rect x="68.5" y="36" width="2.5" height="20" fill={colors.stripes || '#ffffff'} />
          <circle cx="50" cy="32" r="2" fill="#ffffff" />
        </g>
      ) : type === 'trackpants' ? (
        <g>
          <rect x="30" y="22" width="40" height="8" rx="2" fill={colors.waistband || colors.body} />
          <path d="M31,29 L69,29 L71,40 L65,78 L53,78 L50,42 L47,78 L35,78 L29,40 Z" fill={colors.body} />
          <rect x="35" y="76" width="12" height="4" rx="1" fill={colors.hem || colors.body} />
          <rect x="53" y="76" width="12" height="4" rx="1" fill={colors.hem || colors.body} />
          <path d="M31,29 L35,76" stroke={colors.stripes || '#ffffff'} strokeWidth="2" />
          <path d="M69,29 L65,76" stroke={colors.stripes || '#ffffff'} strokeWidth="2" />
          <circle cx="50" cy="26" r="2.5" fill="#ffffff" />
        </g>
      ) : (
        <g>
          <path d="M26,30 L11,48 L20,56 L29,40 Z" fill={colors.sleeves || colors.body} />
          <path d="M74,30 L89,48 L80,56 L71,40 Z" fill={colors.sleeves || colors.body} />
          <path d="M28,24 L72,24 L74,78 L26,78 Z" fill={colors.body} />
          <path d="M38,24 C38,34 62,34 62,24 Z" fill={colors.collar || colors.body} />
          <rect x="25.5" y="75" width="49" height="4" rx="1.5" fill={colors.hem || colors.body} />
        </g>
      )}
    </svg>
  );
};

export const PRESET_PRODUCTS = [
  {
    id: 'dino-explorer',
    name: 'Dino Explorer Tee',
    type: 'tshirt',
    tag: 'Playday Special',
    description: 'Minty soft organic cotton tee with cozy lavender sleeves and our cheerful Dino crest.',
    price: 24.99,
    colors: {
      body: '#a7f3d0', 
      sleeves: '#d8b4fe', 
      collar: '#ec4899', 
      hem: '#d8b4fe'
    },
    fabric: 'cotton',
    decal: LOGO_PRESETS[0].url 
  },
  {
    id: 'sky-joggers',
    name: 'Sky Jogger Pants',
    type: 'trackpants',
    tag: 'Active Play',
    description: 'Indigo magic tapered joggers with clean dual white side stripes and cozy cloud-white ankle cuffs.',
    price: 34.99,
    colors: {
      body: '#6366f1', 
      waistband: '#1e1b4b', 
      stripes: '#ffffff',
      hem: '#f8fafc' 
    },
    fabric: 'jersey',
    decal: null
  },
  {
    id: 'sunny-day-shorts',
    name: 'Sunny Day Play Shorts',
    type: 'shorts',
    tag: 'Summer Pick',
    description: 'Sunny yellow active mesh shorts featuring coral-pink waistband trims and dual athletic stripes.',
    price: 21.99,
    colors: {
      body: '#fef08a', 
      waistband: '#ec4899', 
      stripes: '#ffffff',
      hem: '#ec4899'
    },
    fabric: 'mesh',
    decal: null
  },
  {
    id: 'space-scout-tee',
    name: 'Space Scout Tee',
    type: 'tshirt',
    tag: 'Bestseller',
    description: 'Premium white cotton tee styled with sky-blue sleeves and our retro Space Scout rocket decal.',
    price: 25.99,
    colors: {
      body: '#f8fafc', 
      sleeves: '#bae6fd', 
      collar: '#6366f1', 
      hem: '#bae6fd'
    },
    fabric: 'cotton',
    decal: LOGO_PRESETS[1].url 
  }
];

export default function ProductCatalog({ onSelectProduct, onAddToCart }) {
  const [selectedSizes, setSelectedSizes] = useState({}); // { [productId]: size }

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleEditClick = (product) => {
    // Load product specs into the 3D Modal viewer
    onSelectProduct({
      type: product.type,
      colors: { ...product.colors },
      fabric: product.fabric,
      decal: product.decal,
      decalScale: 0.28,
      decalPosition: { x: 0, y: 0 }
    });
  };

  const handleInstantAdd = (product) => {
    const size = selectedSizes[product.id] || '4-5Y'; // default size
    const fabricNames = {
      cotton: 'Organic Combed Cotton',
      fleece: 'Cozy Fleece',
      mesh: 'Active Mesh',
      jersey: 'Stretch Jersey'
    };
    
    onAddToCart({
      id: `${product.id}-${size}-${Math.random().toString(36).substring(2, 5)}`,
      name: `${product.name} (${size})`,
      type: product.type,
      price: product.price,
      colors: { ...product.colors },
      fabric: product.fabric,
      fabricName: fabricNames[product.fabric] || 'Organic Cotton',
      decal: product.decal,
      size: size,
      quantity: 1
    });
  };

  return (
    <section className="catalog-section" id="catalog-section" style={{ padding: '80px 24px' }}>
      <div className="catalog-header" style={{ marginBottom: '40px' }}>
        <span className="catalog-subtitle" style={{ color: 'var(--secondary)' }}>Zaki Premium Apparel</span>
        <h2 className="catalog-title" style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', letterSpacing: '0.04em' }}>
          SHOP OUR SELECTION
        </h2>
        <span className="catalog-desc" style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
          Durable, non-toxic, and comfy garments tailored for kids. Click "Quick View" to inspect the garment details, select the age size, and add to wardrobe drawer.
        </span>
      </div>

      <div className="catalog-grid">
        {PRESET_PRODUCTS.map(product => (
          <div key={product.id} className="titanium-card product-card" style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            <div className="product-image-container" style={{ background: 'radial-gradient(circle at center, #171830 0%, #080914 100%)', borderRadius: '12px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="tag-badge" style={{ backgroundColor: 'rgba(99,102,241,0.15)', color: 'var(--primary)', border: '1px solid rgba(99,102,241,0.3)', top: '12px', left: '12px' }}>
                {product.tag}
              </span>
              <ProductSVGPreview colors={product.colors} type={product.type} style={{ height: '120px', width: '120px' }} />
            </div>

            <div className="product-details" style={{ marginTop: '16px' }}>
              <span className="product-type" style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {product.type === 'tshirt' ? "Play T-Shirt" : product.type === 'shorts' ? "Summer Shorts" : "Jogger Pants"}
              </span>
              <h3 className="product-name" style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
                {product.name}
              </h3>
              <span className="fabric-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '6px', lineHeight: '1.4', display: 'block', minHeight: '44px' }}>
                {product.description}
              </span>
            </div>
            {/* E-Commerce Selector Row: Size pill buttons */}
            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.04em' }}>SELECT AGE SIZE:</span>
              <div className="age-pill-container">
                {['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'].map(size => {
                  const isSelected = (selectedSizes[product.id] || '4-5Y') === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      className={`age-pill-btn ${isSelected ? 'active' : ''}`}
                      style={{ padding: '6px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                      onClick={() => handleSizeChange(product.id, size)}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="product-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
              <span className="product-price" style={{ color: '#fff', fontSize: '1.35rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                ${product.price}
              </span>
              
              <div className="product-colors-preview" style={{ display: 'flex', gap: '4px' }}>
                {Object.values(product.colors).map((c, i) => (
                  <div 
                    key={i} 
                    className="color-dot" 
                    style={{ backgroundColor: c, width: '10px', height: '10px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} 
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '10px', marginTop: '14px' }}>
              <button 
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '10px', justifyContent: 'center', borderRadius: '8px' }}
                onClick={() => handleEditClick(product)}
              >
                <Eye size={13} style={{ marginRight: '4px' }} />
                Quick View
              </button>
              <button 
                className="btn btn-primary"
                style={{ fontSize: '0.75rem', padding: '10px', justifyContent: 'center', borderRadius: '8px' }}
                onClick={() => handleInstantAdd(product)}
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
