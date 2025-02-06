import { useState } from "react";
import styled from "styled-components";
import { getUsuarios, Usuario } from "../services/api";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;

  @media (max-width: 1024px) {
    max-width: 80%;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 25px;
    margin: 15px;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    padding: 20px;
    margin: 10px;
  }
`;

const Title = styled.h2`
  font-size: 26px;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Slogan = styled.p`
  font-size: 16px;
  color: #34495e;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const usuarios: Usuario[] = await getUsuarios();
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

    if (!usuario) {
      setErro("Email ou senha incorretos!");
      return;
    }

    localStorage.setItem("usuarioEmail", usuario.email);
    alert(`Bem-vindo, ${usuario.nome}!`);

    if (usuario.tipo === "professor") {
      navigate("/dashboard-professor");
    } else {
      navigate("/dashboard-aluno");
    }
  };

  return (
    <Container>
      <LoginCard>
        <Slogan>
          🎓<strong>EduTrack: Acompanhe, evolua, conquiste. Seu desempenho em foco.</strong><br /><br />
        </Slogan>
        
        <Title>Entrar no EduTrack</Title>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        {erro && <ErrorMessage>{erro}</ErrorMessage>}
        <Button onClick={handleLogin}>Entrar</Button>
      </LoginCard>
    </Container>
  );
};

export default Login;
