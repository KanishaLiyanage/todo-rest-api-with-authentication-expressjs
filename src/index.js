const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //Automatically parse incoming JSON to an object, so we can access in our request handlers.

app.post('/users', (req, res) => {
    const user = new User(req.body); 
//incoming body data storing in a constant user with the help of above JSON parse code.
    user.save().then(() => {
        res.status(201).send(user); //save the user in our mongoDB database
    }).catch((e) => {
        res.status(400).send(e); //if data validating failed this 400 status will shown up 
    });
});

app.get("/users", function(req, res){ //fetch all the users from the DB
    User.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((e) => {
        res.status(500).send(e); //500 means database connection internal server down error
    });
});

app.get("/users/:id", function(req, res){ //fetch specific user from matches given user id from the DB. dynamic value.
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404).send(user);
        }else{
            res.status(200).send(user);
        }
    }).catch((e) => {
        res.status(500).send(e); //500 means database connection internal server down error
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body); 
//incoming body data storing in a constant user with the help of above JSON parse code.
    task.save().then(() => {
        res.status(201).send(task); //save the user in our mongoDB database
    }).catch((e) => {
        res.status(400).send(e); //if data validating failed this 400 status will shown up 
    });
});

app.get("/tasks", function(req, res){ //fetch all the tasks from the DB
    Task.find({}).then((tasks) => {
        res.status(200).send(tasks);
    }).catch((e) => {
        res.status(500).send(e); //500 means database connection internal server down error
    });
});

app.get("/tasks/:id", function(req, res){ //fetch specific task from matches given task id from the DB. dynamic value.
    const _id = req.params.id;
    Task.findById(_id).then((task) => {
        if(!task){
            return res.status(404).send(task);
        }else{
            res.status(200).send(task);
        }
    }).catch((e) => {
        res.status(500).send(e); //500 means database connection internal server down error
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});