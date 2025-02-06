import axios from "axios";

const API_URL = "http://localhost:5000";

export interface Materia {
  nome: string;
  nota?: number; // Alunos têm nota, professores não precisam
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
 * 🔹 Obtém todas as matérias cadastradas de usuários existentes
 */
export const getMaterias = async (): Promise<Materia[]> => {
  try {
    const usuarios = await getUsuarios();
    const materiasSet = new Set<string>();

    usuarios.forEach((usuario) => {
      if (usuario.materias) {
        usuario.materias.forEach((materia) => materiasSet.add(materia.nome));
      }
    });

    return Array.from(materiasSet).map((nome) => ({ nome }));
  } catch (error) {
    console.error("Erro ao buscar matérias:", error);
    return [];
  }
};

/**
 * 🔹 Adiciona uma nova matéria ao banco de dados se não existir
 */
export const adicionarMateria = async (materia: Materia): Promise<void> => {
  try {
    const materias = await getMaterias();
    if (materias.some((m) => m.nome === materia.nome)) {
      console.warn("Matéria já existe!");
      return;
    }

    await axios.post(`${API_URL}/materias`, materia);
    console.log("Matéria cadastrada com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar matéria:", error);
  }
};

/**
 * 🔹 Adiciona um novo usuário ao banco de dados (POST)
 */
export const adicionarUsuario = async (usuario: Partial<Usuario>): Promise<void> => {
  try {
    if (!usuario.tipo || (usuario.tipo !== "professor" && usuario.tipo !== "aluno")) {
      throw new Error("Tipo de usuário inválido! Deve ser 'professor' ou 'aluno'.");
    }

    // Garante que alunos tenham notas e professores não
    const materiasFormatadas =
      usuario.tipo === "aluno"
        ? usuario.materias?.map((materia) => ({ nome: materia.nome, nota: materia.nota ?? 0 })) ?? []
        : usuario.materias?.map((materia) => ({ nome: materia.nome })) ?? [];

    const novoUsuario: Usuario = {
      id: Date.now(),
      nome: usuario.nome ?? "",
      tipo: usuario.tipo as "professor" | "aluno",
      email: usuario.email ?? "",
      senha: usuario.senha ?? "",
      foto: usuario.foto ?? "https://via.placeholder.com/100",
      materias: materiasFormatadas,
    };

    await axios.post(`${API_URL}/usuarios`, novoUsuario);
    console.log("Usuário cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
  }
};

/**
 * 🔹 Atualiza um usuário existente sem remover dados já cadastrados
 */
export const atualizarUsuario = async (id: number, dadosAtualizados: Partial<Usuario>): Promise<void> => {
  try {
    const usuarioExistente = await getUsuarioPorId(id);
    if (!usuarioExistente) {
      console.error(`Usuário com ID ${id} não encontrado.`);
      return;
    }

    // Mantém as matérias anteriores e adiciona novas, evitando sobrescrita errada
    const materiasAtualizadas = dadosAtualizados.materias
      ? [...(usuarioExistente.materias || []), ...dadosAtualizados.materias]
      : usuarioExistente.materias;

    await axios.put(`${API_URL}/usuarios/${id}`, { ...usuarioExistente, ...dadosAtualizados, materias: materiasAtualizadas });
    console.log(`Usuário ${id} atualizado com sucesso!`);
  } catch (error) {
    console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
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
