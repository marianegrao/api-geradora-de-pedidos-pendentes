# Api geradora de pedidos pendentes

![](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

Programa cuja execução cruza pedidos e notas gerando uma listagem de pedidos pendentes usando Javascript, NodeJs, Express e Yup.

## Detalhes do projeto

- API construida em 3 dias,
- Manipulação de arquivos com biblioteca nativa do NodeJs: File System
- Construida seguindo as normas previamente enviadas por e-mail.
- Utilização do Yuo para a validação dos campos.
- Commits especificando as alterações realizadas.
- Futuras implementações possíveis: utilização do Typescript e realizar o deploy.

## Testando localmente

1. Clone esse repositório
2. Dentro do diretório clonado digite `npm i`
3. Para inicializar a API digite `npm run dev`
4. Pronto! A API estará rodadando na porta 3000.

## Rotas diponiveis

url: http://localhost:3000

#### GET `${url}`/

- Tras a listagem de todos os pedidos pendentes
- Em caso de sucesso ou erro, é retornada a mensagem e status code adequados.
  ![](https://i.imgur.com/pd85d7a.png)

#### POST `${url}`/register

- Realiza a criação de um arquivo txt na pasta de dados na aplicação. O Arquivo possui os pedidos pendentes em formato JSON válido.
- Em caso de sucesso ou erro, é retornada a mensagem e status code adequados.
  ![](https://i.imgur.com/ZLUj7CX.png)

## Validações realizadas

Utilizando Yup

- O campos de notas e pedidos seguem o padrão especificado nas normas.
- Em casos onde a quantidade de produtos excedeu o solicitado no pedido, é retornado uma mensagem contendo os produtos excedidos.
- Se os numeros dos itens forem repetidos ou não tiverem um par, é retornada uma mensagem especificando isso para o usuário.

---

### Faça um feedback

**Achou esse documento incompleto?** Entre em contato [comigo](https://beacons.ai/marianegrao)!

###### tags: `api` `backend` `javascript` `npm`

---
