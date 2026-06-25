"use client";

import { useEffect, useRef } from "react";

/**
 * 3D animated hero background — Three.js.
 * - Field of floating glowing particles (purple/cyan) with subtle drift
 * - Parallax that follows the mouse
 * - Rotating wireframe icosahedron as a focal 3D object
 * Self-contained: dynamically imports three only on the client.
 */
export default function HeroCanvas({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, frameId, cleanup;
    let disposed = false;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) return;

      const mount = mountRef.current;
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.z = 14;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      mount.appendChild(renderer.domElement);

      // ---- Particles ----
      const COUNT = window.innerWidth < 768 ? 700 : 1500;
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);
      const purple = new THREE.Color("#6C3FD4");
      const cyan = new THREE.Color("#00C9A7");

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 36;
        positions[i3 + 1] = (Math.random() - 0.5) * 24;
        positions[i3 + 2] = (Math.random() - 0.5) * 24;
        const c = Math.random() > 0.5 ? purple : cyan;
        colors[i3] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // ---- Focal wireframe object ----
      const ico = new THREE.Mesh(
        new THREE.IcosahedronGeometry(3.2, 1),
        new THREE.MeshBasicMaterial({
          color: "#6C3FD4",
          wireframe: true,
          transparent: true,
          opacity: 0.25,
        })
      );
      scene.add(ico);

      const ico2 = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.1, 0),
        new THREE.MeshBasicMaterial({
          color: "#00C9A7",
          wireframe: true,
          transparent: true,
          opacity: 0.2,
        })
      );
      scene.add(ico2);

      // ---- Mouse parallax ----
      const mouse = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const onMove = (e) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove);

      const clock = new THREE.Clock();
      const animate = () => {
        const t = clock.getElapsedTime();
        mouse.x += (target.x - mouse.x) * 0.04;
        mouse.y += (target.y - mouse.y) * 0.04;

        points.rotation.y = t * 0.04 + mouse.x * 0.3;
        points.rotation.x = mouse.y * 0.2;

        ico.rotation.x = t * 0.15;
        ico.rotation.y = t * 0.2;
        ico2.rotation.x = -t * 0.2;
        ico2.rotation.y = -t * 0.12;

        camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouse.y * 1.2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };

      if (reduce) {
        renderer.render(scene, camera);
      } else {
        animate();
      }

      // ---- Resize ----
      const onResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        geo.dispose();
        mat.dispose();
        ico.geometry.dispose();
        ico.material.dispose();
        ico2.geometry.dispose();
        ico2.material.dispose();
        renderer.dispose();
        if (renderer.domElement && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`absolute inset-0 ${className}`}
    />
  );
}
