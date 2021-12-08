import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category';
import { Ingredients } from '../../models/ingredients';
import { LotsIngredients } from '../../models/lotsIngredients';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import Swal from 'sweetalert2';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-form-resep',
  templateUrl: './form-resep.component.html',
  styleUrls: ['./form-resep.component.scss']
})
export class FormResepComponent implements OnInit {
  categorys: Category[] = [];
  fieldIngre: Ingredients[] = [];
  searchText!: string;
  id: string | null = null;
  tableIngredient: boolean = false;
  ingredientsRecipe?: Recipe;

  constructor(
    private readonly activatedRoutes: ActivatedRoute,
    private readonly recipeService: RecipeService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getCategory()
    this.getAllIngredients()
    this.selected()
  }
  //getAll Category fetch API
  getCategory(): void {
    this.recipeService.getAllCategory().subscribe((category) => {
      this.categorys = category;
    }, console.error, () => { })
  }
  //getAll Ingredients fetch API
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
  //add ingredients recipe
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

  // onSubmitFormRecipe
  onSubmitRecipe(): void {
    const recipe: Recipe = this.recipeForm.value
    console.log(recipe);
    this.recipeService.save(this.recipeForm.value).subscribe({
      next: (any) => {
        if (this.recipeForm.get('id')?.value) {
          alert(`${this.recipeForm.get('name')?.value} berhasil diupdate`);
          this.router.navigateByUrl('ingre')
          console.log(any)
          this.successConfirmation()
          this.recipeForm.reset();
        }
        else {
          alert(`${this.recipeForm.get('name')?.value} {berhasil disimpan`);
          this.recipeForm.reset();
          console.log(any)
          this.successConfirmation()
          this.recipeForm.reset();
        }
      },
      error: (error) => {
        console.error(error)
        this.alertConfirmation()
      },
      complete: () => { }
    })

  }

  //sweetAllert error
  alertConfirmation() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Pastikan semua field sudah di isi',
    })
  }
  //swetAllert success
  successConfirmation() {
    Swal.fire({
      icon: 'success',
      title: 'Yesss...',
      text: 'Data Behasil Disimpan',
    })
  }

  //template update
  setFormValue(recipe: Recipe) {
    this.recipeForm.addControl('id', new FormControl);
    this.recipeForm.get('id')?.setValue(this.id);
    this.recipeForm.get('name')?.setValue(recipe.name);
    this.recipeForm.get('recipeDetail')?.setValue(recipe.detail);
    this.recipeForm.get('category')?.setValue(recipe.category);
    this.recipeForm.get('ingredient')?.setValue(recipe.ingredients);
  }

  //selected recipe by id
  selected(): void {
    this.activatedRoutes.params.pipe(
      map((params: any) => params.id),
      switchMap((id: string) => {
        if (!id) { return EMPTY }
        else { this.id = id; return this.recipeService.getById(id) }
      })
    ).subscribe(
      (recipe: Recipe) => {
        if (recipe) {
          console.log(recipe);
          this.tableIngredient = true;
          this.ingredientsRecipe = recipe;
          this.setFormValue(recipe);
        }
      },
      (error) => console.error(error),
      () => { }
    )
  }
}

