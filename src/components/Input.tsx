import styled from "styled-components";

// 🔹 Input estilizado com fundo branco e bordas modernas
const Input = styled.input`
  width: 90%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  background-color: white;
  color: #333;
  transition: 0.3s;

  &:focus {
    border-color: #2980b9;
    box-shadow: 0 0 8px rgba(41, 128, 185, 0.5);
  }
`;

export default Input;
