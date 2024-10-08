import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { opacityBounceAnim, scaleBounceAnim } from 'src/GlobalStyles';

export default function Landing() {
  return (
    <Wrapper>
      <Message>
        <div>세</div>
        <div>상</div>
        <div>을</div>
        <div>잇</div>
        <div>다</div>
        <div>P</div>
        <div>Q</div>
      </Message>
      <MainThumbnail />
      <Link to='/login'>Login</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  padding: 0px;
  background-color: var(--landing_background_color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0px;

  & > a {
    font-size: 3rem;
    font-family: 'Jua', sans-serif;
    text-decoration: none;
    color: var(--primary_text_color);

    animation: ${scaleBounceAnim} 1s infinite;
  }
`;

const MainThumbnail = styled.div`
  width: 30vw;
  height: 30vw;

  background-image: url('/images/landing.webp');
  background-size: cover;
  background-position: center;
`;

const Message = styled.div`
  font-size: 6rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > div {
    color: var(--primary_text_color);
    font-family: 'Jua', sans-serif;
    opacity: 0;
    animation: ${opacityBounceAnim} 5s infinite;
  }

  div:nth-child(1) {
    animation-delay: 0.5s;
  }
  div:nth-child(2) {
    animation-delay: 0.7s;
  }
  div:nth-child(3) {
    animation-delay: 0.88s;
  }
  div:nth-child(4) {
    animation-delay: 1.04s;
  }
  div:nth-child(5) {
    animation-delay: 1.18s;
  }
  div:nth-child(6) {
    animation-delay: 1.3s;
  }
  div:nth-child(7) {
    animation-delay: 1.4s;
  }
`;
