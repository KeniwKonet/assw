import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/public/Home.jsx';
import About from './pages/public/About.jsx';
import WhatWeDo from './pages/public/WhatWeDo.jsx';
import SCCN from './pages/public/SCCN.jsx';
import Catalogue from './pages/public/Catalogue.jsx';
import Business from './pages/public/Business.jsx';
import RegisterBusiness from './pages/public/RegisterBusiness.jsx';
import Membership from './pages/public/Membership.jsx';
import Opportunities from './pages/public/Opportunities.jsx';
import Opportunity from './pages/public/Opportunity.jsx';
import Programmes from './pages/public/Programmes.jsx';
import Impact from './pages/public/Impact.jsx';
import GetInvolved from './pages/public/GetInvolved.jsx';
import News from './pages/public/News.jsx';
import Contact from './pages/public/Contact.jsx';
import Verify from './pages/public/Verify.jsx';
import Policy from './pages/public/Policy.jsx';
import NotFound from './pages/public/NotFound.jsx';

const Auth = lazy(() => import('./pages/portal/Auth.jsx'));
const Apply = lazy(() => import('./pages/portal/Apply.jsx'));
const Payment = lazy(() => import('./pages/portal/Payment.jsx'));
const FounderPortal = lazy(() => import('./pages/portal/FounderPortal.jsx'));
const MemberPortal = lazy(() => import('./pages/portal/MemberPortal.jsx'));
const Certificate = lazy(() => import('./pages/portal/Certificate.jsx'));
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview.jsx'));
const AdminRegistry = lazy(() => import('./pages/admin/AdminRegistry.jsx'));
const AdminReview = lazy(() => import('./pages/admin/AdminReview.jsx'));
const AdminOpportunities = lazy(() => import('./pages/admin/AdminOpportunities.jsx'));
const AdminPayments = lazy(() => import('./pages/admin/AdminPayments.jsx'));
const AdminContent = lazy(() => import('./pages/admin/AdminContent.jsx'));
const StyleGuide = lazy(() => import('./pages/StyleGuide.jsx'));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function PublicLayout() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  );
}

const Loading = () => <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }} aria-busy="true"><div className="sk" style={{ width: 240, height: 16 }} /></div>;

export default function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="what-we-do" element={<WhatWeDo />} />
            <Route path="sccn" element={<SCCN />} />
            <Route path="catalogue" element={<Catalogue />} />
            <Route path="catalogue/:slug" element={<Business />} />
            <Route path="register-business" element={<RegisterBusiness />} />
            <Route path="membership" element={<Membership />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="opportunities/:slug" element={<Opportunity />} />
            <Route path="programmes" element={<Programmes />} />
            <Route path="impact" element={<Impact />} />
            <Route path="get-involved" element={<GetInvolved />} />
            <Route path="news" element={<News />} />
            <Route path="contact" element={<Contact />} />
            <Route path="verify" element={<Verify />} />
            <Route path="policies/:key" element={<Policy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="auth" element={<Auth />} />
          <Route path="apply" element={<Apply />} />
          <Route path="payment" element={<Payment />} />
          <Route path="portal/enterprise" element={<FounderPortal />} />
          <Route path="portal/member" element={<MemberPortal />} />
          <Route path="certificate/:no" element={<Certificate />} />
          <Route path="admin" element={<AdminOverview />} />
          <Route path="admin/registry" element={<AdminRegistry />} />
          <Route path="admin/review/:id" element={<AdminReview />} />
          <Route path="admin/opportunities" element={<AdminOpportunities />} />
          <Route path="admin/payments" element={<AdminPayments />} />
          <Route path="admin/content" element={<AdminContent />} />
          <Route path="style-guide" element={<StyleGuide />} />
        </Routes>
      </Suspense>
    </>
  );
}
