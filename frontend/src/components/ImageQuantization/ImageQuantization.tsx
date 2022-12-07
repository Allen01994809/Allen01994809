/** @format */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import is from "../../utils/is";
import * as THREE from "three";
import styles from "./ImageQuantization.module.scss";
import { useRafLoop, useWindowSize } from "react-use";
import { useShader } from "./useShader";

const fragmentShader = `
`;

const vertexShader = `
`;

const ImageQuantization = () => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | undefined>();
  const size = useWindowSize();

  const [shaderMesh, updateUniform] = useShader({
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
    fog: true,
  });
  updateUniform("", [0]);

  useEffect(() => {
    if (is.null(refCanvas.current)) return;
    const renderer = new THREE.WebGLRenderer({
      canvas: refCanvas.current,
      antialias: true,
    });
    setRenderer(renderer);
  }, [refCanvas.current]);

  useEffect(() => {
    if (is.null(renderer)) return;
    renderer.setSize(size.width, size.height);
  }, [renderer, size]);

  const camera = useMemo(() => {
    const camera = new THREE.PerspectiveCamera(45, size.width / size.height);
    camera.position.set(20, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
  }, [size]);

  const scene = useMemo(() => new THREE.Scene(), []);

  useEffect(() => {
    scene.add(shaderMesh);
    return () => {
      scene.remove(shaderMesh);
    };
  }, [scene, shaderMesh]);

  useMemo(() => {
    const meshFloor = new THREE.Mesh(
      new THREE.BoxGeometry(2000, 0.1, 2000),
      new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 }),
    );
    scene.add(meshFloor);
    return meshFloor;
  }, [scene]);

  useMemo(() => {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    const lightHelper = new THREE.DirectionalLightHelper(light);
    scene.add(light);
    scene.add(lightHelper);
    return light;
  }, [scene]);

  const knot = useMemo(() => {
    const meshKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(3, 1, 100, 16),
      new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 }),
    );
    meshKnot.position.set(0, 5, 0);
    scene.add(meshKnot);
    return meshKnot;
  }, [scene]);

  const render = useCallback(
    (time: number) => {
      if (is.null(renderer)) return;
      knot.position.setX(Math.sin(time / 1000) * 10);
      knot.position.setZ(Math.cos(time / 1000) * 10);
      knot.rotation.set(0, Math.sin(time / 1000), Math.cos(time / 1000));
      camera.lookAt(knot.position);
      renderer.render(scene, camera);
    },
    [renderer, scene, camera],
  );

  useRafLoop(render);

  return (
    <div className={styles.wrap}>
      <canvas ref={refCanvas} />
    </div>
  );
};

export default ImageQuantization;
