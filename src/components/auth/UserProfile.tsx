import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Phone, LogOut, Edit2, Save, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { userProfile, signOut, updateProfile, isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    phone: userProfile?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    try {
      await updateProfile(formData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!isOpen || !userProfile) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" style={{ zIndex: 999998 }} onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 999999 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-brand-sand">
            <h2 className="text-2xl font-serif font-bold text-brand-jaggery">My Profile</h2>
            <button onClick={onClose} className="p-2 hover:bg-brand-cream rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-gold to-brand-jaggery rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-brand-jaggery">{userProfile.name}</h3>
                <p className="text-brand-dark/60 text-sm">{userProfile.email}</p>
                {isAdmin && (
                  <div className="mt-2 inline-flex items-center space-x-1 bg-brand-gold/20 text-brand-jaggery px-3 py-1 rounded-full text-xs font-semibold">
                    <Shield className="w-3 h-3" />
                    <span>Admin</span>
                  </div>
                )}
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-2xl ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-jaggery mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 border-2 border-brand-sand rounded-2xl focus:outline-none focus:border-brand-gold transition-colors disabled:bg-brand-cream/50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-jaggery mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40" />
                  <input
                    type="email"
                    value={userProfile.email}
                    disabled
                    className="w-full pl-12 pr-4 py-3 border-2 border-brand-sand rounded-2xl bg-brand-cream/50 cursor-not-allowed text-brand-dark/60"
                  />
                </div>
                <p className="text-xs text-brand-dark/60 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-jaggery mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="+91 98765 43210"
                    className="w-full pl-12 pr-4 py-3 border-2 border-brand-sand rounded-2xl focus:outline-none focus:border-brand-gold transition-colors disabled:bg-brand-cream/50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-brand-jaggery text-white rounded-full font-semibold hover:bg-brand-gold transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: userProfile.name, phone: userProfile.phone || '' });
                    }}
                    className="px-6 py-3 border-2 border-brand-sand text-brand-jaggery rounded-full font-semibold hover:bg-brand-cream transition-all"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-6 py-3 bg-brand-jaggery text-white rounded-full font-semibold hover:bg-brand-gold transition-all flex items-center justify-center space-x-2"
                >
                  <Edit2 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            <button
              onClick={handleSignOut}
              className="w-full px-6 py-3 border-2 border-red-200 text-red-600 rounded-full font-semibold hover:bg-red-50 transition-all flex items-center justify-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>

            <div className="bg-brand-cream p-4 rounded-2xl text-sm text-brand-dark/70">
              <p className="font-semibold mb-1">Account Type: <span className="text-brand-gold">{userProfile.role.toUpperCase()}</span></p>
              <p className="text-xs">Member since {new Date(userProfile.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
