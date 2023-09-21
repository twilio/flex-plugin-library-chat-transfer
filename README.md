# chat-transfer

This feature enables chat users to perform cold and warm transfers to individual agents or queues. It also introduces notifications into the chat channel for users joining or leaving chat, or starting a cold/warm transfer.

If using the notification feature it is advised that you copy the custom components over to the customer facing chat react app to be re-used, so the custom messages with message-attributes indicating a notification can be rendered the same as they will be in flex.

# setup and dependencies

During installation, 4 fields are required:

 1. *TaskRouter Workspace SID*: This is the SID of the "Flex Task Assignment" workspace that you see in [Twilio Console > TaskRouter > Workspaces](https://console.twilio.com/us1/develop/taskrouter/workspaces)

 2. *TaskRouter Chat Transfer Workflow SID*: You may want to create a new TaskRouter workflow [(Refer **TaskRouter Workflow**)](#taskrouter-workflow) for chat transfer or use the default workflow in [Twilio Console > TaskRouter > Workspaces > Flex Task Assignment](https://console.twilio.com/us1/develop/taskrouter/workspaces) > Workflows > Assign to Anyone and get its SID.

 3. *Cold Transfer*: Enables a ‘transfer’ icon in the task header to implement cold transfer. Enter "Enable" or "Disable".

 4. *Multi Participant*: Enables a participants tab for adding agents or removing them from the conversation. Enter "Enable" or "Disable".

 ### TaskRouter Workflow
A new task is created for each invite to an agent or queue. A TaskRouter workflow is used to route to the correct agent (using Known Agent Routing) and requires a target for each queue that agents will invite agents from. As well as indicating the transfer target in task attributes it also adds the worker sids for agents that are currently in the chat. The workflow can use this task attribute to ensure that agents already in the chat are not considered for routing for transfers to a queue.

The TaskAttributes that are set by the plugin are:

```
transferTargetType - set to either worker or queue
transferTargetSid - will be set to the worker sid in the case of target type == worker
transferQueueName - TaskRouter friendly name for the queue in the case of target type == queue
workerSidsInConversation - string array of workers in the conversation
```


A sample workflow showing how to route to the agent, queue and ignore agents in the conversation is below:
```
{
  "task_routing": {
    "filters": [
      {
        "filter_friendly_name": "Assign to Worker",
        "expression": "transferTargetType == 'worker'",
        "targets": [
          {
            "queue": "WQaaaaa",
            "known_worker_sid": "task.transferTargetSid"
          }
        ]
      },
      {
        "filter_friendly_name": "Assign to Queue - Everyone",
        "expression": "transferQueueName == 'Everyone'",
        "targets": [
          {
            "queue": "WQbbbb",
            "expression": "worker.sid NOT IN task.workerSidsInConversation"
          }
        ]
      },
      {
        "filter_friendly_name": "Assign To Queue - Parked Calls",
        "expression": "transferQueueName == 'Parked Calls'",
        "targets": [
          {
            "queue": "WQcccc",
            "expression": "worker.sid NOT IN task.workerSidsInConversation"
          }
        ]
      },
      {
        "filter_friendly_name": "Assign To Queue Outbound",
        "expression": "transferQueueName == 'Outbound'",
        "targets": [
          {
            "queue": "WQdddd",
            "expression": "worker.sid NOT IN task.workerSidsInConversation"
          }
        ]
      }
    ]
  }
}
```
It is recommended to name this workflow "Chat Transfer", Use the SID of this workflow as *TaskRouter Chat Transfer Workflow SID* on installation form.

## How it works
Plugin is ready to use once it is installed and the browser window is refreshed.
- A transfer button is added to the task canvas.
- Clicking this button pops an agent and queue directory.
- Against every agent or queue in the directory there are transfer and consult buttons.
- Agent can click Transfer to initiate a cold transfer and wrap up.
- Or the agent can choose Consult to start a 3 way chat with another agent (warm transfer).
- Chat history is visible to the transferred agent.

