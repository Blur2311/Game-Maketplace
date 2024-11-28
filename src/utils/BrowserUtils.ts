export interface Game {
  sysIdGame: number;
  gameName: string;
  media: {
    mediaUrl: string;
  }[];
  categoryDetails: {
    sysIdCategoryDetail: number;
    category: {
      sysIdCategory: number;
      categoryName: string;
      description: string;
    };
  }[];
  price: number;
  discountPercent: number;
  slug: string;
}

export type Filters = {
  name: string;
  minPrice?: number;
  maxPrice?: number;
  genre?: string;
  page?: number;
  size?: number;
};

export const handleCheckboxChange = (selectedLabel: string, setCheckedItems: Function) => {
  setCheckedItems((prev: Record<string, boolean>) => {
    const updatedCheckedItems = Object.keys(prev).reduce((acc, label) => {
      acc[label] = label === selectedLabel;
      return acc;
    }, {} as Record<string, boolean>);
    return updatedCheckedItems;
  });
};

export const handleTabChange = (
  e: { index: number | number[] },
  setActiveAccor: Function
) => {
  if (Array.isArray(e.index)) {
    setActiveAccor(e.index.length > 0 ? e.index[0] : null);
  } else {
    setActiveAccor(e.index);
  }
};