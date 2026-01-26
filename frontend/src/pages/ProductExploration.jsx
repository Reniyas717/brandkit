import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Image, Float, Environment, useCursor, MeshReflectorMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useProducts } from '../hooks/useProducts';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaShoppingBag, FaStar } from 'react-icons/fa';

const ProductCard = ({ product, position, rotation, index, setHovered, onSelect, isSelected }) => {
    const ref = useRef();
    const [hoveredSelf, setHoveredSelf] = useState(false);

    useFrame((state) => {
        // Continuous subtle float
        const t = state.clock.elapsedTime;
        ref.current.position.y = position[1] + Math.sin(t + index * 1000) * 0.1;

        // Gentle rotation when not hovered
        if (!hoveredSelf && !isSelected) {
            ref.current.rotation.y = rotation[1] + Math.sin(t * 0.5) * 0.05;
        }
    });

    const handlePointerOver = (e) => {
        e.stopPropagation();
        setHovered(true);
        setHoveredSelf(true);
    };

    const handlePointerOut = (e) => {
        e.stopPropagation();
        setHovered(false);
        setHoveredSelf(false);
    };

    return (
        <group
            ref={ref}
            position={position}
            rotation={rotation}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
            }}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            <Float floatIntensity={isSelected ? 0 : 1} rotationIntensity={0.5} speed={2}>
                {/* Card Background */}
                <mesh scale={hoveredSelf || isSelected ? 1.05 : 1}>
                    <boxGeometry args={[2, 3, 0.1]} />
                    <meshPhysicalMaterial
                        color={hoveredSelf || isSelected ? "#f0fdf4" : "#ffffff"} // emerald-50ish on hover
                        metalness={0.1}
                        roughness={0.2}
                        transparent
                        opacity={0.9}
                        transmission={0.5}
                        thickness={0.5}
                    />
                </mesh>

                {/* Product Image / Placeholder */}
                <group position={[0, 0.2, 0.06]}>
                    <Image
                        url={product.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb77c356?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} // Fallback image
                        scale={[1.6, 1.6]}
                        transparent
                        opacity={1}
                    />
                </group>

                {/* Text Info (Only visible in 3D when not selected, as overlay takes over) */}
                {!isSelected && (
                    <group position={[0, -1, 0.07]}>
                        <Text
                            position={[0, 0.1, 0]}
                            fontSize={0.18}
                            color="#064e3b" // emerald-900
                            anchorX="center"
                            anchorY="middle"
                            font="https://fonts.gstatic.com/s/outfit/v6/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC0C4f0.woff2" // Outfit
                            maxWidth={1.8}
                        >
                            {product.name}
                        </Text>
                        <Text
                            position={[0, -0.2, 0]}
                            fontSize={0.14}
                            color="#065f46" // emerald-800
                            anchorX="center"
                            anchorY="middle"
                            font="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2" // Poppins
                        >
                            ${product.price}
                        </Text>
                    </group>
                )}
            </Float>
        </group>
    );
};

const Carousel = ({ products, onSelect, selectedProduct }) => {
    const group = useRef();
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    useFrame((state, delta) => {
        // Rotate carousel if not interacting
        if (!hovered && !selectedProduct) {
            group.current.rotation.y += delta * 0.1;
        }
        // Smoothly rotate to stop or focus could be added here
    });

    const radius = 7;
    const count = products.length;

    return (
        <group ref={group} position={[0, -0.5, 0]}>
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
                        onSelect={onSelect}
                        isSelected={selectedProduct?.id === product.id}
                    />
                );
            })}
        </group>
    );
};

const ProductDetailsOverlay = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-white/95 backdrop-blur-md shadow-2xl z-50 p-8 flex flex-col border-l border-emerald-100/50"
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-emerald-50 text-emerald-800 transition-colors"
            >
                <FaTimes size={20} />
            </button>

            <div className="mt-12 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
                    Sustainable Choice
                </span>

                <h2 className="text-4xl font-heading font-bold text-emerald-950 mb-2">
                    {product.name}
                </h2>

                <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-yellow-400 text-sm">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                    <span className="text-sm text-gray-500 font-body">(42 reviews)</span>
                </div>

                <p className="text-3xl font-heading font-bold text-earth-700 mb-8">
                    ${product.price}
                </p>

                <div className="space-y-6 mb-8">
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Description</h3>
                        <p className="text-gray-600 font-body leading-relaxed">
                            {product.description || "Crafted with care for both you and the planet. This product represents our commitment to sustainable luxury and timeless design."}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Materials</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Organic Cotton', 'Recycled Polyester', 'Natural Dye'].map((mat) => (
                                <span key={mat} className="px-3 py-1 border border-emerald-200 rounded-lg text-xs text-emerald-800 bg-emerald-50/50">
                                    {mat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-emerald-100">
                <button className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-900/20">
                    <FaShoppingBag />
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
};

const ProductExploration = () => {
    // Dummy Data
    const dummyProducts = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        name: `Eco Artifact ${i + 1}`,
        price: (Math.random() * 100 + 50).toFixed(2),
        description: "Experience the harmony of nature and design with this sustainably crafted masterpiece.",
        image: `https://picsum.photos/seed/${i + 100}/600/800`
    }));

    const { products: realProducts, loading } = useProducts();
    // Prefer real products, fallback to dummy
    const displayProducts = (realProducts && realProducts.length > 0) ? realProducts : dummyProducts;

    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className="h-screen w-full bg-earth-900 overflow-hidden relative font-sans">
            {/* Background Gradient Environment */}
            <div className="absolute inset-0 bg-gradient-to-b from-earth-900 to-emerald-950 z-0" />

            {/* Header Overlay */}
            <div className="absolute top-0 left-0 p-8 z-10 w-full flex justify-between items-center pointer-events-none">
                <div>
                    <h1 className="text-4xl md:text-5xl font-heading font-black text-emerald-50 flex items-center gap-3">
                        Exploration <span className="text-emerald-400 text-lg md:text-xl font-serif italic font-normal">Series</span>
                    </h1>
                    <p className="text-emerald-200/60 mt-2 font-body ml-1">
                        Drag to rotate • Click to explore details
                    </p>
                </div>

                {/* Brand Logo or similar could go right */}
            </div>

            <Canvas dpr={[1, 2]} camera={{ position: [0, 2, 10], fov: 50 }}>
                {/* 3D Scene */}
                <fog attach="fog" args={['#052e16', 5, 25]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} color="#d1fae5" />
                <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ecfccb" />

                <Environment preset="forest" blur={0.8} />

                <group position={[0, -1, 0]}>
                    <Carousel
                        products={displayProducts}
                        onSelect={setSelectedProduct}
                        selectedProduct={selectedProduct}
                    />

                    {/* Reflective Floor */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                        <planeGeometry args={[50, 50]} />
                        <MeshReflectorMaterial
                            blur={[300, 100]}
                            resolution={2048}
                            mixBlur={1}
                            mixStrength={60} // Strength of the reflection
                            roughness={1}
                            depthScale={1.2}
                            minDepthThreshold={0.4}
                            maxDepthThreshold={1.4}
                            color="#064e3b" // Dark emerald floor
                            metalness={0.5}
                        />
                    </mesh>
                </group>
            </Canvas>

            {/* Product Details UI Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <>
                        {/* Backdrop for click outside */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40 cursor-pointer"
                        />
                        <ProductDetailsOverlay
                            product={selectedProduct}
                            onClose={() => setSelectedProduct(null)}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductExploration;
