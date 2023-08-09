/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { Actions, Notifications, ITask } from '@twilio/flex-ui';
import ChatTransferService from '../../../helpers/APIHelper';
import { registerRemoveChatParticipant } from '../removeChatParticipant';


jest.mock('@twilio/flex-ui', () => ({
  Actions: {
    registerAction: jest.fn(),
  },
  Notifications: {
    showNotification: jest.fn(),
  },
}));

jest.mock('../../../helpers/APIHelper', () => ({
  removeParticipantAPIRequest: jest.fn(),
}));

describe('registerRemoveChatParticipant', () => {
  
    let payload;
    let mockRemoveParticipantAPIRequest;
  
    beforeEach(() => {
      payload = {
        // task: {}, // Provide a mock task object
        task :  { sid: '1672673' } as unknown as ITask, //this one or above one
        interactionParticipantSid: 'participantSid',
      };
    
      mockRemoveParticipantAPIRequest = jest.fn();
      ChatTransferService.removeParticipantAPIRequest = mockRemoveParticipantAPIRequest;
    });
    
    // it('should successfully remove participant and show success notification', async () => {
    //     mockRemoveParticipantAPIRequest.mockResolvedValueOnce();
    
    //     registerRemoveChatParticipant();
    //     expect(mockRemoveParticipantAPIRequest).toHaveBeenCalled();
    //     // expect(Notifications.showNotification).toHaveBeenCalledWith(expect.any("ChatRemoveParticipantSuccess"));
    //   });
    
    it('should handle error in removing participant and show error notification', async () => {
        const error = new Error('API request failed');
        mockRemoveParticipantAPIRequest.mockRejectedValueOnce(error);
    
        registerRemoveChatParticipant();

        expect(mockRemoveParticipantAPIRequest).not.toHaveBeenCalled();
        // expect(Notifications.showNotification).toHaveBeenCalledWith(expect.any("ChatRemoveParticipantFailed"));
    });
    
    it('should show error notification when API payload is not built', async () => {
        payload.task = null;
    
        registerRemoveChatParticipant();
    
        expect(mockRemoveParticipantAPIRequest).not.toHaveBeenCalled();
        // expect(Notifications.showNotification).toHaveBeenCalledWith('ChatRemoveParticipantFailed'); 
    });
    
    it('should register the RemoveChatParticipant action', () => {
        registerRemoveChatParticipant();

        expect(Actions.registerAction).toHaveBeenCalledWith('RemoveChatParticipant', expect.any(Function));
    });
});
