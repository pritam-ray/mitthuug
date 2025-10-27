import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { trackSignup } from '../lib/analytics';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'user' | 'admin';
  phone: string | null;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ needsVerification: boolean }>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isGuest: boolean;
  isUser: boolean;
  isAdmin: boolean;
  resendVerification: (email: string) => Promise<void>;
  updateProfile: (updates: { name?: string; phone?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (async (event, session) => {
        console.log('Auth state changed:', event);

        setUser(session?.user ?? null);

        if (session?.user) {
          if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
            await fetchUserProfile(session.user.id);
          }
        } else {
          setUserProfile(null);
          setLoading(false);
        }
      })
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setUserProfile(data as UserProfile);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    console.log('SignUp: Starting signup process for', email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          name: name,
        }
      }
    });

    if (error) {
      console.error('SignUp: Supabase auth error:', error);
      throw error;
    }

    console.log('SignUp: Auth signup successful, data:', data);

    if (data.user) {
      // The database trigger should automatically create the user profile
      // But we'll try to insert it manually as a fallback
      console.log('SignUp: Attempting to insert user profile (trigger should handle this)');
      
      const { error: insertError } = await supabase.from('users').insert({
        id: data.user.id,
        name,
        email,
        role: 'user',
      });

      if (insertError) {
        // Check if it's a duplicate key error (trigger already created it)
        if (insertError.code === '23505' || insertError.message?.includes('duplicate')) {
          console.log('SignUp: User profile already created by trigger');
        } else {
          console.error('SignUp: Error inserting user profile:', insertError);
          // Don't throw - the auth account was created successfully
        }
      } else {
        console.log('SignUp: User profile inserted successfully');
      }

      trackSignup();

      return {
        needsVerification: data.user.identities?.length === 0 || !data.session
      };
    }

    return { needsVerification: true };
  };

  const signIn = async (email: string, password: string) => {
    console.log('SignIn: Starting login process for', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('SignIn: Supabase auth error:', error);
      if (error.message.includes('Email not confirmed')) {
        throw new Error('Please verify your email address before signing in. Check your inbox for the verification link.');
      }
      throw error;
    }

    console.log('SignIn: Login successful, data:', data);

    if (data.user && !data.user.email_confirmed_at) {
      console.warn('SignIn: Email not confirmed, signing out');
      await supabase.auth.signOut();
      throw new Error('Please verify your email address before signing in. Check your inbox for the verification link.');
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUserProfile(null);
  };

  const resendVerification = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (error) throw error;
  };

  const updateProfile = async (updates: { name?: string; phone?: string }) => {
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id);

    if (error) throw error;

    await fetchUserProfile(user.id);
  };

  const isAuthenticated = !!user && !!userProfile;
  const isGuest = !isAuthenticated;
  const isUser = userProfile?.role === 'user';
  const isAdmin = userProfile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signUp,
        signIn,
        signOut,
        isAuthenticated,
        isGuest,
        isUser,
        isAdmin,
        resendVerification,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
