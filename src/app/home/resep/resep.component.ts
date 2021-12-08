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
  isLoading: boolean = false;
  searchText!: string;
  constructor(private readonly recipeService: RecipeService) { }

  ngOnInit(): void {
    this.init()
  }

  init(): void {
    this.recipeService.getAllRecipe()
      .subscribe({
        next: (recipe) => {
          this.isLoading = false
          this.recipes = recipe
        },
        error: () => {
          this.isLoading = true
          console.error
        },
        complete: () => { }
      })
  }

}
