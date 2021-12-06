import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../models/ingredients';
import { IngredientsService } from '../services/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  ingres: Ingredients[] = []
  isLoading: boolean = true
  constructor(private readonly ingreService: IngredientsService) { }

  ngOnInit(): void {
    this.init();
    this.ingreService.listUpdated()
      .subscribe((update: boolean) => {
        if (update) {
          this.init();
        }
      })
  }

  init(): void {
    this.ingreService.getAll()
      .subscribe({
        next: (ingredient) => {
          this.isLoading = false
          this.ingres = ingredient
        },
        error: () => {
          this.isLoading = true
          console.error
        },
        complete: () => { }
      })
  }
  onDeleteIngre(id: string): void {
    this.ingreService.delete(id)
      .subscribe({
        next: () => { },
        error: (error) => { console.error(error) },
        complete: () => { }
      })
  }

}
