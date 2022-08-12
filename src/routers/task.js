const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body); 
//incoming body data storing in a constant user with the help of above JSON parse code.
    try{
        await task.save();
        res.status(201).send(task); //save the user in our mongoDB database
    } catch (e) {
        res.status(400).send(e); //if data validating failed this 400 status will shown up 
    }
});

router.get("/tasks", async function(req, res){ //fetch all the tasks from the DB
    try{
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(e); //500 means database connection internal server down error
    }
});

router.get("/tasks/:id",async function(req, res){ //fetch specific task from matches given task id from the DB. dynamic value.
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

router.patch("/tasks/:id", async (req, res) => {
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

router.delete("/tasks/:id", async (req, res) => {
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


module.exports = router;