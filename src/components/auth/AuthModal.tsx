import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'verify'>(initialMode);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');

  const { signIn, signUp, resendVerification } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }

        const result = await signUp(formData.email, formData.password, formData.name);

        if (result.needsVerification) {
          setVerificationEmail(formData.email);
          setMode('verify');
          setSuccess('Account created! Please check your email to verify your account.');
        } else {
          setSuccess('Account created successfully!');
          setTimeout(() => onClose(), 1500);
        }
      } else if (mode === 'signin') {
        await signIn(formData.email, formData.password);
        setSuccess('Signed in successfully!');
        setTimeout(() => onClose(), 1000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await resendVerification(verificationEmail);
      setSuccess('Verification email sent! Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
    setSuccess('');
  };

  const switchMode = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-6 border-b border-brand-sand">
            <h2 className="text-2xl font-serif font-bold text-brand-jaggery">
              {mode === 'verify' ? 'Verify Your Email' : mode === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-brand-cream rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {mode === 'verify' ? (
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/20 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-jaggery mb-2">Check Your Email</h3>
                  <p className="text-brand-dark/70">
                    We've sent a verification link to <span className="font-semibold">{verificationEmail}</span>
                  </p>
                  <p className="text-brand-dark/70 mt-2 text-sm">
                    Please click the link in the email to verify your account.
                  </p>
                </div>

                <div className="bg-brand-cream p-4 rounded-2xl text-sm text-brand-dark/70">
                  <p className="mb-2">Didn't receive the email?</p>
                  <ul className="list-disc list-inside space-y-1 text-left">
                    <li>Check your spam/junk folder</li>
                    <li>Make sure you entered the correct email</li>
                    <li>Wait a few minutes for the email to arrive</li>
                  </ul>
                </div>

                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-green-700 text-sm">{success}</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-brand-jaggery text-white rounded-full font-semibold hover:bg-brand-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Resend Verification Email</span>
                  )}
                </button>

                <button
                  onClick={() => switchMode('signin')}
                  className="text-brand-gold hover:text-brand-jaggery font-medium transition-colors"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-sm font-semibold text-brand-jaggery mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border-2 border-brand-sand rounded-2xl focus:outline-none focus:border-brand-gold transition-colors"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-brand-jaggery mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-brand-sand rounded-2xl focus:outline-none focus:border-brand-gold transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-jaggery mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40" />
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-brand-sand rounded-2xl focus:outline-none focus:border-brand-gold transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                    {mode === 'signup' && (
                      <p className="text-xs text-brand-dark/60 mt-1">Must be at least 6 characters</p>
                    )}
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label className="block text-sm font-semibold text-brand-jaggery mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40" />
                        <input
                          type="password"
                          required
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border-2 border-brand-sand rounded-2xl focus:outline-none focus:border-brand-gold transition-colors"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-green-700 text-sm">{success}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-brand-jaggery text-white rounded-full font-semibold text-lg hover:bg-brand-gold transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>{mode === 'signup' ? 'Creating Account...' : 'Signing In...'}</span>
                      </>
                    ) : (
                      <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-brand-dark/60">
                    {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                      onClick={() => switchMode(mode === 'signup' ? 'signin' : 'signup')}
                      className="text-brand-gold hover:text-brand-jaggery font-semibold transition-colors"
                    >
                      {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>

                {mode === 'signup' && (
                  <div className="mt-6 bg-brand-cream p-4 rounded-2xl text-sm text-brand-dark/70">
                    <p className="font-semibold mb-2">By creating an account, you'll be able to:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Place orders and track them</li>
                      <li>Write product reviews</li>
                      <li>Save your favorite products</li>
                      <li>Get exclusive offers and updates</li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};
