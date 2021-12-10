import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Ingredients } from '../../models/ingredients';
import { IngredientsService } from '../../services/ingredients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-ingre',
  templateUrl: './form-ingre.component.html',
  styleUrls: ['./form-ingre.component.scss']
})
export class FormIngreComponent implements OnInit {

  id: string | null = null;
  httpError: Boolean = false;

  ngOnInit(): void {
    this.selected();
  }

  constructor(private readonly ingredientsService: IngredientsService,
    private readonly activatedRoute: ActivatedRoute, private readonly route: Router) { }


  ingreForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    stock: new FormControl(100, [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.minLength(3)]),
    unit: new FormControl('', [Validators.required, Validators.minLength(1)])
  })

  setFormValue(ingre: Ingredients) {
    this.ingreForm.addControl('id', new FormControl);
    this.ingreForm.get('id')?.setValue(this.id);
    this.ingreForm.get('name')?.setValue(ingre.name);
    this.ingreForm.get('stock')?.setValue(ingre.stock);
    this.ingreForm.get('price')?.setValue(ingre.price);
    this.ingreForm.get('unit')?.setValue(ingre.unit);
  }

  selected(): void {
    this.activatedRoute.params.pipe(
      map((params: any) => params.id),
      switchMap((id: string) => {
        if (!id) { return EMPTY }
        else { this.id = id; return this.ingredientsService.getById(id) }
      })
    ).subscribe(
      (ingredients: Ingredients) => {
        console.log(ingredients);
        if (ingredients) {
          this.setFormValue(ingredients);
        }
      },
      (error) => console.error(error),
      () => { }
    )
  }

  saveIngredients() {
    this.ingredientsService.save(this.ingreForm.value).subscribe({

      next: () => {
        if (this.ingreForm.get('id')?.value) {
          alert(`${this.ingreForm.get('name')?.value} berhasil diupdate`);
          this.route.navigateByUrl('ingre')
        }
        else {
          alert(`${this.ingreForm.get('name')?.value} {berhasil disimpan`);
          this.ingreForm.reset();
        }
      },
      error: () => {
        console.error
        this.alertConfirmation()
      },
      complete: () => { }
    })
  }

  isFieldValid(fieldName: string): string {
    const control: AbstractControl = this.ingreForm.get(fieldName
    ) as AbstractControl;

    if (control && control.touched && control.invalid) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid'
    } else {
      return '';
    }
  }

  alertConfirmation() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<p>Semua Field Wajib di isi</p>'
    })
  }
}
