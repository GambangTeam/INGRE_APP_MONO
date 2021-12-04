import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormResepComponent } from './form-resep/form-resep.component';
import { ResepComponent } from './resep.component';

const routes: Routes = [{ path: '', component: ResepComponent }, { path: "form-recipe", component: FormResepComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResepRoutingModule { }
