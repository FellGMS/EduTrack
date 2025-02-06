import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios, removerUsuario, Usuario } from "../services/api";
import Container from "../components/Container";
import { FaEdit, FaTrash, FaUserPlus, FaClipboardList, FaUser } from "react-icons/fa";
import Card from "../components/Card";

// ✅ Componentes globais reutilizáveis
import IconButton from "../components/IconButton";
import AdminButton from "../components/AdminButton";
import { TableWrapper, Table, Th, Td } from "../components/TableComponents";
import { ProgressBarContainer, ProgressBar } from "../components/ProgressBar";
import { ProfileSection, ProfileImage, Name } from "../components/ProfileSection";

// ✅ Estilização personalizada
import styled from "styled-components";

const ProfileActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
`;

const ProfessorTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 5px;
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

  // ✅ Função para excluir usuário com confirmação
  const handleExcluirUsuario = async (id: number, nome: string) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir o aluno "${nome}"?`);
    
    if (confirmacao) {
      await removerUsuario(id);
      alert(`Usuário "${nome}" removido com sucesso!`);

      // Atualiza a lista após a remoção
      setAlunos(alunos.filter((aluno) => Number(aluno.id) !== id));
    }
  };

  // ✅ Função para calcular a média de notas
  const calcularMedia = (materias?: { nome: string; nota?: number }[]) => {
    if (!materias || materias.length === 0) return 0;

    const notasValidas = materias
      .filter((materia) => materia.nota !== undefined)
      .map((materia) => materia.nota as number);

    if (notasValidas.length === 0) return 0;

    const somaNotas = notasValidas.reduce((total, nota) => total + nota, 0);
    return Math.round(somaNotas / notasValidas.length);
  };

  // ✅ Redireciona para Dashboard do Aluno com ID correto
  const handleGerarRelatorio = (id: number) => {
    navigate(`/dashboard-aluno/${id}`); // Agora a URL terá o ID correto
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
                <ProfessorTitle>Professor:</ProfessorTitle>
                <ProfileImage src={professor.foto} alt="Foto de Perfil" />
                <Name>{professor.nome}</Name>

                {/* 🔹 Botões organizados com o mesmo estilo */}
                <ProfileActions>
                  <AdminButton onClick={() => navigate("/cadastro")}>
                    <FaUserPlus />
                    Adicionar Usuário
                  </AdminButton>
                  <AdminButton onClick={() => navigate("/perfil-professor")}>
                    <FaUser />
                    Ver Perfil
                  </AdminButton>
                </ProfileActions>
              </ProfileSection>
            )}

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
                    <tr key={String(aluno.id)}>
                      <Td>{aluno.nome}</Td>
                      <Td>
                        <strong>{calcularMedia(aluno.materias || [])}%</strong>
                        <ProgressBarContainer>
                          <ProgressBar percentage={calcularMedia(aluno.materias || [])} />
                        </ProgressBarContainer>
                      </Td>
                      <Td>
                        <IconButton title="Gerar Relatório" onClick={() => handleGerarRelatorio(Number(aluno.id))}>
                          <FaClipboardList />
                        </IconButton>
                        <IconButton title="Editar" onClick={() => navigate(`/editar-usuario/${Number(aluno.id)}`)}>
                          <FaEdit />
                        </IconButton>
                        <IconButton title="Excluir" onClick={() => handleExcluirUsuario(Number(aluno.id), aluno.nome)}>
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
