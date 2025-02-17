import { Routes } from '@angular/router';
import { CadastroProdutosComponent } from './components/pages/cadastro-produtos/cadastro-produtos.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ConsultaProdutosComponent } from './components/pages/consulta-produtos/consulta-produtos.component';
import { EdicaoProdutosComponent } from './components/pages/edicao-produtos/edicao-produtos.component';

export const routes: Routes = [
    {
        path: 'pages/cadastro-produtos', //rota
        component: CadastroProdutosComponent //componente
    },
    {
        path:'pages/consulta-produtos', //rota
        component: ConsultaProdutosComponent //componente
    },
    {
        path:'pages/edicao-produtos/:id', //rota
        component: EdicaoProdutosComponent //componente
    },
    {
        path:'pages/dashboard', //rota
        component: DashboardComponent //componente
    },
    { 
        path: '',   
        pathMatch: 'full',
        redirectTo: 'pages/dashboard' 
    }, // redirect to `first-component`
];
