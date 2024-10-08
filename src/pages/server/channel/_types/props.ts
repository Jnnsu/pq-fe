import { ChannelData } from '../../_types/type';

export interface ChatChannelIntroProps {
  channelData: ChannelData | undefined;
}

export interface ChatDayDividerProps {
  ChatDayDividerDay: string;
}

export interface ChatInputBoxProps {
  messageInputRef: React.RefObject<HTMLInputElement>;
  handleSendMessageKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  messageMaxLength: number;
  isClickedUtilityButton: boolean;
  handleUiilityButtonClick: () => void;
}

export interface MessageLoadingSpinnerProps {
  infiniteScrollTriggerRef: React.RefObject<HTMLDivElement>;
}
