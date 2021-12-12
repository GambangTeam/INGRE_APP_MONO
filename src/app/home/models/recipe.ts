import { Category } from './category';
import { LotsIngredients } from './lotsIngredients';

export interface Recipe {
  id?: string;
  name: string;
  recipeDetail: string;
  category: Category;
  ingredients?: LotsIngredients[];
}
