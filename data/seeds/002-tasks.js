
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, description: 'the task description', notes:'optional', completed: false, project_id: 1},
        {id: 2, description: 'the task description', notes:'optional', completed: false, project_id: 2},
        {id: 3, description: 'the task description', notes:'optional', completed: false, project_id: 3}
      ]);
    });
};
