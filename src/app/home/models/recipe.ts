import { Category } from './category';
import { LotsIngredients } from './lotsIngredients';

export interface Recipe {
  id?: number;
  name: string;
  recipeDetail: string;
  category: Category;
  ingredients?: LotsIngredients[];
}
