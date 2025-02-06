import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios, Usuario } from "../services/api";
import Container from "../components/Container";
import { FaEdit, FaTrash, FaUserPlus, FaBook, FaClipboardList, FaUser } from "react-icons/fa";
import Card from "../components/Card";

// ✅ Componentes globais reutilizáveis
import IconButton from "../components/IconButton";
import AdminButton from "../components/AdminButton";
import { TableWrapper, Table, Th, Td } from "../components/TableComponents";
import { ProgressBarContainer, ProgressBar } from "../components/ProgressBar";
import { ProfileSection, ProfileImage, Name } from "../components/ProfileSection";
import Button from "../components/Button";

// ✅ Botões de Administração
import styled from "styled-components";

const AdminButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 10px;
`;

const ProfileActions = styled.div`
  margin-top: 10px;
`;

const DashboardProfessor: React.FC = () => {
  const [professor, setProfessor] = useState<Usuario | null>(null);
  const [alunos, setAlunos] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDados = async () => {
      const data = await getUsuarios();
      const usuarioEmail = localStorage.getItem("usuarioEmail");

      if (usuarioEmail) {
        const usuarioAtual = data.find((user) => user.email === usuarioEmail);
        if (usuarioAtual && usuarioAtual.tipo === "professor") {
          setProfessor(usuarioAtual);
        }
      }

      const alunosFiltrados = data.filter((user) => user.tipo === "aluno");
      setAlunos(alunosFiltrados);
      setLoading(false);
    };

    fetchDados();
  }, []);

  // ✅ Corrigido: Verifica se "materias" existe antes de calcular a média para evitar erro
  const calcularMedia = (materias?: { nome: string; nota?: number }[]) => {
    if (!materias || materias.length === 0) return 0; // Se não houver matérias, retorna 0

    // 🔹 Filtra apenas matérias que possuem nota válida (ignora undefined)
    const notasValidas = materias
      .filter((materia) => materia.nota !== undefined)
      .map((materia) => materia.nota as number);

    if (notasValidas.length === 0) return 0; // Se todas as notas forem undefined, retorna 0

    const somaNotas = notasValidas.reduce((total, nota) => total + nota, 0);
    return Math.round(somaNotas / notasValidas.length);
  };

  return (
    <Container>
      <Card>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {professor && (
              <ProfileSection>
                <ProfileImage src={professor.foto} alt="Foto de Perfil" />
                <Name>{professor.nome}</Name>

                {/* ✅ Botão "Ver Perfil" abaixo do nome com espaçamento */}
                <ProfileActions>
                  <Button onClick={() => navigate("/perfil-professor")}>
                    <FaUser />
                    &nbsp; Ver Perfil
                  </Button>
                </ProfileActions>
              </ProfileSection>
            )}

            {/* 🔹 Botões de Administração - Apenas para Professores */}
            <AdminButtonsContainer>
              <AdminButton onClick={() => navigate("/cadastro")}>
                <FaUserPlus />
                Adicionar Usuário
              </AdminButton>

              <AdminButton onClick={() => alert("Adicionar Matéria")}>
                <FaBook />
                Adicionar Matéria
              </AdminButton>
            </AdminButtonsContainer>

            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <Th>Nome</Th>
                    <Th>Desempenho Médio</Th>
                    <Th>Ações</Th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((aluno) => (
                    <tr key={aluno.id}>
                      <Td>{aluno.nome}</Td>
                      <Td>
                        {/* ✅ Garante que "materias" seja um array vazio caso seja undefined */}
                        <strong>{calcularMedia(aluno.materias || [])}%</strong>
                        <ProgressBarContainer>
                          <ProgressBar percentage={calcularMedia(aluno.materias || [])} />
                        </ProgressBarContainer>
                      </Td>
                      <Td>
                        <IconButton title="Gerar Relatório">
                          <FaClipboardList />
                        </IconButton>
                        {/* ✅ Agora o botão leva à tela de edição */}
                        <IconButton title="Editar" onClick={() => navigate(`/editar-usuario/${aluno.id}`)}>
                          <FaEdit />
                        </IconButton>
                        <IconButton title="Excluir">
                          <FaTrash />
                        </IconButton>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          </>
        )}
      </Card>
    </Container>
  );
};

export default DashboardProfessor;
