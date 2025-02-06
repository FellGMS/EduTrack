import { useState, useEffect } from "react";
import { getUsuarios, Usuario } from "../services/api";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import { ProfileSection, ProfileImage, Name } from "../components/ProfileSection";
import { TableWrapper, Table, Th, Td } from "../components/TableComponents";
import { useNavigate } from "react-router-dom";

const PerfilProfessor: React.FC = () => {
  const [professor, setProfessor] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessor = async () => {
      const data = await getUsuarios();
      const usuarioEmail = localStorage.getItem("usuarioEmail");

      if (usuarioEmail) {
        const usuarioAtual = data.find((user) => user.email === usuarioEmail);
        if (usuarioAtual && usuarioAtual.tipo === "professor") {
          setProfessor(usuarioAtual);
        }
      }
    };

    fetchProfessor();
  }, []);

  return (
    <Container>
      <Card>
        {professor ? (
          <>
            <ProfileSection>
              <ProfileImage src={professor.foto} alt="Foto de Perfil" />
              <Name>{professor.nome}</Name>
            </ProfileSection>

            <h3>Disciplinas Ministradas</h3>

            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <Th>Disciplina</Th>
                  </tr>
                </thead>
                <tbody>
                  {professor.materias?.map((materia, index) => (
                    <tr key={index}>
                      <Td>{materia.nome}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>

            <Button onClick={() => navigate("/dashboard-professor")}>Voltar ao Dashboard</Button>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </Card>
    </Container>
  );
};

export default PerfilProfessor;
