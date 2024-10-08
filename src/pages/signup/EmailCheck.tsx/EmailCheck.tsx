import EmailCheckForm from '../_components/EmailCheckForm';
import Header from 'src/components/sign/Header';
import { Area, Container } from 'src/components/sign/CommonStyles';

export default function EmailCheck() {
  return (
    <Area>
      <Container>
        <Header>계정 인증</Header>
        <EmailCheckForm />
      </Container>
    </Area>
  );
}
