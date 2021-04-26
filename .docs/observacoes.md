# SSR - Server Side Render

* O next consome os recursos (API) a cada requisição, busca os dados
atrávez da função getServerSideProps

```typescript

// SSR
export default function Home(props) {

    // acesso ao props.episodes

    return (

    );
}
// Maneira do next efetuar um SSR
export async function getServerSideProps() {
    const response = await fetch('')
    const data = await response.json();

    return {
        props: {
            episodes: data
        }
    }
}

```
# SSG - Server Static Generation
 
* Gera um pagina estatica, desta forma o next não ira consumir recursos (API)
a cada requisição, os dados ficam em cache pelo tempo que você configurou.


```typescript

// Maneira do next efetuar um SSG
export async function getStaticProps() {
    const response = await fetch('')
    const data = await response.json();

    return {
        props: {
            episodes: data
        },
        revalidate: 60 * 60 * 8 // a cada 8 horas sera gerado uma nova versão desta pagina
    }
}
```

# Nest Recursos

* Image: Define a altura e largura que eu quero carregar 

Como usar:

Crie um arquivo na raiz da aplicação chamado: next.config.js para 
