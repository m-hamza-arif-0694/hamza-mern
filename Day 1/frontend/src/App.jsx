import React, { useState, useEffect } from 'react';
import { Rocket, Server, Database, Code, CheckCircle, RefreshCw, Terminal, Layers } from 'lucide-react';

function App() {
  const [count, setCount] = useState(0);
  const [backendStatus, setBackendStatus] = useState({ loading: true, data: null, error: false });
  const [activeTab, setActiveTab] = useState('overview');

  const checkBackendServer = async () => {
    setBackendStatus({ loading: true, data: null, error: false });
    try {
      const response = await fetch('http://localhost:5000/api/status');
      if (!response.ok) throw new Error('Server not responding');
      const data = await response.json();
      setBackendStatus({ loading: false, data, error: false });
    } catch (err) {
      setBackendStatus({ loading: false, data: null, error: true });
    }
  };

  useEffect(() => {
    checkBackendServer();
  }, []);

  return (
    <div className="app-container">
      {/* Background glowing gradients */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <header className="header">
        <div className="badge">
          <Rocket size={16} className="badge-icon" />
          <span>HisabDo Internship Bootcamp &bull; Day 1</span>
        </div>
        <h1 className="main-heading">
          Welcome to the <span className="text-gradient">MERN Stack</span> Journey
        </h1>
        <p className="main-description">
          Today marks the starting point of our Web Development bootcamp. We've set up our environment, 
          verified Node.js & npm, created our first React application, and built a basic Express.js backend server!
        </p>

        {/* Primary Interactive Task Button (Day 1 Task Requirement) */}
        <div className="cta-container">
          <button className="primary-btn" onClick={() => setCount(count + 1)}>
            <SparklesIcon /> Click Me! Counter: <span className="counter-pill">{count}</span>
          </button>
          
          <button className="secondary-btn" onClick={checkBackendServer}>
            <RefreshCw size={16} className={backendStatus.loading ? 'spin' : ''} />
            Check Backend Server
          </button>
        </div>
      </header>

      {/* Backend Integration Status Banner */}
      <section className="server-status-card">
        <div className="status-header">
          <div className="status-title">
            <Server size={20} className="status-icon" />
            <h3>Express.js Backend Connection</h3>
          </div>
          <div className={`status-indicator ${backendStatus.error ? 'offline' : backendStatus.loading ? 'connecting' : 'online'}`}>
            <span className="dot"></span>
            {backendStatus.loading ? 'Checking...' : backendStatus.error ? 'Offline (Run Server)' : 'Online & Active'}
          </div>
        </div>

        {backendStatus.data && (
          <div className="status-details">
            <div className="detail-item">
              <span className="label">Server:</span>
              <span className="value">{backendStatus.data.server}</span>
            </div>
            <div className="detail-item">
              <span className="label">Status:</span>
              <span className="value success">{backendStatus.data.status}</span>
            </div>
            <div className="detail-item">
              <span className="label">Stack:</span>
              <span className="value tag">{backendStatus.data.stack?.join(' + ')}</span>
            </div>
          </div>
        )}

        {backendStatus.error && (
          <p className="server-hint">
            💡 <strong>Tip:</strong> Start the Express backend by running <code>cd backend &amp;&amp; npm start</code> to connect!
          </p>
        )}
      </section>

      {/* Day 1 MERN Concepts Overview */}
      <main className="main-content">
        <div className="section-title-wrap">
          <Layers size={22} className="section-icon" />
          <h2>Core MERN Architecture</h2>
        </div>

        <div className="mern-grid">
          <div className="mern-card mongo">
            <div className="card-header">
              <Database className="card-icon" size={28} />
              <span className="card-tag">Database</span>
            </div>
            <h3>MongoDB</h3>
            <p>
              A NoSQL document-oriented database that stores data in flexible, JSON-like BSON formats. 
              Ideal for scalable and modern web applications.
            </p>
          </div>

          <div className="mern-card express">
            <div className="card-header">
              <Server className="card-icon" size={28} />
              <span className="card-tag">Backend Framework</span>
            </div>
            <h3>Express.js</h3>
            <p>
              A minimal and fast web framework for Node.js. It simplifies handling HTTP routes, RESTful APIs, 
              middleware functions, and request/response workflows.
            </p>
          </div>

          <div className="mern-card react">
            <div className="card-header">
              <Code className="card-icon" size={28} />
              <span className="card-tag">Frontend UI</span>
            </div>
            <h3>React.js</h3>
            <p>
              A powerful JavaScript library created by Meta for building interactive component-based user interfaces 
              with virtual DOM speed and declarative state.
            </p>
          </div>

          <div className="mern-card node">
            <div className="card-header">
              <Terminal className="card-icon" size={28} />
              <span className="card-tag">Runtime</span>
            </div>
            <h3>Node.js</h3>
            <p>
              An open-source, cross-platform JavaScript runtime environment built on Chrome's V8 engine 
              allowing JS execution outside the browser on the server side.
            </p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 HisabDo Internship Bootcamp &bull; Day 1 Completed Successfully</p>
          <div className="footer-links">
            <span>Node.js v24.16.0</span>
            <span>&bull;</span>
            <span>npm v11.13.0</span>
            <span>&bull;</span>
            <span>React + Vite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
    </svg>
  );
}

export default App;
