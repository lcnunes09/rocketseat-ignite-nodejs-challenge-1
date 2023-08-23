# Desafio 1 - Nodejs

Documentation
[Doc](https://efficient-sloth-d85.notion.site/Desafio-01-2d48608f47644519a408b438b52d913f)

## Funcionalidades

A API deve conter as seguintes funcionalidades:
[x] Criação de uma task
[x] Listagem de todas as tasks
[x] Atualização de uma task pelo id
[x] Remover uma task pelo id
[x] Marcar pelo id uma task como completa
[] Importação de tasks em massa por um arquivo CSV

## Rotas e regras de negócio

Antes das rotas, vamos entender qual a estrutura (propriedades) que uma task deve ter:

- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser null
- `created_at` - Data de quando a task foi criada.
- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

### Rotas

**POST - /tasks**
[x] Deve ser possível criar uma task no banco de dados, enviando os campos title e description por meio do body da requisição.
[x] Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.

**GET - /tasks**
[x] Deve ser possível listar todas as tasks salvas no banco de dados.
[x] Também deve ser possível realizar uma busca, filtrando as tasks pelo `title` e `description`.

**PUT - /tasks/:id**
[x] Deve ser possível atualizar uma task pelo `id`.
[x] No body da requisição, deve receber somente o `title` e/ou `description` para serem atualizados.
[x] Se for enviado somente o `title`, significa que o `description` não pode ser atualizado e vice-versa.
[x] Antes de realizar a atualização, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

**DELETE - /tasks/:id**
[x] Deve ser possível remover uma task pelo `id`.
[x] Antes de realizar a remoção, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

**PATCH - /tasks/:id/complete**
[x] Deve ser possível marcar a task como completa ou não. Isso significa que se a task estiver concluída, deve voltar ao seu estado "normal".
[x] Antes da alteração, deve ser feito uma validação se o id pertence a uma task salva no banco de dados.

## Importação de CSV

[Importação](https://efficient-sloth-d85.notion.site/Cria-o-via-CSV-com-Stream-21ba6d279991473792787d9265212181?pvs=25)

## Melhorias

Validar se as propriedades `title` e `description` das rotas POST e PUT estão presentes no body da requisição.
[] PUT
[x] POST

Nas rotas que recebem o /:id, além de validar se o id existe no banco de dados, retornar a requisição com uma mensagem informando que o registro não existe.
[x] DELETE
[] PUT
[] PATCH
