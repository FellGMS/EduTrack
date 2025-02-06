import styled from "styled-components";

const Container = styled.div`
  min-height: 88vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden; /* 🔹 Impede rolagem horizontal */
  background: linear-gradient(to bottom, #1e3c72, #2a5298);
`;

export default Container;

