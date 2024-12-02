import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { aClientes, Cliente, ClientSessionSave, ClientSessionSaveA, DeleteCLientSession, GetIndexClient } from '../home/home.component';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-client-detail-component',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './client-detail-component.component.html',
  styleUrl: './client-detail-component.component.css'
})
export class ClientDetailComponentComponent {
  constructor(private route: ActivatedRoute, private router: Router) { };

  client$: any;
  
  clienteForm!: FormGroup;
  cliente!: Cliente;
  fb!: FormBuilder;

  id: string | null = null;

  ngOnInit(){
    let cCliente: any;

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); 
      cCliente = aClientes[GetIndexClient(this.id)];
      this.client$ = new Cliente(cCliente.nome, cCliente.cpf, cCliente.endereco, cCliente.telefone);
    });
  } 

  OnSubmit(form: NgForm){
    if(form.valid){
      for (let index = 0; index < aClientes.length; index++) {
        const cliente = aClientes[index];
        if(cliente.id.toString() === this.id){
          cliente.nome = form.value.nome;
          cliente.cpf = form.value.cpf;
          cliente.endereco = form.value.endereco;
          cliente.telefone = form.value.telefone;
        }
      }
      ClientSessionSaveA(aClientes);
      this.router.navigate([''])
    } else {
      form.form.markAllAsTouched();
    }
  }

  OnCancel(){
    this.router.navigate([''])
  }

  OnDelete(){
    DeleteCLientSession(this.id);
    this.router.navigate(['']);
  }
}
