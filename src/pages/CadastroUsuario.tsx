import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { getUsuarios, adicionarUsuario } from "../services/api";

// ✅ Componentes Globais
import { ProfileSection, ProfileImage, Name } from "../components/ProfileSection";

const Title = styled.h2`
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;

  label {
    display: flex;
    align-items: center;
    font-size: 14px;
    gap: 5px;
    color: #2c3e50;
  }
`;

const CadastroUsuario: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState<"aluno" | "professor">("aluno");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async () => {
    const usuarios = await getUsuarios();
    const emailExistente = usuarios.some((u) => u.email === email);

    if (emailExistente) {
      setErro("Email já cadastrado!");
      return;
    }

    const novoUsuario = {
      id: Date.now(), // ✅ Corrigido para gerar um ID único
      nome,
      email,
      senha,
      tipo,
      foto: "https://tinyurl.com/5n8p4eb2", // 🔹 Imagem padrão
      materias: tipo === "aluno" ? [] : undefined, // 🔹 Apenas alunos têm matérias
    };

    await adicionarUsuario(novoUsuario);
    alert("Cadastro realizado com sucesso!");

    navigate(tipo === "professor" ? "/dashboard-professor" : "/dashboard-aluno");
  };

  return (
    <Container>
      <Card>
        <Title>Cadastro de Usuário</Title>

        {/* 🔹 Exibe um Avatar Padrão */}
        <ProfileSection>
          <ProfileImage src="https://tinyurl.com/5n8p4eb2" alt="Imagem de Perfil" />
          <Name>{nome || "Novo Usuário"}</Name>
        </ProfileSection>

        <Input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

        {/* 🔹 Seletor de Tipo de Usuário */}
        <RadioGroup>
          <label>
            <input type="radio" name="tipo" value="aluno" checked={tipo === "aluno"} onChange={() => setTipo("aluno")} />
            Aluno
          </label>
          <label>
            <input type="radio" name="tipo" value="professor" checked={tipo === "professor"} onChange={() => setTipo("professor")} />
            Professor
          </label>
        </RadioGroup>

        {erro && <ErrorMessage>{erro}</ErrorMessage>}

        <Button onClick={handleCadastro}>Cadastrar</Button>
      </Card>
    </Container>
  );
};

export default CadastroUsuario;
