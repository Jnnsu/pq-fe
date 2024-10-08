import styled from 'styled-components';
import { ChannelItemProps } from '../_types/props';
import { Link, useLocation } from 'react-router-dom';
import tagSvg from '/images/tag_small_white.svg';
import voiceSvg from '/images/volume_on_white.svg';
import { ButtonIcon } from 'src/GlobalStyles';
import { useEffect, useState } from 'react';
import { useMutationDelete, useMutationPatch } from 'src/apis/service/service';
import { ChannelRequest, ChannelResponse } from '../_types/type';
import { LOCAL_STORAGE_ALRAM_KEY } from 'src/constants/common';
import DeleteModal from 'src/components/modal/contents/DeleteModal';

export default function ChannelItem({ data }: ChannelItemProps) {
  const path = useLocation();
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isAlram, setIsAlram] = useState<boolean>(false);
  const [updateName, setUpdateName] = useState<string>('');
  const serverId = path.pathname.split('/')[2];
  const currentChannelId = Number(path.pathname.split('/')[4]);

  const deleteMutation = useMutationDelete(`/chat/v1/server/${serverId}/channel/${data.id}`);
  const patchMutation = useMutationPatch<ChannelResponse, ChannelRequest>(
    `/chat/v1/server/${serverId}/channel/${data.id}`,
  );

  const handleDeleteModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsToggle(true);
    setIsToggle(true);
  };

  const handleDelete = async () => {
    await deleteMutation.mutate();
    setIsToggle(false);
  };

  const handleUpdate = async () => {
    setIsUpdate(!isUpdate);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsUpdate(false);
      patchMutation.mutate({ name: updateName });
    }
    if (e.key === 'Escape') {
      setIsUpdate(false);
      setUpdateName('');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAlram(localStorage.getItem(`${LOCAL_STORAGE_ALRAM_KEY}:${data.id}`) ? true : false);
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ChannelItemWrapper to={`/server/${serverId}/channel/${data.id}`} $isSelect={currentChannelId === data.id}>
      <Alram $isAlram={isAlram} />
      <Title>
        {data.isVoice ? <img src={voiceSvg} alt='음성 태그 이미지' /> : <img src={tagSvg} alt='채널 태그 이미지' />}
        {data.name}
        <InputChannel
          value={updateName}
          $isUpdate={isUpdate}
          onKeyDown={handleKeydown}
          onChange={(e) => setUpdateName(e.target.value)}
          placeholder='취소는 ESC / 저장은 Enter'
        />
      </Title>
      <ButtonGroup>
        <CloseButton onClick={handleDeleteModal} />
        <UpdateButton onClick={handleUpdate} />
      </ButtonGroup>
      <DeleteModal
        title='채널'
        DeleteName={`${data.name} 채널` || '채널'}
        closeModal={() => setIsToggle(false)}
        isOpen={isToggle}
        onDelete={handleDelete}
      />
    </ChannelItemWrapper>
  );
}

const ChannelItemWrapper = styled(Link)<{ $isSelect: boolean }>`
  border-radius: 5px;
  border: none;
  width: 100%;
  height: 36px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.$isSelect ? 'rgba(255,255,255, 0.2)' : 'transparent')};
  color: #d9d9d9;
  font-size: 12px;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);

    & > div > button {
      display: block;
    }
  }

  img {
    width: 20px;
    height: 20px;

    margin-left: 6px;
  }
`;

const Alram = styled.div<{ $isAlram: boolean }>`
  width: 10px;
  height: 10px;

  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${(props) => (props.$isAlram ? `var(--specific_color)` : 'transparent')};

  margin-left: 4px;
`;

const Title = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 4px;

  position: relative;

  & > button {
    display: block;
  }
`;

const Button = styled(ButtonIcon)`
  width: 20px;
  height: 20px;

  border: none;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  transition: 0.2s;

  display: none;

  &:hover {
    cursor: pointer;
  }
`;

const CloseButton = styled(Button)`
  background-image: url('/images/close.png');
`;

const UpdateButton = styled(Button)`
  background-image: url('/images/edit.png');
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;

  margin-right: 4px;
`;

const InputChannel = styled.input<{ $isUpdate: boolean }>`
  width: 160px;
  height: 100%;

  background-color: var(--primary_light_color);
  color: #d9d9d9;
  font-size: 12px;
  display: ${(props) => (props.$isUpdate ? 'block' : 'none')};

  position: absolute;
  top: 0;
  left: 24px;
`;
