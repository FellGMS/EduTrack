import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios, Usuario } from "../services/api";
import Container from "../components/Container";
import Button from "../components/Button";
import { FaEnvelope, FaUser } from "react-icons/fa";
import Card from "../components/Card";

// ✅ Importando os componentes globais
import { ProfileSection, ProfileImage, Name } from "../components/ProfileSection";
import { TableWrapper, Table, Th, Td } from "../components/TableComponents";
import { ProgressBarContainer, ProgressBar } from "../components/ProgressBar";

import styled from "styled-components";

// 🔹 Filtros para Ordenação
const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;

  label {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: black;
  }
`;

const DashboardAluno: React.FC = () => {
  const [aluno, setAluno] = useState<Usuario | null>(null);
  const [ordenarMaior, setOrdenarMaior] = useState(false);
  const [ordenarMenor, setOrdenarMenor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAluno = async () => {
      const data = await getUsuarios();
      const usuarioEmail = localStorage.getItem("usuarioEmail");

      if (usuarioEmail) {
        const usuarioAtual = data.find((user) => user.email === usuarioEmail);
        setAluno(usuarioAtual || null);
      }
    };

    fetchAluno();
  }, []);

  const getMateriasOrdenadas = () => {
    if (!aluno || !aluno.materias) return [];
    let materiasOrdenadas = [...aluno.materias];

    if (ordenarMaior) {
      materiasOrdenadas.sort((a, b) => (b.nota ?? 0) - (a.nota ?? 0));
    } else if (ordenarMenor) {
      materiasOrdenadas.sort((a, b) => (a.nota ?? 0) - (b.nota ?? 0));
    }

    return materiasOrdenadas;
  };

  return (
    <Container>
      {aluno ? (
        <Card>
          <ProfileSection>
            <ProfileImage src={aluno.foto} alt="Foto de Perfil" />
            <Name>{aluno.nome}</Name>
          </ProfileSection>

          {/* 🔹 Botão para acessar o perfil */}
          <Button onClick={() => navigate("/perfil-aluno")}>
            <FaUser />
            &nbsp; Ver Perfil
          </Button>

          {/* 🔹 Filtros de Ordenação */}
          <FiltersContainer>
            <label>
              <input
                type="checkbox"
                checked={ordenarMaior}
                onChange={() => {
                  setOrdenarMaior(!ordenarMaior);
                  setOrdenarMenor(false);
                }}
              />
              Melhor Desempenho
            </label>
            <label>
              <input
                type="checkbox"
                checked={ordenarMenor}
                onChange={() => {
                  setOrdenarMenor(!ordenarMenor);
                  setOrdenarMaior(false);
                }}
              />
              Pior Desempenho
            </label>
          </FiltersContainer>

          {/* 🔹 Tabela de Matérias */}
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>Disciplina</Th>
                  <Th>Nota</Th>
                </tr>
              </thead>
              <tbody>
                {getMateriasOrdenadas().map((materia, index) => (
                  <tr key={index}>
                    <Td>{materia.nome}</Td>
                    <Td>
                      {materia.nota ?? 0}%
                      <ProgressBarContainer>
                        <ProgressBar percentage={materia.nota ?? 0} />
                      </ProgressBarContainer>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>

          {/* 🔹 Botão de Contato */}
          <Button>
            <FaEnvelope />
            &nbsp; Falar com o Professor
          </Button>
        </Card>
      ) : (
        <p>Carregando...</p>
      )}
    </Container>
  );
};

export default DashboardAluno;
