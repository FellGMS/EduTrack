import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import DashboardProfessor from "./pages/DashboardProfessor";
import DashboardAluno from "./pages/DashboardAluno";
import CadastroUsuario from "./pages/CadastroUsuario";
import PerfilProfessor from "./pages/PerfilProfessor";
import EditarUsuario from "./pages/EditarUsuario";  // 🔹 Importando a tela de edição
import Configuracoes from "./pages/Configuracoes";  // 🔹 Nova Tela

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/dashboard-aluno" element={<DashboardAluno />} />
        <Route path="/dashboard-professor" element={<DashboardProfessor />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />  {/* 🔹 Adicionando a rota correta */}
        <Route path="/perfil-professor" element={<PerfilProfessor />} />
        <Route path="/configuracoes" element={<Configuracoes />} />  {/* 🔹 Nova Rota */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
