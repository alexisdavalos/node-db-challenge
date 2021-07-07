
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Create React App', description: 'the project description', completed: false},
        {id: 2, name: 'Create Node Express Server', description: 'the project description', completed: false},
        {id: 3, name: 'Create Static HTML Site', description: 'the project description', completed: false}
      ]);
    });
};
