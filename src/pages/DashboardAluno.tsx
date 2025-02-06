import { useState, useEffect } from "react";
import { getUsuarios, Usuario } from "../services/api";
import Container from "../components/Container";
import Button from "../components/Button";
import { FaEnvelope, FaTimes } from "react-icons/fa";
import Card from "../components/Card";

// ✅ Importando os componentes globais
import { ProfileSection, ProfileImage, Name } from "../components/ProfileSection";
import { TableWrapper, Table, Th, Td } from "../components/TableComponents";
import { ProgressBarContainer, ProgressBar } from "../components/ProgressBar";

// ✅ Novo componente de filtros
import FiltersContainer from "../components/FiltersContainer";

// ✅ Ícones para conquistas
import { FaMedal, FaStar, FaTrophy, FaAward, FaCrown } from "react-icons/fa";
import styled from "styled-components";

// 🔹 Estilos para as Conquistas
const AchievementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const AchievementsRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const AchievementIcon = styled.div<{ active: boolean }>`
  font-size: 30px;
  color: ${(props) => (props.active ? "#FFD700" : "#C0C0C0")}; /* Ativo: dourado, Inativo: cinza */
`;

const Percentage = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

// 🔹 Estilos para o Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

const MessageInput = styled.textarea`
  width: 90%;
  height: 100px;
  margin-top: 10px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const DashboardAluno: React.FC = () => {
  const [aluno, setAluno] = useState<Usuario | null>(null);
  const [ordenarMaior, setOrdenarMaior] = useState(false);
  const [ordenarMenor, setOrdenarMenor] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

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

  // 🔹 Calcula a média geral do aluno
  const calcularMediaGeral = () => {
    if (!aluno || !aluno.materias || aluno.materias.length === 0) return 0;
    const soma = aluno.materias.reduce((acc, materia) => acc + (materia.nota ?? 0), 0);
    return Math.round(soma / aluno.materias.length);
  };

  // 🔹 Define as conquistas com base na média
  const mediaGeral = calcularMediaGeral();
  const achievements = [
    { icon: <FaMedal />, min: 20 },  // Conquista 1
    { icon: <FaStar />, min: 40 },   // Conquista 2
    { icon: <FaTrophy />, min: 60 }, // Conquista 3
    { icon: <FaAward />, min: 80 },  // Conquista 4
    { icon: <FaCrown />, min: 90 },  // Conquista 5
  ];

  // ✅ Função para abrir o modal
  const abrirModal = () => setModalAberto(true);

  // ✅ Função para fechar o modal
  const fecharModal = () => {
    setModalAberto(false);
    setMensagem("");
  };

  // ✅ Função para enviar a mensagem
  const enviarMensagem = () => {
    if (!mensagem.trim()) {
      alert("Digite uma mensagem antes de enviar.");
      return;
    }

    alert("Mensagem enviada ao professor!");
    fecharModal();
  };

  return (
    <Container>
      {aluno ? (
        <Card>
          <ProfileSection>
            <ProfileImage src={aluno.foto} alt="Foto de Perfil" />
            <Name>{aluno.nome}</Name>
          </ProfileSection>

          {/* 🔹 Exibir % Geral do Aluno */}
          <AchievementsContainer>
            <Percentage>Média Geral: {mediaGeral}%</Percentage>
            <AchievementsRow>
              {achievements.map((achievement, index) => (
                <AchievementIcon key={index} active={mediaGeral >= achievement.min}>
                  {achievement.icon}
                </AchievementIcon>
              ))}
            </AchievementsRow>
          </AchievementsContainer>

          {/* 🔹 Novo componente de Filtros */}
          <FiltersContainer
            ordenarMaior={ordenarMaior}
            ordenarMenor={ordenarMenor}
            setOrdenarMaior={setOrdenarMaior}
            setOrdenarMenor={setOrdenarMenor}
          />

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
          <Button onClick={abrirModal}>
            <FaEnvelope />
            &nbsp; Falar com o Professor
          </Button>

          {/* 🔹 Modal de Mensagem */}
          {modalAberto && (
            <ModalOverlay>
              <ModalContent>
                <CloseButton onClick={fecharModal}>
                  <FaTimes />
                </CloseButton>
                <h3>Enviar Mensagem</h3>
                <MessageInput
                  placeholder="Digite sua mensagem..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                />
                <Button onClick={enviarMensagem}>Enviar Mensagem</Button>
              </ModalContent>
            </ModalOverlay>
          )}
        </Card>
      ) : (
        <p>Carregando...</p>
      )}
    </Container>
  );
};

export default DashboardAluno;
