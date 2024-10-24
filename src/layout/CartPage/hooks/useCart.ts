import { useState, useEffect } from 'react';
import { CartItem, GameDTO } from '../../../utils/types';
import apiClient from '../../../config/apiClient';
import { addToCart } from '../../../utils/cc';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [games, setGames] = useState<Map<string, GameDTO>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      setCartItems(parsedCart);
      fetchGameDetails(parsedCart);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchGameDetails = async (items: CartItem[]) => {
    try {
      const gameDetails = new Map<string, GameDTO>();
      await Promise.all(
        items.map(async (item) => {
          const response = await apiClient.get(`/api/games/${item.slug}`);
          gameDetails.set(item.slug, response.data.data);
        })
      );
      setGames(gameDetails);
    } catch (err) {
      setError('Failed to fetch game details');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (slug: string, quantityChange: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.slug === slug) {
          return { ...item, quantity: item.quantity + quantityChange };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeItem = (slug: string) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.slug !== slug);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  return { cartItems, games, loading, error, addToCart, updateQuantity, removeItem };
};