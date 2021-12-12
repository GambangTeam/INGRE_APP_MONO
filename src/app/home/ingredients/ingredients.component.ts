import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../models/ingredients';
import { IngredientsService } from '../services/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent implements OnInit {
  ingres: Ingredients[] = [];
  isLoading: boolean = true;
  searchText!: string;
  constructor(private readonly ingreService: IngredientsService) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.ingreService.getAll().subscribe({
      next: (ingredient) => {
        this.ingres = ingredient;
      },
      error: () => {
        this.isLoading = true;
        console.error;
      },
      complete: () => {
        this.init();
        this.isLoading = false;
      },
    });
  }

  onDeleteIngre(id: string): void {
    this.isLoading = true;
    this.ingreService.delete(id).subscribe({
      next: () => { },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.init();
        this.isLoading = false;
      },
    });
  }
}
