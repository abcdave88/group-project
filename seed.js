repl.context.db = db;

db.User.collection.remove();
db.Location.collection.remove();
db.ThreeThings.collection.remove();

db.User.create({
  name: 'User One',
  user_name: 'UzeeeerOne',
  email: 'userone@test.com'
})
