//Mapeamento da URL da API
const url = 'http://localhost:5288/api';
/*
    Objeto JSON onde iremos mapear todos os endpoints
    de APIs que estamos acessando nos componentes do Angular
*/
export const config = {
    /* endpoint de categorias */
    apiCategorias : `${url}/categories`,
    /* endpoint de produtos */
    apiProdutos : `${url}/products`,
    /* endpoint de dashboard */
    apiDashboard : `${url}/dashboard`
}



