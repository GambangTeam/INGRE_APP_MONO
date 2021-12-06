import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ValidationComponent } from './components/validation/validation.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    ValidationComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    ValidationComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
