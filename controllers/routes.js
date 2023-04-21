// Project: Week 5
// Blog Server
// John Isabella III

const router = require("express").Router();
const dbPath = "./api/blog.json"; // dbPath = file path of our json in relation to the routes.js file
const fs = require("fs"); // FS gives us access to the file system that is built-in with node
const { v4: uuidv4 } = require("uuid"); // Provides us with "Universal Unique Identifier" for our posts

// Here are my Object Keys
// post_id	title	author	body

//! http://localhost:4000/routes/test
router.get("/test", (req, res) => {
  // req: Request
  // res: Response
  res.send("Hello World");
});

//! http://localhost:4000/routes/add
// Endpoint that will allow us to create a new entry which will be appended to the `.json` file's outermost array.
let blogPostArray = [];

router.post("/add", (req, res) => {
  // Add a post to the array
  let blogPostArray = read();
  try {
    const { post_id, title, author, body } = req.body; // Keys out of req.body
    const blogPostObject = {
      // posts are Objects
      post_id: uuidv4(),
      title: title.toUpperCase(),
      author: author,
      body: body,
    };
    blogPostArray.push(blogPostObject); // Blog Posts (Objects) added to the array
    save(blogPostArray);
    const isSaveComplete = save(blogPostArray); // Posts are saved as Objects within the json file
    res.json({
      // Rsponse confirms that the Data has been saved.
      message: isSaveComplete
        ? "You have Posted a Blog Entry"
        : "There was an issue with your Post",
      blogPost: isSaveComplete ? blogPostArray : blogPostArray.slice(-1),
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! http://localhost:4000/routes/view-all
// Endpoint that will display all comments from the database.
router.get("/view-all", (req, res) => {
  // View all Posts
  let blogPostArray = read();
  try {
    res.json({ message: "All Blog Posts", blogPost: blogPostArray });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! http://localhost:4000/routes/view-one
// Endpoint will display one comment from the database selected by post_id
router.get("/view-one/:id", (req, res) => {
  // View 1 Posts
  let blogPostArray = read();
  try {
    let id = req.params.id; // Viewed by specific ID
    let index = blogPostArray.findIndex((blogPost) => blogPost.post_id == id);
    res.json({ message: "Single Blog Post", blogPost: blogPostArray[index] });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! http://localhost:4000/routes/delete/:id
router.delete("/delete/:id", (req, res) => {
  // Delete a Post
  let blogPostArray = read();
  try {
    let id = req.params.id; // Deleted by specific ID
    let index = blogPostArray.findIndex((blogPost) => blogPost.post_id == id);
    blogPostArray = removeOne(index, blogPostArray);
    save(blogPostArray);
    res.json({ message: "Blog Post Removed", blogPost: blogPostArray });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! http://localhost:4000/routes/update/?id=[uuid]
// Endpoint that will allow us to update an existing entry once a match has been found. The search should be done via a query parameter, whereas update information should be enclosed within the body.
router.patch("/update/:id", (req, res) => {
  // Edit a Blog Post
  let blogPostArray = read();
  try {
    const { post_id, title, author, body } = req.body; // Keys out of req.body
    let id = req.params.id; // declare ID before using it
    const blogPostObject = {
      // posts are Objects
      post_id: id, // This is to preserve the ID as it is being edited
      title: title.toUpperCase(),
      author: author,
      body: body,
    };
    let index = blogPostArray.findIndex((blogPost) => blogPost.post_id == id); // Assign an index value based on ID
    blogPostArray = updateOne(index, blogPostObject, blogPostArray); // Update the array
    save(blogPostArray); // Save the array
    res.json({ message: "Blog Post has been Edited", blogPost: blogPostArray });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! FUNCTION LIST (Alphabetical)

// Function Reads all Posts saved in JSON
function read() {
  const file = fs.readFileSync(dbPath);
  return JSON.parse(file);
}

// Function Deletes all Posts saved in JSON
function removeOne(indexNumber, myArray) {
  let newArray = [];
  for (let i = 0; i < myArray.length; i++) {
    if (i !== indexNumber) {
      newArray.push(myArray[i]);
    }
  }
  return newArray;
}

// Function Saves Posts to JSON
function save(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Function allows you to edit posts
function updateOne(indexNumber, newObject, myArray) {
  let newArray = [];
  for (let i = 0; i < myArray.length; i++) {
    if (i === indexNumber) {
      newArray.push(newObject);
    } else {
      newArray.push(myArray[i]);
    }
  }
  return newArray;
}

module.exports = router; // Boiler Plate, will not work without
