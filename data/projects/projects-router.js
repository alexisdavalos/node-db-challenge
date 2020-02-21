const express = require('express');

const Projects = require('./projects-model');
const Tasks = require('../tasks/tasks-model');
const Resources = require('../resources/resources-model');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Projects' });
  });
});

router.get('/:id', (req, res) => {
const { id } = req.params;
let tasks = [];
let resources = [];
const setTasks = (new_tasks) =>{
    return tasks = new_tasks;
}
const setRes = (new_res) =>{
    return resources = new_res
}
  Projects.findById(id)
  .then(async project => {
    if (project) {
    //fetch tasks and set to state
     await Tasks.findByProjectId(project.id).then(async tasks =>{
        if(tasks){
            await setTasks(tasks) //sets tasks to state
        }else{
            res.status(200).json(project);
        }
    }).catch(err => {
        res.status(500).json({ message: 'Failed to get Project Tasks' });
    }); //End Find Tasks
    console.log('fetching resources...')
    //fetch resources and set to state
    await Resources.findByProjectId(project.id).then(async resources =>{
        console.log('inside resources')
        if(resources){
            await setRes(resources)
        }else{
            res.status(200).json({...project, tasks: tasks, resources: 'no resources available'});
        }
    }).catch(err => {
        res.status(500).json({ message: 'Failed to get Project resources' });
    }); //End Find Tasks
    
    console.log('tasks in state:', tasks)
    console.log('resources in state:', resources)
    console.log(project.id)
    res.status(200).json({...project, tasks: tasks, resources: resources});
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Projects' });
  });
});

router.post('/', (req, res) => {
  const projectData = req.body;

  Projects.add(projectData)
  .then(project => {
    res.status(201).json(project);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.findById(id)
  .then(project => {
    console.log('updating:',changes)
    if (project) {
      Projects.update(changes, id)
      .then(updatedproject => {
        res.json(updatedproject);
      });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update project' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete project' });
  });
});

module.exports = router;