import {jwtDecode} from 'jwt-decode';
import apiClient from '../config/apiClient';

export const signOut = async () => {
  try {
    await apiClient.post('/api/auth/logout');
    localStorage.removeItem('token');
    window.location.reload();
  } catch (error) {
    console.error('Failed to sign out:', error);
  }
};

interface DecodedToken {
  sub: string;
  [key: string]: any;
}

export const getUsernameFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.sub;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};