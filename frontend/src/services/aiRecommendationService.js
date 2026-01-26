import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: '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',
    dangerouslyAllowBrowser: true // Note: In production, use backend proxy
});

export const aiRecommendationService = {
    /**
     * Get personalized kit recommendations based on user preferences
     */
    getKitRecommendations: async (userPreferences = {}) => {
        try {
            const { lifestyle, budget, priorities } = userPreferences;

            const prompt = `You are an eco-friendly product recommendation expert. Based on the following user preferences, recommend 3-5 sustainable products for their eco kit:

Lifestyle: ${lifestyle || 'general sustainable living'}
Budget: ${budget || 'moderate'}
Priorities: ${priorities || 'reducing plastic waste, carbon footprint'}

Available products:
1. Organic Tote Bag (₹3999) - Bags
2. Bamboo Utensil Set (₹1999) - Kitchen
3. Recycled Notebook (₹1519) - Stationery
4. Cotton T-Shirt (₹3199) - Apparel
5. Reusable Water Bottle (₹2799) - Drinkware
6. Hemp Backpack (₹7199) - Bags
7. Stainless Steel Lunch Box (₹2499) - Kitchen
8. Bamboo Pen Set (₹799) - Stationery
9. Hemp Hoodie (₹4999) - Apparel
10. Bamboo Coffee Mug (₹1299) - Drinkware
11. Jute Shopping Bag (₹1999) - Bags
12. Bamboo Cutting Board (₹1599) - Kitchen
13. Plantable Pencils (₹599) - Stationery
14. Bamboo Socks (₹899) - Apparel
15. Glass Water Bottle (₹1999) - Drinkware

Respond with ONLY a JSON array of product IDs (1-15) in order of recommendation. Example: [5, 2, 1]`;

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
            const recommendedIds = JSON.parse(response.trim());

            return {
                success: true,
                recommendations: recommendedIds,
                reasoning: 'AI-powered recommendations based on your preferences'
            };
        } catch (error) {
            console.error('AI Recommendation Error:', error);
            // Fallback recommendations (IDs from local data)
            return {
                success: false,
                recommendations: [5, 2, 1],
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
