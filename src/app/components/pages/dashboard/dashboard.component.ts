import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { config } from '../../../config/environment';
import { CommonModule } from '@angular/common';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  //atributos
  dados: any[] = [];
  grafico: Chart = new Chart();
 
  //construtor para declarar e inicializar o HttpClient
  constructor(private http: HttpClient) {}

  //função executada ao abrir o componente
  ngOnInit(){
    this.http.get(config.apiDashboard)
      .subscribe({
        next: (data) => {
          this.dados = data as any[];

           //montando os dados no padrão do highcharts
           const series: any[] = [];
           this.dados.forEach(item => {
             series.push([item.category, item.products]);
           });
 
           //criando o gráfico
           this.grafico = new Chart({
             chart: { type: 'pie' },
             title: { text: 'Quantidade de produtos por categoria.' },
             subtitle: { text: 'Somatório da quantidade de produtos para cada categoria' },
             credits: { enabled: false },
             plotOptions: {
               pie: {
                 innerSize: '50%',
                 dataLabels: { enabled: true }
               }
             },
             series: [{ data: series, type: 'pie', name: 'Categorias' }],
             legend: { enabled: false }
           });
         }
       });
   }
 
 
 }
 
 
 
