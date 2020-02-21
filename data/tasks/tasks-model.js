const db = require('../../db-config');

module.exports ={
    find,
    findById,
    add,
    findByProjectId,
    remove,
    update
}

function find() {
    return db('tasks');
}
function findByProjectId(project_id){
    return db('tasks')
    .join('projects', 'tasks.project_id', 'projects.id')
    .where('tasks.project_id', project_id)
}
function findById(id){
    return db('tasks')
    .where({id})
    .first()
}
//ASYNC RETURNS OBJECTS AFTER DB FETCH
async function add (task) {
    const [id] = await db('tasks').insert(task) //inserts new data and abstracts the id
    return db('tasks').where({id}).first() //return db call for row that matches the abstracted id
}

function remove(id){
    return db('tasks')
    .where({id})
    .del();
}
function update(changes, id){
    return db('tasks')
    .where({id})
    .update(changes);
}