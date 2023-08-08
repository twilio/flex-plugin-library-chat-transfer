const { merge, isString, isObject, isNumber, isBoolean, omitBy, isNil } = require("lodash");

const retryHandler = require(Runtime.getFunctions()[
  "twilio-wrappers/retry-handler"
].path).retryHandler;

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

  if (!isNumber(attempts))
    throw "Invalid parameters object passed. Parameters must contain the number of attempts";
  if (!isString(taskSid))
    throw "Invalid parameters object passed. Parameters must contain the taskSid string";
  if (!isString(attributesUpdate))
    throw "Invalid parameters object passed. Parameters must contain attributesUpdate JSON string";

  try {
    const axios = require("axios");

    const region = context.TWILIO_REGION ? context.TWILIO_REGION.split('-')[0] : '';
    const hostName = region ? `https://taskrouter.${region}.twilio.com` : "https://taskrouter.twilio.com";
    const taskContextURL = `${hostName}/v1/Workspaces/${process.env.TWILIO_FLEX_WORKSPACE_SID}/Tasks/${taskSid}`;    let config = {
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
    let updatedTaskAttributes = omitBy(merge(
      {},
      task.attributes,
      JSON.parse(attributesUpdate)
    ), isNil);

    // if-match the revision number to ensure
    // no update collisions
    config.headers = {
      "If-Match": task.revision,
      "content-type": "application/x-www-form-urlencoded",
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
