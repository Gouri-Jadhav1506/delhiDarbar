import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  date: string; // ISO string 
  time: string;
  guests: number;
  preferences: string[];
  status: BookingStatus;
  createdAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => Booking;
  cancelBooking: (id: string) => void;
  modifyBooking: (id: string, updates: Partial<Booking>) => void;
  isLoading: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const stored = await AsyncStorage.getItem('restaurant_bookings');
        if (stored) {
          setBookings(JSON.parse(stored));
        }
      } catch (e: any) {
        console.error('Failed to load bookings', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadBookings();
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem('restaurant_bookings', JSON.stringify(bookings)).catch((e: any) => {
        console.error('Failed to save bookings', e);
      });
    }
  }, [bookings, isLoading]);

  const addBooking = (data: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...data,
      id: Math.random().toString(36).substring(2, 11),
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  const modifyBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, modifyBooking, isLoading }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
