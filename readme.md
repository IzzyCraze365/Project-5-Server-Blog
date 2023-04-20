# PROJECT: Blog Server

In this project, you will create a backend of a blog application, utilizing Model View Controller architecture.

# Technologies:

* Node
* Express
* Dotenv

# Stories

## Create your project

Utilize `npm init -y` to create your project.

Install your `express`, `nodemon`, and `dotenv` dependencies.

Create your `app.js` file which will contain your entry points. I already created a `.gitignore` for your convenience and filled it with node modules and your environment variable.

Create an `api` folder which will hold `blog.json` file. The file should contain the following data schematic:

```json
[
    {
        "post_id": 1,
        "title": "First Blog Post",
        "author": "Paul Niemczyk",
        "body": "These student devs keep getting younger and smarter"
    }
]
```
Create a `controllers` folder which will store your `routes.js` file. This is where you will create all of your endpoints to handle full CRUD functionality.

## System Design

You should have the following routes:

- [ ] Endpoint that will display all comments from the database. In lieu of database, we use our `blog.json` file.
- [ ] Endpoint that will display one comment from the database selected by its `post_id`
- [ ] Endpoint that will allow us to create a new entry which will be appended to the `.json` file's outermost array.
- [ ] Endpoint that will allow us to update an existing entry once a match has been found. The search should be done via a query parameter, whereas update information should be enclosed within the body.
- [ ] Endpoint that will allow us to delete an entry from our `.json` file. This should be done thru the utilization of the parameter.

## Logic

At this point, we have not yet covered databases. This presents a challenge when we need to make modifications to our `.json` file. The file itself acts as a makeshift database. These changes can be accomplished quite effectively through the use of the `fs` dependency. 

In order to accomplish this task, you will need to import your `fs` dependency into your controller.

> HINT
> FS methods require two parameters: a string of file location, and a callback function taking error and data parameters.
> Make sure to parse the `.json` file when you need to traverse through it.
> Make sure to turn it back into a string before you write to it.
> Look at its data type and see if there's something you know that would help you add the data.

Make sure that your completed design sends a response back to the client with appropriate status codes and a JSON object.

## Icebox

- [ ] Existing setup requires us to keep track of the `post_id`. In your entry creation route, create a feature that will check where your makeshift db is in terms of its id's and creates a new one for each entry. Don't overthink it. A simple counter-style 1, 2, 3 is sufficient.

- [ ] If you're feeling extra confident, create static files that will serve up the content to the user using DOM and fetch to retrieve the data from the server. These files are then served by ALL blog posts endpoint as well as ONE blog post endpoint.