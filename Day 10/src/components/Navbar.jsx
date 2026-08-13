'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Menu, X, Smartphone, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Download App', path: '/download' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 50, width: '100%' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
          }}>
            <BookOpen size={22} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
              Hisab<span style={{ color: '#3b82f6' }}>Do</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.5px' }}>
              DAY 10 CORE APP
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="mobile-hide">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              style={{
                textDecoration: 'none',
                color: isActive(link.path) ? '#60a5fa' : '#94a3b8',
                fontWeight: isActive(link.path) ? 700 : 500,
                fontSize: '0.95rem',
                position: 'relative',
                transition: 'color 0.2s ease'
              }}
            >
              {link.name}
              {isActive(link.path) && (
                <div style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: '#3b82f6',
                  borderRadius: '2px'
                }} />
              )}
            </Link>
          ))}
        </nav>

        {/* Action CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }} className="mobile-hide">
          <Link href="/download" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="sm" icon={Smartphone}>Mobile App</Button>
          </Link>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="sm">Open Dashboard →</Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
          className="mobile-show"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="animate-fade-in" style={{
          background: 'rgba(15, 23, 42, 0.98)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: isActive(link.path) ? '#60a5fa' : '#cbd5e1',
                fontWeight: 600,
                fontSize: '1.05rem',
                padding: '0.5rem 0'
              }}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
              <Button variant="primary" style={{ width: '100%' }}>Launch Web App Dashboard</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
