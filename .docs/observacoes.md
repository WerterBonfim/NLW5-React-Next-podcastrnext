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
* Crie um arquivo na raiz da aplicação chamado: next.config.js para 




# GetStaticPaths

```typescript

getStaticPaths: GetStaticPaths = async () => {
    return {
        // gera staticamente cada pagina listada abaixo,
        // neste caso vai gerar a pagina tdd
        // EX: tutoriais/[tdd]
        paths: [     
            {       
                params: {
                    slug: 'tdd'
                }
            }
        ],
        // 3 opções, true | false | 'blocking'
        
        // false -> se não retornado uma pagina estatica, resulta 
        // em 404
        
        // true -> se não encontrar a pagina estatica, o next ira
        // gerar pagina no lado do cliente (SPA), com isso 
        // o usuário verá a página com um indicador de carregamento
        // OBS: use o useRouter e a proprieade isFallback para 
        // gerar uma mensagem de espera para o usuario

        // blocking -> se a pagina estatica não for encontrada
        // o servidor next ira gerar de forma identica ao SSR e
        // cachear para futuras requisições
        fallback: 'blocking'
    }
}

```

Resumo:
* Se true -> Gera no Cliente 
* Se false -> 404 caso não encontre a pagina estatica
* blocking -> Gera dinamico (SSR) caso não esteja em cache
* paths -> gerar as paginas listadas no momento do build


Obs: Pesquisar varias estrategias e boas práticas do getStaticPaths


# Meta tags

É possivel usar qualquer meta tag dentro do component Head do next

```typescript
import Head from 'next/head';

<>
    <Head>
        <title>{episode.title} | Podcastr </title>        
    </Head>
</>


```
