import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutationDelete } from 'src/apis/service/service';
import CreateCategoryModal from 'src/components/modal/contents/CreateCategoryModal';
import CreateServerModal from 'src/components/modal/contents/CreateServerModal';
import DeleteModal from 'src/components/modal/contents/DeleteModal';
import InviteLinkModal from 'src/components/modal/contents/InviteLinkModal';
import InviteMemberModal from 'src/components/modal/contents/InviteMemberModal';
import { ServerDropdownType } from 'src/constants/enum';
import styled from 'styled-components';

interface Prorps {
  isDropDown: boolean;
  toggleDropDown: () => void;
}

const DropdownList = [
  { name: '일반', type: ServerDropdownType.LABEL },
  { name: '서버 수정하기', type: ServerDropdownType.UPDATE_SERVER },
  { name: '카테고리 생성', type: ServerDropdownType.CREATE_CATEORY },
  { name: '초대', type: ServerDropdownType.LABEL },
  { name: '초대링크 생성', type: ServerDropdownType.INVITE_LINK },
  { name: '이메일로 초대하기', type: ServerDropdownType.INVITE_MEMBER },
  { name: '삭제', type: ServerDropdownType.LABEL },
  { name: '서버 삭제하기', type: ServerDropdownType.DELETE_SERVER },
  { name: '', type: ServerDropdownType.LABEL },
];

export default function ServerDropDown({ isDropDown, toggleDropDown }: Prorps) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [dropdownType, setDropdownType] = useState<ServerDropdownType>(ServerDropdownType.CREATE_CATEORY);
  const location = useLocation();
  const serverId = location.pathname.split('/')[2];
  const deleteMutation = useMutationDelete(`/chat/v1/server/${serverId}`);

  const handleDeleteServer = async () => {
    await deleteMutation.mutate();
    // window.location.href = `${APP_ORIGIN}/server/-1`; // TODO: 서버 삭제 후 이동할 페이지
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsShow(false);
    toggleDropDown();
  };

  const handleClick = (type: ServerDropdownType) => {
    setDropdownType(type);
    setIsShow(true);
  };

  return (
    <Area>
      <ButtonContainer $isDown={isDropDown}>
        {DropdownList.map((item) => {
          return item.type === ServerDropdownType.LABEL ? (
            <Label key={item.name}>{item.name}</Label>
          ) : (
            <Button key={item.type} type='button' onClick={() => handleClick(item.type)}>
              {item.name}
            </Button>
          );
        })}
      </ButtonContainer>
      {
        {
          [ServerDropdownType.LABEL]: <></>,
          [ServerDropdownType.UPDATE_SERVER]: (
            <CreateServerModal isUpdate={true} closeModal={handleCloseModal} isOpen={isShow} />
          ),
          [ServerDropdownType.CREATE_CATEORY]: <CreateCategoryModal closeModal={handleCloseModal} isOpen={isShow} />,
          [ServerDropdownType.INVITE_LINK]: (
            <InviteLinkModal closeModal={handleCloseModal} isOpen={isShow} serverId={Number(serverId)} />
          ),
          [ServerDropdownType.INVITE_MEMBER]: <InviteMemberModal closeModal={handleCloseModal} isOpen={isShow} />,
          [ServerDropdownType.DELETE_SERVER]: (
            <DeleteModal
              DeleteName='서버'
              title='서버'
              isOpen={isShow}
              closeModal={handleCloseModal}
              onDelete={handleDeleteServer}
            />
          ),
        }[dropdownType]
      }
    </Area>
  );
}

type ButtonContainerProps = {
  $isDown: boolean;
};

const Area = styled.section`
  width: 100%;

  height: 0px;

  padding: 10px;
  background: transparent;

  position: absolute;
  top: 80%;
`;

const ButtonContainer = styled.div<ButtonContainerProps>`
  width: 100%;

  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  transform-origin: 95% 0%;
  transition: 0.2s all ease-in-out;
  transform: ${(props) => (props.$isDown ? 'scale(1.0)' : 'scale(0)')};
`;

const Label = styled.div`
  width: 100%;
  padding: 12px 10px 6px 10px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  background: var(--landing_background_color);
  border: none;
  border-bottom: 1px solid var(--text_gray);
  text-align: left;
`;

const Button = styled.button`
  width: 100%;
  padding: 6px 10px 6px 10px;
  color: #000;
  font-size: 12px;
  background: var(--landing_background_color);
  border: none;
  text-align: left;

  &:hover {
    background: #fafafa;
    cursor: pointer;
  }

  &:last-child {
    border-bottom: none;
  }
`;
