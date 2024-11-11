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
  categoryName: string;
  sysIdCategory: number;
  sysIdCategoryDetail: number;
  sysIdGame: number;
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
  description: string;
  isActive: boolean;
  quantity: number;
  quantitySold: number;
  categoryDetails: CategoryDetailDTO[];
  rating: number;
  ratingCount: number;
  features: string;
  releaseDate: LocalDate; // or LocalDate if you have a date library
  developer: string;
  platform: string;
  language: string;
  about: string;
  media: MediaDTO[];
}

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  mediaUrl: string;
}