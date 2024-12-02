import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListComponentComponent } from "../list-component/list-component.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, ListComponentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { };

  options = [
    {value: 'None', label: 'Selecione uma opção'},
    {value: 'product', label: 'Produtos'},
    {value: 'client', label: 'Clientes'}
  ]

  Product_click(){
    const element = document.getElementById('table');
    if(element){
      document.body.removeChild(element);
    }
    sOption = 'none';
    this.router.navigate(['product'])
  }

  Client_click(){
    const element = document.getElementById('table');
    if(element){
      document.body.removeChild(element);
    }
    sOption = 'none';
    this.router.navigate(["client"])
  }

  LoadList(pEvent: any){
    sOption = pEvent.target.value;
  }

  ngOnInit(){
   this.CarregaProdutos();
   this.CarregaClientes();
   sOption = 'none';
  }

  CarregaProdutos(){
    const pProdutos: string = GetProductSession();
    let produtos: any[] = [];
  
    if(pProdutos){
      produtos = JSON.parse(pProdutos);
      const count = (document.getElementById("countProdutos") as HTMLHeadingElement);
      count.innerText = produtos.length.toString();
      aProdutos = produtos;
    };
  }

  CarregaClientes(){
    const pClientes: string = GetClientSession();
    let clientes: any[] = [];
  
    if(pClientes){
      clientes = JSON.parse(pClientes);
      const count = (document.getElementById("countClientes") as HTMLHeadingElement);
      count.innerText = clientes.length.toString();
      aClientes = clientes;
    };
  }
}

 export class Produto{
  id: number;
  nome: string;
  descricao: string;
  valorCompra: number;
  valorVenda:  number;
  qtdEstoque:  number;
  marca:  string;

  constructor(pNome: string, pDescricao: string, pValorCompra: number, 
    pValorVenda: number, pQtdEstoque: number, pMarca: string){
    this.id = Math.floor(Math.random() * 10000);
    this.nome = pNome;
    this.descricao = pDescricao;
    this.valorCompra = pValorCompra;
    this.valorVenda = pValorVenda;
    this.qtdEstoque = pQtdEstoque;
    this.marca = pMarca;
  }
}

export class Cliente{
  id: number;
  nome: string;
  cpf:  string;
  endereco: string;
  telefone: string;

  constructor(pNome: string, pCPF: string, pEndereco: string, pTelefone: string){
    this.id = Math.floor(Math.random() * 10000);
    this.nome = pNome;
    this.cpf = pCPF;
    this.endereco = pEndereco;
    this.telefone = pTelefone;
  }
}

export let aProdutos: Produto[] = [];
export let aClientes: Cliente[] = [];
export let sOption: string = 'none';

export function ProductSessionSave(pcProduto: Produto){
  aProdutos.push(pcProduto);
  sessionStorage.setItem("aProdutos", JSON.stringify(aProdutos));
}

export function ProductSessionSaveA(paProdutcts: Produto[]){
  aProdutos = paProdutcts;
  sessionStorage.setItem("aProdutos", JSON.stringify(aProdutos));
}

export function ClientSessionSaveA(paClientes: Cliente[]){
  aClientes = paClientes;
  sessionStorage.setItem("aClientes", JSON.stringify(aClientes));
}

export function ClientSessionSave(pcCliente: Cliente){
  aClientes.push(pcCliente);
  sessionStorage.setItem("aClientes", JSON.stringify(aClientes));
}

export function GetProductSession(): string{
  const produtos = sessionStorage.getItem("aProdutos");
  return produtos !== null ? produtos : "";
}

export function GetClientSession(): string{
  const clientes = sessionStorage.getItem("aClientes");
  return clientes !== null ? clientes : "";
}

export function GetIndexProduct(pId: any): number{
  for (let index = 0; index < aProdutos.length; index++) {
    const produto = aProdutos[index];
    if (produto.id = pId) {
        return index;
    }}
    return -1;
}

export function GetIndexClient(pId: any): number{
  for (let index = 0; index < aClientes.length; index++) {
    const client = aClientes[index];
    if (client.id = pId) {
        return index;
    }}
    return -1;
}

export function DeleteCLientSession(pId: any){
  aClientes.splice(GetIndexClient(pId));
  sessionStorage.setItem("aClientes", JSON.stringify(aClientes));
}

export function DeleteProductSession(pId: any){
  aProdutos.splice(GetIndexProduct(pId));
  sessionStorage.setItem("aProdutos", JSON.stringify(aProdutos));
}

