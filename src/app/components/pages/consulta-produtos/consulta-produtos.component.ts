import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { config } from '../../../config/environment';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consulta-produtos',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent {

   produtos: any[] = []; //array de produtos para capturar os produtos retornados pelo endpoint da API
   mensagem: string = ''; //mensagem de sucesso

  //método construtor para declarar
  //e inicializar o HttpClient
  constructor(private http: HttpClient) { }


  //função executada no momento
  //em que o componente é carregado
  ngOnInit() {

    //chamada para o ENDPOINT GET da API de produtos
    this.http.get(config.apiProdutos)
      .subscribe({ //aguardando a resposta da API
        next: (data) => { //capturando o retorno da API
          console.log(data); //exibindo no console
          this.produtos = data as any[]; //atribuindo o retorno da API ao array de produtos
        }
      })
  }

  onDelete(id: string){
    if(confirm('Deseja realmente excluir o produto desejado?'))
    {
      this.http.delete(config.apiProdutos + "/" + id)
      .subscribe({
        next:(data: any) => {
          // console.log(data);
          this.mensagem = data.message; //capturando a mensagem
          this.ngOnInit(); // recarregar a lista
        }
      })
    }
  }
}


