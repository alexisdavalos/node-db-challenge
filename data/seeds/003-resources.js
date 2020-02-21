
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, name: 'Some resource 1', description: 'the resource description',  project_id: 1},
        {id: 2, name: 'Some resource 2', description: 'the resource description',  project_id: 2},
        {id: 3, name: 'Some resource 3', description: 'the resource description',  project_id: 3}
      ]);
    });
};
