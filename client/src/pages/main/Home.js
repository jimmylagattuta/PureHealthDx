import React, { lazy, Suspense, useEffect, useState } from 'react';
import Intro from './homeSections/Intro';  // Eager load Intro

// Lazy-load everything else:
const LazySocial = lazy(() => import('../../components/Social'));
const LazyCompany = lazy(() => import('./homeSections/Company'));
const LazyAboutSection = lazy(() => import('./homeSections/AboutSection'));
const LazyServiceList = lazy(() => import('./homeSections/ServiceList'));
const LazyMapContainer = lazy(() => import('./homeSections/MapContainer'));
const LazyReviewsComponent = lazy(() => import('../../components/ReviewsComponent'));

const Home = ({ scrollToContact, reviews }) => {
  // State to trigger loading of lazy sections
  const [loadRest, setLoadRest] = useState(false);

  // Decide when to load the rest: immediately, after a small delay, or on user action
  useEffect(() => {
    // Example: load them immediately after Home mounts
    const timer = setTimeout(() => {
      setLoadRest(true);
    }, 0); // or 1000ms, 2000ms, etc.

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Eager-load only Intro */}
      <Intro scrollToContact={scrollToContact} />

      {/* Conditionally render everything else */}
      {loadRest && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazySocial />
          <LazyCompany />
          <LazyAboutSection />
          <LazyServiceList />
          <LazyMapContainer />
          <LazyReviewsComponent reviews={reviews} />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
