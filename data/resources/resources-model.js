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
    return db('resources');
}
function findById(id){
    return db('resources')
    .where({id})
    .first()
}
function findByProjectId(project_id){
    return db('resources as r')
    .join('projects', 'r.project_id', 'projects.id')
    .select('r.id','r.name','r.description')
    .where('r.project_id', project_id)
}
//ASYNC RETURNS OBJECTS AFTER DB FETCH
async function add (resource) {
    const [id] = await db('resources').insert(resource) //inserts new data and abstracts the id
    return db('resources').where({id}).first() //return db call for row that matches the abstracted id
}

function remove(id){
    return db('resources')
    .where({id})
    .del();
}
function update(changes, id){
    return db('resources')
    .where({id})
    .update(changes);
}