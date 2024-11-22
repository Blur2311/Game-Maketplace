import { jwtDecode } from 'jwt-decode';
import apiClient from '../config/apiClient';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface DecodedToken {
  sub: string;
  exp: number;
};

export type User = {
  sysIdUser: number;
  username: string;
  email: string;
  role: string;
  hoVaTen: string;
  balance: number;
  avatar: string;
  joinTime: string;
};

export const isTokenValid = (): boolean => {
  try {
    const decodedToken = getDecodeToken();
    if (!decodedToken) return false;
    const decoded: DecodedToken = decodedToken;
    const currentTime = Math.floor(Date.now() / 1000);
    return !!decoded.sub && decoded.exp > currentTime;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return false;
  }
};

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
          if (!(requireRoles.includes(decodedToken.role) || requireRoles.length === 0)) {
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

export const getDecodeToken = (): DecodedToken | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const getCurrentUser = async (): Promise< User | null> => {
  try {
    const response = await apiClient.get('/api/auth/current-user');
    let user: User = response.data.data;
    user.role = getDecodeToken()?.role;
    user.balance = parseInt(response.data.data.balance);
    return user;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
};