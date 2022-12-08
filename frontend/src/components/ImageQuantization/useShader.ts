/** @format */

import { useCallback, useEffect, useMemo } from "react";
import * as THREE from "three";

export type UseShaderProps = {
  fragmentShader: string;
  vertexShader: string;
  uniforms?: { [uniform: string]: THREE.IUniform };
  fog?: boolean;
  geometry?: THREE.BufferGeometry;
};

export type UseShaderReturnType = [
  THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>,
  (
    key: string,
    initialValue: number | number[]
  ) => (value: number | number[]) => void
];

export const useShader = (props: UseShaderProps): UseShaderReturnType => {
  const {
    fragmentShader = "",
    vertexShader = "",
    fog = false,
    geometry = new THREE.PlaneGeometry(100, 100, 10, 10),
  } = props;

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthTest: true,
        // depthWrite: true,
      }),
    []
  );

  useEffect(() => {
    material.vertexShader = vertexShader;
  }, [material, vertexShader]);

  useEffect(() => {
    material.fragmentShader = fragmentShader;
  }, [material, fragmentShader]);

  useEffect(() => {
    material.fog = fog;
  }, [material, fog]);

  const mesh = useMemo(() => {
    return new THREE.Mesh(geometry, material);
  }, [material, geometry]);

  const registerUniform = useCallback(
    (key: string, initialValue: number | number[]) => {
      material.uniforms[key] = { value: initialValue };
      const updateUniform = (value: number | number[]) => {
        material.uniforms[key].value = value;
      };
      return updateUniform;
    },
    [material]
  );

  return [mesh, registerUniform];
};
