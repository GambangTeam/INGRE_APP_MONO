import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe', loadChildren: () => import('./resep/resep.module').then(m => m.ResepModule) },
  { path: 'ingre', loadChildren: () => import('./ingredients/ingredients.module').then(m => m.IngredientsModule) },
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
