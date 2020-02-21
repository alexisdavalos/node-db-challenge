const db = require('../../db-config');

module.exports ={
    find,
    findById,
    add,
    addStep,
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
async function add (scheme) {
    console.log(scheme);
    const [id] = await db('projects').insert(scheme) //inserts new data and abstracts the id
    return db('projects').where({id}).first() //return db call for row that matches the abstracted id

    //different version

    // const ids = await db('projects').insert(scheme)
    // const id = ids[0]
    // return db('projects').where({id}).first()
}
function addStep (steps, scheme_id) {
    return db('steps')
    .where({scheme_id})
    .insert(steps, 'id');
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