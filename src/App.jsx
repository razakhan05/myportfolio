import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { Toaster } from "react-hot-toast";
import { Loader } from "@react-three/drei";

const LazyAbout = React.lazy(() => import("./components/About"));
const LazyContact = React.lazy(() => import("./components/Contact"));
const LazyExperience = React.lazy(() => import("./components/Experience"));
const LazyHero = React.lazy(() => import("./components/Hero"));
const LazyNavbar = React.lazy(() => import("./components/Navbar"));
const LazyTech = React.lazy(() => import("./components/Tech"));
const LazyWorks = React.lazy(() => import("./components/Works"));
const LazyStarsCanvas = React.lazy(() => import("./components/canvas/Stars"));

const App = () => {
  // Use state to track whether to show the canvas
  const [showCanvas, setShowCanvas] = useState(true);

  // Detect Android device
  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (isAndroid) {
      // Hide canvas on Android
      setShowCanvas(false);
    }
  }, []);

  return (
    <BrowserRouter className="font-mono">
      <Toaster />
      <div className="relative z-0 bg-primary">
        <div className="bg-cover bg-no-repeat bg-center">
          <Suspense fallback={<Loader />}>
            <LazyNavbar />
            <LazyHero />
          </Suspense>
        </div>
        <Suspense fallback={<Loader />}>
          <LazyAbout />
          <LazyExperience />
          <LazyTech />
          <LazyWorks />
        </Suspense>
        <div className="relative z-0">
          <Suspense fallback={<Loader />}>
            <LazyContact />
          </Suspense>
        </div>
        {showCanvas && (
          <Suspense fallback={<Loader />}>
            <LazyStarsCanvas />
          </Suspense>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
