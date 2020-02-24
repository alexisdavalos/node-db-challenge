const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//Routers
const ProjectRouter = require('./data/projects/projects-router.js');
const TaskRouter = require('./data/tasks/tasks-router.js');
const ResourcesRouter = require('./data/resources/resources-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

//Routes
server.use('/api/projects', ProjectRouter)
server.use('/api/tasks', TaskRouter)
server.use('/api/resources', ResourcesRouter)


server.get('/', (req, res) =>{
    res.status(200).send('<h1>Node-Db-Sprint-Challenge</h1>') 
})

module.exports = server;