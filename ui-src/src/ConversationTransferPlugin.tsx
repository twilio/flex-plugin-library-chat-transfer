import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomizePasteElements from './utils/PasteThemeProvider';
import { ParticipantTabLabel } from './components/ParticipantTabLabel';

import {actionHook as ShowDirectoryActionHook} from './flex-hooks/actions/ShowDirectory';
import {actionHook as TransferTaskActionHook} from './flex-hooks/actions/TransferTask';
import {actionHook as CompleteTaskActionHook} from './utils/TaskRouter/CompleteTask';

import { registerCancelChatParticipantInvite } from './flex-hooks/actions/cancelChatParticipantInvite';
import { registerCustomChatTransferAction } from './flex-hooks/actions/chatTransferTask';
import { registerLeaveChatAction } from './flex-hooks/actions/leaveChat';
import { registerRemoveChatParticipant } from './flex-hooks/actions/removeChatParticipant';
import ConversationTransferNotification from './flex-hooks/notifications/TransferResult';

import { addConvTransferButtons } from './flex-hooks/components/TaskCanvasHeader';
import { addParticipantsTab } from './flex-hooks/components/TaskCanvasTabs';
import { removeDialpadForConvTransfer } from './flex-hooks/components/WorkerDirectory';

const PLUGIN_NAME = 'ConversationTransferPlugin';

export default class ConversationTransferPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  init(flex: typeof Flex, manager: Flex.Manager) {
    const initializers = [
      ParticipantTabLabel,
      // ConversationTransferNotification,
      registerCancelChatParticipantInvite,
      registerCustomChatTransferAction,
      registerLeaveChatAction,
      registerRemoveChatParticipant,
      CustomizePasteElements,
      addConvTransferButtons,
      removeDialpadForConvTransfer,
      addParticipantsTab,
      ShowDirectoryActionHook,
      TransferTaskActionHook,
      CompleteTaskActionHook,
    ];

    initializers.forEach((initializer) => initializer(flex, manager));
  }
}
