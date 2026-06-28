import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

const ImagePlane = ({ url, position, rotation, planeWidth, planeHeight }) => {
  const texture = useTexture(url);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(planeWidth, planeHeight);

    geo.translate(2, planeHeight / 2, 0);

    return geo;
  }, [planeWidth, planeHeight]);

  console.log(geometry);

  return (
    <mesh position={position} rotation={rotation} geometry={geometry}>
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default ImagePlane;
