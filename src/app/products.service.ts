import { Injectable } from '@angular/core';
import { TotalInterface } from './total-interface';
import { MeasureInterface } from './measure-interface';
import { ProductsInterface } from './products-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  url_product = 'http://localhost:3000/products';
  url_measure = 'http://localhost:3500/measure';

  async getAllProducts(): Promise<ProductsInterface[]> {
    const data = await fetch(this.url_product);
    return await data.json() ?? [];
  }


  async getProductById(
        id: number
    ): Promise<ProductsInterface | undefined> {
        const data = await fetch(
            `${this.url_product}/${id}`
        );
        return (await data.json()) ?? {};
  }

  async getAllMeasure(): Promise<MeasureInterface[]> {
    const data = await fetch(this.url_measure);
    return await data.json() ?? [];
  }

  async getMeasureNameById(id: number): Promise<string | undefined> {
    try {
      const data = await fetch(`${this.url_measure}/${id}`);
      const measure: MeasureInterface | undefined = await data.json();
      console.log(`id: ${id}, name ${measure?.name}`);
      return measure?.name;
    } catch (error) {
      console.error(`Error getting measure name by id: ${id}`, error);
      return undefined;
    }
  }

  async getTotalById(id: number): Promise<TotalInterface | undefined> {

      const productById = await this.getProductById(id);
      const measureName = await this.getMeasureNameById(id);
      if (productById) {
        return {
          id: productById.id,
          name: productById.name,
          quantity: productById.quantity,
          unit_coast: productById.unit_coast,
          measure: measureName ?? 'N/A'
        };
      } else return undefined;
  };

  async getProductsWithMeasures(): Promise<TotalInterface[]> {
    const productTotalList = await this.getAllProducts();
    return Promise.all(productTotalList.map(async product => {
      const measureName = await this.getMeasureNameById(product.measure);
      return {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        unit_coast: product.unit_coast,
        measure: measureName ?? 'N/A'
      };
    }));
  }

  async deleteProduct(id : number) {
    let response = await fetch( `/product/${id}`, {
      method: 'DELETE',
    });
  }

  async createProduct(name: String, quantity: number, unitCost: number, measure: number ) {
    let product = {
      name: name,
      quantity: quantity,
      unitCost: unitCost,
      measure: measure
    };
    
    let response = await fetch('/product/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(product)
    });
  }

  async updateProduct(id: number, name: String, quantity: number, unitCost: number, measure: number ) {
    let product = {
      name: name,
      quantity: quantity,
      unitCost: unitCost,
      measure: measure
    };
    
    let response = await fetch(`/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(product)
    });
  }

  async deleteMeasure(id : number) {
    let response = await fetch( `/measure/${id}`, {
      method: 'DELETE',
    });
  }

  async createMeasure(name: String) {
    let measure = {
      name: name,
    };
    
    let response = await fetch('/measure/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(measure)
    });
  }
  
  async updateMeasure(id: number, name: String) {
    let measure = {
      name: name,
    };
    
    let response = await fetch(`/measure/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(measure)
    });
  }

  constructor( ) { }
  
  submitApplication(name: string, quantity: number, unit_coast: number, measure: number) {
    console.log(
        `Product new data: name: ${name}, quantity: ${quantity}, unit_coast ${unit_coast}, measure ${measure}.`
    );
  }
}
