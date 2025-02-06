import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { adicionarMateria } from "../services/api";

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

const CadastroMateria: React.FC = () => {
  const [nomeMateria, setNomeMateria] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleCadastroMateria = async () => {
    if (!nomeMateria.trim()) {
      setErro("O nome da matéria é obrigatório!");
      return;
    }

    await adicionarMateria({ nome: nomeMateria.trim() });
    alert("Matéria cadastrada com sucesso!");
    navigate("/dashboard-professor");
  };

  return (
    <Container>
      <Card>
        <Title>Cadastro de Matéria</Title>
        <Input type="text" placeholder="Nome da Matéria" value={nomeMateria} onChange={(e) => setNomeMateria(e.target.value)} />
        {erro && <ErrorMessage>{erro}</ErrorMessage>}
        <Button onClick={handleCadastroMateria}>Cadastrar Matéria</Button>
      </Card>
    </Container>
  );
};

export default CadastroMateria;
