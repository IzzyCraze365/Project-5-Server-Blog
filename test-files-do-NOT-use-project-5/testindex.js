// Project: Week 5
// Blog Server
// John Isabella III

console.log("The Server Blog is up and Running");

let tableBody = document.querySelector("tbody");
let postSelectElement = document.querySelector("#post-select");


//! OPTION 1
function displayInnerHTML(blogPostArray) {
  let htmlString = "";
  for (let i = 0; i < blogPostArray.length; i++) {
    htmlString += ` 
          <tr>
          <td>${i + 1}</td>
          <td>${blogPostArray[i].postTitle}</td>
          <td>${blogPostArray[i].postAuthor}</td>
          <td>${blogPostArray[i].postBody}</td>
        </tr>`;
  }
  console.log(htmlString);
  tableBody.innerHTML = htmlString;
}

//! OPTION 2
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
    tableDataBuilder(tableRow, blogPostArray[i].postTitle);
    tableDataBuilder(tableRow, blogPostArray[i].postAuthor);
    tableDataBuilder(tableRow, blogPostArray[i].postBody);
  }
}
// Part of Option 2
function tableDataBuilder(tableRow, blogPostDataToDisplay) {
  // create a TD tag
  let tableData = document.createElement("td");
  // Change the textContent of the TD to the blogPostDataToDisplay
  tableData.textContent = blogPostDataToDisplay;
  // append the TD tage to the tableRow
  tableRow.appendChild(tableData);
}

// Delete Posts Options
function populatePostsDropDown(blogPostArray){
  blogPostSelectElement.innerHTML = "";
  let htmlString = "";
  for (let i = 0; i< blogPostArray.length; i++){
    htmlString += `<option value="${i}">${blogPostArray[i].postTitle} ${blogPostArray[i].postAuthor}</option>`
  }
  blogPostSelectElement.innerHTML = htmlString;
}

async function getAllPosts() {
  let url = "http://localhost:4000/routes/view-all";
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    //displayInnerHTML(data.blogPost); //! OPTION 1
    displayBlogPosts(data.blogPost); //! OPTION 2
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
    //console.log(json);
    // 1. Create the url for the fetch (this should match postman)
    let url = "http://localhost:4000/routes/add";
    // 2. Create Headers Object and append Content-Type
    let myHeaders = new Headers(); //! needs to be plural headerS
    myHeaders.append("Content-Type", "application/json");
    // 3. Create a request Options Object and supply your body, method, and headers
    let requestOptions = {
      method: "POST",
      body: json,
      headers: myHeaders,
    };
    // 4. Conduct the fetch with request options.
    await fetch(url, requestOptions);
    // const data = await response.json();
    // If the fetch is successful refresh the table
    getAllPosts();
    // 5. Clear the form values
    blogPostForm.reset()
  } catch (error) {
    console.error(error);
  }
}

let removePostForm = document.querySelector("#remove-post-form");
removePostForm.addEventListener("submit", submitForRemoval);

async function submitForRemoval(e) {
  e.preventDefault();
  try {
    // 1. Ge tht evalue of the current selection
console.log(blogPostSelectElement.value); //! TEST
let postIndex = blogPostSelectElement.value;
    // 2. Build our URL out where we can delete
let url = "http://localhost:4000/routes/delete/:id" + postIndex; // pulled from Postman
    // 3. Create Request Options
let requestOptions = {
  method: "DELETE",
}
    // 4. Conduct the fetch
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log(data);
    // 5. If successful then we need to re-populate the table & the dropdown list
    getAllPosts();
  } catch (error) {
    console.error(error);
  }
}

// let mapArray = [
//   ["name", "robert"],
//   ["age", 42],
// ];

// console.log(Object.fromEntries(mapArray));

// console.log(Object.fromEntries(mapArray));

let mapArray = [
  ["name", "robert"],
  ["age", 42],
];

console.log(Object.fromEntries(mapArray));
