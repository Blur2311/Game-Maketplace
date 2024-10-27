import { jwtDecode } from 'jwt-decode';
import apiClient from '../config/apiClient';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useAuthCheck = (
  requireRoles: string[] = [],
) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await apiClient.get('/api/auth/is-login');
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken: DecodedToken = jwtDecode(token);
          if (!requireRoles.includes(decodedToken.role)) {
            navigate('/403');
          }
        } else {
          throw new Error('Token is null');
        }
      } catch (error) {
        console.error('Failed to check login status:', error);      
      }
    };
    checkLoginStatus();
  }, []);
};

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