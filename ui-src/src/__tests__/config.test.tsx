import { isColdTransferEnabled, isMultiParticipantEnabled } from '../config'; // Replace 'your-module' with the actual module path

describe('isColdTransferEnabled', () => {
  it('should return false when cold_transfer is not "Enable", "enable", or "ENABLE"', () => {
    process.env.FLEX_APP_COLD_TRANSFER_FLAG = 'Disabled';
    expect(isColdTransferEnabled()).toBe(false);
  });
});

describe('isMultiParticipantEnabled', () => {
  it('should return false when multi_participant is not "Enable", "enable", or "ENABLE"', () => {
    process.env.FLEX_APP_MULTI_PARTICIPANT_FLAG = 'Disabled';
    expect(isMultiParticipantEnabled()).toBe(false);
  });
});

afterEach(() => {
  // Reset the environment variables after each test to avoid affecting other tests
  process.env.FLEX_APP_COLD_TRANSFER_FLAG = undefined;
  process.env.FLEX_APP_MULTI_PARTICIPANT_FLAG = undefined;
});
