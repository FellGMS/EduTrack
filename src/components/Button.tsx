import styled from "styled-components";

// 🔹 Botão estilizado no mesmo tamanho dos Inputs
const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #2980b9;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #1f6692;
  }
`;

export default Button;
