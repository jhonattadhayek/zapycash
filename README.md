# ZapyCash Dashboard

Dashboard administrativo para gerenciamento de transações e usuários do ZapyCash.

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Vite
- Jest (para testes)

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/jhonattadhayek/zapycash.git
cd zapycash
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run test` - Executa os testes
- `npm run lint` - Executa o linter

## Estrutura do Projeto

O projeto segue uma estrutura modular e organizada para facilitar a manutenção e escalabilidade:

```
src/
  ├── components/     # Componentes React reutilizáveis
  ├── pages/         # Páginas da aplicação
  ├── services/      # Serviços e integrações
  ├── utils/         # Funções utilitárias
  └── styles/        # Estilos globais e configurações do Tailwind
```

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 