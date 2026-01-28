import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { FiSave, FiImage, FiLayout, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';

const BrandSettings = () => {
    const { theme } = useTheme();
    const { token, user } = useAuth(); // Assuming 'token' is available in AuthContext
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isNewBrand, setIsNewBrand] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        story: '',
        logoUrl: '', // Maps to logo_url in DB
        bannerUrl: '', // Maps to banner_url in DB
        primaryColor: 'emerald', // Maps to theme_config.primary_color
        secondaryColor: 'stone-100' // Maps to theme_config.secondary_color
    });

    useEffect(() => {
        fetchBrandData();
    }, []);

    const fetchBrandData = async () => {
        try {
            setFetching(true);
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/brands/me`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const brand = response.data.data.brand;
            if (brand) {
                setFormData({
                    name: brand.name,
                    slug: brand.slug,
                    story: brand.story || '',
                    logoUrl: brand.logo_url || '',
                    bannerUrl: brand.banner_url || '',
                    primaryColor: brand.theme_config?.primary_color || 'emerald',
                    secondaryColor: brand.theme_config?.secondary_color || 'stone-100'
                });
                setIsNewBrand(false);
            } else {
                // Pre-fill some defaults for new brand
                setFormData(prev => ({
                    ...prev,
                    name: `${user?.name}'s Brand`,
                    slug: user?.name?.toLowerCase().replace(/\s+/g, '-') + '-brand'
                }));
                setIsNewBrand(true);
            }
        } catch (error) {
            console.error('Error fetching brand:', error);
            setMessage({ type: 'error', text: 'Failed to load brand data.' });
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const payload = {
            name: formData.name,
            slug: formData.slug,
            story: formData.story,
            logo_url: formData.logoUrl,
            banner_url: formData.bannerUrl,
            theme_config: {
                primary_color: formData.primaryColor,
                secondary_color: formData.secondaryColor
            },
            description: formData.story // using story as description for now
        };

        try {
            // If Fetching returned null, we POST, else we PUT
            const url = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/brands${isNewBrand ? '' : '/me'}`;
            const method = isNewBrand ? 'post' : 'put';

            await axios[method](url, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage({ type: 'success', text: isNewBrand ? 'Brand created successfully!' : 'Brand updated successfully!' });
            if (isNewBrand) setIsNewBrand(false);

        } catch (error) {
            console.error('Error saving brand:', error);
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to save changes.' });
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Brand Settings</h2>
                    <p className="text-gray-500">Manage your brand identity and theme.</p>
                </div>
                {isNewBrand && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">New Setup</span>
                )}
            </div>

            {message.text && (
                <div className={`p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Brand Identity Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <FiLayout className="mr-2" /> Brand Identity
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Brand Slug (URL)</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border bg-gray-50"
                                placeholder="my-brand-name"
                            />
                            <p className="text-xs text-gray-500 mt-1">This will be your store URL: brandkit.com/brand/{formData.slug}</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Brand Story</label>
                        <textarea
                            name="story"
                            rows={4}
                            value={formData.story}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                            placeholder="Tell your customers what makes your brand unique..."
                        />
                    </div>
                </div>

                {/* Visual Assets Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <FiImage className="mr-2" /> Visual Assets
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                            <input
                                type="text"
                                name="logoUrl"
                                value={formData.logoUrl}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                                placeholder="https://..."
                            />
                            {formData.logoUrl && (
                                <div className="mt-2">
                                    <span className="text-xs text-gray-500 block mb-1">Preview:</span>
                                    <img src={formData.logoUrl} alt="Logo" className="h-16 w-auto object-contain border rounded bg-white" onError={(e) => e.target.style.display = 'none'} />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Banner Image URL</label>
                            <input
                                type="text"
                                name="bannerUrl"
                                value={formData.bannerUrl}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                                placeholder="https://..."
                            />
                            {formData.bannerUrl && (
                                <div className="mt-2">
                                    <span className="text-xs text-gray-500 block mb-1">Preview:</span>
                                    <img src={formData.bannerUrl} alt="Banner" className="h-16 w-full object-cover border rounded" onError={(e) => e.target.style.display = 'none'} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Theme Config */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900">Theme Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                            <select
                                name="primaryColor"
                                value={formData.primaryColor}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                            >
                                <option value="emerald">Emerald (Default)</option>
                                <option value="blue">Ocean Blue</option>
                                <option value="amber">Earthy Amber</option>
                                <option value="rose">Rose Pink</option>
                                <option value="indigo">Deep Indigo</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        <FiSave className="mr-2 -ml-1 h-5 w-5" />
                        {loading ? 'Saving Changes...' : 'Save Brand Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BrandSettings;
