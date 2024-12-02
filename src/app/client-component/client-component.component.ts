import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente, ClientSessionSave } from '../home/home.component';


@Component({
  selector: 'app-client-component',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './client-component.component.html',
  styleUrl: './client-component.component.css'
})
export class ClientComponentComponent {
  constructor(private router: Router) { }
  
  OnSubmit(form: NgForm){
    if(form.valid){
      const cliente = new Cliente(form.value.nome, form.value.cpf, 
        form.value.endereco, form.value.telefone);

        ClientSessionSave(cliente);
        
        this.router.navigate([''])
    } else {
      form.form.markAllAsTouched();
    };
  }

  OnCancel(){
    this.router.navigate([''])
  }
}
