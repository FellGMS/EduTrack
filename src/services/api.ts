import axios from "axios";

const API_URL = "http://localhost:5000";

export interface Materia {
  nome: string;
  nota?: number; // Apenas alunos têm nota
}

export interface Usuario {
  id: number;
  nome: string;
  tipo: "professor" | "aluno";
  email: string;
  senha: string;
  foto: string;
  materias?: Materia[];
}

/**
 * 🔹 Obtém a lista de usuários cadastrados na API
 */
export const getUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await axios.get<Usuario[]>(`${API_URL}/usuarios`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
};

/**
 * 🔹 Obtém um único usuário pelo ID
 */
export const getUsuarioPorId = async (id: number): Promise<Usuario | null> => {
  try {
    const response = await axios.get<Usuario>(`${API_URL}/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID ${id}:`, error);
    return null;
  }
};

/**
 * 🔹 Adiciona um novo usuário à API (POST)
 */
export const adicionarUsuario = async (usuario: Usuario): Promise<void> => {
  try {
    await axios.post(`${API_URL}/usuarios`, usuario);
    console.log(`Usuário ${usuario.nome} cadastrado com sucesso!`);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
  }
};

/**
 * 🔹 Atualiza um usuário existente (corrigido para atualizar corretamente)
 */
export const atualizarUsuario = async (id: number, dadosAtualizados: Partial<Usuario>): Promise<boolean> => {
  try {
    const usuarioExistente = await getUsuarioPorId(id);
    if (!usuarioExistente) {
      console.error(`Usuário com ID ${id} não encontrado.`);
      return false;
    }

    // 🔹 Atualiza todos os campos corretamente, incluindo as matérias
    const usuarioAtualizado = {
      ...usuarioExistente,
      ...dadosAtualizados,
      materias: dadosAtualizados.materias !== undefined ? dadosAtualizados.materias : usuarioExistente.materias,
    };

    const response = await axios.put(`${API_URL}/usuarios/${id}`, usuarioAtualizado);

    if (response.status === 200) {
      console.log(`Usuário ${id} atualizado com sucesso!`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
    return false;
  }
};

/**
 * 🔹 Remove um usuário pelo ID (DELETE)
 */
export const removerUsuario = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/usuarios/${id}`);
    console.log(`Usuário ${id} removido com sucesso!`);
  } catch (error) {
    console.error(`Erro ao remover usuário com ID ${id}:`, error);
  }
};

/**
 * 🔹 Obtém a lista de matérias cadastradas
 */
export const getMaterias = async (): Promise<Materia[]> => {
  try {
    const response = await axios.get<Materia[]>(`${API_URL}/materias`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar matérias:", error);
    return [];
  }
};
