import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResepRoutingModule } from './resep-routing.module';
import { ResepComponent } from './resep.component';
import { FormResepComponent } from './form-resep/form-resep.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ResepComponent,
    FormResepComponent
  ],
  imports: [
    CommonModule,
    ResepRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ResepModule { }
