import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PresentationControls, Stage } from '@react-three/drei';
import Exchanges from '../Exchnages/Exchanges';

function Model(props) {
  const { scene } = useGLTF('/bitcoin.glb');
  return <primitive object={scene} {...props} />;
}

const Hero = () => {


  return (
    <div>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{ position: 'absolute', top: '7%', width: '100%', height: '100%' ,touchAction:"none"}}
      >
        <color attach="background" args={['#101010']} />
        <ambientLight intensity={0.8} /> {/* Adjusted light intensity for better visibility */}

        <PresentationControls
          speed={1.5}
          global
          zoom={0.5}
          polar={[-Math.PI / 2, Math.PI / 2]} // Full vertical rotation
          azimuth={[-Infinity, Infinity]} // Full horizontal rotation
        >
          <Stage environment={null}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
      <Exchanges/>
    </div>
  );
};

export default Hero;

