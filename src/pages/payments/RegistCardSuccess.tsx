import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorResponse } from './_type/type';
import { useMutationPost } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import styled from 'styled-components';
import { CtaButton } from 'src/GlobalStyles';
import {
  RegistCardRequest,
  RegistCardResponse,
} from 'src/components/modal/contents/SubscriptionModal/_type/subscriptionType';
import { ERROR_MESSAGES } from 'src/constants/error';

export function RegistCardSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { mutate, data } = useMutationPost<RegistCardResponse, RegistCardRequest>(`${USER_URL.PAYMENTS}/method`, {
    onSuccess: () => {
      console.log(data);
    },
    onError: (err: unknown) => {
      const error = err as ErrorResponse;
      const { code, message } = error;
      navigate(`/regist-fail?code=${code}&message=${encodeURIComponent(message)}`);
    },
  });

  useEffect(() => {
    const userId = Number(searchParams.get('userId'));
    const customerKey = searchParams.get('customerKey');
    const authKey = searchParams.get('authKey');

    if (!customerKey || !authKey) {
      console.error('Invalid payment data', { customerKey, authKey });
      navigate(`/regist-fail?code=INVALID_SUBSCRIPTION_DATA&message=${ERROR_MESSAGES.PAYMENT.INVALID_CARD_DATA}`);
      return;
    }

    const subscription = {
      userId,
      customerKey,
      authKey,
    };

    mutate(subscription);
  }, [mutate, searchParams]);

  return (
    <Area className='result wrapper'>
      <Container className='box_section'>
        <img src='https://static.toss.im/illusts/check-blue-spot-ending-frame.png' width='120' height='120' />
        <h2>카드 등록 완료</h2>
        <Button onClick={() => navigate('/server')}>처음으로 돌아가기</Button>
      </Container>
    </Area>
  );
}

const Area = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Button = styled(CtaButton)`
  width: 30%;
  margin-top: 20px;
`;
