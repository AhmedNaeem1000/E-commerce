import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  PresentationControls,
  ContactShadows,
  Float,
  Html,
  useProgress,
  useGLTF
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const productFeatures = {
  'Watch': {
    title: 'Premium Design',
    description: 'Crafted with precision and elegant aesthetics'
  },
  'Screen': {
    title: 'AMOLED Display',
    description: '1.4" Always-on Retina display with 1000 nits brightness'
  },
  'Band': {
    title: 'Premium Band',
    description: 'Silicone band with quick-release mechanism'
  },
  'Sensor': {
    title: 'Health Sensors',
    description: 'Advanced heart rate, SpO2, and ECG monitoring'
  }
};

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm">Loading {progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}

function ErrorFallback() {
  return (
    <Html center>
      <div className="text-white text-center  backdrop-blur-md p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Unable to load 3D model</h3>
        <p className="text-sm text-gray-300 mb-4">Please try refreshing the page</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-white/70 dark:bg-white/10 text-black dark:text-white px-4 py-2 rounded-full text-sm hover:bg-white/90 dark:hover:bg-white/20 transition-colors shadow-lg border border-white/20 dark:border-white/10 backdrop-blur-md"
        >
          Refresh Page
        </button>
      </div>
    </Html>
  );
}

function SmartWatchModel({ setHoveredPart, setTooltipInfo, color, modelUrl }) {
  const { scene } = useGLTF(modelUrl || "/models/scene.gltf");
  const modelRef = useRef();

  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (color) {
          node.material = node.material.clone();
          node.material.color = new THREE.Color(color);
        }
      }
    });
    // ✅ نحرك الموديل داخليًا
    scene.position.set(0, -5.5, 0);
  }, [scene, color]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    modelRef.current.rotation.y = Math.sin(t / 4) / 8 + Math.PI / 4;
    modelRef.current.position.y = Math.sin(t / 1.5) / 15;
  });

  const handlePointerOver = (part) => {
    setHoveredPart(part);
    if (productFeatures[part]) {
      setTooltipInfo(productFeatures[part]);
    }
  };

  const handlePointerOut = () => {
    setHoveredPart(null);
    setTooltipInfo(null);
  };

  return (
    <group
      ref={modelRef}
      scale={0.25}
      position={[0, 0, 0]}
      onPointerOver={() => handlePointerOver('Watch')}
      onPointerOut={handlePointerOut}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function ProductViewer3D({ color, modelUrl }) {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const [hasError, setHasError] = useState(false);
  const { colorTheme } = useTheme();
  const navigate = useNavigate();
  const { lang } = useLang();

  return (
    <div className="relative w-full h-[80vh]" style={{ touchAction: 'none' }}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary-500/10 via-transparent to-transparent" />
      </div>

      {/* 3D Canvas */}
      <Canvas
        className="w-full h-full"
        dpr={[1, 6]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        onError={() => setHasError(true)}
        style={{ touchAction: 'none' }}
      >
        <Suspense fallback={<Loader />}>
          {hasError ? (
            <ErrorFallback />
          ) : (
            <>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />

              <PresentationControls
                global
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 6, Math.PI / 6]}
                azimuth={[-Math.PI / 6, Math.PI / 6]}
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 1500 }}
              >
                <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                  <SmartWatchModel
                    setHoveredPart={setHoveredPart}
                    setTooltipInfo={setTooltipInfo}
                    color={color}
                    modelUrl={modelUrl}
                  />
                </Float>
              </PresentationControls>

              <ContactShadows position={[0, -1.2, 0]} opacity={0.3} scale={5} blur={2} />
              <Environment preset="city" />
              <EffectComposer>
                <Bloom intensity={0.4} luminanceThreshold={0.85} luminanceSmoothing={0.75} />
              </EffectComposer>
              <OrbitControls />
            </>
          )}
        </Suspense>
      </Canvas>

      {/* UI Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="max-w-7xl  mx-auto px-4 h-full flex flex-col justify-between py-4">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <button
              className="bg-white/70 dark:bg-white/10 text-black dark:text-white font-semibold py-2 px-6 rounded-full pointer-events-auto hover:bg-white/90 dark:hover:bg-white/20 transition-colors shadow-lg border border-white/20 dark:border-white/10 backdrop-blur-md"
              style={{ touchAction: 'auto' }}
              onClick={() => navigate('/products?category=Headphones')}
            >
              {lang === 'ar' ? 'اشتري الآن - ج.م 1932.00' : 'Buy Now - EGP 1932.00'}
            </button>
          </motion.div>
        </div>

        {/* Tooltip */}
        {tooltipInfo && !hasError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/3 right-4 transform -translate-y-1/2 bg-black/80 backdrop-blur-md p-3 rounded-lg text-white pointer-events-auto max-w-[200px]"
            style={{ touchAction: 'auto' }}
          >
            <h3 className="font-semibold text-sm mb-1">{tooltipInfo.title}</h3>
            <p className="text-xs">{tooltipInfo.description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ✅ Preload model if from external source
// useGLTF.preload("https://models.readyplayer.me/64f7e0bbbed21be0b2e69611.glb");
