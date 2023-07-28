# Cadastro de carro

**RF**
Deve ser possivel cadastrar um novo carro



**RN**
Não deve ser possivel cadastar um dcarro com uma placa ja existente.
O carro deve ser cadastrado com disponibilidade por padrão.
O usuário responsavel pelo cadastro deve ser um usuario administrador.


# Listagem de carro

**RF**
Deve ser possivel listar todos os carros disponiveis
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria
Deve ser possivel listar todos os carros disponiveis pelo nome da marca
Deve ser possivel listar todos os carros disponiveis pelo nome da carro

**RN**
O usuário não precisar estar logado no sistema


# Cadastro de especificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro.
Deve ser possiovel listar todas as especificaçoes.
Deve ser possivel listar todos os carros.

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação ja esxistente para o mesmo carro.
O usuário responsavel pelo cadastro deve ser um usuario administrador.


# Cadastro de imagens do carro

**RF**
Deve ser possivel cadastrar a imagem do carro

**RNF**
utilizar o multer para upload dos arquivos

**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
O usuario responsavel pelo cadastro deve ser um usuario administrador


# Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel

**RN**
O aluguel deve ter duração minima de 24hora
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro