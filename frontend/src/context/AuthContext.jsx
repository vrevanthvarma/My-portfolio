import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, tokenStorage, formatApiError } from '@/lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // null = checking, false = unauthenticated, object = authenticated
  const [user, setUser] = useState(null);

  const refresh = useCallback(async () => {
    const token = tokenStorage.get();
    if (!token) {
      setUser(false);
      return;
    }
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch {
      tokenStorage.clear();
      setUser(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      tokenStorage.set(data.token);
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (e) {
      return { ok: false, error: formatApiError(e?.response?.data?.detail) || e.message };
    }
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading: user === null, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
