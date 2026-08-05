import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Check, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle,
  HelpCircle,
  Heart,
  Palette,
  Clock,
  Compass,
  ArrowRight,
  Scissors,
  Menu,
  X,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Component Imports
import ProductCatalog, { LOGO_PRESETS, ProductSVGPreview } from './components/ui/ProductCatalog';
import SizeCalculator from './components/ui/SizeCalculator';
import OutfitMixer from './components/ui/OutfitMixer';
import AboutPage from './components/ui/AboutPage';
import ContactPage from './components/ui/ContactPage';

import CartDrawer from './components/ui/CartDrawer';
import CheckoutModal from './components/ui/CheckoutModal';

// Dedicated sub-component for FAQs to conform to the Rules of Hooks
function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="titanium-card"
      style={{ 
        padding: '20px', 
        cursor: 'pointer', 
        overflow: 'hidden', 
        backgroundColor: 'rgba(18, 18, 18, 0.65)',
        border: isOpen ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'border-color 0.2s ease'
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-heading)', paddingRight: '12px' }}>
          {faq.q}
        </h4>
        <span style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 'bold' }}>
          {isOpen ? '−' : '+'}
        </span>
      </div>
      {isOpen && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '12px', lineHeight: '1.5' }}>
          {faq.a}
        </p>
      )}
    </div>
  );
}

export default function App() {
  // Page Routing State
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'about', 'contact'

  // Mobile navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Quick View Modal state
  const [activePreviewProduct, setActivePreviewProduct] = useState(null); // spec to render in modal
  const [previewSize, setPreviewSize] = useState('4-5Y');

  // Cart & checkout states
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const addToast = (message, title = 'NOTIFICATION') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Add catalog pre-designed item to cart
  const handleAddCatalogItem = (product) => {
    setCartItems(prev => {
      // Check if item with same ID and size exists
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, product];
    });
    setIsCartOpen(true);
    addToast(`Successfully added ${product.name} to wardrobe!`, 'ADDED TO WARDROBE');
    
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#ef4444', '#ffffff', '#000000']
    });
  };

  // Handle adding directly from the Quick View Modal
  const handleAddFromModal = () => {
    if (!activePreviewProduct) return;
    
    const fabricNames = {
      cotton: 'Organic Combed Cotton',
      fleece: 'Cozy Fleece',
      mesh: 'Active Mesh',
      jersey: 'Stretch Jersey'
    };

    const isTshirt = activePreviewProduct.type === 'tshirt';
    const isShorts = activePreviewProduct.type === 'shorts';
    
    const productName = isTshirt 
      ? (activePreviewProduct.decal ? 'Space Scout Tee' : 'Dino Explorer Tee')
      : isShorts ? 'Sunny Day Play Shorts' : 'Sky Jogger Pants';

    const modalProduct = {
      id: `${activePreviewProduct.type}-${previewSize}-${Math.random().toString(36).substring(2, 5)}`,
      name: `${productName} (${previewSize})`,
      type: activePreviewProduct.type,
      price: isTshirt ? 24.99 : isShorts ? 21.99 : 34.99,
      colors: { ...activePreviewProduct.colors },
      fabric: activePreviewProduct.fabric,
      fabricName: fabricNames[activePreviewProduct.fabric] || 'Organic Cotton',
      decal: activePreviewProduct.decal,
      image: activePreviewProduct.image,
      size: previewSize,
      quantity: 1
    };

    handleAddCatalogItem(modalProduct);
    setActivePreviewProduct(null); // Close modal
  };

  const handleUpdateQty = (id, nextQty) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: nextQty } : item));
  };

  const handleRemoveCartItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    addToast('Item removed from wardrobe.', 'REMOVED');
  };

  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    addToast('Thank you! Order sent to our digital fabrication units.', 'ORDER TRANSMITTED');
  };

  // Load preset style (open the interactive modal)
  const handleLoadPresetStyle = (preset) => {
    let decalUrl = preset.decal;
    if (preset.decal === 'dino') decalUrl = LOGO_PRESETS[0].url;
    else if (preset.decal === 'rocket') decalUrl = LOGO_PRESETS[1].url;
    else if (preset.decal === 'star') decalUrl = LOGO_PRESETS[2].url;
    else if (preset.decal === 'heart') decalUrl = LOGO_PRESETS[3].url;
    else if (preset.decal === 'zaki') decalUrl = LOGO_PRESETS[4].url;

    setActivePreviewProduct({
      type: preset.type,
      colors: { ...preset.colors },
      fabric: preset.fabric,
      decal: decalUrl,
      image: preset.image,
      decalScale: preset.decalScale || 0.28,
      decalPosition: preset.decalPosition || { x: 0, y: 0 }
    });
    setPreviewSize('4-5Y'); // Reset size dropdown inside modal
  };

  // Handle cross-page scrolling and navigation
  const handleNavClick = (page, sectionId) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-dark)' }}>
      
      {/* 1. Header Navigation */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100
        }}
      >
        {/* Brand Logo & Mobile Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Hamburger Trigger for Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
            className="md-hide-trigger"
          >
            <Menu size={24} />
          </button>

          <div 
            onClick={() => handleNavClick('home', 'hero')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <div 
              style={{ 
                backgroundColor: 'var(--primary)', 
                borderRadius: '8px', 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(239, 68, 68, 0.45)'
              }}
            >
              <Sparkles size={16} color="#fff" />
            </div>
            <span 
              className="text-display" 
              style={{ fontSize: '1.45rem', color: '#fff', fontWeight: 'bold', letterSpacing: '0.04em' }}
            >
              ZAKI GARMENTS
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav 
          style={{ 
            display: 'none', 
            gap: '20px',
            alignItems: 'center'
          }}
          className="md-flex-nav"
        >
          {[
            { label: 'HOME', page: 'home', id: 'hero' },
            { label: 'COLLECTIONS', page: 'home', id: 'catalog-section' },
            { label: 'OUTFIT MATCHMAKER', page: 'home', id: 'mixer-section' },
            { label: 'SIZE CALCULATOR', page: 'home', id: 'size-section' },
            { label: 'ABOUT US', page: 'about' },
            { label: 'CONTACT US', page: 'contact' }
          ].map((link, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(link.page, link.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: currentPage === link.page && (!link.id || link.id === 'hero') ? 'var(--primary)' : 'var(--text-secondary)',
                fontSize: '0.76rem',
                fontWeight: '700',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = currentPage === link.page && (!link.id || link.id === 'hero') ? 'var(--primary)' : 'var(--text-secondary)'}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions panel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Cart Icon trigger */}
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{ 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              position: 'relative',
              transition: 'var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
          >
            <ShoppingBag size={18} />
            {cartItems.length > 0 && (
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '-4px', 
                  right: '-4px', 
                  backgroundColor: 'var(--primary)', 
                  color: '#fff', 
                  borderRadius: '50%', 
                  width: '16px', 
                  height: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '0.6rem',
                  fontWeight: 'bold',
                  boxShadow: '0 0 8px rgba(239,68,68,0.5)'
                }}
              >
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Quick shop scroll */}
          <button 
            onClick={() => handleNavClick('home', 'catalog-section')}
            className="btn btn-primary"
            style={{ padding: '8px 14px', fontSize: '0.75rem', borderRadius: '8px' }}
          >
            SHOP NOW
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Navigation */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'active' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className="text-display" style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 'bold' }}>NAVIGATION</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'Home Page', page: 'home', id: 'hero' },
            { label: 'Shop Collections', page: 'home', id: 'catalog-section' },
            { label: 'Outfit Matchmaker', page: 'home', id: 'mixer-section' },
            { label: 'Size Calculator', page: 'home', id: 'size-section' },
            { label: 'About Us', page: 'about' },
            { label: 'Contact Us', page: 'contact' }
          ].map((link, idx) => (
            <button
              key={idx}
              className="mobile-nav-link"
              onClick={() => handleNavClick(link.page, link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Page Render Frame */}
      {currentPage === 'home' ? (
        <>
          {/* Hero Section */}
          <section 
            id="hero" 
            className="hero-gradient"
            style={{ padding: '80px 24px', position: 'relative', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}
          >
            <div 
              className="hero-split"
              style={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                display: 'grid', 
                gridTemplateColumns: '1fr', 
                gap: '48px',
                alignItems: 'center'
              }}
            >
              {/* Hero Left Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <span className="badge badge-secondary" style={{ width: 'fit-content', backgroundColor: 'rgba(239,68,68,0.15)', color: 'var(--primary)' }}>
                  ✨ PREMIUM KIDS CLOTHING
                </span>
                
                <h1 
                  className="text-display" 
                  style={{ 
                    fontSize: 'clamp(3rem, 6vw, 4.4rem)', 
                    lineHeight: '0.95', 
                    color: '#fff',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }}
                >
                  MADE FOR PLAY.<br />
                  <span className="shimmer-text">APPROVED BY PARENTS.</span>
                </h1>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5', maxWidth: '540px' }}>
                  Welcome to <strong>Zaki Garments</strong>. We craft premium kids t-shirts, track pants, and shorts from certified skin-safe organic fabrics. Browse our signature drops and order the perfect fit.
                </p>
                
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <button 
                    onClick={() => handleNavClick('home', 'catalog-section')}
                    className="btn btn-primary"
                    style={{ display: 'flex', gap: '8px' }}
                  >
                    DISCOVER COLLECTIONS
                    <ArrowRight size={16} />
                  </button>
                  <button 
                    onClick={() => handleNavClick('home', 'size-section')}
                    className="btn btn-secondary"
                  >
                    CALCULATE AGE SIZE
                  </button>
                </div>
              </div>
              {/* Hero Right Showcase */}
              <div 
                className="titanium-card hero-showcase-card"
                style={{ 
                  height: '420px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at center, #111111 0%, #000000 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px'
                }}
              >
                {/* Glowing circle spotlight behind vectors */}
                <div style={{
                  position: 'absolute',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                  zIndex: 1
                }} />
                
                {/* Showcase real images arranged in a premium 2x2 grid */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '12px', 
                  zIndex: 2, 
                  width: '100%',
                  maxWidth: '340px',
                  justifyItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '6px', borderRadius: '10px', width: '100%', overflow: 'hidden' }}>
                    <img 
                      src="/images/dino_tee.jpg" 
                      alt="Explorer Tee" 
                      style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} 
                    />
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>EXPLORER TEE</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '6px', borderRadius: '10px', width: '100%', overflow: 'hidden' }}>
                    <img 
                      src="/images/sunny_shorts.jpg" 
                      alt="Play Shorts" 
                      style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} 
                    />
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>PLAY SHORTS</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '6px', borderRadius: '10px', width: '100%', overflow: 'hidden' }}>
                    <img 
                      src="/images/sky_joggers.jpg" 
                      alt="Sky Joggers" 
                      style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} 
                    />
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>SKY JOGGERS</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '6px', borderRadius: '10px', width: '100%', overflow: 'hidden' }}>
                    <img 
                      src="/images/space_tee.jpg" 
                      alt="Space Tee" 
                      style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} 
                    />
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>SPACE TEE</span>
                  </div>
                </div>

                <div style={{ textAlign: 'center', zIndex: 2 }}>
                  <span className="badge badge-secondary" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: 'var(--primary)' }}>
                    ZAKI KIDS WEAR WARDROBE
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Stats / Fabric Banner */}
          <section style={{ backgroundColor: '#090a16', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
            <div 
              style={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                padding: '36px 24px', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: '24px' 
              }}
            >
              {[
                { title: '100% Skin Safe', desc: 'Skin-friendly organic combed cotton', icon: <Heart size={20} color="var(--primary)" /> },
                { title: 'Colorfast Dyes', desc: 'Vibrant shades that do not fade', icon: <Palette size={20} color="var(--primary)" /> },
                { title: 'Play-Resistant Stitching', desc: 'Reinforced flatlock seams for active kids', icon: <Scissors size={20} color="var(--primary)" /> },
                { title: 'Eco-Friendly Inks', desc: 'Water-based non-toxic decals', icon: <CheckCircle size={20} color="var(--primary)" /> }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="titanium-card"
                  style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.03)', display: 'flex', gap: '14px', alignItems: 'center' }}
                >
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px' }}>
                    {stat.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 'bold' }}>{stat.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Product Catalog Section */}
          <section id="catalog-section" style={{ backgroundColor: '#070708' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <ProductCatalog onSelectProduct={handleLoadPresetStyle} onAddToCart={handleAddCatalogItem} />
            </div>
          </section>

          {/* Outfit Matchmaker Section */}
          <section id="mixer-section" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
            <OutfitMixer onLoadOutfit={handleLoadPresetStyle} />
          </section>

          {/* Fit Size Calculator Section */}
          <section id="size-section" style={{ padding: '80px 24px', backgroundColor: '#050506', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <SizeCalculator />
            </div>
          </section>

          {/* Parenting FAQ Section */}
          <section id="faq-section" style={{ padding: '80px 24px', backgroundColor: '#050506', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span className="badge badge-secondary" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: 'var(--primary)' }}>PARENTS HELP BOARD</span>
                <h2 className="text-display" style={{ fontSize: '2.5rem', color: '#fff', marginTop: '10px' }}>
                  FREQUENTLY ASKED QUESTIONS
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  {
                    q: "What fabrics do you use for Zaki Garments?",
                    a: "We construct our clothing with child safety and comfort in mind. We use 100% GOTS-certified Organic Cotton for tees, thick soft looped loopback fleece for joggers, and high-wicking breathable grid mesh for play shorts. All sewing uses flatlock seams to ensure there is no scratchy friction against sensitive skin."
                  },
                  {
                    q: "What is Zaki Garments shipping and delivery timeline?",
                    a: "We process and dispatch standard wardrobe orders within 1 to 2 business days. Express shipping takes approximately 3-5 business days. You will receive an automated email containing your tracking reference as soon as the package leaves our tailoring house."
                  },
                  {
                    q: "Are the custom printed decals safe and washing-machine friendly?",
                    a: "Yes. All decals are printed programmatically using water-based, certified non-toxic biodegradable inks. We set them at high heat so they fuse directly with the organic cotton fibers. They do not crack, peel, or release toxic chemicals in washing machines. We recommend washing cold on a gentle cycle and tumble drying low."
                  },
                  {
                    q: "What if the customized clothes do not fit my child properly?",
                    a: "We highly recommend using our Kid-Smart Size Calculator before finalizing your customized order. Since bespoke clothes are tailored on-demand, we offer a 50% replacement fit guarantee: if your customized item fits too tight or loose, send it back and we will tailoring a corrected size pass for half price, or exchange standard pre-set products completely free within 30 days!"
                  }
                ].map((faq, idx) => (
                  <FAQItem key={idx} faq={faq} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : currentPage === 'about' ? (
        <AboutPage />
      ) : (
        <ContactPage onToast={addToast} />
      )}

      {/* 9. Footer */}
      <footer 
        style={{ 
          backgroundColor: '#020203', 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '60px 24px 30px 24px'
        }}
      >
        <div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '40px',
            marginBottom: '40px'
          }}
        >
          {/* Logo & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ backgroundColor: 'var(--primary)', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} color="#fff" />
              </div>
              <span className="text-display" style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 'bold' }}>ZAKI GARMENTS</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: '1.5' }}>
              Clothing crafted for play, tailored for kids. We provide premium skin-safe organic garments that grow with your child's active imagination. Non-toxic, durable, and infinitely fun.
            </p>
          </div>

          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', letterSpacing: '0.05em' }}>ZAKI HEADQUARTERS</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <MapPin size={16} color="var(--primary)" />
              <span>100 Playroom Lane, Design District, NY</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Mail size={16} color="var(--primary)" />
              <span>hello@zakigarments.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Phone size={16} color="var(--primary)" />
              <span>+1 (800) 555-ZAKI</span>
            </div>
          </div>

          {/* Working Hours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', letterSpacing: '0.05em' }}>QUICK NAVIGATION</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => handleNavClick('home', 'hero')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Home</button>
              <button onClick={() => handleNavClick('home', 'catalog-section')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Collections</button>
              <button onClick={() => handleNavClick('about')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>About Us</button>
              <button onClick={() => handleNavClick('contact')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Contact Us</button>
            </div>
          </div>
        </div>

        {/* Legal Row */}
        <div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            borderTop: '1px solid rgba(255,255,255,0.04)', 
            paddingTop: '20px', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>© {new Date().getFullYear()} ZAKI GARMENTS INC. ALL RIGHTS RESERVED.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>FABRIC SAFETY DISCLOSURES</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PRIVACY TERMS</a>
          </div>
        </div>
      </footer>

      {/* 10. Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast" style={{ borderLeftColor: 'var(--primary)' }}>
            <div 
              style={{ 
                backgroundColor: 'rgba(239,68,68,0.15)', 
                borderRadius: '50%', 
                width: '24px', 
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}
            >
              <Check size={14} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '0.05em' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#fff', marginTop: '2px' }}>
                {toast.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 11. Cart Drawer Overlay Slider */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 12. Checkout Modal Overlay */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleCheckoutComplete}
      />

      {/* 13. Interactive 2D Quick View Modal Popup */}
      {activePreviewProduct && (
        <div className="view-3d-modal-overlay" onClick={() => setActivePreviewProduct(null)}>
          <div className="view-3d-modal-card animate-fade" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div 
              style={{ 
                padding: '16px 20px', 
                borderBottom: '1px solid rgba(255,255,255,0.06)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                backgroundColor: '#0a0a14'
              }}
            >
              <h3 style={{ color: '#fff', fontSize: '1.15rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={18} color="var(--primary)" />
                Product Details Quick View
              </h3>
              <button 
                onClick={() => setActivePreviewProduct(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Modal 2D Body Graphic */}
            <div className="view-3d-modal-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {activePreviewProduct.image ? (
                <img 
                  src={activePreviewProduct.image} 
                  alt="Product Details Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <>
                  <div style={{
                    position: 'absolute',
                    width: '280px',
                    height: '280px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 70%)',
                    filter: 'blur(8px)',
                    zIndex: 1
                  }} />
                  
                  <ProductSVGPreview 
                    colors={activePreviewProduct.colors} 
                    type={activePreviewProduct.type} 
                    style={{ width: '200px', height: '200px', zIndex: 2, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))' }}
                  />
                </>
              )}
            </div>

            {/* Modal E-Commerce Footer */}
            <div style={{ padding: '24px', backgroundColor: '#070812', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {activePreviewProduct.type === 'tshirt' ? 'Play T-Shirt' : activePreviewProduct.type === 'shorts' ? 'Comfy Shorts' : 'Jogger Pants'}
                  </span>
                  <h4 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2px', fontFamily: 'var(--font-heading)' }}>
                    {activePreviewProduct.type === 'tshirt' 
                      ? (activePreviewProduct.decal ? 'Space Scout Tee' : 'Dino Explorer Tee')
                      : activePreviewProduct.type === 'shorts' ? 'Sunny Day Play Shorts' : 'Sky Jogger Pants'}
                  </h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                    ${activePreviewProduct.type === 'tshirt' ? '24.99' : activePreviewProduct.type === 'shorts' ? '21.99' : '34.99'}
                  </span>
                </div>
              </div>

              {/* Options selection inside Modal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FABRIC:</span>
                  <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {activePreviewProduct.fabric}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>SELECT AGE SIZE:</span>
                  <div className="age-pill-container">
                    {['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'].map(size => {
                      const isSelected = previewSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          className={`age-pill-btn ${isSelected ? 'active' : ''}`}
                          style={{ padding: '8px 12px', fontSize: '0.75rem', borderRadius: '6px' }}
                          onClick={() => setPreviewSize(size)}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Button inside Modal */}
              <button 
                onClick={handleAddFromModal}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '20px', justifyContent: 'center', padding: '12px', borderRadius: '8px' }}
              >
                <ShoppingBag size={16} style={{ marginRight: '6px' }} />
                ADD SELECTION TO WARDROBE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
