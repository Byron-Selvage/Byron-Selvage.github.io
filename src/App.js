import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main'; // fallback for lazy pages
import './static/css/main.scss'; // All of our styles

const { PUBLIC_URL } = process.env;

// Every route - we lazy load so that each page can be chunked
// NOTE that some of these chunks are very small. We should optimize
// which pages are lazy loaded in the future.
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Projects = lazy(() => import('./pages/Projects'));
const Resume = lazy(() => import('./pages/Resume'));
const Stats = lazy(() => import('./pages/Stats'));
const NeuralChaos = lazy(() => import('./pages/projects/NeuralChaos'));
const Conway = lazy(() => import('./pages/projects/Conway'));
const Hamming = lazy(() => import('./pages/projects/Hamming'));
const Heat = lazy(() => import('./pages/projects/Heat'));
const OneOffs = lazy(() => import('./pages/projects/OneOffs'));

const App = () => (
  <BrowserRouter basename={PUBLIC_URL}>
    <Suspense fallback={<Main />}>
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/projects/neural-chaos" element={<NeuralChaos />} />
        <Route path="/projects/conway" element={<Conway />} />
        <Route path="/projects/hamming" element={<Hamming />} />
        <Route path="/projects/heat-diffusion" element={<Heat />} />
        <Route path="/projects/random" element={<OneOffs />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
