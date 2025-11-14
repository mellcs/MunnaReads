# 🍰  MunnaReads  
Um aplicativo mobile feito em **React Native + Expo**, criado para ajudar leitores a organizar suas leituras sem a pressão de uma rede social. Aqui, você registra seus livros, salva citações importantes e ainda recebe recomendações personalizadas baseadas no que já leu.  

---
## 🍰  Funcionalidades  
- 𖦹 **Estante virtual**: registre seus livros com título, autor, capa e citação.  
- 𖦹 **Citações favoritas**: visualize todas as frases marcantes que você salvou.  
- 𖦹 **Recomendações personalizadas**: integração com **OpenAI** para sugerir novos livros de acordo com suas leituras.  
- 𖦹 **Perfil do leitor**: gerencie seus dados e acompanhe seu progresso.  
- 𖦹 **Tela de boas-vindas**: experiência simples e intuitiva para começar.
- 𖦹 **Favoritar livros**: o aplicativo permite selecionar os livros favoritos e exibí-los em uma lista.

---
## 🍰  Problema, solução e público alvo:
- 𖦹 **Problema**: A maior parte dos aplicativos de leitura possui elementos sociais (ranking, metas, feed, desafios), o que cria pressão e comparação constante. Leitores que preferem privacidade acabam desmotivados ou sobrecarregados.
- 𖦹 **A solução**: Criar um aplicativo mínimo, privado e acolhedor, focado apenas no leitor, permitindo que ele organize sua leitura sem julgamentos sociais.
- 𖦹 **Público Alvo**: Leitores que querem registrar leituras em um espaço tranquilo, não gostam de pressão social de apps como Goodreads, e preferem simplicidade e foco pessoal.

---
## 🍰  Fluxos principais no MVP:
- 𖦹 **Adicionar um livro**: Acessar AddBook; Inserir título, autor e (opcionalmente) uma citação; Ao salvar, aparece na estante.
- 𖦹 **Favoritar livros**: Abrir qualquer livro da estante; Marcar como favorito; Ver lista em FavoritesScreen.
- 𖦹 **Visualizações citações**: Inserir citação ao adicionar um livro; Acessar Quotes para ver a lista completa.
- 𖦹 **Gerenciar perfil**: Ver estatísticas e dados básicos; Mudar a foto de perfil.
- 𖦹 **Recomendações personalizadas (Open AI)**: Acessar recommendations; App envia os dados dos livros cadastrados pelo usuário ao modelo da OpenAI; Mostra sugestões personalizadas com loading.

---
## 🍰  Arquitetura:
- 𖦹 **Adicionar um livro**: Acessar AddBook; Inserir título, autor e (opcionalmente) uma citação; Ao salvar, aparece na estante.
- 𖦹 **Favoritar livros**: Abrir qualquer livro da estante; Marcar como favorito; Ver lista em FavoritesScreen.
- 𖦹 **Visualizações citações**: Inserir citação ao adicionar um livro; Acessar Quotes para ver a lista completa.
- 𖦹 **Gerenciar perfil**: Ver estatísticas e dados básicos; Mudar a foto de perfil.

---
## 🍰  Decisões técnicas e trade-offs:
- 𖦹 **React Native + Expo**: Motivado pelo desenvolvimento rápido sem configuração ativa, mas há menos controle sobre módulos nativos.
- 𖦹 **AsyncStorage como banco de dados**: O app é pessoal, local e não precisa de login, no entanto não há sincronização entre dispositivos, autenticação, e é limitado para buscas complexas.
- 𖦹 **Ausência de backend**: Reduz o escopo, evita sobrecarga e permite entregar um MVP funcional, mas sacrifica recursos 
- 𖦹 **OpenAI para recomendações**: Cria recomendações realmente personalizadas sem treinar modelos, mas requer a API Key e depende de internet.
- 𖦹 **Typescript**: É uma linguagem simples que melhora a previsibilidade do código, mas precisa manter as tipagens atualizadas.

---
## 🍰  Tecnologias  

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [React Navigation](https://reactnavigation.org/)  
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)  
- [OpenAI API](https://platform.openai.com/)  
- [Expo Vector Icons](https://icons.expo.fyi/)  

---
## 🍰  Instalação e execução  

Clone o repositório:  
```bash
git clone https://github.com/seu-usuario/munnareads.git
cd munnareads
```

Instale as dependências:
```bash
npm install
# ou
yarn install
```

Crie um arquivo .env na raiz com sua chave da OpenAI:
```bash
OPENAI_API_KEY = sua_chave_aqui
```

Execute o app:
```bash
npx expo start
```

Baixe o aplicativo do Expo Go no seu celular e escaneie o QR Code.

---

## 🍰  Estrutura de pastas 
```bash
MunnaReads/
├── assets/
│   └── ...
├── src/
│   ├── screens/
│   │   ├── AddBook.tsx
│   │   ├── IndividualBook.tsx
│   │   ├── MainScreen.tsx
│   │   ├── Profile.tsx
│   │   ├── Quotes.tsx
│   │   ├── Recommendations.tsx
│   │   ├── Shelf.tsx
│   │   ├── FavoritesScreen.tsx
│   │   └── WelcomeScreen.tsx
│   ├── navigation/
│   │   └── Routes.tsx
│   ├── types/
│   │   └── env.d.ts
├── .env
├── .gitignore
├── app.json
├── App.tsx
├── babel.config.js
├── index.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```

---
## 🍰  Variáveis de ambiente
OPENAI_API_KEY é a chave da API da OpenAI usada para gerar recomendações. Basta ir até o site da OpenAI e gerar sua própria chave para usar o sistema de recomendações.

---
## 🍰  Teste manual
- 𖦹 **Fluxo 1**: Adicionar livro. Ir em AddBook → Preencher título e autor → Salvar.
- 𖦹 **Fluxo 2**: Recomendações. Ir em Recommendations → Aguardar o loading → Retorna as sugestões baseadas nos livros salvos.
- 𖦹 **Fluxo 3**: Favoritar. Abrir um livro → Favoritar → Checar em FavoritesScreen.
- 𖦹 **Fluxo 4**: Citações. Acessar quotes → Lista as citações salvas.

---
## 🍰  Roadmap
- 𖦹 **Modo escuro**
- 𖦹 **Tags e categorias**
- 𖦹 **Estatísticas de leitura**
- 𖦹 **Backup e sincronização entre dispositivos**
- 𖦹 **Widget de leitura atual**

---
## 🍰  Limitações conhecidas
- 𖦹 **Sem login ou contas múltiplas**
- 𖦹 **Dados só ficam salvos localmente**
- 𖦹 **Recomendações dependem da OpenAI**
- 𖦹 **Backup e sincronização entre dispositivos**
- 𖦹 **Sem filtros avançados na estante**

---

## 🍰  Licença
Este projeto é de uso pessoal/educacional. Fique à vontade para clonar, estudar e adaptar.
