# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

todos = Todo.create([
    {
      title: "Task 1",
      description: "Description 1",
      done: false
    },
    {
      title: "Task 2",
      description: "Description 2",
      done: false
    },
    {
      title: "Task 3",
      description: "Description 3",
      done: false
    },
  ])