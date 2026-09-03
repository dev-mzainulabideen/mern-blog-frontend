import { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/Common/ErrorBoundary';
import { ToastProvider } from './context/ToastContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { initializeGA } from './utils/analytics';
import Home from './pages/Home';
import About from './pages/About';
import Articles from './pages/Articles/Articles';
import ArticleDetail from './pages/Articles/ArticleDetail';
import Posts from './pages/Posts/Posts';
import PostDetail from './pages/Posts/PostDetail';
import Stories from './pages/Stories/Stories';
import StoryDetail from './pages/Stories/StoryDetail';
import Skills from './pages/Skills/Skills';
import MatchResults from './pages/Skills/MatchResults';
import Consultancy from './pages/Consultancy';
import Contact from './pages/Contact';
import Register from './pages/Auth/Register';

function PageLoader() {
  return (
    <div className="page-loading" style={{ minHeight: '60vh' }}>
      <div className="page-loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

function App() {
  useEffect(() => {
    initializeGA();
  }, []);

  return (
    <AnalyticsProvider>
      <ErrorBoundary>
        <ToastProvider>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<ArticleDetail />} />
                <Route path="/consultancy" element={<Consultancy />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/stories/:id" element={<StoryDetail />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/skills/matches" element={<MatchResults />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Suspense>
          </Layout>
        </ToastProvider>
      </ErrorBoundary>
    </AnalyticsProvider>
  );
}

export default App;