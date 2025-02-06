import styled from "styled-components";

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;

  label {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: black;
  }
`;

interface FiltersContainerProps {
  ordenarMaior: boolean;
  ordenarMenor: boolean;
  setOrdenarMaior: (value: boolean) => void;
  setOrdenarMenor: (value: boolean) => void;
}

const FiltersContainer: React.FC<FiltersContainerProps> = ({
  ordenarMaior,
  ordenarMenor,
  setOrdenarMaior,
  setOrdenarMenor,
}) => {
  return (
    <FiltersWrapper>
      <label>
        <input
          type="checkbox"
          checked={ordenarMaior}
          onChange={() => {
            setOrdenarMaior(!ordenarMaior);
            setOrdenarMenor(false);
          }}
        />
        Melhor Desempenho
      </label>
      <label>
        <input
          type="checkbox"
          checked={ordenarMenor}
          onChange={() => {
            setOrdenarMenor(!ordenarMenor);
            setOrdenarMaior(false);
          }}
        />
        Pior Desempenho
      </label>
    </FiltersWrapper>
  );
};

export default FiltersContainer;
