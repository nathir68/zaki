import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage({ onToast }) {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      if (onToast) onToast('Please fill out all required fields.', 'ERROR');
      return;
    }

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onToast) onToast('Your message has been sent successfully!', 'MESSAGE TRANSMITTED');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="animate-fade" style={{ padding: '60px 24px', maxWidth: '1000px', margin: '0 auto', color: '#fff' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge badge-secondary" style={{ backgroundColor: 'rgba(236,72,153,0.15)', color: 'var(--secondary)' }}>
          GET IN TOUCH
        </span>
        <h1 className="text-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#fff', marginTop: '12px' }}>
          CONTACT US
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '12px auto 0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Have questions about kid sizes, custom fabric orders, or exchanges? Drop us a line and our playroom support crew will assist you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        
        {/* Contact Info Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="titanium-card" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={20} color="var(--primary)" />
              Playroom Support
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <MapPin size={20} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>HQ Location</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px', lineHeight: '1.4' }}>
                    100 Playroom Lane, Design District<br />New York, NY 10013
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <Mail size={20} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Email Support</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
                    support@zakigarments.com
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <Phone size={20} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Phone Support</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
                    +1 (800) 555-ZAKI
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="titanium-card" style={{ padding: '24px', backgroundColor: 'rgba(99,102,241,0.02)', border: '1px solid rgba(99,102,241,0.1)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>Exchange Guarantee</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '6px', lineHeight: '1.5' }}>
              We offer free standard size exchange returns within 30 days! Simply send an email with your Order ID, and we will dispatch a pre-paid mailing envelope immediately.
            </p>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="titanium-card" style={{ padding: '36px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>Send a Direct Message</h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>YOUR NAME *</label>
              <input 
                type="text" 
                name="name" 
                value={formState.name} 
                onChange={handleChange}
                required
                placeholder="Enter your name" 
                style={{ padding: '12px', backgroundColor: '#131427', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>EMAIL ADDRESS *</label>
              <input 
                type="email" 
                name="email" 
                value={formState.email} 
                onChange={handleChange}
                required
                placeholder="Enter your email" 
                style={{ padding: '12px', backgroundColor: '#131427', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>SUBJECT (OPTIONAL)</label>
              <input 
                type="text" 
                name="subject" 
                value={formState.subject} 
                onChange={handleChange}
                placeholder="e.g. Bulk order inquiry" 
                style={{ padding: '12px', backgroundColor: '#131427', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>YOUR MESSAGE *</label>
              <textarea 
                name="message" 
                rows="4" 
                value={formState.message} 
                onChange={handleChange}
                required
                placeholder="How can we help you?" 
                style={{ padding: '12px', backgroundColor: '#131427', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '12px', borderRadius: '8px' }}
            >
              {isSubmitting ? (
                <span>SENDING MESSAGE...</span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Send size={15} />
                  SEND MESSAGE
                </span>
              )}
            </button>

            {isSuccess && (
              <div style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 'bold', textAlign: 'center', marginTop: '10px' }}>
                ✓ Message sent successfully! We will email you back within 24 hours.
              </div>
            )}

          </form>
        </div>

      </div>

    </div>
  );
}
