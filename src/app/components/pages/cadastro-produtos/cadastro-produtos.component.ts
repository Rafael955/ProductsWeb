import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../../config/environment';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-cadastro-produtos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent {
  
   //atributos do componente
   categorias: any[] = [];
   mensagem: string = '';
   mensagem_erro: string = '';
 
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
    name: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    price: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(999999)]),
    quantity: new FormControl('', [Validators.required, Validators.min(1),Validators.max(99999)]),
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
        }, error: (err) => {
          console.error(err);
          this.mensagem_erro = err.message;
          // <insert code for what to do on failure>
        }
      })
  }
}
