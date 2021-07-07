const db = require('../../db-config');

module.exports ={
    find,
    findById,
    add,
    remove,
    update
}

function find() {
    return db('projects');
}
function findById(id){
    return db('projects')
    .where({id})
    .first()
}
//ASYNC RETURNS OBJECTS AFTER DB FETCH
async function add (project) {
    const [id] = await db('projects').insert(project) //inserts new data and abstracts the id
    return db('projects').where({id}).first() //return db call for row that matches the abstracted id
}

function remove(id){
    return db('projects')
    .where({id})
    .del();
}
function update(changes, id){
    return db('projects')
    .where({id})
    .update(changes);
}