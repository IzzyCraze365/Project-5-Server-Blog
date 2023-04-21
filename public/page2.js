// Project: Week 5
// Blog Server
// John Isabella III

console.log("The Server Blog Page 2 is up and Running");
//  Splitting off from the entire URL to only grab the ? and what follows
let queryString = window.location.search;
console.log(queryString);
let tableBody = document.querySelector("tbody");

// Creating a new instance of URLSearchParams so we can get the value if we supply the key
let urlParams = new URLSearchParams(queryString); // Pulls the URL data into a string
console.log(urlParams.get("postid"));
let postIndex = urlParams.get("postid"); // Get the value of the ID supplied in the URL
console.log("Post Index", postIndex);

getOnePosts(postIndex);

async function getOnePosts(postIndex) {
  let url = `http://localhost:4000/routes/view-one/${postIndex}`; // Postman URL, where data is being saved
  try {
    console.log("url", url); //! TEST
    let response = await fetch(url);
    let data = await response.json();
    console.log("Data", data); //! TEST
    displayBlogPosts(data);
  } catch (error) {
    console.error(error);
  }
}

function displayBlogPosts(data) {
  tableBody.innerHTML = ""; // Clear out the INNERHTML of the tbody
  let tableRow = document.createElement("tr"); //Create <tr> tag
  tableBody.appendChild(tableRow); // creates a new row in the table (the only row)
  //Building out the tables
  tableDataBuilder(tableRow, data.blogPost.title);
  tableDataBuilder(tableRow, data.blogPost.author);
  tableDataBuilder(tableRow, data.blogPost.post_id);
  tableDataBuilder(tableRow, data.blogPost.body);
}

function tableDataBuilder(tableRow, blogPostDataToDisplay) {
  let tableData = document.createElement("td"); // create a TD tag
  tableData.textContent = blogPostDataToDisplay; // Change the textContent of the TD to the blogPostDataToDisplay
  tableRow.appendChild(tableData); // append the TD tage to the tableRow
}
