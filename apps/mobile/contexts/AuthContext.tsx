import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  phoneNumber: string | null;
  userName: string | null;
  login: (phone: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  phoneNumber: null,
  userName: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Load from storage on mount
    const loadAuth = async () => {
      const [uPhone, uName] = await Promise.all([
        AsyncStorage.getItem('@user_phone'),
        AsyncStorage.getItem('@user_name'),
      ]);
      if (uPhone && uName) {
        setIsAuthenticated(true);
        setPhoneNumber(uPhone);
        setUserName(uName);
      }
    };
    loadAuth();
  }, []);

  const login = async (phone: string, name: string) => {
    await Promise.all([
      AsyncStorage.setItem('@user_phone', phone),
      AsyncStorage.setItem('@user_name', name),
    ]);
    setIsAuthenticated(true);
    setPhoneNumber(phone);
    setUserName(name);
  };

  const logout = async () => {
    await Promise.all([
      AsyncStorage.removeItem('@user_phone'),
      AsyncStorage.removeItem('@user_name'),
    ]);
    setIsAuthenticated(false);
    setPhoneNumber(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, phoneNumber, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
