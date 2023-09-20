## Details

#### Please Note
Version 2 of this plugin is based on [Flex Conversations](https://console.twilio.com/us1/develop/taskrouter/workspaces). It is not backwards compatible with the previous version which was based on Programmable Chat, which has been deprecated.

### How it works
Plugin is ready to use once it is installed and the browser window is refreshed.
- A transfer button is added to the task canvas.
- Clicking this button pops an agent and queue directory.
- Against every agent or queue in the directory there are transfer and consult buttons.
- Agent can click Transfer to initiate a cold transfer and wrap up.
- Or the agent can choose Consult to start a 3 way chat with another agent (warm transfer).
- Chat history is visible to the transferred agent.

### Installation
During installation, 4 fields are required:

 1. *TaskRouter Workspace SID*: This is the SID of the "Flex Task Assignment" workspace that you see in [Twilio Console > TaskRouter > Workspaces](https://console.twilio.com/us1/develop/taskrouter/workspaces)

 2. *TaskRouter Chat Transfer Workflow SID*: You may want to create a new TaskRouter workflow for chat transfer or use the default workflow in [Twilio Console > TaskRouter > Workspaces > Flex Task Assignment](https://console.twilio.com/us1/develop/taskrouter/workspaces) > Workflows > Assign to Anyone and get its SID.

 3. *Cold Transfer*: Enables a *transfer* icon for the task header that can be used to implement cold/blind transfer. Enter *Enable* or *Disable* in the text box.

 4. *Multi Participant*: Enables a participants tab for adding agents or removing them from the conversation. Enter *Enable* or *Disable* in the text box.

 **Please Note**
At least one of cold or warm transfer should be *Enabled* otherwise the transfer button will not be added to the conversation header.