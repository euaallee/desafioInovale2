import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000000;
`
export const Percentage = styled.h1`
  display: ${p => p.Full == '100.00%' ? 'none' : 'block'};
  color: aliceblue;
  font-size: 32px;
`