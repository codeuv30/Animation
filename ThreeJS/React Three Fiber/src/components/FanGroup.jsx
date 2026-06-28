import { useControls } from "leva";
import { useMemo, useRef } from "react";
import { images } from "../Data/images.js";
import ImagePlane from "./ImagePlane.jsx";
import { useFrame } from "@react-three/fiber";

const FanGroup = () => {
  const { numberPlanes, spreadAngle, planeWidth, planeHeight, positionY } =
    useControls("Book Fan Controls", {
      numberPlanes: {
        value: 18,
        min: 2,
        max: 40,
        step: 1,
        label: "Number of planes",
      },
      spreadAngle: {
        value: 360,
        min: 30,
        max: 360,
        step: 1,
        label: "Spread Angle",
      },
      planeWidth: {
        value: 2.5,
        min: 0.4,
        max: 6,
        step: 0.05,
        label: "Plane Width",
      },
      planeHeight: {
        value: 2.5,
        min: 0.4,
        max: 8,
        step: 0.05,
        label: "Plane Height",
      },
      positionY: {
        value: -1.5,
        min: -6,
        max: 6,
        step: 0.05,
        label: "Y Position",
      },
    });

  const planes = useMemo(() => {
    const count = numberPlanes;
    const totalArcRad = (spreadAngle * Math.PI) / 180;
    const step = totalArcRad / (count - 1);
    const startingAngle = -totalArcRad / 2;

    return Array.from({ length: count }, (_, i) => {
      const angle = startingAngle + i * step;

      return {
        key: i,
        url: images[i % images.length],
        position: [0, -1.4, 0],
        rotation: [0, angle, 0],
      };
    });
  }, [numberPlanes, spreadAngle]);

  const groupRef = useRef(null);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta;
  })

  return (
    <>
      <group ref={groupRef}>
        {planes.map((plane) => {
          return (
            <ImagePlane
              url={plane.url}
              key={plane.key}
              position={plane.position}
              rotation={plane.rotation}
              planeWidth={planeWidth}
              planeHeight={planeHeight}
            />
          );
        })}
      </group>
    </>
  );
};

export default FanGroup;
