import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsComponent } from './ingredients.component';
import { FormIngreComponent } from './form-ingre/form-ingre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IngredientsComponent,
    FormIngreComponent
  ],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class IngredientsModule { }
