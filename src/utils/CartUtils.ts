import { LocalDate } from '@js-joda/core';

export interface MediaDTO {
  mediaUrl: any;
  mediaName: string;
}

export interface VoucherDTO {
  code: string;
  discount: number;
}

export interface CategoryDetailDTO {
  id: number;
  name: string;
}

export interface GameDTO {
  sysIdGame: number;
  gameCode: string;
  gameName: string;
  status: boolean;
  price: number;
  discountPercent: number;
  gameImage: string;
  slug: string;
  gameCategory: string;
  description: string;
  isActive: boolean;
  sysIdDiscount: number;
  quantity: number;
  quantitySold: number;
  quantityCount: number;
  voucher?: VoucherDTO;
  categoryDetails: CategoryDetailDTO[];
  rating: number;
  ratingCount: number;
  features: string;
  releaseDate: LocalDate;
  developer: string;
  platform: string;
  language: string;
  about: string;
  media: MediaDTO[];
}

export interface CartItem {
  slug: string;
  quantity: number;
}
export const addToCart = (item: CartItem): void => {
  const storedCart = localStorage.getItem('cart');
  let cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

  const existingItem = cartItems.find(cartItem => cartItem.slug === item.slug);
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cartItems.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
};