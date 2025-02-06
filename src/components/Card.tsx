import styled from "styled-components";

const Card = styled.div`
  width: 80%;
  max-width: 800px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Poppins", sans-serif;
  margin: 20px 0; /* 🔹 Ajuste para não colidir com o rodapé */

  @media (max-width: 768px) {
    width: 85%;
    padding: 8px;
  }
`;

export default Card;
