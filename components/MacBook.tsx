"use client";

import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useProgress } from "@react-three/drei";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as THREE from "three";

const MODEL = "/models/macbook.glb";
const DRAG_YAW = 0.0036;
const DRAG_PITCH = 0.0022;

function Studio() {
  const { gl, scene } = useThree();

  useLayoutEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.05;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3.5, 5, 4]} intensity={2.1} />
      <directionalLight position={[-4, 1.5, -2]} intensity={0.3} />
    </>
  );
}

function Laptop() {
  const gltf = useGLTF(MODEL);
  const { gl } = useThree();
  const pivot = useRef<THREE.Group>(null);
  const auto = useRef(0);
  const drag = useRef({ on: false, x: 0, y: 0, yaw: 0, pitch: 0 });

  useLayoutEffect(() => {
    const root = gltf.scene;
    root.traverse((obj) => {
      obj.matrixAutoUpdate = true;
    });
    root.matrix.decompose(root.position, root.quaternion, root.scale);
    root.scale.setScalar(1);
    root.position.set(0, 0, 0);
    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const longest = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.05 / longest;
    root.scale.setScalar(scale);
    root.position.copy(center).multiplyScalar(-scale);
    root.updateMatrixWorld(true);
  }, [gltf]);

  useEffect(() => {
    const el = gl.domElement;
    const pointer = drag.current;
    const down = (event: PointerEvent) => {
      pointer.on = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      el.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!pointer.on) return;
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.yaw += dx * DRAG_YAW;
      pointer.pitch = THREE.MathUtils.clamp(pointer.pitch + dy * DRAG_PITCH, -0.45, 0.55);
    };
    const up = () => {
      pointer.on = false;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame((_, delta) => {
    const node = pivot.current;
    if (!node) return;
    const pointer = drag.current;
    if (!pointer.on) auto.current += delta * 0.18;
    const yaw = 0.42 + pointer.yaw + auto.current;
    const pitch = 0.62 + pointer.pitch;
    node.rotation.y = THREE.MathUtils.damp(node.rotation.y, yaw, pointer.on ? 8 : 4, delta);
    node.rotation.x = THREE.MathUtils.damp(node.rotation.x, pitch, pointer.on ? 8 : 4, delta);
  });

  return (
    <group ref={pivot} position={[0, 0.07, 0]} rotation={[0.62, 0.42, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default function MacBook() {
  const { active, progress } = useProgress();
  useGLTF.preload(MODEL);

  return (
    <div className="relative h-full w-full" aria-label="MacBook model, drag to turn">
      <Canvas
        className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
        camera={{ position: [0, 0, 4.7], fov: 28 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Studio />
          <Laptop />
        </Suspense>
      </Canvas>
      {active && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <div className="h-px w-28 bg-black/15">
            <div className="h-px bg-brand" style={{ width: `${Math.round(progress)}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
