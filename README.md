(Assignment Link)[https://docs.google.com/document/d/1ZsJuN98QFCylUV3cYcmVOHR1arLZnbVZ-8JTwLZ2uyc/edit?tab=t.0#heading=h.gvzmaz6a8szj]




***this was the task given***

Phoenix : IMF Gadget API Development Challenge
Background:
The Impossible Missions Force (IMF) needs your help! They require a secure API to manage their gadgets. Your mission, should you choose to accept it, is to build this API using Node.js, Express, and PostgreSQL. Choose any ORM you like.
Mission Objectives:
Gadget Inventory (/gadgets)
GET: Retrieve a list of all gadgets.
When retrieving the list of gadgets, include a randomly generated "mission success probability" percentage for each gadget (e.g., "The Nightingale - 87% success probability").
POST: Add a new gadget to the inventory.
Assign it a unique, randomly generated codename (e.g., "The Nightingale", "The Kraken").
PATCH: Update an existing gadget's information.
DELETE: Remove a gadget from the inventory.
Instead of actually deleting the gadget, mark its status as "Decommissioned" and add a timestamp for when it was decommissioned.
Self-Destruct Sequence (/gadgets/{id}/self-destruct)


POST: Trigger the self-destruct sequence for a specific gadget.
Requires a randomly generated confirmation code (you can simulate this; no need to actually send it anywhere).
Data Requirements
Gadgets:
id (UUID)
name (string)
status (string, enum: ["Available", "Deployed", "Destroyed", "Decommissioned"])

Bonus Points:
Implement robust authentication and authorization (JWT) to protect the API.
Deploy the API to a platform like Heroku, Render, or Railway.
Implement the GET /gadgets?status={status} filter to find gadgets with a specific status.
Submission:
GitHub repository link with your code.
Live link to the deployed API.
Postman or Swagger documentation link.
Evaluation Criteria:
Functionality: Does the API meet the requirements?
Code quality: Is the code well-organized and easy to understand?
Security: Does the API have robust authentication and authorization?
Error handling: Are errors handled gracefully?
Deployment and documentation: Is the API deployed and documented?
Good luck, agent!
This message will self-destruct in 5 seconds... Just kidding!  But seriously, if you're up for the challenge, send your completed assignment and resume to abhay@upraised.co  📧
P.S. We also accept carrier pigeons and messages in a bottle (but email is probably faster)
