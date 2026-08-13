'use client';

import React from 'react';

export default function Badge({ children, variant = 'blue', style = {} }) {
  const badgeClasses = {
    blue: 'badge-blue',
    green: 'badge-green',
    purple: 'badge-purple',
    red: { background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 },
    yellow: { background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }
  };

  if (typeof badgeClasses[variant] === 'object') {
    return <span style={{ ...badgeClasses[variant], ...style }}>{children}</span>;
  }

  return <span className={badgeClasses[variant]} style={style}>{children}</span>;
}
