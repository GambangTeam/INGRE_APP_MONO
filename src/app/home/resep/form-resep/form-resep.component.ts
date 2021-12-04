import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-resep',
  templateUrl: './form-resep.component.html',
  styleUrls: ['./form-resep.component.scss']
})
export class FormResepComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
  ArrayIngre: any = [];
  onKeyup(input: any) {
    this.ArrayIngre = []
    for (let i = 1; i <= input; i++) {
      this.ArrayIngre.push(i)
    }
    console.log(this.ArrayIngre);
  }
  getSubIngre(): any {
    const subRecipe = []
  }


}
