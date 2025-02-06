```markdown
### 🚀 EduTrack - Sistema de Gestão Educacional

Bem-vindo ao **EduTrack**! 🎓📚 Um sistema educacional intuitivo que permite a **gestão de desempenho acadêmico** de alunos e professores.  
✔️ Professores podem gerenciar alunos, editar notas e acompanhar o progresso.  
✔️ Alunos têm acesso a um painel interativo com **notas**, **progresso** e **conquistas gamificadas**. 🏅  

✅ Desenvolvido com **React + TypeScript** e um banco de dados **fake** via **JSON Server** para simular uma API.  

---

## 📌 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

✅ **Node.js** (versão 16 ou superior)  
✅ **npm** ou **yarn**  
✅ **Git** (para clonar o repositório)

---

## 📂 Estrutura do Projeto

```bash
EduTrack/
│── frontend/      # 📂 Diretório do frontend (React + Vite)
│   ├── src/       # 📂 Código-fonte do frontend
│   ├── public/    # 📂 Arquivos públicos
│   ├── package.json   # 📜 Dependências do projeto
│   ├── vite.config.js # ⚙️ Configuração do Vite
│   └── ...        
│── db.json        # 📜 Banco de dados fake (JSON Server)
└── README.md      # 📜 Este arquivo
```

---

## ⚙️ Como Executar o Projeto

### 1️⃣ Clone o repositório

```sh
git clone https://github.com/FellGMS/EduTrack.git
```

Acesse o diretório do projeto:

```sh
cd EduTrack/frontend
```

---

### 2️⃣ Instale as dependências

Caso use **npm**:

```sh
npm install
```

Caso use **yarn**:

```sh
yarn install
```

---

### 3️⃣ Inicie a API Fake (JSON Server)

O banco de dados fake é armazenado no arquivo **db.json** e será executado via **JSON Server**.

Para iniciar:

```sh
npm run mock-api
```

Se estiver usando **yarn**:

```sh
yarn mock-api
```

📢 **A API será iniciada em:** [`http://localhost:5000`](http://localhost:5000)

---

### 4️⃣ Inicie o Frontend (React + Vite)

Após iniciar a API fake, abra outro terminal e execute:

```sh
npm run dev
```

Ou com **yarn**:

```sh
yarn dev
```

📢 **O frontend será iniciado em:** [`http://localhost:5173`](http://localhost:5173)

---

## 🎯 Acesse o Sistema

🔹 **Login:** [`http://localhost:5173/login`](http://localhost:5173/login)  
🔹 **Dashboard Professor:** [`http://localhost:5173/dashboard-professor`](http://localhost:5173/dashboard-professor)  
🔹 **Dashboard Aluno:** [`http://localhost:5173/dashboard-aluno/{id}`](http://localhost:5173/dashboard-aluno/{id}) _(substitua `{id}` pelo ID do aluno)_  

---

## 🌟 Funcionalidades  

✔️ **Login para Professores e Alunos**  
✔️ **Dashboard do Professor** → Gerenciamento de alunos, relatórios e notas 📊  
✔️ **Dashboard do Aluno** → Visualização de notas e conquistas 🏅  
✔️ **Edição de Usuário** → Permite alterar nome, email e notas dos alunos  
✔️ **Sistema de Conquistas** → Medidas motivacionais com **medalhas e badges**  

---

## 🛠 Tecnologias Utilizadas

✅ **React + Vite** → Frontend moderno e performático  
✅ **TypeScript** → Tipagem estática para segurança no código  
✅ **Styled Components** → Estilização dinâmica e modular  
✅ **JSON Server** → API Fake para simular persistência de dados  
✅ **Axios** → Requisições HTTP eficientes  

---

## 📝 Contribuição

Quer contribuir? Fork o projeto, crie uma branch e abra um PR! 🚀  

👨‍💻 **Criado por:** [Felipe GMS](https://github.com/FellGMS)  
📌 **Repositório:** [EduTrack](https://github.com/FellGMS/EduTrack)

---

## 🏆 Licença

📝 **MIT License** - Fique à vontade para usar e melhorar! 🚀  
```
