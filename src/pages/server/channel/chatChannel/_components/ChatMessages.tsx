import styled from 'styled-components';
import profileImage from '../../../../../../public/images/videoProfile.jfif';
import { MessageItem } from '../_types';

interface ChatMessagesProps {
  messages: MessageItem[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <>
      {messages.length === 0
        ? null
        : messages.map((message) => (
            <>
              <ChatDateHeaderWrapper>
                <ChatDateHeader>{message.message.createdAt}</ChatDateHeader>
              </ChatDateHeaderWrapper>
              <ChatMessageWrapper>
                <UserProfileImage>
                  <img src={profileImage} alt='유저 프로필 이미지' />
                </UserProfileImage>
                <ChatMessageContent>
                  <ChatMessageContentHeader>
                    <ChatMessageSender>{'김희연'}</ChatMessageSender>
                    <ChatMessageCreatedAt>{message.message.createdAt}</ChatMessageCreatedAt>
                  </ChatMessageContentHeader>
                  <ChatMessageText>{message.message.message}</ChatMessageText>
                </ChatMessageContent>
              </ChatMessageWrapper>
            </>
          ))}
    </>
  );
}

const ChatDateHeader = styled.div`
  width: 135px;
  height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */

  border-radius: 12px;
  border: 1px solid #ccc;
`;

const ChatDateHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 30px;
`;

const ChatMessageWrapper = styled.div`
  display: flex;
  gap: 10px;

  margin-top: 20px;
`;

const UserProfileImage = styled.div`
  width: 40px;
  height: 40px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ChatMessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatMessageContentHeader = styled.div`
  display: flex;
  gap: 8px;
`;

const ChatMessageSender = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
`;

const ChatMessageCreatedAt = styled.div`
  color: #666;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 16px */

  display: flex;
  align-items: center;
`;

const ChatMessageText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  margin: 0;
`;
