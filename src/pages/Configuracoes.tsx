import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios, Usuario, atualizarUsuario } from "../services/api";
import Container from "../components/Container";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { ProfileSection, ProfileImage, Name } from "../components/ProfileSection";

import styled from "styled-components";

const ConfigForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #2c3e50;
  font-weight: bold;
`;

const Configuracoes: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [novaSenha, setNovaSenha] = useState("");
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [exibirEstatisticas, setExibirEstatisticas] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      const data = await getUsuarios();
      const usuarioEmail = localStorage.getItem("usuarioEmail");

      if (usuarioEmail) {
        const usuarioAtual = data.find((user) => user.email === usuarioEmail);
        setUsuario(usuarioAtual || null);
      }
    };

    fetchUsuario();
  }, []);

  const handleSalvar = async () => {
    if (!usuario) return;

    const dadosAtualizados = {
      senha: novaSenha || usuario.senha,
      temaEscuro,
      exibirEstatisticas,
    };

    await atualizarUsuario(usuario.id, dadosAtualizados);
    alert("Configurações atualizadas com sucesso!");
    navigate(usuario.tipo === "professor" ? "/dashboard-professor" : "/dashboard-aluno");
  };

  return (
    <Container>
      {usuario ? (
        <Card>
          <ProfileSection>
            <ProfileImage src={usuario.foto} alt="Foto de Perfil" />
            <Name>{usuario.nome}</Name>
          </ProfileSection>

          <h3>Configurações da Conta</h3>

          <ConfigForm>
            <Label>Alterar Senha:</Label>
            <Input type="password" placeholder="Nova Senha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />

            <Label>
              <input type="checkbox" checked={temaEscuro} onChange={() => setTemaEscuro(!temaEscuro)} />
              &nbsp; Ativar Modo Escuro
            </Label>

            <Label>
              <input type="checkbox" checked={exibirEstatisticas} onChange={() => setExibirEstatisticas(!exibirEstatisticas)} />
              &nbsp; Exibir Estatísticas no Dashboard
            </Label>

            <Button onClick={handleSalvar}>Salvar Alterações</Button>
          </ConfigForm>
        </Card>
      ) : (
        <p>Carregando...</p>
      )}
    </Container>
  );
};

export default Configuracoes;
