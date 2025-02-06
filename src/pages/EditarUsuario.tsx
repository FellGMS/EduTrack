import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { getUsuarios, atualizarUsuario, Usuario } from "../services/api";

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

const EditarUsuario: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioEmail = localStorage.getItem("usuarioEmail");
    if (!usuarioEmail) {
      navigate("/"); // 🔹 Redireciona para login se não estiver logado
      return;
    }

    const verificarUsuario = async () => {
      const usuarios = await getUsuarios();
      const usuarioAtual = usuarios.find((u) => u.email === usuarioEmail);

      if (!usuarioAtual || usuarioAtual.tipo !== "professor") {
        navigate("/dashboard-professor"); // 🔹 Somente Professores podem acessar essa página
        return;
      }

      const usuarioParaEditar = usuarios.find((u) => u.id === Number(id)); // 🔹 Convertendo ID para número

      if (!usuarioParaEditar) {
        setErro("Usuário não encontrado.");
        return;
      }

      setUsuario(usuarioParaEditar);
      setNome(usuarioParaEditar.nome);
      setEmail(usuarioParaEditar.email);
    };

    verificarUsuario();
  }, [id, navigate]);

  const handleSalvar = async () => {
    if (!nome || !email) {
      setErro("Todos os campos são obrigatórios!");
      return;
    }

    if (usuario) {
      await atualizarUsuario(usuario.id, { nome, email });
      alert("Usuário atualizado com sucesso!");
      navigate("/dashboard-professor");
    }
  };

  return (
    <Container>
      <Card>
        <Title>Editar Usuário</Title>

        {erro ? (
          <ErrorMessage>{erro}</ErrorMessage>
        ) : usuario ? (
          <>
            <ProfileSection>
              <ProfileImage src={usuario.foto} alt="Imagem de Perfil" />
              <Name>{nome}</Name>
            </ProfileSection>

            <Input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Button onClick={handleSalvar}>Salvar Alterações</Button>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </Card>
    </Container>
  );
};

export default EditarUsuario;
