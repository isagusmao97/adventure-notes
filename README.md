# 📖 Adventure Notes 

Adventure Notes é um bloco de notas web inspirado em RPG de Fantasia. A interface simula um livro/grimório aberto, onde o usuário escreve suas notas diretamente sobre as páginas ilustradas. 

Esse projeto foi publicado na Vercel e pode ser acessado via link: https://adventure-notes.vercel.app/
Para uma melhor experiência esse projeto foi pensado para ser utilizado em telas grandes por se tratar de um livro aberto. 

## 🛠️ Tecnologias utilizadas

- **Vue 3** (com TypeScript)
- **Vue Router** — navegação entre a página inicial (Home) e o bloco de notas
- **Tailwind CSS v4** — estilização via `@theme` no CSS (sem `tailwind.config.js`)
- **Vite** — build tool e servidor de desenvolvimento
- **file-saver** — exportação de arquivos para download
- **jsPDF** — geração de arquivos `.pdf`
- **docx** — geração de arquivos `.docx`
- **Google Fonts** — fontes customizadas carregadas via `<link>`

## 📌 Funcionalidades

### 📃 Páginas
- **Home** — página inicial com banner de apresentação do projeto e botão de acesso ao bloco de notas
- **Bloco de notas** — página principal com o livro interativo

### ⚔️ Bloco de notas
- Livro ilustrado aberto em duas páginas, com áreas de texto (`<textarea>`) posicionadas sobre a imagem
- **Múltiplas abas/notas** — marcadores laterais (estilo separadores de livro) permitem criar, alternar e fechar notas independentes, cada uma com seu próprio conteúdo, o bloco de notas tem um limite de 6 abas para manter a estética do livro
- **Seletor de fonte** — 5 opções: Libre Baskerville, Space Mono, Cutive Mono, Noto Serif e Roboto
- **Seletor de cor do texto** — 7 tons (700): Slate, Neutral, Amber, Teal, Blue, Violet e Pink
- **Autosave** — o conteúdo é salvo automaticamente no `localStorage` do navegador, preservando notas, fonte, cor e demais preferências entre sessões
- **Exportação** — cada nota pode ser exportada em `.txt`, `.pdf` ou `.docx` (apenas o texto, sem a imagem de fundo do livro)
- Layout responsivo, com o livro se ajustando ao tamanho da tela (largura e altura) para evitar scroll desnecessário

## 📑 Estrutura do projeto

```
src/
  App.vue              # componente raiz, contém apenas <router-view />
  main.ts              # inicialização do app e registro do router
  router/
    index.ts           # definição das rotas (Home e Bloco de Notas)
  views/ (ou pages/)
    Home.vue           # página inicial com banner
    AdventureNotes.vue # página do bloco de notas
  assets/
    bloco-de-notas.png # ilustração do livro aberto
    marcador.png        # ilustração do marcador de aba
```

## ⚙️ Como rodar o projeto

```bash
npm install
npm run dev
```
