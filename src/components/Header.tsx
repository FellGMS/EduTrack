import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaSignOutAlt, FaCog } from "react-icons/fa";

const NavBar = styled.nav`
  display: flex;
  min-width:100vw;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50; /* 🔹 Mantendo mesma cor do rodapé */
  padding: 10px 20px;
  font-family: "Poppins", sans-serif;
 
  box-sizing: border-box; /* 🔹 Evita estourar o layout */
  overflow: hidden;
`;

const Logo = styled(Link)`
  font-size: 22px; /* 🔹 Aumentado para maior destaque */
  font-weight: bold;
  color: white;
  text-decoration: none;
  white-space: nowrap; /* 🔹 Impede quebra de linha */
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap; /* 🔹 Permite que os itens ajustem sem estourar */
  
  @media (max-width: 900px) {
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  padding: 5px 10px;
  transition: 0.3s;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 900px) {
    font-size: 13px;
    padding: 4px 8px;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  padding: 5px 10px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 900px) {
    font-size: 13px;
    padding: 4px 8px;
  }
`;

const Header: React.FC = () => {
  const [usuarioLogado, setUsuarioLogado] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioEmail = localStorage.getItem("usuarioEmail");
    setUsuarioLogado(!!usuarioEmail); // Define true se houver usuário logado
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioEmail");
    setUsuarioLogado(false);
    navigate("/");
  };

  return (
    <NavBar>
      <Logo to="/">EduTrack</Logo>
      <NavLinksContainer>
        {usuarioLogado ? (
          <>
            <NavLink to="/dashboard-aluno">Dashboard Aluno</NavLink>
            <NavLink to="/dashboard-professor">Dashboard Professor</NavLink>
            <NavLink to="/configuracoes">
              <FaCog /> Configurações
            </NavLink>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt /> Sair
            </LogoutButton>
          </>
        ) : (
          <>
            <NavLink to="/">Login</NavLink>
            <NavLink to="/cadastro">Cadastro</NavLink>
          </>
        )}
      </NavLinksContainer>
    </NavBar>
  );
};

export default Header;
