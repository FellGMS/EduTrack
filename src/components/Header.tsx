import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaSignOutAlt } from "react-icons/fa";

const NavBar = styled.nav`
  display: flex;
  min-width: 90px;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  padding: 10px 10px;
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
  overflow: hidden;
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  white-space: nowrap;
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
    setUsuarioLogado(!!usuarioEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioEmail");
    setUsuarioLogado(false);
    navigate("/");
  };

  return (
    <NavBar>
      <Logo>EduTrack</Logo>
      {usuarioLogado && (
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt /> Sair
        </LogoutButton>
      )}
    </NavBar>
  );
};

export default Header;
