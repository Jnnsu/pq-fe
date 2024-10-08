import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { SubmitButton } from 'src/components/sign/button/SignSubmitButton';
import { ButtonNormal } from 'src/GlobalStyles';
import SignInput from 'src/components/sign/input/SignInput';
import AuthInput from 'src/components/sign/input/AuthInput';
import { FormValues } from 'src/pages/signup/_types/type';

export default function ChangePasswordForm() {
  const { control, handleSubmit, getValues, setValue } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    const verificationCode = Object.values(data).join('');
    console.log(verificationCode);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <AuthInput control={control} getValues={getValues} setValue={setValue} />
        <SignInputContatiner>
          <SignInput id='password' type='password' placeholder='비밀번호를 입력해주세요' label='새로운 비밀번호' />
          <SignInput
            id='passwordConfirm'
            type='password'
            placeholder='비밀번호를 다시 입력해주세요'
            label='새로운 비밀번호 확인'
          />
        </SignInputContatiner>
      </InputContainer>

      <SubmitButton type='submit'>인증하기</SubmitButton>
      <PromptButton type='button'>메일 재전송</PromptButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 48px;
`;

const SignInputContatiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PromptButton = styled(ButtonNormal)`
  height: 22px;
  margin-top: 20px;
  border: none;
  font-size: 14px;
`;
