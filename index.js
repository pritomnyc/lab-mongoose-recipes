const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI =
  "mongodb+srv://mahim:mahim@cluster0.r3bte.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let newRecipe = {
  title: "Cheeseburger",
  cuisine: "American",
};
// .then((self) => {
//   console.log(`Connected to the database: "${self.connection.name}"`);
//   // Before adding any recipes to the database, let's remove all existing ones
//   return Recipe.deleteMany();
// })

// .then(() => {
//   // Run your code here, after you have insured that the connection was made
// });

//Iteration 2- Creating Recipe
// Recipe.create({
//   title: "Asian Glazed Chicken Thighs",
//   level: "Amateur Chef",
//   ingredients: [
//     "1/2 cup rice vinegar",
//     "5 tablespoons honey",
//     "1/3 cup soy sauce (such as Silver Swan®)",
//     "1/4 cup Asian (toasted) sesame oil",
//     "3 tablespoons Asian chili garlic sauce",
//     "3 tablespoons minced garlic",
//     "salt to taste",
//     "8 skinless, boneless chicken thighs",
//   ],
//   cuisine: "Asian",
//   dishType: "main_course",
//   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//   duration: 40,
//   creator: "Chef LePapu",
// })
//   .then((recipe) => {
//     console.log(recipe.title);
//   })

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    await Recipe.deleteMany();
    await Recipe.create(newRecipe);
    await Recipe.insertMany(data);
    await Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 1000 }
    );
    await Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
