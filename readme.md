The task manager API's are created using Node.js, Express.js, and NPM packages.
The API allows users to perform CRUD operations (Create, Read, Update, and Delete) on tasks.

packages to be installed

body-parser and express

run the npm init command before installing any of the packages

Commands to be run for Installing the packages 
npm install --save express
npm install --save body-parser

Starting the server - node app.js

Functionalitis Supported
    1.View all tasks, filter can be applied to retreive if tasks are completed or not 
    2. Retreive a single id
    3. Create a new task
    4. Update a task based on id
    5. Delete a task by it's id
    6. Retrieve task based on priority level

The implementation of each of the endpoints can be executed with the following commands

GET /tasks: Retrieve all tasks.
    http://localhost:3000/tasks

    To retrieve only incomplete tasks use query parameter?completed=false 
    http://localhost:3000/tasks?completed=false 

    To retrieve only completed tasks use query parameter?completed=true 
    http://localhost:3000/tasks?completed=true  

GET /tasks/:id: Retrieve a single task by its ID.
    http://localhost:3000/tasks/2

POST /tasks: Create a new task.
the below text needs to be added into json body in postman or thunderclient
    {
  "title": "API testing on thunder client",
  "description": "Testing thunder client",
  "completed": false,
  "priority": "medium"
}
    http://localhost:3000/tasks

PUT /tasks/:id: Update an existing task by its ID.
the below text needs to be added into json body in postman or thunderclient
    {
  "title": "API testing on thunder client",
  "description": "Testing thunder client",
  "completed": true,
  "priority": "medium"
}
    http://localhost:3000/tasks/4

DELETE /tasks/:id: Delete a task by its ID.
    http://localhost:3000/tasks/4

GET /tasks/priority/:level.
Get only the list of tasks based upon priority level provided as parameter value(low|medium|high).
    http://localhost:3000/tasks/priority/low
