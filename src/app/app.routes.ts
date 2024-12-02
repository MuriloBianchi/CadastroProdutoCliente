import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ClientComponentComponent } from './client-component/client-component.component';
import { ClientDetailComponentComponent } from './client-detail-component/client-detail-component.component';
import { ProductDetailComponentComponent } from './product-detail-component/product-detail-component.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'product', component: ProductComponentComponent},
    { path: 'client', component: ClientComponentComponent},
    { path: 'clientDetails/:id', component: ClientDetailComponentComponent},
    { path: 'productDetails/:id', component: ProductDetailComponentComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class appRoutes { }