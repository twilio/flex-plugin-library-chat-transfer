const { TaskRouterUtils } = require('@twilio/flex-plugins-library-utils');

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
  const { context, attempts, taskSid, attributesUpdate } = parameters;
  const region = context.TWILIO_REGION ? context.TWILIO_REGION.split('-')[0] : '';
  const config = {
    attempts: attempts || 3,
    taskSid,
    attributesUpdate,
    workspaceSid: context.TWILIO_FLEX_WORKSPACE_SID,
    accountSid: context.ACCOUNT_SID,
    authToken: context.AUTH_TOKEN,
    region,
  };

  const client = context.getTwilioClient();
  const taskRouterClient = new TaskRouterUtils(client, config);

  try {
    const task = await taskRouterClient.updateTaskAttributes(config);

    return {
      success: task.success,
      status: task.status,
      task: {
        ...task.task,
        attributes: JSON.parse(task.task.attributes),
      },
    };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
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
exports.getWorkerChannels = async function getWorkerChannels(parameters) {
  const { context, workerSid } = parameters;
  const region = context.TWILIO_REGION ? context.TWILIO_REGION.split('-')[0] : '';
  const config = {
    attempts: 3,
    workerSid,
    workspaceSid: context.TWILIO_FLEX_WORKSPACE_SID,
    accountSid: context.ACCOUNT_SID,
    authToken: context.AUTH_TOKEN,
    region,
  };

  const client = context.getTwilioClient();
  const taskRouterClient = new TaskRouterUtils(client, config);

  try {
    const task = await taskRouterClient.getWorkerChannels(config);

    return {
      ...task,
    };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
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
exports.updateWorkerChannel = async function updateWorkerChannel(parameters) {
  const { context, workerSid, workerChannelSid, capacity, available } = parameters;
  const region = context.TWILIO_REGION ? context.TWILIO_REGION.split('-')[0] : '';
  const config = {
    attempts: 3,
    workerSid,
    workerChannelSid,
    capacity,
    available,
    workspaceSid: context.TWILIO_FLEX_WORKSPACE_SID,
    accountSid: context.ACCOUNT_SID,
    authToken: context.AUTH_TOKEN,
    region,
  };

  const client = context.getTwilioClient();
  const taskRouterClient = new TaskRouterUtils(client, config);

  try {
    const task = await taskRouterClient.updateWorkerChannel(config);

    return {
      ...task,
    };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
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
  const region = context.TWILIO_REGION ? context.TWILIO_REGION.split('-')[0] : '';
  const config = {
    limit: 1000,
    workspaceSid: context.TWILIO_FLEX_WORKSPACE_SID,
    accountSid: context.ACCOUNT_SID,
    authToken: context.AUTH_TOKEN,
    region,
  };

  const client = context.getTwilioClient();
  const taskRouterClient = new TaskRouterUtils(client, config);

  try {
    const taskQueues = await taskRouterClient.getAllQueues(config);

    return {
      success: taskQueues.success,
      status: taskQueues.status,
      queues: taskQueues.taskQueueList,
    };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
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
  const { attempts, taskSid, updateParams, context } = parameters;
  const region = context.TWILIO_REGION ? context.TWILIO_REGION.split('-')[0] : '';
  const config = {
    attempts: attempts || 3,
    taskSid,
    updateParams,
    workspaceSid: context.TWILIO_FLEX_WORKSPACE_SID,
    accountSid: context.ACCOUNT_SID,
    authToken: context.AUTH_TOKEN,
    region,
  };

  const client = context.getTwilioClient();
  const taskRouterClient = new TaskRouterUtils(client, config);

  try {
    const task = await taskRouterClient.updateTask(config);

    return {
      success: task.success,
      status: task.status,
      task: {
        ...task.task,
        attributes: JSON.parse(task.task.attributes),
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
    if (error.status === 20001 || error.status === 20404) {
      const { context } = parameters;
      console.warn(`${context.PATH}.${arguments.callee.name}(): ${error.message}`);
      return {
        success: true,
        status: 200,
        message: error.message,
      };
    }
    return { success: false, status: error.status, message: error.message };
  }
};
