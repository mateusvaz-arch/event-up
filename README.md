# EventUp 📅

O **EventUp** é uma aplicação web mobile-first desenvolvida como projeto final para a disciplina de Desenvolvimento Front-end com Frameworks. A plataforma permite a descoberta, criação e gerenciamento de eventos, focando em uma experiência de usuário fluida e responsiva.

## Funcionalidades Principais

- **Autenticação de Usuário**: Sistema de login seguro com persistência de sessão e proteção de rotas privadas via Context API.
- **Gerenciamento de Eventos (CRUD)**: Criação de eventos personalizados com título, data, localização e imagem.
- **Integração com Câmera**: Captura de fotos em tempo real diretamente do dispositivo para ilustrar novos eventos.
- **Favoritos com Contador Real-time**: Sistema de salvamento de eventos favoritos com atualização dinâmica do badge na navegação.
- **Swipe Gestures**: Interface intuitiva com suporte a gestos de deslizar para favoritar eventos (otimizado para touch).
- **Consumo de API de Clima**: Previsão do tempo integrada para a cidade e data do evento utilizando a API Open-Meteo.
- **Design Mobile-First**: Interface totalmente responsiva e otimizada para iOS e Android, respeitando áreas seguras e tamanhos de toque.

## Tecnologias Utilizadas

- **React 19**: Biblioteca principal para construção da interface.
- **React Router 7**: Gerenciamento de rotas e navegação SPA.
- **Context API**: Gerenciamento de estado global para autenticação.
- **CSS3 Moderno**: Utilização de variáveis, Flexbox, Grid e Media Queries para responsividade extrema.
- **LocalStorage**: Persistência de dados local para eventos e preferências do usuário.
- **MediaDevices API**: Integração nativa com a câmera do hardware.

## Diferenciais Mobile

O projeto foi construído sob o preceito de **Mobile-First**, incluindo tratamentos específicos:

- **iOS**: Ajustes para evitar o zoom automático em campos de input e suporte a `safe-area-inset`.
- **Android**: Otimização de áreas de toque (mínimo 44px) para melhor acessibilidade.
- **Gestos**: Implementação de `onTouch` events para interações naturais em telas sensíveis ao toque.

## Estrutura do Projeto

```
├── public
│   ├── css
│   │   └── backlog.css
│   ├── backlog.html
│   ├── data.json
│   └── index.html
├── src
│   ├── components
│   │   ├── EventCard.js
│   │   ├── EventCard.test.js
│   │   ├── Navbar.js
│   │   ├── ProtectedRoute.js
│   │   └── WeatherCard.js
│   ├── contexts
│   │   └── AuthContext.js
│   ├── pages
│   │   ├── CreateEvent.js
│   │   ├── Favorites.js
│   │   ├── Home.js
│   │   └── Login.js
│   ├── services
│   │   └── weather.js
│   ├── APirest.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── .gitignore
├── README.md
├── package-lock.json
└── package.json
```

## Como Executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

3. Para rodar os testes unitários:
   ```bash
   npm test
   ```

---

**Desenvolvido como projeto acadêmico — 2026**
