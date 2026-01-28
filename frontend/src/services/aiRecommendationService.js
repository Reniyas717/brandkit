import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: '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',
    dangerouslyAllowBrowser: true // Note: In production, use backend proxy
});

// Map of product names for matching AI responses (handles partial matches)
const productNamePatterns = [
    { pattern: /tote/i, fallback: 'Tote' },
    { pattern: /utensil|bamboo.*set/i, fallback: 'Utensil' },
    { pattern: /notebook/i, fallback: 'Notebook' },
    { pattern: /t-shirt|tee/i, fallback: 'Tee' },
    { pattern: /water.*bottle|bottle/i, fallback: 'Bottle' },
    { pattern: /backpack/i, fallback: 'Backpack' },
    { pattern: /lunch.*box|tiffin/i, fallback: 'Lunch' },
    { pattern: /pen.*set|pen/i, fallback: 'Pen' },
    { pattern: /hoodie/i, fallback: 'Hoodie' },
    { pattern: /mug|coffee/i, fallback: 'Mug' },
    { pattern: /shopping.*bag|jute/i, fallback: 'Bag' },
    { pattern: /cutting.*board/i, fallback: 'Cutting' },
    { pattern: /pencil/i, fallback: 'Pencil' },
    { pattern: /sock/i, fallback: 'Sock' },
    { pattern: /glass/i, fallback: 'Glass' },
];

export const aiRecommendationService = {
    /**
     * Get personalized kit recommendations based on user preferences
     * @param {Object} userPreferences - User preferences
     * @param {Array} availableProducts - Products from the database to match against
     */
    getKitRecommendations: async (userPreferences = {}, availableProducts = []) => {
        try {
            const { lifestyle, budget, priorities } = userPreferences;

            // Build product list from available products
            const productList = availableProducts.length > 0
                ? availableProducts.map((p, i) => `${i + 1}. ${p.name} (₹${p.price}) - ${p.category}`).join('\n')
                : `1. Organic Hemp Tote (₹2499) - Bags
2. Bamboo Utensil Set (₹1299) - Kitchen
3. Recycled Paper Notebook (₹599) - Stationery
4. Organic Cotton Tee (₹1299) - Apparel
5. Insulated Steel Bottle (₹1999) - Drinkware
6. Ocean Plastic Backpack (₹4999) - Bags
7. Wheat Straw Containers (₹899) - Kitchen
8. Stone Paper Notebook (₹799) - Stationery
9. Hemp Blend Hoodie (₹2999) - Apparel
10. Copper Water Bottle (₹1799) - Drinkware`;

            const prompt = `You are an eco-friendly product recommendation expert. Based on the following user preferences, recommend 3-5 sustainable products for their eco kit:

Lifestyle: ${lifestyle || 'general sustainable living'}
Budget: ${budget || 'moderate'}
Priorities: ${priorities || 'reducing plastic waste, carbon footprint'}

Available products:
${productList}

Respond with ONLY a JSON array of the product numbers (1-based index) in order of recommendation. Example: [5, 2, 1]`;

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful eco-friendly product recommendation assistant. Always respond with valid JSON only.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.7,
                max_tokens: 100
            });

            const response = completion.choices[0]?.message?.content || '[]';
            const cleanResponse = response.replace(/```json\n?|\n?```/g, '').trim();
            const recommendedIndices = JSON.parse(cleanResponse);

            // If we have available products, use indices to get actual product IDs
            if (availableProducts.length > 0) {
                const recommendedIds = recommendedIndices
                    .map(idx => availableProducts[idx - 1]?.id)
                    .filter(Boolean);
                
                return {
                    success: true,
                    recommendations: recommendedIds,
                    reasoning: 'AI-powered recommendations based on your preferences'
                };
            }

            // Fallback: return indices for legacy matching
            return {
                success: true,
                recommendations: recommendedIndices,
                reasoning: 'AI-powered recommendations based on your preferences'
            };
        } catch (error) {
            console.error('AI Recommendation Error:', error);
            // Fallback: return first 3 products if available
            return {
                success: false,
                recommendations: [],
                reasoning: 'Default eco-starter kit recommendations'
            };
        }
    },

    /**
     * Get smart kit suggestions based on current cart
     */
    getSuggestedProducts: async (currentItems = []) => {
        try {
            const itemNames = currentItems.map(item => item.name).join(', ');

            const prompt = `User currently has these items in their eco kit: ${itemNames || 'empty cart'}

Based on what they have, suggest 2-3 complementary sustainable products from this list:
1. Organic Tote Bag (₹3999)
2. Bamboo Utensil Set (₹1999)
3. Recycled Notebook (₹1519)
4. Cotton T-Shirt (₹3199)
5. Reusable Water Bottle (₹2799)
6. Hemp Backpack (₹7199)
7. Stainless Steel Lunch Box (₹2499)
8. Bamboo Pen Set (₹799)
9. Hemp Hoodie (₹4999)
10. Bamboo Coffee Mug (₹1299)
11. Jute Shopping Bag (₹1999)
12. Bamboo Cutting Board (₹1599)
13. Plantable Pencils (₹599)
14. Bamboo Socks (₹899)
15. Glass Water Bottle (₹1999)

Respond with ONLY a JSON array of product IDs. Example: [3, 4]`;

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful product recommendation assistant. Always respond with valid JSON only.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.5,
                max_tokens: 50
            });

            const response = completion.choices[0]?.message?.content || '[]';
            const suggestedIds = JSON.parse(response.trim());

            return {
                success: true,
                suggestions: suggestedIds
            };
        } catch (error) {
            console.error('AI Suggestion Error:', error);
            return {
                success: false,
                suggestions: []
            };
        }
    },

    /**
     * Generate personalized impact message
     */
    getImpactMessage: async (kitItems) => {
        try {
            const itemCount = kitItems.length;
            const totalPrice = kitItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

            const prompt = `Generate a short, inspiring message (max 2 sentences) about the environmental impact of choosing ${itemCount} eco-friendly products worth $${totalPrice.toFixed(2)}. Focus on positive change and motivation.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.8,
                max_tokens: 100
            });

            return completion.choices[0]?.message?.content || 'Every sustainable choice makes a difference!';
        } catch (error) {
            console.error('AI Impact Message Error:', error);
            return 'Your eco-conscious choices are creating positive change for our planet!';
        }
    }
};
