// Project: Week 5
// Blog Server
// John Isabella III

console.log("The Server Blog is up and Running");

let tableBody = document.querySelector("tbody");
let postSelectElement = document.querySelectorAll(".post-select");
let deletePost = document.querySelector("#deleteForm");
console.log(deletePost);
let editPost = document.querySelector("#editForm");


function displayBlogPosts(blogPostArray) {
  // Clear out the INNERHTML of the tbody
  tableBody.innerHTML = "";
  for (let i = 0; i < blogPostArray.length; i++) {
    //Create <tr> tag
    let tableRow = document.createElement("tr");
    // create a function that will take my tr tag and players info to create the <td> and append them tot he <tr> tag.
    tableBody.appendChild(tableRow);
    //Building out the tables
    tableDataBuilder(tableRow, i + 1);
    tableDataBuilder(tableRow, blogPostArray[i].title);
    tableDataBuilder(tableRow, blogPostArray[i].author);
    tableDataBuilder(tableRow, blogPostArray[i].post_id);
    tableDataBuilder(tableRow, blogPostArray[i].body);
  }
}

function tableDataBuilder(tableRow, blogPostDataToDisplay) {
  // create a TD tag
  let tableData = document.createElement("td");
  // Change the textContent of the TD to the blogPostDataToDisplay
  tableData.textContent = blogPostDataToDisplay;
  // append the TD tage to the tableRow
  tableRow.appendChild(tableData);
}

// Posts Dropdown Options (Delete & Edit)
function populatePostsDropDown(blogPostArray){
  let htmlString = "";
  for (let i = 0; i< blogPostArray.length; i++){
    htmlString += `<option value="${blogPostArray[i].post_id}">${blogPostArray[i].post_id}</option>`
  }
  postSelectElement.forEach((select)=>{ // I have 2 blogPostArrays, need to change both of them
    select.innerHTML = htmlString;
  })
}

async function getAllPosts() {
  let url = "http://localhost:4000/routes/view-all";
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    displayBlogPosts(data.blogPost);
    populatePostsDropDown(data.blogPost);
  } catch (error) {
    console.error(error);
  }
}
getAllPosts();

let blogPostForm = document.querySelector("form");
blogPostForm.addEventListener("submit", submitNewPost);

async function submitNewPost(e) {
  e.preventDefault();
  try {
    let formData = new FormData(e.target);
    let json = JSON.stringify(Object.fromEntries(formData));
    let url = "http://localhost:4000/routes/add"; // the url for the fetch
    let myHeaders = new Headers(); // create header Object
    myHeaders.append("Content-Type", "application/json"); // append content
    let requestOptions = { // requesting Object parameters
      method: "POST",
      body: json,
      headers: myHeaders,
    };
    await fetch(url, requestOptions); // fetch request
    getAllPosts(); // posting to table
    blogPostForm.reset() // clear the form values
  } catch (error) {
    console.error(error);
  }
}

let removePostForm = document.querySelector("#remove-post-form");
removePostForm.addEventListener("submit", submitForRemoval);

async function submitForRemoval(e) {
  e.preventDefault();
  try {
let postIndex = deletePost.value;
console.log(deletePost, "Delete Post")
console.log("Deleting Post", postIndex)
let url = `http://localhost:4000/routes/delete/${postIndex}`; // URL from postman
let requestOptions = {
  method: "DELETE",
}
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log(data);
    getAllPosts();
    console.log("get All Posts",getAllPosts);//! TEST
  } catch (error) {
    console.error(error);
  }
}
