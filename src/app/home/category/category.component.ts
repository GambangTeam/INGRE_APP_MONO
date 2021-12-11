import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private readonly categoryService: CategoryService,) { }

  ngOnInit(): void {
  }
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  saveCategory() {
    this.categoryService.save(this.categoryForm.value).subscribe({

      next: () => {

        alert(`${this.categoryForm.get('name')?.value} {berhasil disimpan`);
        this.categoryForm.reset();
      },
      error: () => {
        console.error
        // this.alertConfirmation()
      },
      complete: () => { }
    })
  }

}
