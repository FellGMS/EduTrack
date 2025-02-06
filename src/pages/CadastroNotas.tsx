import { useState, useEffect } from "react";
import { getUsuarios, Usuario, atualizarUsuario } from "../services/api";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import { TableWrapper, Table, Th, Td } from "../components/TableComponents";
import { useNavigate } from "react-router-dom";

const CadastroNotas: React.FC = () => {
  const [alunos, setAlunos] = useState<Usuario[]>([]);
  const [notas, setNotas] = useState<{ [key: number]: { [key: string]: number } }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlunos = async () => {
      const data = await getUsuarios();
      const alunosFiltrados = data.filter((user) => user.tipo === "aluno");
      setAlunos(alunosFiltrados);

      // Inicializar estado das notas com as notas existentes
      const notasIniciais: { [key: number]: { [key: string]: number } } = {};
      alunosFiltrados.forEach((aluno) => {
        if (aluno.materias) {
          notasIniciais[aluno.id] = {};
          aluno.materias.forEach((materia) => {
            notasIniciais[aluno.id][materia.nome] = materia.nota;
          });
        }
      });

      setNotas(notasIniciais);
    };

    fetchAlunos();
  }, []);

  const handleNotaChange = (alunoId: number, materia: string, valor: number) => {
    setNotas((prevNotas) => ({
      ...prevNotas,
      [alunoId]: {
        ...prevNotas[alunoId],
        [materia]: valor,
      },
    }));
  };

  const handleSalvarNotas = async () => {
    for (const aluno of alunos) {
      const materiasAtualizadas = aluno.materias?.map((materia) => ({
        ...materia,
        nota: notas[aluno.id]?.[materia.nome] ?? materia.nota,
      }));

      await atualizarUsuario(aluno.id, { materias: materiasAtualizadas });
    }

    alert("Notas atualizadas com sucesso!");
  };

  return (
    <Container>
      <Card>
        <h2>Cadastro e Edição de Notas</h2>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Nome do Aluno</Th>
                <Th>Matéria</Th>
                <Th>Nota</Th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) =>
                aluno.materias?.map((materia) => (
                  <tr key={`${aluno.id}-${materia.nome}`}>
                    <Td>{aluno.nome}</Td>
                    <Td>{materia.nome}</Td>
                    <Td>
                      <input
                        type="number"
                        value={notas[aluno.id]?.[materia.nome] ?? materia.nota}
                        min="0"
                        max="100"
                        onChange={(e) => handleNotaChange(aluno.id, materia.nome, Number(e.target.value))}
                      />
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </TableWrapper>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <Button onClick={() => navigate("/dashboard-professor")}>Cancelar</Button>
          <Button onClick={handleSalvarNotas}>Salvar Notas</Button>
        </div>
      </Card>
    </Container>
  );
};

export default CadastroNotas;
