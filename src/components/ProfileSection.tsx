import styled from "styled-components";

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px;
  border: 3px solid #2980b9;
`;

export const Name = styled.h2`
  font-size: 22px;
  color: #2c3e50;
  margin-top: 10px;
`;
