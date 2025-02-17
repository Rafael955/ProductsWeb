import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../../config/environment';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edicao-produtos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-produtos.component.html',
  styleUrl: './edicao-produtos.component.css'
})
export class EdicaoProdutosComponent {
  //atributos do componente
     categorias: any[] = [];
     produto: any;
     mensagem: string = '';
     id: string = '';
   
    //construtor para inicializar bibliotecas
    constructor(
      private http: HttpClient, 
      private activatedRoute: ActivatedRoute) {}
  
    //função executada quando o componente é criado
    ngOnInit(){
      //capturando o id do produto
      this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

      this.http.get(config.apiProdutos + '/' + this.id)
      .subscribe({
        next:(data: any) => {
          //preencher o formulário com os dados do produto
          this.form.patchValue(data);
          // this.form.patchValue({categoryId: data['categoryId']});
        }
      });

      //consultando as categorias na API
      this.http.get(config.apiCategorias)
      .subscribe({
        next: (data) => {
          this.categorias = data as any[];
        }
      })
    }
  
    //criando a estrutura do formulário
    form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      price: new FormControl('', [Validators.required, Validators.min(0.01)]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
      categoryId: new FormControl('', [Validators.required])
    });
  
    //função para capturar o submit do formulário
    onSubmit() {
      //console.log(this.form.value)
      //console.log(this.form.value); //exibindo no console os dados do formulário
      this.http.put(config.apiProdutos + '/' + this.id, this.form.value)
        .subscribe({
          next: (data: any) => {
            //console.log(data);
            this.mensagem = data.message; //capturando a mensagem da API
          }
        })
    }
}
