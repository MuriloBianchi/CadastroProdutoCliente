import { Component } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { aProdutos, DeleteProductSession, GetIndexProduct, ProductSessionSaveA, Produto } from '../home/home.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-detail-component',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './product-detail-component.component.html',
  styleUrl: './product-detail-component.component.css'
})
export class ProductDetailComponentComponent {
  constructor(private route: ActivatedRoute, private router: Router) { };

  product$: any;
  
  productForm!: FormGroup;

  id: string | null = null;

  ngOnInit(){
    let cproduct: any;

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); 
      cproduct = aProdutos[GetIndexProduct(this.id)];
      this.product$ = new Produto(cproduct.nome, cproduct.descricao, cproduct.valorCompra, cproduct.valorVenda, cproduct.qtdEstoque, cproduct.marca);
    });
  } 

  OnSubmit(form: NgForm){
    if(form.valid){
      for (let index = 0; index < aProdutos.length; index++) {
        const product = aProdutos[index];
        if(product.id.toString() === this.id){
          product.nome = form.value.nome;
          product.descricao = form.value.descricao;
          product.valorCompra = form.value.valorCompra;
          product.valorVenda = form.value.valorVenda;
          product.qtdEstoque = form.value.qtdEstoque;
          product.marca = form.value.marca;
        }
      }
      ProductSessionSaveA(aProdutos);
      this.router.navigate([''])
    } else {
      form.form.markAllAsTouched();
    }
  }

  OnCancel(){
    this.router.navigate([''])
  }

  OnDelete(){
    DeleteProductSession(this.id);
    this.router.navigate(['']);
  }
}
