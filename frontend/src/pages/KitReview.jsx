import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKitStore } from '../store/kitStore';
import { useKit } from '../hooks/useKit';

/**
 * Kit Review & Confirmation
 * 
 * Purpose: Review, validate, and confirm the subscription kit
 * Features:
 * - Summary items reveal with staggered depth animation
 * - Price updates animate with rolling counters
 * - Confirmation action morphs UI state rather than navigating away
 * - Success state transitions entire layout smoothly
 * - Should feel like a transformation or completion moment
 */

const KitReview = () => {
    const navigate = useNavigate();
    const { items, deliveryFrequency, getTotalPrice } = useKitStore();
    const { confirmKit } = useKit();
    const [confirmed, setConfirmed] = React.useState(false);

    const handleConfirm = async () => {
        const success = await confirmKit();
        if (success) {
            setConfirmed(true);
        }
    };

    if (confirmed) {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="min-h-screen flex items-center justify-center"
            >
                <div className="text-center">
                    <motion.h1
                        className="text-6xl font-bold text-gradient mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ✓ Kit Confirmed!
                    </motion.h1>
                    <p className="text-2xl text-secondary">
                        Your subscription is ready
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="kit-review">
            {/* TODO: Implement review & confirmation with:
          - Staggered depth animations for summary items
          - Rolling counter for price updates
          - Morphing UI state transitions
          - Smooth success state transformation
      */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen"
            >
                <h1 className="text-6xl font-bold text-gradient">
                    Review Your Kit
                </h1>
                <p className="text-xl text-secondary mt-4">
                    {items.length} items • ${getTotalPrice().toFixed(2)}
                </p>
                {deliveryFrequency && (
                    <p className="text-lg text-muted mt-2">
                        Delivery: {deliveryFrequency.label}
                    </p>
                )}

                <motion.button
                    onClick={handleConfirm}
                    className="mt-8 px-8 py-4 bg-gradient-primary rounded-lg text-white font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Confirm Subscription
                </motion.button>
            </motion.div>
        </div>
    );
};

export default KitReview;
