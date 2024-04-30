import styled from 'styled-components';
import SocialButton from 'src/components/sign/button/SocialButton';

export default function SocialButtons() {
  return (
    <SocialContainer>
      <SocialButton variant='google' src='/images/google.png'>
        구글로 로그인하기
      </SocialButton>
      <SocialButton variant='kakao' src='/images/kakao.png'>
        카카오로 로그인하기
      </SocialButton>
    </SocialContainer>
  );
}

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;