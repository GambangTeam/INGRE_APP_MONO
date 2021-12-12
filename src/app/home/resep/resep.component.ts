import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-resep',
  templateUrl: './resep.component.html',
  styleUrls: ['./resep.component.scss']
})
export class ResepComponent implements OnInit {
  recipes: Recipe[] = []
  isLoading: boolean = true;
  searchText!: string;
  showModal: Boolean = false;
  constructor(private readonly recipeService: RecipeService) { }

  ngOnInit(): void {
    this.init()
    this.recipeService.listUpdated();
  }

  init(): void {
    this.recipeService.getAllRecipe()
      .subscribe({
        next: (recipe) => {
          this.isLoading = false
          this.recipes = recipe
          console.log(recipe);

        },
        error: () => {
          this.isLoading = true
          console.error
        },
        complete: () => { }
      })
  }

  onDeleteRecipe(id: string): void {
    this.isLoading = true;
    this.recipeService.delete(id)
      .subscribe({
        next: () => { },
        error: (error) => { console.error(error) },
        complete: () => {
          this.init();
          this.isLoading = false;
        }
      })
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
