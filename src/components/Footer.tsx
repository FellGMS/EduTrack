import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  text-align: center;
  position: relative;
  bottom: 0;
  left: 0;
  height: 50px;
`;

const Footer: React.FC = () => {
  return <FooterContainer>&copy; 2024 EduTrack - Todos os direitos reservados</FooterContainer>;
};

export default Footer;
