import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import { useMutationEmailVerify } from 'src/apis/service/userService';
import { ERROR_MESSAGES } from 'src/constants/error';
import { FormValues } from 'src/pages/signup/_types/type';

interface UseCheckEmailProps {
  setError: UseFormSetError<FormValues>;
}

export const useCheckEmail = ({ setError }: UseCheckEmailProps) => {
  // const navigate = useNavigate();
  const { mutate: verify, isLoading } = useMutationEmailVerify();

  const onSubmit = async (data: FormValues) => {
    if (isLoading) {
      return;
    }

    const verificationCode = Object.values(data).join('');
    const EmailVerifyData = {
      email: '',
      code: verificationCode,
    };

    try {
      const res = verify(EmailVerifyData);
      console.log(res);
      // navigate('/login');
    } catch (e) {
      const axiosError = e as AxiosError;
      const status = axiosError?.response?.status;

      if (status === 400) {
        setError('otp', {
          type: 'custom',
          message: ERROR_MESSAGES.AUTH.EMAIL_VERIFY_CHECK_FAILED,
        });
        return;
      }

      console.log(e);
      setError('otp', {
        type: 'custom',
        message: ERROR_MESSAGES.AUTH.EMAIL_VERIFY_FAILED,
      });
      alert(ERROR_MESSAGES.AUTH.EMAIL_VERIFY_FAILED);
      throw Error;
    }
  };

  return { onSubmit };
};
