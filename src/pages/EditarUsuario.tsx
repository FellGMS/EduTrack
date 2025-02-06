import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { getUsuarios, atualizarUsuario, Usuario, Materia } from "../services/api";

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
`;

const Th = styled.th`
  background-color: #2c3e50;
  color: white;
  padding: 8px;
`;

const Td = styled.td`
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const EditarUsuario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState(""); // ✅ Novo campo para a URL da foto
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verificarUsuario = async () => {
      const usuarios = await getUsuarios();

      // ✅ Garante que os IDs sejam comparados corretamente
      const usuarioParaEditar = usuarios.find((u) => Number(u.id) === Number(id));

      if (!usuarioParaEditar) {
        setErro("Usuário não encontrado.");
        return;
      }

      setUsuario(usuarioParaEditar);
      setNome(usuarioParaEditar.nome);
      setEmail(usuarioParaEditar.email);
      setFoto(usuarioParaEditar.foto); // ✅ Setando a foto atual do usuário
      setMaterias(usuarioParaEditar.materias || []);
    };

    verificarUsuario();
  }, [id]);

  const handleSalvar = async () => {
    if (!nome || !email || !foto) {
      setErro("Todos os campos são obrigatórios!");
      return;
    }

    if (usuario) {
      console.log("Enviando atualização para API:", {
        nome,
        email,
        foto, // ✅ Atualizando a foto também
        materias,
      });

      const atualizado = await atualizarUsuario(usuario.id, { nome, email, foto, materias });

      if (atualizado) {
        alert("Usuário atualizado com sucesso!");
        navigate("/dashboard-professor");
      } else {
        setErro("Erro ao atualizar usuário. Tente novamente.");
      }
    }
  };

  const handleNotaChange = (index: number, novaNota: number) => {
    const novasMaterias = [...materias];
    novasMaterias[index].nota = novaNota;
    setMaterias(novasMaterias);
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
              <ProfileImage src={foto} alt="Imagem de Perfil" />
              <Name>{nome}</Name>
            </ProfileSection>

            <Input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="text" placeholder="URL da Foto" value={foto} onChange={(e) => setFoto(e.target.value)} /> {/* ✅ Novo campo */}

            <Table>
              <thead>
                <tr>
                  <Th>Disciplina</Th>
                  <Th>Nota (%)</Th>
                </tr>
              </thead>
              <tbody>
                {materias.map((materia, index) => (
                  <tr key={index}>
                    <Td>{materia.nome}</Td>
                    <Td>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={materia.nota ?? 0}
                        onChange={(e) => handleNotaChange(index, Number(e.target.value))}
                      />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>

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
