import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { GetClientSession, GetProductSession, sOption } from '../home/home.component';

@Component({
  selector: 'app-list-component',
  standalone: true,
  imports: [],
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.css'
})
export class ListComponentComponent {
 oldOption: string = 'none';
 constructor(private router: Router) { };

 EditClient_Click(pId: any){
    this.router.navigate(['clientDetails/' + pId])
 }

 EditProduct_Click(pId: any){
  this.router.navigate(['productDetails/' + pId])
 }

  ngOnInit(){
    this.refresh()
  }

  refresh(){
    setInterval( async () => {
      await this.refreshList();
    }, 100);
  }

 async refreshList(){
    if(this.oldOption !== sOption){
      this.oldOption = sOption;
      this.createTable();
    }
  };

  async createTable(){
    const element = document.getElementById('table');
    if(element){
      document.body.removeChild(element);
    }

    const table = document.createElement('table');
    table.className = 'table table-striped';

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    if(this.oldOption === 'product'){
      thead.innerHTML = '\
      <tr>\
          <th style="width: 150px;">Nome</th>\
          <th style="width: 150px;">Descrição</th>\
          <th style="width: 100px;">Marca</th>\
          <th style="width: 100px;">Valor Venda</th>\
          <th style="width: 100px;">Estoque</th>\
          <th style="width: 100px;">Ações</th>\
        </tr>\
        ';
        table.appendChild(thead);

        let produtos: any[] = [];
        produtos = JSON.parse(GetProductSession());

        produtos.forEach((item) => {
          const tr = document.createElement('tr');
          
          tr.innerHTML = `\
              <td>${item.nome}</td>\
              <td>${item.descricao}</td>\
              <td>${item.marca}</td>\
              <td>${item.valorVenda}</td>\
              <td>${item.qtdEstoque}</td>\
              `;
              const td = document.createElement('td');
              const button = document.createElement('button');
              button.className = 'btn btn-sm btn-warning';
              button.textContent = 'Editar';
              button.addEventListener('click', () => this.EditProduct_Click(item.id));
              td.appendChild(button);
              tr.appendChild(td);
              tbody.appendChild(tr);
        });

    } else if(this.oldOption === 'client') {
      thead.innerHTML = '\
      <tr>\
          <th style="width: 200px;">Nome</th>\
          <th style="width: 100px;">CPF</th>\
          <th style="width: 200px;">Endereço</th>\
          <th style="width: 100px;">Telefone</th>\
          <th style="width: 100px;">Ações</th>\
        </tr>\
        ';
        table.appendChild(thead);

        let clientes: any[] = [];
        clientes = JSON.parse(GetClientSession());

        clientes.forEach((item) => {
          const tr = document.createElement('tr');
          
          tr.innerHTML = `\
              <td>${item.nome}</td>\
              <td>${item.cpf}</td>\
              <td>${item.endereco}</td>\
              <td>${item.telefone}</td>\
              `;
              const td = document.createElement('td');
              const button = document.createElement('button');
              button.className = 'btn btn-sm btn-warning';
              button.textContent = 'Editar';
              button.addEventListener('click', () => this.EditClient_Click(item.id));
              td.appendChild(button);
              tr.appendChild(td);

              tbody.appendChild(tr);
        });        
    };

      table.appendChild(tbody);
      const list = document.createElement('div');
      list.id = 'table'; list.appendChild(table);
      document.body.appendChild(list);
  }

}
