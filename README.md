# 📚 EduTrack – Sistema de Gestão Educacional  

O **EduTrack** é uma plataforma de gestão acadêmica que permite o acompanhamento do desempenho dos alunos e professores. O sistema oferece um ambiente interativo e gamificado, onde os alunos podem visualizar suas notas e conquistas, enquanto os professores gerenciam turmas e monitoram o progresso acadêmico.

---

## ⚙️ Tecnologias Utilizadas  

- **React + Vite** – Desenvolvimento do frontend  
- **TypeScript** – Tipagem estática e segurança no código  
- **Styled Components** – Estilização dos componentes  
- **JSON Server** – API fake para simulação de banco de dados  
- **Axios** – Requisições HTTP  

---

## 🚀 Funcionalidades  

### 🔹 Para Professores:  
✔️ Visualização e gerenciamento dos alunos cadastrados  
✔️ Acompanhamento do desempenho médio dos alunos  
✔️ Edição e exclusão de perfis de alunos  
✔️ Acesso a relatórios individuais de desempenho  

### 🔹 Para Alunos:  
✔️ Acompanhamento de notas e progresso acadêmico  
✔️ Sistema de **conquistas** baseado em desempenho  
✔️ Interface gamificada para incentivo e aprendizado contínuo  

---

## 📌 Pré-requisitos  

Antes de iniciar, instale as seguintes dependências no seu sistema:  
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
└── README.md      # 📜 Documentação do projeto
```

---

## 🔧 Como Configurar e Executar  

### 1️⃣ Clonar o repositório  

```sh
git clone https://github.com/FellGMS/EduTrack.git
```

Acesse o diretório do projeto:

```sh
cd EduTrack/frontend
```

---

### 2️⃣ Instalar as dependências  

Usando **npm**:  

```sh
npm install
```

Ou com **yarn**:  

```sh
yarn install
```

---

### 3️⃣ Iniciar a API Fake (JSON Server)  

```sh
npm run mock-api
```

Se estiver usando **yarn**:

```sh
yarn mock-api
```

📢 **A API será iniciada em:** `http://localhost:5000`

---

### 4️⃣ Iniciar o Frontend  

Após iniciar a API, abra outro terminal e execute:  

```sh
npm run dev
```

Ou com **yarn**:

```sh
yarn dev
```

📢 **O frontend será iniciado em:** `http://localhost:5173`

---

## 🎯 Acesso ao Sistema  

🔹 **Login:** `http://localhost:5173/login`  
🔹 **Dashboard Professor:** `http://localhost:5173/dashboard-professor`  
🔹 **Dashboard Aluno:** `http://localhost:5173/dashboard-aluno/{id}`  

---

## 🛠 Contribuição  

Contribuições são bem-vindas! Para colaborar:  

1. Faça um **fork** do repositório  
2. Crie uma **branch** para sua funcionalidade (`git checkout -b minha-feature`)  
3. Faça o **commit** (`git commit -m "Adiciona nova funcionalidade X"`)  
4. Faça um **push** (`git push origin minha-feature`)  
5. Abra um **Pull Request**  

📌 **Criado por:** [Felipe GMS](https://github.com/FellGMS)  
📌 **Repositório:** [EduTrack](https://github.com/FellGMS/EduTrack)  

---

## 🏆 Licença  

📝 **MIT License** – Fique à vontade para usar e melhorar!  
