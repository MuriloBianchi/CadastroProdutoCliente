import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ProductSessionSave, Produto } from '../home/home.component';


@Component({
  selector: 'app-product-component',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './product-component.component.html',
  styleUrl: './product-component.component.css',
})
export class ProductComponentComponent {

  constructor(private router: Router) { }

  OnSubmit(form: NgForm){
    if(form.valid){
      const produto = new Produto(form.value.nome, form.value.descricao, form.value.valorCompra, 
        form.value.valorVenda, form.value.qtdEstoque, form.value.marca);

        ProductSessionSave(produto);
        
        this.router.navigate([''])
    } else {
      form.form.markAllAsTouched();
    };
  }

  OnCancel(){
    this.router.navigate([''])
  }
}
