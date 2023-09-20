const { prepareFlexFunction, extractStandardResponse } = require(Runtime.getFunctions()["helpers/prepare-function"].path);
const TaskRouterOperations = require(Runtime.getFunctions()['twilio-wrappers/taskrouter'].path);

const requiredParameters = [];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const result = await TaskRouterOperations.getQueues({
      context,
    });
    const { queues: fullQueueData, status } = result;
    const queues = fullQueueData
      ? fullQueueData.map((queue) => {
          const { targetWorkers, friendlyName, sid } = queue;
          return { targetWorkers, friendlyName, sid };
        })
      : null;
    response.setStatusCode(status);
    response.setBody({ queues, ...extractStandardResponse(result) });
    return callback(null, response);
  } catch (error) {
    return handleError(error);
  }
});
