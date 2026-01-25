import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKitStore } from '../store/kitStore';
import { useKit } from '../hooks/useKit';
import { useBrand } from '../hooks/useBrand';
import { CardContainer, CardBody, CardItem } from '../components/ui/3d-card';
import { Button } from '../components/ui/button';
import Breadcrumbs from '../components/Breadcrumbs';
import {
    FaShoppingCart, FaPlus, FaMinus, FaTrash, FaArrowRight, FaTimes,
    FaTrophy, FaStar, FaFire, FaCheck, FaBolt
} from 'react-icons/fa';

// Confetti/Particle Component
const Confetti = ({ x, y }) => {
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
    const particles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: (i * 360) / 12,
        distance: 50 + Math.random() * 50
    }));

    return (
        <div className="fixed pointer-events-none z-50" style={{ left: x, top: y }}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    initial={{
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 1,
                        rotate: 0
                    }}
                    animate={{
                        x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
                        y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
                        scale: 0,
                        opacity: 0,
                        rotate: 360
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ backgroundColor: particle.color }}
                />
            ))}
        </div>
    );
};

// Achievement Badge Component
const AchievementBadge = ({ title, icon: Icon, unlocked }) => (
    <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: unlocked ? 1 : 0.8, rotate: 0 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${unlocked
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-400'
            }`}
    >
        <Icon className="w-4 h-4" />
        <span className="text-sm font-bold">{title}</span>
    </motion.div>
);

// Draggable Product Card
const DraggableProduct = ({ product, onAddToKit, isInKit, quantity, isDragging, setIsDragging }) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiPos, setConfettiPos] = useState({ x: 0, y: 0 });

    const handleQuickAdd = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setConfettiPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 600);
        onAddToKit(product);
    };

    return (
        <>
            <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                onDragStart={() => setIsDragging(product.id)}
                onDragEnd={(e, info) => {
                    setIsDragging(null);
                    // Check if dropped in kit zone (right side of screen)
                    if (info.point.x > window.innerWidth - 400) {
                        const rect = e.target.getBoundingClientRect();
                        setConfettiPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 600);
                        onAddToKit(product);
                    }
                }}
                whileDrag={{ scale: 0.95, rotate: 5, zIndex: 50 }}
                className="cursor-grab active:cursor-grabbing"
            >
                <CardContainer className="inter-var w-full h-full" containerClassName="py-0">
                    <CardBody className="bg-white relative group/card border-black/[0.05] w-full h-full rounded-[2rem] p-6 border hover:border-emerald-500/20 transition-all duration-300 hover:shadow-xl flex flex-col">
                        <CardItem translateZ="30" className="w-full aspect-square mb-4 overflow-hidden rounded-2xl bg-gray-50 relative">
                            <img
                                src={product.image}
                                className="h-full w-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                                alt={product.name}
                            />
                            {isInKit && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                                >
                                    <FaCheck className="w-3 h-3" />
                                    {quantity}
                                </motion.div>
                            )}
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700">
                                Drag me!
                            </div>
                        </CardItem>

                        <div className="flex-grow">
                            <CardItem
                                translateZ="40"
                                className="text-lg font-bold text-gray-900 mb-2"
                            >
                                {product.name}
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="30"
                                className="text-gray-600 text-sm mb-4 line-clamp-2"
                            >
                                {product.description}
                            </CardItem>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <CardItem
                                    translateZ="20"
                                    className="text-2xl font-black text-emerald-600"
                                >
                                    ${product.price}
                                </CardItem>
                                <span className="text-xs text-gray-500">per delivery</span>
                            </div>

                            <CardItem translateZ="40">
                                <Button
                                    onClick={handleQuickAdd}
                                    className="w-full bg-gray-900 hover:bg-emerald-600 transition-colors group"
                                >
                                    <FaPlus className="mr-2 group-hover:rotate-90 transition-transform" />
                                    {isInKit ? 'Add More' : 'Quick Add'}
                                </Button>
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            </motion.div>
            {showConfetti && <Confetti x={confettiPos.x} y={confettiPos.y} />}
        </>
    );
};

const KitBuilder = () => {
    const navigate = useNavigate();
    const { brand } = useBrand('ecolux-essentials');
    const { items, getTotalPrice, getItemCount, isLoading } = useKitStore();
    const { addProduct, updateQuantity, removeProduct } = useKit();
    const [showPanel, setShowPanel] = useState(false);
    const [isDragging, setIsDragging] = useState(null);
    const [achievements, setAchievements] = useState({
        starter: false,
        builder: false,
        champion: false
    });

    const products = [
        { id: 1, name: 'Organic Tote Bag', price: 49.99, description: 'Handwoven hemp tote with reinforced straps', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80' },
        { id: 2, name: 'Bamboo Utensil Set', price: 24.99, description: 'Complete set with carrying case', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80' },
        { id: 3, name: 'Recycled Notebook', price: 18.99, description: '100% post-consumer recycled paper', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80' },
        { id: 4, name: 'Cotton T-Shirt', price: 39.99, description: 'Organic cotton with natural dyes', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
        { id: 5, name: 'Reusable Water Bottle', price: 34.99, description: 'Stainless steel, BPA-free', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80' },
        { id: 6, name: 'Hemp Backpack', price: 89.99, description: 'Durable hemp canvas with laptop sleeve', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
    ];

    // Achievement tracking
    useEffect(() => {
        const count = getItemCount();
        setAchievements({
            starter: count >= 1,
            builder: count >= 3,
            champion: count >= 5
        });
    }, [items, getItemCount]);

    const handleAddToKit = async (product) => {
        const existingItem = items.find(item => item.product_id === product.id);
        if (existingItem) {
            await updateQuantity(product.id, existingItem.quantity + 1);
        } else {
            await addProduct(product.id, 1);
        }
        setShowPanel(true);
    };

    const getItemQuantity = (productId) => {
        const item = items.find(i => i.product_id === productId);
        return item ? item.quantity : 0;
    };

    const progress = Math.min((getItemCount() / 5) * 100, 100);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header with Breadcrumbs */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="container mx-auto px-8 py-4">
                    <Breadcrumbs />
                </div>
                <div className="container mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900">Build Your Kit</h1>
                            <p className="text-gray-600 mt-1">Drag products or click Quick Add</p>
                        </div>
                        <Button
                            onClick={() => setShowPanel(!showPanel)}
                            className="relative"
                        >
                            <FaShoppingCart className="mr-2" />
                            Kit ({getItemCount()})
                            {getItemCount() > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center font-bold"
                                >
                                    {getItemCount()}
                                </motion.span>
                            )}
                        </Button>
                    </div>

                    {/* Progress Bar & Achievements */}
                    <div className="mt-6 space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-gray-700">Building Progress</span>
                                <span className="text-sm text-gray-600">{getItemCount()} / 5 items</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <AchievementBadge title="Eco Starter" icon={FaStar} unlocked={achievements.starter} />
                            <AchievementBadge title="Kit Builder" icon={FaFire} unlocked={achievements.builder} />
                            <AchievementBadge title="Sustainability Champion" icon={FaTrophy} unlocked={achievements.champion} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Drag Zone Indicator */}
            <AnimatePresence>
                {isDragging && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed right-0 top-1/2 -translate-y-1/2 w-80 h-96 border-4 border-dashed border-emerald-500 bg-emerald-50/50 backdrop-blur-sm rounded-l-3xl flex items-center justify-center z-30"
                    >
                        <div className="text-center">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <FaBolt className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                            </motion.div>
                            <p className="text-2xl font-black text-emerald-900">Drop Here!</p>
                            <p className="text-sm text-emerald-700 mt-2">Add to your kit</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Product Grid */}
            <div className="container mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, idx) => {
                        const quantity = getItemQuantity(product.id);
                        const isInKit = quantity > 0;

                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isDragging && isDragging !== product.id ? 0.3 : 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <DraggableProduct
                                    product={product}
                                    onAddToKit={handleAddToKit}
                                    isInKit={isInKit}
                                    quantity={quantity}
                                    isDragging={isDragging}
                                    setIsDragging={setIsDragging}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Floating Kit Panel */}
            <AnimatePresence>
                {showPanel && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPanel(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                        >
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900">Your Kit</h2>
                                        <p className="text-sm text-gray-600 mt-1">{getItemCount()} items</p>
                                    </div>
                                    <button
                                        onClick={() => setShowPanel(false)}
                                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-grow overflow-y-auto p-6">
                                {items.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FaShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">Your kit is empty</p>
                                        <p className="text-sm text-gray-400 mt-1">Drag products or use Quick Add</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((item) => {
                                            const product = products.find(p => p.id === item.product_id);
                                            if (!product) return null;

                                            return (
                                                <motion.div
                                                    key={item.product_id}
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="bg-gray-50 rounded-2xl p-4"
                                                >
                                                    <div className="flex gap-4">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-20 h-20 rounded-xl object-cover"
                                                        />
                                                        <div className="flex-grow">
                                                            <h3 className="font-bold text-gray-900">{product.name}</h3>
                                                            <p className="text-sm text-emerald-600 font-bold mt-1">
                                                                ${product.price}
                                                            </p>

                                                            <div className="flex items-center gap-2 mt-3">
                                                                <button
                                                                    onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                                                                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors"
                                                                    disabled={isLoading}
                                                                >
                                                                    <FaMinus className="w-3 h-3" />
                                                                </button>
                                                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors"
                                                                    disabled={isLoading}
                                                                >
                                                                    <FaPlus className="w-3 h-3" />
                                                                </button>
                                                                <button
                                                                    onClick={() => removeProduct(item.product_id)}
                                                                    className="ml-auto w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                                                                    disabled={isLoading}
                                                                >
                                                                    <FaTrash className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {items.length > 0 && (
                                <div className="p-6 border-t border-gray-100 bg-gray-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-600">Total per delivery</span>
                                        <span className="text-3xl font-black text-gray-900">
                                            ${getTotalPrice().toFixed(2)}
                                        </span>
                                    </div>
                                    <Button
                                        onClick={() => navigate('/review')}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                                        size="lg"
                                    >
                                        Review Kit <FaArrowRight className="ml-2" />
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KitBuilder;
