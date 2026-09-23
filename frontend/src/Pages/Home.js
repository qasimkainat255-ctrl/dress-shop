
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  {
    title: "Party Wear",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.qacslUb80HmsnPHmW-Mt2gHaLG?r=0&pid=Api&h=220&P=0",
  },
  {
    title: "Casual Wear",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.0-DreqzfGIBwYN8z8-n-8QHaNL?r=0&pid=Api&h=220&P=0",
  },
  {
    title: "Formal Wear",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.ZES7WZi8LlO9FTNWkAaZPQHaHa?r=0&pid=Api&h=220&P=0",
  },
];

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    id: 1,
    name: "Rose Pearl Dress",
    price: "Rs. 4,999",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.oChhVYRmw1W16UiZWIKajwHaJR?r=0&pid=Api&h=220&P=0",
  },
  {
    id: 2,
    name: "Ivory Elegance",
    price: "Rs. 5,499",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.vzCDrA6DhJQtpgA98QrA6wHaI-?r=0&pid=Api&h=220&P=0",
  },
  {
    id: 3,
    name: "Blush Bloom",
    price: "Rs. 4,799",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.jwbxOQQZsXxJ9F0j9iKADAHaJQ?r=0&pid=Api&h=220&P=0",
  },
  {
    id: 4,
    name: "Midnight Grace",
    price: "Rs. 5,999",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.PzbKau3jFOPwjSkKoXVvnwHaJQ?r=0&pid=Api&h=220&P=0",
  },
];

/* =========================================================
   REAL GLB MODEL
   IMPORTANT:
   FILE MUST BE HERE:

   public/models/base_basic_pbr.glb

   URL:
   /models/base_basic_pbr.glb
========================================================= */

const MODEL_PATH = "/models/base_basic_pbr.glb";

/* =========================================================
   GLB CHARACTER

   This automatically:
   1. Loads the GLB
   2. Centers it
   3. Adjusts its size
   4. Places it standing in front
   5. Plays GLB animations if available
========================================================= */

function CharacterModel() {
  const groupRef = useRef();

  const { scene, animations } = useGLTF(MODEL_PATH);

  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    /* =========================================
       PLAY ALL GLB ANIMATIONS
    ========================================= */

    if (actions) {
      Object.values(actions).forEach((action) => {
        action.reset().fadeIn(0.4).play();
      });
    }

    return () => {
      if (actions) {
        Object.values(actions).forEach((action) => {
          action.fadeOut(0.3);
        });
      }
    };
  }, [actions]);

  useEffect(() => {
    if (!scene) return;

    /* =========================================
       CLONE MODEL
    ========================================= */

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.needsUpdate = true;
        }
      }
    });

    /* =========================================
       AUTO CENTER MODEL
    ========================================= */

    const box = new THREE.Box3().setFromObject(scene);

    const center = new THREE.Vector3();
    box.getCenter(center);

    scene.position.x -= center.x;
    scene.position.z -= center.z;

    /* =========================================
       PUT FEET ON FLOOR
    ========================================= */

    const newBox = new THREE.Box3().setFromObject(scene);

    scene.position.y -= newBox.min.y;

    /* =========================================
       AUTO SCALE
    ========================================= */

    const size = new THREE.Vector3();
    newBox.getSize(size);

    const height = size.y;

    if (height > 0) {
      const targetHeight = 5.2;
      const scale = targetHeight / height;

      scene.scale.setScalar(scale);
    }
  }, [scene]);

  return (
    <group ref={groupRef}>

      <primitive
        object={scene}
        position={[0, -2.5, 0]}
      />

    </group>
  );
}

/* =========================================================
   PRELOAD MODEL
========================================================= */

useGLTF.preload(MODEL_PATH);

/* =========================================================
   ROTATING CHARACTER
========================================================= */

function RotatingCharacter() {
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group
      ref={modelRef}
      position={[0, 0, 0]}
    >
      <CharacterModel />
    </group>
  );
}

/* =========================================================
   3D MODEL VIEWER
========================================================= */

function FashionModel() {
  return (
    <div className="relative mx-auto h-[620px] w-full max-w-[520px]">

      {/* GLOW */}

      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300/20 blur-[100px]" />

      {/* BACKGROUND SHAPE */}

      <div className="absolute left-1/2 top-5 h-[560px] w-[330px] -translate-x-1/2 rounded-t-[180px] border-2 border-yellow-700/30 bg-gradient-to-b from-white/60 to-yellow-200/20 shadow-2xl" />

      <div className="absolute left-1/2 top-10 h-[535px] w-[295px] -translate-x-1/2 rounded-t-[165px] bg-gradient-to-b from-yellow-50 via-amber-100 to-yellow-200/30 opacity-70" />

      {/* =====================================================
          THREE JS CANVAS
      ===================================================== */}

      <div className="relative z-20 h-[600px] w-full">

        <Canvas
          shadows
          camera={{
            position: [0, 1.2, 8],
            fov: 42,
          }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >

          {/* ===============================================
              LIGHTING
          =============================================== */}

          <ambientLight intensity={2.2} />

          <hemisphereLight
            intensity={1.5}
            position={[0, 5, 0]}
          />

          <directionalLight
            position={[5, 8, 6]}
            intensity={4}
            castShadow
          />

          <directionalLight
            position={[-5, 5, 4]}
            intensity={2.5}
          />

          <directionalLight
            position={[0, 4, -5]}
            intensity={2}
          />

          <pointLight
            position={[0, 3, 4]}
            intensity={1.5}
          />

          {/* ===============================================
              STUDIO ENVIRONMENT
          =============================================== */}

          <Environment preset="studio" />

          {/* ===============================================
              REAL GLB MODEL
          =============================================== */}

          <RotatingCharacter />

          {/* ===============================================
              CONTROLS
          =============================================== */}

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableDamping={true}
            dampingFactor={0.06}
            minDistance={5}
            maxDistance={10}
            minPolarAngle={Math.PI / 2.4}
            maxPolarAngle={Math.PI / 1.8}
            rotateSpeed={0.7}
          />

        </Canvas>

      </div>

      {/* =====================================================
          PLATFORM
      ===================================================== */}

      <div className="absolute bottom-3 left-1/2 z-30 h-[32px] w-[350px] -translate-x-1/2 rounded-[50%] border border-yellow-600/50 bg-gradient-to-b from-yellow-50 to-yellow-600/70 shadow-2xl">

        <div className="absolute left-1/2 top-1/2 h-2 w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-100 blur-sm" />

      </div>

      {/* =====================================================
          STARS
      ===================================================== */}

      <div className="absolute left-[8%] top-[25%] z-40 animate-pulse text-2xl text-yellow-600">
        ✦
      </div>

      <div className="absolute right-[8%] top-[18%] z-40 animate-pulse text-xl text-yellow-600">
        ✧
      </div>

      <div className="absolute bottom-[28%] left-[15%] z-40 animate-bounce text-lg text-yellow-600">
        ✦
      </div>

    </div>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

function Home() {
  const [scrollY, setScrollY] = useState(0);

  /* =========================================================
     SCROLL
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const moveRight = scrollY * 0.12;
  const moveLeft = scrollY * -0.08;

  /* =========================================================
     NEWSLETTER
  ========================================================= */

  function handleNewsletter(e) {
    e.preventDefault();

    const email = e.target.email.value;

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    alert("Thank you for subscribing!");

    e.target.reset();
  }

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#fffaf8] text-[#3e2929]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8f3] via-[#f7e8df] to-[#ead1c8]">

        <div className="absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-white/40 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-[#cf9d94]/20 blur-3xl" />

        <div className="relative mx-auto grid min-h-[720px] max-w-[1250px] grid-cols-1 items-center gap-5 px-5 py-12 lg:grid-cols-2 lg:px-10">

          {/* LEFT SIDE */}

          <div className="relative z-30 text-center lg:text-left">

            <p className="mb-5 text-xs font-bold tracking-[4px] text-[#a56d6d]">
              NEW COLLECTION 2026
            </p>

            <h1 className="font-serif text-5xl font-medium leading-none sm:text-6xl lg:text-8xl">

              Elegance

              <span className="mt-3 block italic text-[#a56d6d]">
                in Every Dress.
              </span>

            </h1>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-[#765e5a] lg:mx-0 lg:text-base">
              Discover beautiful dresses designed for women who love timeless
              elegance, effortless style and confidence.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">

              <Link
                to="/shop"
                className="rounded-full bg-[#3e2929] px-8 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#a56d6d]"
              >
                Shop Collection →
              </Link>

              <Link
                to="/about"
                className="rounded-full border border-[#3e2929] px-8 py-4 text-sm font-bold transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Our Story
              </Link>

            </div>

            {/* STATS */}

            <div className="mt-12 flex justify-center gap-8 lg:justify-start">

              <div>
                <strong className="block font-serif text-2xl">
                  500+
                </strong>

                <span className="text-[9px] uppercase tracking-widest text-[#8b7370]">
                  Happy Clients
                </span>
              </div>

              <div>
                <strong className="block font-serif text-2xl">
                  50+
                </strong>

                <span className="text-[9px] uppercase tracking-widest text-[#8b7370]">
                  Dress Designs
                </span>
              </div>

              <div>
                <strong className="block font-serif text-2xl">
                  4.9
                </strong>

                <span className="text-[9px] uppercase tracking-widest text-[#8b7370]">
                  Rating
                </span>
              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDE - 3D MODEL
          ================================================= */}

          <div
            className="relative z-20"
            style={{
              transform: `translateY(${-scrollY * 0.06}px)`,
            }}
          >

            <FashionModel />

            {/* NEW ARRIVAL CARD */}

            <div className="absolute bottom-20 left-0 z-50 rounded-2xl bg-white/95 px-5 py-4 shadow-2xl backdrop-blur-md">

              <p className="text-[9px] font-bold tracking-[3px] text-[#a56d6d]">
                NEW ARRIVAL
              </p>

              <h3 className="mt-1 font-serif text-lg">
                Golden Bloom
              </h3>

              <Link
                to="/shop"
                className="mt-2 block text-xs font-bold text-[#a56d6d]"
              >
                Shop Now →
              </Link>

            </div>

          </div>

        </div>

        {/* SCROLL INDICATOR */}

        <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 text-center">

          <div className="mx-auto mb-2 h-8 w-5 rounded-full border border-[#8e6962] p-1">

            <div className="h-2 w-1 animate-bounce rounded-full bg-[#8e6962]" />

          </div>

          <span className="text-[8px] font-bold tracking-[3px] text-[#80635e]">
            SCROLL DOWN
          </span>

        </div>

      </section>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <section className="mx-auto max-w-[1250px] px-5 py-20 lg:px-10">

        <div className="mb-12 text-center">

          <p className="mb-3 text-[10px] font-bold tracking-[4px] text-[#a56d6d]">
            EXPLORE COLLECTIONS
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
            Shop By Style
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#806d69]">
            Find the perfect style for every beautiful moment.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {categories.map((category) => (

            <Link
              to="/shop"
              key={category.title}
              className="group relative h-[430px] overflow-hidden rounded-3xl"
            >

              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-7">

                <h3 className="font-serif text-3xl text-white">
                  {category.title}
                </h3>

                <span className="mt-2 block text-xs text-white">
                  Explore Collection →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* =====================================================
          FASHION IN MOTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#f7eeeb] py-24">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d7aaa1]/30 blur-[100px]" />

        <div className="relative z-10 mb-16 px-5 text-center">

          <p className="mb-3 text-[10px] font-bold tracking-[4px] text-[#a56d6d]">
            THE DRESS EDIT
          </p>

          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl">
            Fashion in Motion.
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#806d69]">
            Scroll down and watch the collection move.
          </p>

        </div>

        {/* FIRST ROW */}

        <div className="relative h-[340px] sm:h-[430px] lg:h-[500px]">

          <div
            className="absolute left-0 top-0 flex gap-6"
            style={{
              transform: `translateX(${moveRight - 180}px)`,
            }}
          >

            {[...products, ...products, ...products].map(
              (product, index) => (

                <div
                  key={`${product.id}-one-${index}`}
                  className="group relative w-[220px] shrink-0 overflow-hidden rounded-3xl bg-white shadow-xl sm:w-[280px] lg:w-[330px]"
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[340px] w-full object-cover transition duration-700 group-hover:scale-110 sm:h-[430px] lg:h-[500px]"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-5 pb-6 pt-24">

                    <h3 className="font-serif text-xl text-white">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-[9px] tracking-[2px] text-white/70">
                      NEW COLLECTION
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* CENTER */}

        <div className="relative z-20 my-14 flex justify-center">

          <div className="rounded-full border border-[#a56d6d]/40 bg-white/80 px-8 py-3 shadow-lg backdrop-blur">

            <span className="text-[9px] font-bold tracking-[3px] text-[#a56d6d]">
              KEEP SCROLLING
            </span>

          </div>

        </div>

        {/* SECOND ROW */}

        <div className="relative h-[340px] sm:h-[430px] lg:h-[500px]">

          <div
            className="absolute right-0 top-0 flex gap-6"
            style={{
              transform: `translateX(${moveLeft + 180}px)`,
            }}
          >

            {[...categories, ...categories, ...categories].map(
              (category, index) => (

                <div
                  key={`${category.title}-two-${index}`}
                  className="group relative w-[220px] shrink-0 overflow-hidden rounded-3xl bg-white shadow-xl sm:w-[280px] lg:w-[330px]"
                >

                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-[340px] w-full object-cover transition duration-700 group-hover:scale-110 sm:h-[430px] lg:h-[500px]"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-5 pb-6 pt-24">

                    <h3 className="font-serif text-xl text-white">
                      {category.title}
                    </h3>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        <div className="relative z-10 mt-16 text-center">

          <p className="font-serif text-2xl italic sm:text-3xl">
            Every dress tells a story.
          </p>

          <div className="mx-auto mt-5 h-px w-14 bg-[#a56d6d]" />

        </div>

      </section>

      {/* =====================================================
          BEST SELLERS
      ===================================================== */}

      <section className="bg-[#f7eeeb] px-5 py-20 lg:px-10">

        <div className="mx-auto flex max-w-[1250px] flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="mb-3 text-[10px] font-bold tracking-[4px] text-[#a56d6d]">
              OUR FAVORITES
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
              Best Sellers
            </h2>

          </div>

          <Link
            to="/shop"
            className="text-sm font-bold text-[#a56d6d]"
          >
            View All Products →
          </Link>

        </div>

        <div className="mx-auto mt-12 grid max-w-[1250px] grid-cols-2 gap-4 lg:grid-cols-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="relative h-[300px] overflow-hidden sm:h-[400px]">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <button
                  type="button"
                  onClick={() => {
                    alert(`${product.name} added to wishlist`);
                  }}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow"
                >
                  ♡
                </button>

              </div>

              <div className="p-5">

                <h3 className="font-serif text-lg">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">

                  <span className="text-sm font-bold">
                    {product.price}
                  </span>

                  <Link
                    to="/shop"
                    className="text-xs font-bold text-[#a56d6d]"
                  >
                    Shop →
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =====================================================
          PROMO
      ===================================================== */}

      <section className="mx-auto grid max-w-[1250px] grid-cols-1 items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-10">

        <div className="overflow-hidden rounded-[30px_30px_150px_150px]">

          <img
            src="https://tse4.mm.bing.net/th/id/OIP.mK_L7ixdaQsLVYtOWPdrTgHaJ4?r=0&pid=Api&h=220&P=0"
            alt="Dress collection"
            className="h-[500px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[600px]"
          />

        </div>

        <div className="text-center lg:text-left">

          <p className="text-[10px] font-bold tracking-[4px] text-[#a56d6d]">
            THE PERFECT LOOK
          </p>

          <h2 className="my-5 font-serif text-5xl leading-tight sm:text-6xl">

            Your Style.

            <span className="block italic text-[#a56d6d]">
              Your Story.
            </span>

          </h2>

          <p className="mx-auto max-w-lg text-sm leading-8 text-[#765e5a] lg:mx-0">

            From soft everyday silhouettes to glamorous evening pieces,
            discover dresses that make every moment feel special.

          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full bg-[#3e2929] px-8 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#a56d6d]"
          >
            Discover Collection
          </Link>

        </div>

      </section>

      {/* =====================================================
          WHY US
      ===================================================== */}

      <section className="bg-[#f7eeeb] px-5 py-20 lg:px-10">

        <div className="mb-12 text-center">

          <p className="mb-3 text-[10px] font-bold tracking-[4px] text-[#a56d6d]">
            WHY DRESS SHOP
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl">
            Made For You
          </h2>

        </div>

        <div className="mx-auto grid max-w-[1250px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-8 text-center transition duration-300 hover:-translate-y-2">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f2dfda] text-xl text-[#a56d6d]">
              ✦
            </div>

            <h3 className="font-serif text-xl">
              Premium Quality
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#806d69]">
              Carefully selected fabrics and beautiful finishing.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 text-center transition duration-300 hover:-translate-y-2">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f2dfda] text-xl text-[#a56d6d]">
              ♡
            </div>

            <h3 className="font-serif text-xl">
              Made With Love
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#806d69]">
              Every collection is selected with care and love.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 text-center transition duration-300 hover:-translate-y-2">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f2dfda] text-xl text-[#a56d6d]">
              ✧
            </div>

            <h3 className="font-serif text-xl">
              Timeless Style
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#806d69]">
              Elegant designs that stay beautiful season after season.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 text-center transition duration-300 hover:-translate-y-2">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f2dfda] text-xl text-[#a56d6d]">
              ✓
            </div>

            <h3 className="font-serif text-xl">
              Easy Shopping
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#806d69]">
              Simple browsing and a smooth shopping experience.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <section className="bg-[#3e2929] px-5 py-20 text-center text-white">

        <div className="mx-auto max-w-2xl">

          <p className="text-[10px] font-bold tracking-[4px] text-[#d7aaa1]">
            STAY IN STYLE
          </p>

          <h2 className="my-5 font-serif text-4xl sm:text-5xl">
            Be the first to know.
          </h2>

          <p className="text-sm leading-7 text-[#d9c6c2]">
            Subscribe for new arrivals, exclusive offers and fashion
            inspiration.
          </p>

          <form
            onSubmit={handleNewsletter}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-2 rounded-2xl bg-white p-2 sm:flex-row sm:rounded-full"
          >

            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-full border-0 px-5 py-3 text-sm text-[#3e2929] outline-none"
            />

            <button
              type="submit"
              className="rounded-full bg-[#a56d6d] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#8d5858]"
            >
              Subscribe
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}

export default Home;