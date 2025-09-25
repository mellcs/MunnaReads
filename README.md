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

## 🍰  Licença
Este projeto é de uso pessoal/educacional. Fique à vontade para clonar, estudar e adaptar.
