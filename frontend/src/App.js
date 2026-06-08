import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import Nav from '@/components/portfolio/Nav';
import Hero from '@/components/portfolio/Hero';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Experience from '@/components/portfolio/Experience';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';

import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import RequireAuth from '@/components/admin/RequireAuth';

import { AuthProvider } from '@/context/AuthContext';
import { PortfolioProvider } from '@/context/PortfolioContext';

function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <PortfolioProvider>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                }
              />
            </Routes>
            <Toaster
              theme="dark"
              position="bottom-center"
              toastOptions={{
                style: {
                  background: '#0b1220',
                  border: '1px solid #1f2a44',
                  color: '#e2e8f0',
                  fontFamily: 'JetBrains Mono, monospace',
                },
                className: 'admin-toast',
              }}
            />
          </PortfolioProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
