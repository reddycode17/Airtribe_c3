const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.get('/', (req,res) =>{
    return res.status(200).send("Welcome to Task manager application");
})

const tasks = [
    {
      id: 1,
      title: "Microsoft services",
      description: "Windows update",
      completed: false,
      priority: "low",
      creationDate: "2023-07-26",
      updateDate: "2023-07-26",
    },
    {
      id: 2,
      title: "Airtribe Assignment",
      description: "Task manager assignment",
      completed: true,
      priority: "medium",
      creationDate: "2023-07-29",
      updateDate: "2023-07-30",
    },
    {
      id: 3,
      title: "Book Vendors",
      description: "Engadment decor and photos",
      completed: false,
      priority: "high",
      creationDate: "2023-07-24",
      updateDate: "2023-07-24",
    },
  ];

// GET all tasks
// app.get('/tasks', (req, res) => {
//     if (tasks.length === 0) {
//         return res.status(404).send('No tasks found' );
//       }
//     return res.status(200).json(tasks);
// });

app.get('/tasks', (req, res) => {
    const { completed, sortBy } = req.query;

    let filteredTasks = tasks;
    if (completed !== undefined) {
        const isCompleted = completed.toLowerCase() === 'true';
        filteredTasks = tasks.filter((task) => task.completed === isCompleted);
    }
    if (sortBy === 'creationDate') {
        filteredTasks = tasks.sort((task1, task2) =>new Date(task1.priority) - new Date(task2.priority));
    }
  
    res.status(200).json(filteredTasks);
});

// GET a single task by ID
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
      return res.status(404).send('Task not found' );
    }
    res.status(200).json(task);
});

// POST create a new task
app.post('/tasks', (req, res) => {
    const { title, description, completed, priority} = req.body;
    if (!title || !description || completed === undefined || priority === undefined) {
      return res.status(400).send('Title, description, completion status and priority are required' );
    }
  
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      completed,
      priority,
      creationDate: new Date().toISOString().slice(0, 22),
      updateDate: new Date().toISOString().slice(0, 22)
    };
    tasks.push(newTask);
  
    res.status(201).json(newTask);
});

// PUT update an existing task by ID
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
      return res.status(404).send('Task not found' );
    }
  
    const { title, description, completed, priority } = req.body;
    if (!title || !description || completed === undefined || priority === undefined) {
      return res.status(400).send( 'Title, description, completion status and priority are required' );
    }
  
    task.title = title;
    task.description = description;
    task.completed = completed;
    task.priority = priority;
    task.updateDate = new Date().toISOString().slice(0, 22);
    res.json(task);
});
  
// DELETE a task by ID
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
      return res.status(404).send('Task not found' );
    }
  
    tasks.splice(taskIndex, 1);
    res.send('Task deleted successfully' );
});


// Get tasks based on priority level
app.get('/tasks/priority/:level', (req, res) => {
    const priorityLevel = req.params.level.toLowerCase();
    const validPriorityLevels = ['low', 'medium', 'high'];
  
    if (!validPriorityLevels.includes(priorityLevel)) {
      return res.status(400).send('Invalid priority level' );
    }
  
    const tasksWithPriority = tasks.filter((task) => task.priority === priorityLevel);
    res.json(tasksWithPriority);
});


app.listen(PORT, (error) => {
    if(!error){
        console.log("server started successfully");
    }else {
        console.log("server error");
    }
});