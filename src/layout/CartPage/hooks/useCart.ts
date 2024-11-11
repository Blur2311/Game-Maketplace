import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import apiClient from '../../../config/apiClient';
import { CartItem, GameDTO } from '../../../utils/CartUtils';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [games, setGames] = useState<Map<string, GameDTO>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [changes, setChanges] = useState<number>(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      // console.log(JSON.parse(storedCart));
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      setCartItems(parsedCart);
      fetchGameDetails(parsedCart);
    } else {
      setLoading(false);
    }
  }, [changes]);

  const fetchGameDetails = async (items: CartItem[]) => {
    try {
      const gameDetails = new Map<string, GameDTO>();
      await Promise.all(
        items.map(async (item) => {
          const response = await apiClient.get(`/api/games/p/${item.slug}`);
          gameDetails.set(item.slug, response.data.data);
        })
      );
      // console.log(gameDetails);
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
    setChanges((prev) => prev + 1);
  };

  const removeItem = (slug: string) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.slug !== slug);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
    setChanges((prev) => prev + 1);
  };

  const addToCart = (item: CartItem): void => {
    const storedCart = localStorage.getItem('cart');
    let cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cartItems.find(cartItem => cartItem.slug === item.slug);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cartItems.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    setChanges((prev) => prev + 1);
    toast.info(`${item.name} has been added to the cart successfully!`);
  };  
  
  const addGameToCart = (game: GameDTO, quantity : number): void => {
    const cartItem: CartItem = {
      slug: game.slug,
      name: game.gameName,
      price: game.price,
      quantity,
      mediaUrl: game.gameImage
    };

    addToCart(cartItem);
  };

  return { cartItems, games, loading, error, addToCart, updateQuantity, removeItem, setChanges, fetchGameDetails, addGameToCart };
};