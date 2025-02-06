import styled from "styled-components";

const Container = styled.div`
  width: 100vw; /* 🔹 Garante que ocupa toda a largura */
  min-height: 100vh; /* 🔹 Ocupa toda a altura */
  display: flex;
  justify-content: center; /* 🔹 Centraliza horizontalmente */
  align-items: center; /* 🔹 Centraliza verticalmente */
  background: linear-gradient(to bottom, #1e3c72, #2a5298); /* 🔹 Restaurado o fundo degradê */
  
`;

export default Container;
