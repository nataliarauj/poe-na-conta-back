# Poe na Conta – Back-end

Este repositório contém o back-end do projeto **Poe na Conta**, uma plataforma desenvolvida pela organização PoeNaConta. A API é responsável pelo processamento dos dados financeiros, autenticação de usuários, regras de negócio e integração com o banco de dados. Ela suporta funcionalidades principais como:

- Autenticação de usuários via JWT
- Registro e gerenciamento de transações financeiras
- Organização por categorias (entradas, saídas, dívidas, ganhos)
- Cálculo e visualização de saldos, totais por categoria e outros indicadores
- Rotina automática de exclusão de dados antigos
- Integração com sistema de envio de e-mails (notificações)

---

## Tecnologias utilizadas

- **Ambiente**: Node.js
- **Framework**: Express
- **ORM**: Sequelize
- **Linguagem**: JavaScript
- **Autenticação**: JSON Web Token (JWT)
- **Banco de Dados**: PostgreSQL
- **Envio de e-mails**: Nodemailer
- **Agendamentos**: Node Cron
