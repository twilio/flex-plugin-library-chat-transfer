const { isString, isObject } = require('lodash');

const retryHandler = require(Runtime.getFunctions()['twilio-wrappers/retry-handler'].path).retryHandler;

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.callSid the unique call SID to fetch
 * @param {object} parameters.params recording creation parameters
 * @returns {Map} The new recording's properties
 * @description creates recording for the given call SID
 */
exports.createRecording = async (parameters) => {
  const { context, callSid, params } = parameters;

  if (!isObject(context))
    throw "Invalid parameters object passed. Parameters must contain reason context object";
  if (!isString(callSid))
    throw "Invalid parameters object passed. Parameters must contain callSid string";

  try {
    const client = context.getTwilioClient();
    const recording = await client.calls(callSid).recordings.create(params);
    return { success: true, recording, status: 200 };
  } catch (error) {
    return retryHandler(error, parameters, arguments.callee);
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.callSid the unique call SID to update recording
 * @param {string} parameters.recordingSid the unique recording SID to update
 * @param {object} parameters.params recording update parameters
 * @returns {Map} The recording's properties
 * @description updates the given recording for the given call
 */
exports.updateCallRecording = async (parameters) => {
  const { context, callSid, recordingSid, params } = parameters;
  if (!isObject(context))
    throw "Invalid parameters object passed. Parameters must contain reason context object";
  if (!isString(callSid))
    throw "Invalid parameters object passed. Parameters must contain callSid string";
  if (!isString(recordingSid))
    throw "Invalid parameters object passed. Parameters must contain recordingSid string";
  if (!isObject(params))
    throw "Invalid parameters object passed. Parameters must contain params object";

  try {
    console.log("Mark 1");
    const client = context.getTwilioClient();
    const recording = await client.calls(callSid).recordings(recordingSid).update(params);

    //const recording = await client.calls(callSid).recordings(recordingSid).update(params);
    
    console.log(recording);
    return { success: true, recording, status: 200 };
  } catch (error) {
    return retryHandler(error, parameters, arguments.callee);
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.conferenceSid the unique conference SID to update recording
 * @param {string} parameters.recordingSid the unique recording SID to update
 * @param {object} parameters.params recording update parameters
 * @returns {Map} The recording's properties
 * @description updates the given recording for the given call
 */
exports.updateConferenceRecording = async (parameters) => {
  const { context, conferenceSid, recordingSid, params } = parameters;

  if (!isObject(context))
    throw "Invalid parameters object passed. Parameters must contain reason context object";
  if (!isString(conferenceSid))
    throw "Invalid parameters object passed. Parameters must contain conferenceSid string";
  if (!isString(recordingSid))
    throw "Invalid parameters object passed. Parameters must contain recordingSid string";
  if (!isObject(params))
    throw "Invalid parameters object passed. Parameters must contain params object";

  try {
    const client = context.getTwilioClient();

    const recording = await client.conferences(conferenceSid).recordings(recordingSid).update(params);

    return { success: true, recording, status: 200 };
  } catch (error) {
    return retryHandler(error, parameters, arguments.callee);
  }
};
