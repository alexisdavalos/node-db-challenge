const express = require('express');
const helmet = require('helmet');

const ProjectRouter = require('./data/projects/projects-router.js');
const TaskRouter = require('./data/tasks/tasks-router.js');
const server = express();

server.use(express.json());
server.use(helmet());

//Routers
server.use('/api/projects', ProjectRouter)
server.use('/api/tasks', TaskRouter)


server.get('/', (req, res) =>{
    res.status(200).send('<h1>Node-Db-Sprint-Challenge</h1>') 
})

module.exports = server;