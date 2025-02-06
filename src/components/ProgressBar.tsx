import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #eee;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 5px;
`;

export const ProgressBar = styled.div<{ percentage: number }>`
  width: ${(props) => props.percentage || 0}%;
  height: 10px;
  background-color: ${(props) =>
    props.percentage >= 80 ? "#2ecc71" : props.percentage >= 50 ? "#f39c12" : "#e74c3c"};
`;
