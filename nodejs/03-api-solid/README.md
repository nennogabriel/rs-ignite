# App

Gympass style app

## RFs (Requisitos Funcionais)

- [x] Deve ser possível criar uma conta;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil do usuário logado;
- [x] Deve ser possível obter o número de checkins' do usuário logado;
- [x] Deve ser possível obter o histórico de checkins do usuário logado;
- [ ] Deve ser possível buscar academias próximas;
- [x] Deve ser possível buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar checkin em uma academia;
- [ ] Deve ser possível validar o checkin do usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [x] Não deve ser possível cadastrar uma conta com e-mail já existente;
- [x] O usuário não pode fazer 2 checkins no mesmo dia;
- [x] O usuário não pode fazer checkin se não estiver perto (100m) de uma academia;
- [ ] O checkin só pode ser validade até 20 minutos após criado;
- [ ] O checkin só pode ser validade por administradores;
- [ ] A academia só pode ser cadastrada por administradores;


## RNFs (Requisitos Não Funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT;
