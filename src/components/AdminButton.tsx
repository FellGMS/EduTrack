import styled from "styled-components";

const AdminButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #2980b9;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;

  &:hover {
    background-color: #1f6692;
  }
`;

export default AdminButton;
