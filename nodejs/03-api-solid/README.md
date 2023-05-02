# App

Gympass style app

## RFs (Requisitos Funcionais)

- [ ] Deve ser possível criar uma conta;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil do usuário logado;
- [ ] Deve ser possível obter o 'numero de checkins' do usuário logado;
- [ ] Deve ser possível obter o hist'orico de checkins do usuário logado;
- [ ] Deve ser possível buscar academias próximas;
- [ ] Deve ser possível buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar checkin em uma academia;
- [ ] Deve ser possível validar o checkin do usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [ ] Não deve ser possível cadastrar uma conta com e-mail já existente;
- [ ] O usuário não pode fazer 2 checkins no mesmo dia;
- [ ] O usuário não pode fazer checkin se não estiver perto (100m) de uma academia;
- [ ] O checkin só pode ser validade até 20 minutos após criado;
- [ ] O checkin só pode ser validade por administradores;
- [ ] A academia só pode ser cadastrada por administradores;


## RNFs (Requisitos Não Funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas;
- [ ] O usuário deve ser identificado por um JWT;
- [ ] 
