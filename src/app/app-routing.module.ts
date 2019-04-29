import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'sig-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'products/:categoryId', loadChildren: './products/products.module#ProductsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
