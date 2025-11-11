/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { Leva, useControls } from "leva";

function RendererSettings() {
  const { gl } = useThree();
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.setClearColor(0x000000, 0);
  }, [gl]);
  return null;
}

function Background({ url }: { url: string }) {
  const tex = useTexture(url);
  const { scene } = useThree();
  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    scene.background = tex; // 2D 사진을 배경으로
  }, [tex, scene]);
  return null;
}

function GlassSphere() {
  const {
    transmission,
    ior,
    thickness,
    roughness,
    clearcoat,
    clearcoatRoughness,
    envMapIntensity,
    tint,
    attenDist,
  } = useControls("Glass", {
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 2.5, step: 0.01 },
    thickness: { value: 1.2, min: 0, max: 5, step: 0.01 },
    roughness: { value: 0.02, min: 0, max: 1, step: 0.001 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.03, min: 0, max: 1, step: 0.001 },
    envMapIntensity: { value: 1, min: 0, max: 3, step: 0.01 },
    tint: { value: "#ffffff" },
    attenDist: { value: 2.0, min: 0.1, max: 10, step: 0.1 },
  });

  return (
    <mesh>
      <sphereGeometry args={[1.2, 128, 128]} />
      <meshPhysicalMaterial
        transmission={transmission}
        ior={ior}
        thickness={thickness}
        roughness={roughness}
        metalness={0}
        clearcoat={clearcoat}
        clearcoatRoughness={clearcoatRoughness}
        attenuationColor={new THREE.Color(tint)}
        attenuationDistance={attenDist}
        envMapIntensity={envMapIntensity}
      />
    </mesh>
  );
}

export default function GlassBall({
  bgUrl,
  height = 600,
}: {
  bgUrl?: string;
  height?: number | string;
}) {
  const { showBg } = useControls("Scene", {
    showBg: { value: !!bgUrl },
  });
  return (
    <div style={{ height, width: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true }} // ← 생성자 옵션만
      >
        <RendererSettings /> {/* ← 인스턴스 속성은 여기서 설정 */}
        {bgUrl ? <Background url={bgUrl} /> : null}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <GlassSphere />
        <OrbitControls
          enableDamping
          dampingFactor={0.1}
          enableZoom={false} // ← 휠/핀치 줌 비활성화
          touches={{
            ONE: THREE.TOUCH.ROTATE, // ← 1손가락: 회전
            TWO: THREE.TOUCH.ROTATE, // ← 2손가락: 기본 DOLLY_PAN 대신 ROTATE로 (핀치 줌 방지)
          }}
        />
      </Canvas>
    </div>
  );
}
