import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../../config/environment';

@Component({
  selector: 'app-cadastro-produtos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent {
  
   //atributos do componente
   categorias: any[] = [];
   mensagem: string = '';
 
  //construtor para inicializar bibliotecas
  constructor(private http: HttpClient) {}

  //função executada quando o componente é criado
  ngOnInit(){
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
    //console.log(this.form.value); //exibindo no console os dados do formulário
    this.http.post(config.apiProdutos, this.form.value)
      .subscribe({
        next: (data: any) => {
          //console.log(data);
          this.mensagem = data.message; //capturando a mensagem da API
          this.form.reset(); //limpando o formulário
          this.form.patchValue({ categoryId: '' });
        }
      })
  }
}
