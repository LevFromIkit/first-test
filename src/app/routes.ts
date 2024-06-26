import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MeasureDetailComponent } from './measure-detail/measure-detail.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateMeasureComponent } from './create-measure/create-measure.component';

const routeConfig: Routes = [
    {
        path: '',
        component: ProductsComponent,
        title: 'Index page',
    },
    {
        path: 'product-details/:id',
        component: ProductDetailComponent,
        title: 'Product details',
    },
    {
        path: 'measure-details/:id',
        component: MeasureDetailComponent,
        title: 'Measure details',
    },
    {
        path: 'add-product',
        component: CreateProductComponent,
        title: 'Product create',
    },
    {
        path: 'add-measure',
        component: CreateMeasureComponent,
        title: 'Measure create',
    },
];

export default routeConfig;