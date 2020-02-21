const db = require('../../db-config');

module.exports ={
    find,
    findById,
    add,
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