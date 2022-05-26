import styled, { keyframes } from 'styled-components'

export const Section = styled.section`
  display: ${(props) => props.grid ? "grid" : "flex" };
  flex-direction: ${(props) => props.row ? "row" : "column" };
  padding: ${(props) => props.nopadding ? "0" : "32px 48px 0" } ;
  margin: 0 auto;
  max-width: 1040px;
  box-sizing: content-box;
  position: relative;
  overflow: hidden;
  grid-template-columns: 1fr 1fr;
`

export const SectionTitle = styled.h2`
  font-weight: 300;
  font-size: ${(props) => props.main ? '65px' : '56px'};
  line-height: ${(props) => props.main ? '72px' : '56px'};
  width: max-content;
  max-width: 100%;
  //background: rgba(255, 255, 255, 1);
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  padding: ${(props) => props.main ? '58px 0 16px' : '0'};

`

export const SectionText = styled.p`
  max-width: 800px;
  font-size: 24px;
  line-height: 40px;
  font-weight: 300;
  padding-bottom: 3.6rem;
  //color: rgba(255, 255, 255, 1);

`

export const LeftSection = styled.div`
  width: 100%;
`;

export const ImageSize = styled.div`
  position:relative;
  height: 150;
  width: 150;
  
`;
const animation = keyframes`
    0% { opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotate(30deg); filter: blur(10px)}
    25% { opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotate(0deg); filter: blur(0px)}
    75% { opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotate(0deg); filter: blur(0px)}
    100% { opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotate(30deg); filter: blur(10px) }
`

export const Wrapper = styled.span` 
    display: inline-block;
    opacity: 0;
    animation-name: ${animation};
    animation-duration: 6s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
`