"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface UserPreferences {
  favorites: string[];
  homeLocation?: { lat: number; lng: number; address: string };
  workLocation?: { lat: number; lng: number; address: string };
  notificationsEnabled: boolean;
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  toggleFavorite: (routeId: string) => void;
  setHomeLocation: (location: { lat: number; lng: number; address: string }) => void;
  setWorkLocation: (location: { lat: number; lng: number; address: string }) => void;
  toggleNotifications: () => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>({
    favorites: [],
    notificationsEnabled: false,
  });

  // Load preferences from localStorage (mocking backend persistence for now)
  useEffect(() => {
    if (user) {
      const storedPrefs = localStorage.getItem(`prefs_${user.uid}`);
      if (storedPrefs) {
        const parsedPrefs = JSON.parse(storedPrefs);
        // Simple check to avoid unnecessary re-renders if deep comparison is too expensive
        if (JSON.stringify(parsedPrefs) !== JSON.stringify(preferences)) {
            setPreferences(parsedPrefs);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Save preferences to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`prefs_${user.uid}`, JSON.stringify(preferences));
    }
  }, [preferences, user]);

  const toggleFavorite = (routeId: string) => {
    setPreferences(prev => {
      const newFavorites = prev.favorites.includes(routeId)
        ? prev.favorites.filter(id => id !== routeId)
        : [...prev.favorites, routeId];
      return { ...prev, favorites: newFavorites };
    });
  };

  const setHomeLocation = (location: { lat: number; lng: number; address: string }) => {
    setPreferences(prev => ({ ...prev, homeLocation: location }));
  };

  const setWorkLocation = (location: { lat: number; lng: number; address: string }) => {
    setPreferences(prev => ({ ...prev, workLocation: location }));
  };

  const toggleNotifications = () => {
    setPreferences(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }));
  };

  return (
    <UserPreferencesContext.Provider value={{
      preferences,
      toggleFavorite,
      setHomeLocation,
      setWorkLocation,
      toggleNotifications
    }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
