import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { getUsuarios, adicionarUsuario } from "../services/api";

// ✅ Componentes Globais
import { ProfileSection, ProfileImage, Name } from "../components/ProfileSection";

const Title = styled.h2`
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #2c3e50;
  display: block;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;

  label {
    display: flex;
    align-items: center;
    font-size: 14px;
    gap: 5px;
    color: #2c3e50;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;

  label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

// 🔹 Matérias predefinidas
const MATERIAS_PREDEFINIDAS = ["Matemática", "Português", "História", "Ciências", "Geografia"];

const CadastroUsuario: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [foto, setFoto] = useState("https://tinyurl.com/5n8p4eb2"); // ✅ Foto padrão
  const [tipo, setTipo] = useState<"aluno" | "professor">("aluno");
  const [materiasSelecionadas, setMateriasSelecionadas] = useState<string[]>([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim() || !foto.trim()) {
      setErro("Todos os campos são obrigatórios!");
      return;
    }

    const usuarios = await getUsuarios();
    const emailExistente = usuarios.some((u) => u.email === email);

    if (emailExistente) {
      setErro("Email já cadastrado!");
      return;
    }

    // 🔹 Pega o email do professor logado
    const professorLogadoEmail = localStorage.getItem("usuarioEmail");
    const professorLogado = usuarios.find((u) => u.email === professorLogadoEmail && u.tipo === "professor");

    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      senha,
      tipo,
      foto,
      materias: materiasSelecionadas.map((nome) => ({
        nome,
        nota: tipo === "aluno" ? 0 : undefined, // 🔹 Alunos começam com nota 0, professores não têm notas.
      })),
    };

    await adicionarUsuario(novoUsuario);
    alert("Cadastro realizado com sucesso!");

    // ✅ Redirecionamento correto:
    if (tipo === "professor") {
      navigate("/dashboard-professor"); // Se o novo usuário for um professor
    } else {
      navigate(professorLogado ? "/dashboard-professor" : "/dashboard-aluno"); // Se o professor cadastrou um aluno, volta para o dashboard dele
    }
  };

  const handleMateriaChange = (materia: string) => {
    setMateriasSelecionadas((prev) =>
      prev.includes(materia) ? prev.filter((m) => m !== materia) : [...prev, materia]
    );
  };

  return (
    <Container>
      <Card>
        <Title>Cadastro de Usuário</Title>

        {/* 🔹 Exibe um Avatar Dinâmico */}
        <ProfileSection>
          <ProfileImage src={foto} alt="Imagem de Perfil" />
          <Name>{nome || "Novo Usuário"}</Name>
        </ProfileSection>

        <Label>Nome</Label>
        <Input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />

        <Label>Email</Label>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <Label>Senha</Label>
        <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

        <Label>URL da Foto de Perfil</Label>
        <Input type="text" placeholder="Cole a URL da foto" value={foto} onChange={(e) => setFoto(e.target.value)} />

        {/* 🔹 Seletor de Tipo de Usuário */}
        <Label>Selecione o Tipo de Usuário</Label>
        <RadioGroup>
          <label>
            <input type="radio" name="tipo" value="aluno" checked={tipo === "aluno"} onChange={() => setTipo("aluno")} />
            Aluno
          </label>
          <label>
            <input type="radio" name="tipo" value="professor" checked={tipo === "professor"} onChange={() => setTipo("professor")} />
            Professor
          </label>
        </RadioGroup>

        {/* 🔹 Seleção de matérias (Agora para ambos: alunos e professores) */}
        <Label>Selecione as Matérias</Label>
        <CheckboxGroup>
          {MATERIAS_PREDEFINIDAS.map((materia) => (
            <label key={materia}>
              <input
                type="checkbox"
                checked={materiasSelecionadas.includes(materia)}
                onChange={() => handleMateriaChange(materia)}
              />
              {materia}
            </label>
          ))}
        </CheckboxGroup>

        {erro && <ErrorMessage>{erro}</ErrorMessage>}

        <Button onClick={handleCadastro}>Cadastrar</Button>
      </Card>
    </Container>
  );
};

export default CadastroUsuario;
