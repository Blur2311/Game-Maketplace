import { CategoryDetail } from './CategoryDetailModel';
import { Media } from './MediaModel';

export interface Game {
  sysIdGame: number;
  gameName: string;
  price: number;
  discountPercent: number | null;
  categoryDetails: CategoryDetail[];
  gameImage: string;
  description: string;
  isActive: boolean;
  quantity: number;
  releaseDate: Date;
  media: Media[];
  slug: string;
}