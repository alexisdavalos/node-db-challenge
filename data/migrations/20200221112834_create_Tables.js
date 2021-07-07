
exports.up = function(knex) {
  return knex.schema
  //projects table
  .createTable('projects', tbl =>{
      tbl.increments('id').primary(); //primary key id
      tbl.string('name', 128).notNullable();
      tbl.string('description', 256);
      tbl.boolean('completed').defaultTo(false)
  })
  //tasks table
  .createTable('tasks', tbl =>{
      tbl.increments('id').primary();
      tbl.string('description', 1000).notNullable();
      tbl.string('notes',1000)
      tbl.boolean('completed').defaultTo(false)
      //FK referebces Project table
      tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

  })
   //resource table
   .createTable('resources', tbl =>{
    tbl.increments('id').primary();
    tbl.string('name', 128).notNullable();
    tbl.string('description',1000)
    //FK referebces Project table
    tbl
    .integer('project_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('projects')
    .onUpdate('CASCADE')
    .onDelete('CASCADE')

})
    //project_resources table
    .createTable('project_resources', tbl => {
        tbl.integer('project_id')
          .unsigned()
          .notNullable()
          .references('id')
          // this table must exist already
          .inTable('project')
        tbl.integer('resource_id')
          .unsigned()
          .notNullable()
          .references('id')
          // this table must exist already
          .inTable('resrouces')
      
        // the combination of the two keys becomes our primary key
        // will enforce unique combinations of ids
        tbl.primary(['project_id', 'resource_id']);
      });

};

exports.down = function(knex, Promise) {
    // drop in the opposite order
    return knex.schema
      .dropTableIfExists('project_resources')
      .dropTableIfExists('resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('projects')
  };
