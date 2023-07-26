## Details

# Note
This plugin is only compatible with 'Programmable Chat API' and not with 'Conversations API'.

### How it works
Plugin is ready to use once it is installed and the browser window is refreshed.
- A transfer button is added to the task canvas.
- Clicking this button pops an agent and queue directory.
- Against every agent or queue in the directory there are transfer and consult buttons.
- Agent can click Transfer to initiate a cold transfer and wrap up.
- Or the agent can choose Consult to start a 3 way chat with another agent (warm transfer).
- Chat history is visible to the transferred agent.

### Installation
During installation, 2 fields are required:

 1. *TaskRouter Workspace SID*: This is the SID of the "Flex Task Assignment" workspace that you see in [Twilio Console > TaskRouter > Workspaces](https://console.stage.twilio.com/us1/develop/taskrouter/workspaces).Please refer screenshot below:
 ![Workspace Sid example](https://raw.githubusercontent.com/twilio/flex-plugin-library-chat-transfer/main/screenshots/workspace_sid_help.png)

 2. *TaskRouter Chat Transfer Workflow SID*: You may want to create a new TaskRouter workflow for chat transfer or use the default workflow in [Twilio Console > TaskRouter > Workspaces > Flex Task Assignment](https://console.stage.twilio.com/us1/develop/taskrouter/workspaces) > Workflows > Assign to Anyone and get its SID
