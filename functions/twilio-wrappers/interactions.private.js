const { InteractionUtils } = require('@twilio/flex-plugins-library-utils');
/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.interactionSid the Interaction Sid for this channel
 * @param {string} parameters.channelSid the sid of the channel
 * @param {object} parameters.routing the interactions routing logic
 * @returns {object} An object containing details about the interaction channel invite
 * @description the following method is used to create an Interaction Channel Invite
 */
exports.participantCreateInvite = async function participantCreateInvite(parameters) {
  const { context, interactionSid, channelSid, routing } = parameters;

  const config = {
    attempts: 3,
    interactionSid,
    channelSid,
    routing,
  };

  const client = context.getTwilioClient();
  if (client.edge && client.region === 'stage-us1') {
    delete client.edge;
    client.region = 'stage';
  }
  const interactionClient = new InteractionUtils(client, config);

  try {
    const participantInvite = await interactionClient.participantCreateInvite(config);

    return { ...participantInvite };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.interactionSid the Interaction Sid for this channel
 * @param {string} parameters.channelSid The Channel Sid for this Participant
 * @param {string} parameters.participantSid the unique string created by Twilio to identify an Interaction Channel resource
 * @param {string} parameters.status the Participant's status - can be: closed or wrapup. Participant must be an agent.
 * @returns {object} An object containing an array of queues for the account
 * @description the following method is used to update/modify a channel participant
 */
exports.participantUpdate = async function participantUpdate(parameters) {
  const { context, interactionSid, channelSid, participantSid, status } = parameters;

  const config = {
    attempts: 3,
    interactionSid,
    channelSid,
    participantSid,
    status,
  };

  const client = context.getTwilioClient();
  if (client.edge && client.region === 'stage-us1') {
    delete client.edge;
    client.region = 'stage';
  }
  const interactionClient = new InteractionUtils(client, config);
  try {
    const participantInvite = await interactionClient.participantUpdate(config);

    return { ...participantInvite };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.interactionSid the Interaction Sid for this channel
 * @param {string} parameters.channelSid The Channel Sid for this Participant
 * @param {string} parameters.status the channel status - can be: closed or wrapup
 * @returns {object} An object containing the modified channel
 * @description the following method is used to update/modify a channel
 */
exports.channelUpdate = async function channelUpdate(parameters) {
  const { context, interactionSid, channelSid, status } = parameters;

  const config = {
    attempts: 3,
    interactionSid,
    channelSid,
    status,
  };

  const client = context.getTwilioClient();
  if (client.edge && client.region === 'stage-us1') {
    delete client.edge;
    client.region = 'stage';
  }
  const interactionClient = new InteractionUtils(client, config);
  try {
    const channelUpdated = await interactionClient.channelUpdate(config);

    return { ...channelUpdated };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};
