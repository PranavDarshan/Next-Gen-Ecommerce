import { useState, useEffect } from 'react';
import type { StaffSession } from '../types/staff';

export function useAuth() {
  const [session, setSession] = useState<StaffSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication - Replace with actual authentication logic
  const login = async (email: string, password: string) => {
    // Simulate API call
    const mockSession: StaffSession = {
      id: '1',
      email,
      name: 'John Doe',
      role: 'staff',
    };
    setSession(mockSession);
    return mockSession;
  };

  const logout = () => {
    setSession(null);
  };

  useEffect(() => {
    // Check for existing session
    setLoading(false);
  }, []);

  return {
    session,
    loading,
    login,
    logout,
  };
}