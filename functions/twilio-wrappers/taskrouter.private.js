const { merge, isString, isObject, omitBy, isNil } = require('lodash');

const retryHandler = require(Runtime.getFunctions()['twilio-wrappers/retry-handler'].path).retryHandler;

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {string} parameters.taskSid the task to update
 * @param {string} parameters.attributesUpdate a JSON object to merge with the task
 * @returns {object} an object containing the task if successful
 * @description this operation safely updates the task attributes with the object
 * given by performing a deep merge with the existing task attributes and ensuring
 * its updating the version it started with using the ETag header
 * more explained here https://www.twilio.com/docs/taskrouter/api/task#task-version
 */
exports.updateTaskAttributes = async function updateTaskAttributes(parameters) {
  const { attempts, taskSid, attributesUpdate, context } = parameters;
  if (!isString(taskSid)) throw 'Invalid parameters object passed. Parameters must contain the taskSid string';
  if (!isString(attributesUpdate))
    throw 'Invalid parameters object passed. Parameters must contain attributesUpdate JSON string';

  try {
    const axios = require('axios');

    const region = context.TWILIO_REGION ? context.TWILIO_REGION.split('-')[0] : '';
    const hostName = region ? `https://taskrouter.${region}.twilio.com` : 'https://taskrouter.twilio.com';
    const taskContextURL = `${hostName}/v1/Workspaces/${process.env.TWILIO_FLEX_WORKSPACE_SID}/Tasks/${taskSid}`;
    let config = {
      auth: {
        username: process.env.ACCOUNT_SID,
        password: process.env.AUTH_TOKEN,
      },
    };

    // we need to fetch the task using a rest API because
    // we need to examine the headers to get the ETag
    const getResponse = await axios.get(taskContextURL, config);
    let task = getResponse.data;
    task.attributes = JSON.parse(getResponse.data.attributes);
    task.revision = JSON.parse(getResponse.headers.etag);
    // merge the objects
    let updatedTaskAttributes = omitBy(merge({}, task.attributes, JSON.parse(attributesUpdate)), isNil);

    // if-match the revision number to ensure
    // no update collisions
    config.headers = {
      'If-Match': task.revision,
      'content-type': 'application/x-www-form-urlencoded',
    };

    const data = new URLSearchParams({
      Attributes: JSON.stringify(updatedTaskAttributes),
    });
    task = (await axios.post(taskContextURL, data, config)).data;

    return {
      success: true,
      status: 200,
      task: {
        ...task,
        attributes: JSON.parse(task.attributes),
      },
    };
  } catch (error) {
    return retryHandler(error, parameters, arguments.callee);
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.workerSid the worker sid to fetch channels for
 * @returns {object} worker channel object
 * @description the following method is used to fetch the configured
 *   worker channel
 */
exports.getWorkerChannels = async function updateWorkerChannel(parameters) {
  const { context, workerSid } = parameters;

  if (!isObject(context)) throw new Error('Invalid parameters object passed. Parameters must contain context object');
  if (!isString(workerSid))
    throw new Error('Invalid parameters object passed. Parameters must contain workerSid string');

  try {
    const client = context.getTwilioClient();
    const workerChannels = await client.taskrouter.v1
      .workspaces(process.env.TWILIO_FLEX_WORKSPACE_SID)
      .workers(workerSid)
      .workerChannels.list();

    return {
      success: true,
      status: 200,
      workerChannels,
    };
  } catch (error) {
    return retryHandler(error, parameters, exports.getWorkerChannels);
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @returns {object} An object containing an array of queues for the account
 * @description the following method is used to robustly retrieve
 *   the queues for the account
 */

exports.getQueues = async function getQueues(parameters) {
  const { context } = parameters;

  if (!isObject(context)) throw new Error('Invalid parameters object passed. Parameters must contain context object');

  try {
    const client = context.getTwilioClient();
    const queues = await client.taskrouter.v1
      .workspaces(process.env.TWILIO_FLEX_WORKSPACE_SID)
      .taskQueues.list({ limit: 1000 });

    return {
      success: true,
      status: 200,
      queues,
    };
  } catch (error) {
    return retryHandler(error, parameters, exports.getQueues);
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.taskSid the task to update
 * @param {object} parameters.updateParams parameters to update on the task
 * @returns {object} an object containing the task if successful
 * @description updates the given task with the given params
 */
exports.updateTask = async function updateTask(parameters) {
  const { taskSid, updateParams, context } = parameters;

  if (!isString(taskSid))
    throw new Error('Invalid parameters object passed. Parameters must contain the taskSid string');
  if (!isObject(updateParams))
    throw new Error('Invalid parameters object passed. Parameters must contain updateParams object');
  if (!isObject(context))
    throw new Error('Invalid parameters object passed. Parameters must contain reason context object');

  try {
    const client = context.getTwilioClient();

    const task = await client.taskrouter.v1
      .workspaces(process.env.TWILIO_FLEX_WORKSPACE_SID)
      .tasks(taskSid)
      .update(updateParams);

    return {
      success: true,
      status: 200,
      task: {
        ...task,
        attributes: JSON.parse(task.attributes),
      },
    };
  } catch (error) {
    // 20001 error code is returned when the task is not in an assigned state
    // this can happen if its not been assigned at all or its been already closed
    // through another process; as a result assuming the latter and
    // treating as a success
    // https://www.twilio.com/docs/api/errors/20001
    // 20404 error code is returned when the task no longer exists
    // in which case it is also assumed to be completed
    // https://www.twilio.com/docs/api/errors/20404
    if (error.code === 20001 || error.code === 20404) {
      console.warn(`${context.PATH}.updateTask(): ${error.message}`);
      return {
        success: true,
        status: 200,
        message: error.message,
      };
    }
    return retryHandler(error, parameters, exports.updateTask);
  }
};
