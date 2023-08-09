import helpers from '../test-utils/test-helper';
const callSid = 'CSxxxxxxx';
const recordingSid = '123456';
const conferenceSid = '123';
describe('create recording ', () => {
  beforeAll(() => {
    helpers.setup();
    global.Runtime._addFunction(
      'twilio-wrappers/retry-handler',
      './functions/twilio-wrappers/retry-handler.private.js',
    );
  });

  const getVoiceMockTwilioClient = function (createRecording) {
    const mockVoiceService = {
      recordings: {create: createRecording},
    };
    return {
      calls: (_callSid) => mockVoiceService,
    };
  };
  const createRecordingmock = jest.fn(() => Promise.resolve());

  it('createRecording returns success response', async () => {
    const { createRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      callSid,
      params: {
        recordingChannels: 'dual'
      },
    };
    const context = {
      getTwilioClient: () => getVoiceMockTwilioClient(createRecordingmock),
    };
    const participant = await createRecording({ context, ...parameters });
    expect(participant.success).toEqual(true);
    expect(createRecordingmock.mock.calls.length).toBe(1);
  });

  it('createRecording throws invalid parameters object passed', async () => {
    const { createRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      callSid,
      params: {
        recordingChannels: 'dual'
      },
    };

    let err = null;
    try {
      await createRecording({ ...parameters });
    } catch (error) {
      err = error;
    }

    expect(err).toBe('Invalid parameters object passed. Parameters must contain reason context object');
  });

  it('createRecording throws invalid parameters object passed', async () => {
    const { createRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      callSid: 1,
      params: {
        recordingChannels: 'dual'
      },
    };
    const context = {
      getTwilioClient: () => getVoiceMockTwilioClient(createRecordingmock),
    };

    let err = null;
    try {
      await createRecording({ context, ...parameters });
    } catch (error) {
      err = error;
    }

    expect(err).toBe('Invalid parameters object passed. Parameters must contain callSid string');
  });
});
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
describe('update callRecording', () => {
  beforeAll(() => {
    helpers.setup();
    global.Runtime._addFunction(
      'twilio-wrappers/retry-handler',
      './functions/twilio-wrappers/retry-handler.private.js',
    );
  });

  const getVoiceMockTwilioClient2 = function (createRecording) {
    const mockVoiceService = {
      recordings: (_recordingSid) => mockFunctionTemp,  
    };
    const mockFunctionTemp = {
      update: (_params) => createRecording,  
    }
    return {
      calls: (_callSid) => mockVoiceService,
    };
  };
  const updateCallRecordingmock2 = jest.fn(() => Promise.resolve());
  it('updateCallRecording returns success response', async () => {
    const { updateCallRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      callSid,
      recordingSid,
      params: {
        status: 'paused',
        pauseBehavior: 'silence',
      },
    };
    const context = {
      getTwilioClient: () => getVoiceMockTwilioClient2(updateCallRecordingmock2),
    };

    const participant = await updateCallRecording({ context, ...parameters });
    expect(participant.success).toEqual(true);
   // expect(updateCallRecordingmock.mock.calls.length).toBe(1);
  });

  it('createRecording throws invalid parameters object passed', async () => {
    const { updateCallRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      callSid,
    };

    let err = null;
    try {
      await updateCallRecording({ ...parameters });
    } catch (error) {
      err = error;
    }

    expect(err).toBe('Invalid parameters object passed. Parameters must contain reason context object');
  });

  it('updateCallRecording throws invalid parameters object passed', async () => {
    const { updateCallRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      callSid: 1,
    };
    const context = {
      getTwilioClient: () => getVoiceMockTwilioClient(updateCallRecordingmock),
    };

    let err = null;
    try {
      await updateCallRecording({ context, ...parameters });
    } catch (error) {
      err = error;
    }

    expect(err).toBe('Invalid parameters object passed. Parameters must contain callSid string');
  });

});
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
describe('updateConferenceRecording', () => {
  beforeAll(() => {
    helpers.setup();
    global.Runtime._addFunction(
      'twilio-wrappers/retry-handler',
      './functions/twilio-wrappers/retry-handler.private.js',
    );
  });

  const getVoiceMockTwilioClient3 = function (createRecording) {
    const mockVoiceService = {
      recordings: (_recordingSid) => mockFunctionTemp,  
    };
    const mockFunctionTemp = {
      update: (_params) => createRecording,  
    }
    return {
      conferences: (_conferenceSid) => mockVoiceService,
    };
  };
  const updateConferenceRecordingmock = jest.fn(() => Promise.resolve());
  it('updateConferenceRecording returns success response', async () => {
    const { updateConferenceRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      conferenceSid,
      recordingSid,
      params: {
        status: 'paused',
        pauseBehavior: 'silence'
      },
    };
    const context = {
      getTwilioClient: () => getVoiceMockTwilioClient3(updateConferenceRecordingmock),
    };

    const participant = await updateConferenceRecording({ context, ...parameters });

    expect(participant.success).toEqual(true);
  });

  it('updateConferenceRecording throws invalid parameters object passed', async () => {
    const { updateConferenceRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      conferenceSid,
      recordingSid,
      params: {
        status: 'paused',
        pauseBehavior: 'silence'
      },
    };

    let err = null;
    try {
      await updateConferenceRecording({ ...parameters });
    } catch (error) {
      err = error;
    }

    expect(err).toBe('Invalid parameters object passed. Parameters must contain reason context object');
  });

  it('updateConferenceRecording throws invalid parameters object passed', async () => {
    const { updateConferenceRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      conferenceSid: 1,
      recordingSid: '1',
    };
    const context = {
      getTwilioClient: () => getVoiceMockTwilioClient3(updateConferenceRecordingmock),
    };

    let err = null;
    try {
      await updateConferenceRecording({ context, ...parameters });
    } catch (error) {
      err = error;
    }

    expect(err).toBe('Invalid parameters object passed. Parameters must contain conferenceSid string');
  });

  it('updateConferenceRecording throws invalid parameters object passed', async () => {
    const { updateConferenceRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      conferenceSid: '1',
      recordingSid: 1,
    };
    const context = {
      getTwilioClient: () => getVoiceMockTwilioClient3(updateConferenceRecordingmock),
    };

    let err = null;
    try {
      await updateConferenceRecording({ context, ...parameters });
    } catch (error) {
      err = error;
    }

    expect(err).toBe('Invalid parameters object passed. Parameters must contain recordingSid string');
  });
  

});
