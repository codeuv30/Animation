import { Canvas, useFrame } from "@react-three/fiber";
import Experience from "./components/Experience";
import { OrbitControls } from "@react-three/drei";

const App = () => {
  return (
    <>
      <div className="parent">
        <Canvas camera={{ fov: 100 }}>
          <OrbitControls />
          <Experience />
        </Canvas>
      </div>
    </>
  );
};

export default App;
