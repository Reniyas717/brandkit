import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Image, Float, Stats, Environment, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { useProducts } from '../hooks/useProducts';
import { motion } from 'framer-motion';

const GOLDENRATIO = 1.61803398875;

const ProductCard = ({ product, position, rotation, index, setHovered }) => {
    const ref = useRef();

    useFrame((state, delta) => {
        // Subtle float animation
        ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index * 1000) * 0.1;
    });

    return (
        <group
            ref={ref}
            position={position}
            rotation={rotation}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Float floatIntensity={1} rotationIntensity={0.5} speed={2}>
                <mesh>
                    <boxGeometry args={[1.8, 2.4, 0.1]} />
                    <meshStandardMaterial
                        color="#1e1e2e"
                        metalness={0.8}
                        roughness={0.2}
                        envMapIntensity={1}
                    />
                </mesh>

                {/* Product Image Placeholder */}
                <mesh position={[0, 0.2, 0.06]}>
                    <planeGeometry args={[1.5, 1.5]} />
                    <meshBasicMaterial color={new THREE.Color().setHSL(index * 0.1, 0.5, 0.5)} />
                </mesh>

                <Text
                    position={[0, -1, 0.06]}
                    fontSize={0.15}
                    color="white"
                    anchorX="center"
                    maxWidth={1.5}
                >
                    {product.name}
                </Text>

                <Text
                    position={[0, -1.3, 0.06]}
                    fontSize={0.12}
                    color="#a1a1aa"
                    anchorX="center"
                >
                    ${product.price}
                </Text>
            </Float>
        </group>
    );
};

const Carousel = ({ products }) => {
    const group = useRef();
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    useFrame((state) => {
        // Rotate the entire carousel slowly
        if (!hovered) {
            group.current.rotation.y += 0.001;
        }
    });

    // Arrange products in a circle
    const radius = 6;
    const count = products.length;

    return (
        <group ref={group} position={[0, -0.5, -2]}>
            {products.map((product, i) => {
                const angle = (i / count) * Math.PI * 2;
                const x = Math.sin(angle) * radius;
                const z = Math.cos(angle) * radius;

                return (
                    <ProductCard
                        key={product.id || i}
                        index={i}
                        product={product}
                        position={[x, 0, z]}
                        rotation={[0, angle, 0]}
                        setHovered={setHovered}
                    />
                );
            })}
        </group>
    );
};

const ProductExploration = () => {
    // Use dummy products if backend is not ready
    const dummyProducts = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        name: `Product ${i + 1}`,
        price: (Math.random() * 100).toFixed(2),
    }));

    const { products, loading, error } = useProducts();
    const displayProducts = products && products.length > 0 ? products : dummyProducts;

    return (
        <div className="h-screen w-full bg-[#0a0a0f] overflow-hidden relative">
            <div className="absolute top-0 left-0 p-8 z-10 w-full flex justify-between items-center pointer-events-none">
                <h1 className="text-4xl font-bold text-gradient">Collection</h1>
                <p className="text-gray-400">Drag to rotate • Hover to pause</p>
            </div>

            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 60 }}>
                <fog attach="fog" args={['#0a0a0f', 5, 20]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={1} />

                <Environment preset="city" />

                <Carousel products={displayProducts} />

                {/* Floor Reflection */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial
                        color="#0a0a0f"
                        roughness={0}
                        metalness={0.8}
                    />
                </mesh>
            </Canvas>
        </div>
    );
};

export default ProductExploration;
