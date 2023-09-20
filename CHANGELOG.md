# chat-transfer

This feature enables chat users to perform cold and warm transfers to individual agents or queues. It also introduces notifications into the chat channel for users joining or leaving chat, or starting a cold/warm transfer.

If using the notification feature it is advised that you copy the custom components over to the customer facing chat react app to be re-used, so the custom messages with message-attributes indicating a notification can be rendered the same as they will be in flex.

# setup and dependencies

During installation, 4 fields are required:

 1. *TaskRouter Workspace SID*: This is the SID of the "Flex Task Assignment" workspace that you see in [Twilio Console > TaskRouter > Workspaces](https://console.twilio.com/us1/develop/taskrouter/workspaces)

 2. *TaskRouter Chat Transfer Workflow SID*: You may want to create a new TaskRouter workflow for chat transfer or use the default workflow in [Twilio Console > TaskRouter > Workspaces > Flex Task Assignment](https://console.twilio.com/us1/develop/taskrouter/workspaces) > Workflows > Assign to Anyone and get its SID.

 3. *Cold Transfer*: Enables a ‘transfer’ icon in the task header to implement cold transfer. Enter "Enable" or "Disable".

 4. *Multi Participant*: Enables a participants tab for adding agents or removing them from the conversation. Enter "Enable" or "Disable".

## How it works
Plugin is ready to use once it is installed and the browser window is refreshed.
- A transfer button is added to the task canvas.
- Clicking this button pops an agent and queue directory.
- Against every agent or queue in the directory there are transfer and consult buttons.
- Agent can click Transfer to initiate a cold transfer and wrap up.
- Or the agent can choose Consult to start a 3 way chat with another agent (warm transfer).
- Chat history is visible to the transferred agent.

