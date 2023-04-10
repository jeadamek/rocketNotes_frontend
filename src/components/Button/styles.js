import styled from 'styled-components';


export const Container = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.ORANGE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

  height: 56px;
  border: 0;
  padding: 16px 0;
  margin-top: 16px;
  border-radius: 10px;
  font-weight: 500;

  /* letra e referencia o botao */
  /* o mesmo de usar button:disabled */
    &:disabled {
      opacity: 0.5;
    }
`;