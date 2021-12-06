import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormIngreComponent } from './form-ingre/form-ingre.component';
import { IngredientsComponent } from './ingredients.component';

const routes: Routes = [
  { path: '', component: IngredientsComponent },
  { path: 'form-ingre', component: FormIngreComponent },
  { path: 'form-ingre/:id', component: FormIngreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientsRoutingModule { }
