import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  searchText!: string;
  showModal = false;
  category: Category[] = [];
  isLoading: Boolean = false;
  constructor(private readonly categoryService: CategoryService, private readonly router: Router) { }

  ngOnInit(): void {
    this.init();
  }
  categoryForm: FormGroup = new FormGroup({
    category: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  init(): void {
    this.isLoading = true;
    this.categoryService.getAllCategory()
      .subscribe({
        next: (tx) => {
          this.category = tx
        },
        error: () => {
          console.error
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }


  saveCategory() {
    this.isLoading = true;
    this.categoryService.save(this.categoryForm.value).subscribe({

      next: () => {
        this.init();
        this.categoryForm.reset();
        this.successConfirmation();
      },
      error: () => {
        console.error
        this.alertConfirmation()

      },
      complete: () => {
        this.isLoading = false;
        this.showModal = false;
        this.init();
      }
    })
  }
  onDelete(id: string): void {
    this.isLoading = true;
    this.categoryService.delete(id)
      .subscribe({
        next: () => { },
        error: (error) => { console.error(error) },
        complete: () => {
          this.isLoading = false;
          this.init();
        }
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


}
