import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category';
import { Ingredients } from '../../models/ingredients';
import { LotsIngredients } from '../../models/lotsIngredients';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-resep',
  templateUrl: './form-resep.component.html',
  styleUrls: ['./form-resep.component.scss']
})
export class FormResepComponent implements OnInit {
  categorys: Category[] = [];
  fieldIngre: Ingredients[] = [];
  searchText!: string;
  constructor(
    private readonly activatedRoutes: ActivatedRoute,
    private readonly recipeService: RecipeService,
    private readonly router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCategory()
    this.getAllIngredients()
  }

  getCategory(): void {
    this.recipeService.getAllCategory().subscribe((category) => {
      this.categorys = category;
    }, console.error, () => { })
  }
  getAllIngredients(): void {
    this.recipeService.getAllIngredients().subscribe((ingre) => {
      this.fieldIngre = ingre;
    }, console.error, () => { })
  }

  recipeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    recipeDetail: new FormControl('', [Validators.required]),
    category: new FormControl('', Validators.required),
    ingredients: new FormArray([])
  })

  getIngredients(): any[] {
    const ingre: FormArray = this.recipeForm.get('ingredients') as FormArray;
    return ingre.controls;
  }

  addIgredients(ingres?: LotsIngredients): void {
    const ingre: FormArray = this.recipeForm.get('ingredients') as FormArray;
    ingre.push(
      new FormGroup({
        ingredientId: new FormControl(ingres ? ingres.ingredient : '', [Validators.required]),
        qty: new FormControl(ingres ? ingres.qty : null, [
          Validators.required,
        ]),
      })
    );
  }
  onSubmitRecipe(): void {
    const recipe: Recipe = this.recipeForm.value
    console.log(recipe);
    this.recipeService.save(this.recipeForm.value).subscribe({
      next: (any) => {
        console.log(any)
        this.successConfirmation()
        this.recipeForm.reset();

      },
      error: (error) => {
        console.error(error)
        this.alertConfirmation()
      },
      complete: () => { }
    })

  }
  alertConfirmation() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Pastikan semua field sudah di isi',
    })
  }
  successConfirmation() {
    Swal.fire({
      icon: 'success',
      title: 'Yesss...',
      text: 'Data Behasil Disimpan',
    })
  }
}

