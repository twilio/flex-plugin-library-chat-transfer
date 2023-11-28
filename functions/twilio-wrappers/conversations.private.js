const { ConversationsUtils } = require('@twilio/flex-plugins-library-utils');

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.conversationSid the conversation to be fetched
 * @returns {object} An object containing the conversation
 * @description the following method is used to get a conversation
 */
exports.getConversation = async function getConversation(parameters) {
  const { context, conversationSid } = parameters;

  const config = {
    attempts: 3,
    conversationSid,
  };

  const client = context.getTwilioClient();
  const conversationClient = new ConversationsUtils(client, config);

  try {
    const conversation = await conversationClient.getConversation(config);

    return { ...conversation };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.conversationSid the sid for this conversation
 * @param {number} parameters.limit max number of participants to list
 * @returns {object} An object containing an array of participants
 * @description the following method is used to list conversation participants
 */
exports.participantList = async function participantList(parameters) {
  const { context, conversationSid, limit } = parameters;

  const config = {
    attempts: 3,
    conversationSid,
    limit,
  };

  const client = context.getTwilioClient();
  const conversationClient = new ConversationsUtils(client, config);

  try {
    const participantList = await conversationClient.getConversationParticipantList(config);
    return { ...participantList };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.conversationSid the conversation to be updated
 * @param {object} parameters.attributes the attributes to apply to the channel
 * @returns {object} An object containing the updated conversation
 * @description the following method is used to apply attributes
 *    to the conversation object
 */
exports.updateAttributes = async function updateAttributes(parameters) {
  const { context, conversationSid, attributes } = parameters;

  const config = {
    attempts: 3,
    conversationSid,
    attributes,
  };

  const client = context.getTwilioClient();
  const conversationClient = new ConversationsUtils(client, config);

  try {
    const conversationAttr = await conversationClient.updateConversationAttributes(config);
    return { ...conversationAttr };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.conversationSid the conversation to be updated
 * @param {object} parameters.method webhook method
 * @param {array} parameters.filters webhook filters
 * @param {object} parameters.url webhook url
 * @param {object} parameters.target webhook target type
 * @returns {object} An object containing the webhook
 * @description the following method is used to add a webhook
 *    to the conversation object
 */
exports.addWebhook = async function addWebhook(parameters) {
  const { context, conversationSid, method, filters, url, target } = parameters;

  const config = {
    attempts: 3,
    conversationSid,
    method,
    filters,
    url,
    target,
  };

  const client = context.getTwilioClient();
  const conversationClient = new ConversationsUtils(client, config);
  try {
    const webhk = await conversationClient.addWebhook(config);
    return { ...webhk };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.conversationSid the conversation to be updated
 * @param {object} parameters.webhookSid webhook sid
 * @returns {object} An object containing the conversation
 * @description the following method is used to remove a webhook
 *    from the conversation object
 */
exports.removeWebhook = async function removeWebhook(parameters) {
  const { context, conversationSid, webhookSid } = parameters;

  const config = {
    attempts: 3,
    conversationSid,
    webhookSid,
  };

  const client = context.getTwilioClient();
  const conversationClient = new ConversationsUtils(client, config);
  try {
    const webhk = await conversationClient.removeWebhook(config);
    return { ...webhk };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};
