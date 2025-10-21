
import { Category } from './types';

export const CATEGORIES: Category[] = [
  Category.HouseBills,
  Category.Food,
  Category.Transportation,
  Category.Entertainment,
  Category.Other,
];

export const CATEGORY_COLORS: { [key in Category]: string } = {
  [Category.HouseBills]: "#ef4444", // red-500
  [Category.Food]: "#f97316", // orange-500
  [Category.Transportation]: "#eab308", // yellow-500
  [Category.Entertainment]: "#84cc16", // lime-500
  [Category.Other]: "#3b82f6", // blue-500
};
