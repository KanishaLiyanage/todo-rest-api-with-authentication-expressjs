const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //Automatically parse incoming JSON to an object, so we can access in our request handlers.

app.post('/users', async (req, res) => {
    const user = new User(req.body); 
//incoming body data storing in a constant user with the help of above JSON parse code.
    try {
        await user.save();
        res.status(201).send(user); //save the user in our mongoDB database
    } catch (e) {
        res.status(400).send(e); //if data validating failed this 400 status will shown up.
    }

});

app.get("/users", async function(req, res){ //fetch all the users from the DB
    try{
        const users = await User.find({});
        res.status(200).send(users);

    } catch (e) {
        res.status(500).send(e); //500 means database connection internal server down error
    }
});

app.get("/users/:id", async function(req, res){ //fetch specific user from matches given user id from the DB. dynamic value.
    const _id = req.params.id;
    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send(user);
        }else{
            res.status(200).send(user);
        }
    } catch (e) {
        res.status(500).send(e); //500 means database connection internal server down error
    }
});

app.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if(!isValidOperation){
        return res.status(400).send({error: "Invalid updates!"});
    }
    const _id = req.params.id;
    try{
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});
        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.delete("/users/:id", async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).send(e);
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body); 
//incoming body data storing in a constant user with the help of above JSON parse code.
    try{
        await task.save();
        res.status(201).send(task); //save the user in our mongoDB database
    } catch (e) {
        res.status(400).send(e); //if data validating failed this 400 status will shown up 
    }
});

app.get("/tasks", async function(req, res){ //fetch all the tasks from the DB
    try{
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(e); //500 means database connection internal server down error
    }
});

app.get("/tasks/:id",async function(req, res){ //fetch specific task from matches given task id from the DB. dynamic value.
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id);
        if(!task){
            return res.status(404).send(task);
        }else{
            res.status(200).send(task);
        }
    } catch (e) {
        res.status(500).send(e); //500 means database connection internal server down error
    }
});

app.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if(!isValidOperation){
        return res.status(400).send({error: "Invalid updates!"});
    }
    const _id = req.params.id;
    try{
        const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});
        if(!task){
            return res.status(404).send();
        }
        res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            res.status(404).send(e);
        }
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});