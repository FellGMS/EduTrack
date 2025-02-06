import { useState, useEffect } from "react";
import { getUsuarios, Usuario } from "../services/api";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import { ProgressBarContainer, ProgressBar } from "../components/ProgressBar";
import { ProfileSection, ProfileImage, Name } from "../components/ProfileSection";
import { TableWrapper, Table, Th, Td } from "../components/TableComponents";
import { useNavigate } from "react-router-dom";

const PerfilAluno: React.FC = () => {
  const [aluno, setAluno] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAluno = async () => {
      const data = await getUsuarios();
      const usuarioEmail = localStorage.getItem("usuarioEmail");

      if (usuarioEmail) {
        const usuarioAtual = data.find((user) => user.email === usuarioEmail);
        if (usuarioAtual && usuarioAtual.tipo === "aluno") {
          setAluno(usuarioAtual);
        }
      }
    };

    fetchAluno();
  }, []);

  return (
    <Container>
      <Card>
        {aluno ? (
          <>
            <ProfileSection>
              <ProfileImage src={aluno.foto} alt="Foto de Perfil" />
              <Name>{aluno.nome}</Name>
            </ProfileSection>

            <h3>Desempenho Acadêmico</h3>

            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <Th>Disciplina</Th>
                    <Th>Nota</Th>
                  </tr>
                </thead>
                <tbody>
                  {aluno.materias?.map((materia, index) => (
                    <tr key={index}>
                      <Td>{materia.nome}</Td>
                      <Td>
                        {materia.nota}%
                        <ProgressBarContainer>
                          <ProgressBar percentage={materia.nota} />
                        </ProgressBarContainer>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>

            <Button onClick={() => navigate("/dashboard-aluno")}>Voltar ao Dashboard</Button>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </Card>
    </Container>
  );
};

export default PerfilAluno;
