import styled from "styled-components";

const Card = styled.div`
  width: 90%;
  max-width: 800px;
  padding: 10px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Poppins", sans-serif;
  margin: 20px auto; /* 🔹 Centraliza o card na tela */

  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
    margin: 10px auto; /* 🔹 Centraliza também em telas menores */
  }
`;

export default Card;
