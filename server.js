const express = require('express');
const helmet = require('helmet');

const ProjectRouter = require('./data/projects/projects-router.js')
const server = express();

server.use(express.json());
server.use(helmet());

//Routers
server.use('/api/projects', ProjectRouter)


server.get('/', (req, res) =>{
    res.status(200).send('<h1>Node-Db-Sprint-Challenge</h1>') 
})

module.exports = server;