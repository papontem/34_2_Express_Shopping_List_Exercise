# 34_2_Express_Shopping_List_Exercise
## Public repo of exercise for unit 34.2: Express Shopping List Exercise
We will complete the task of creating an Express.js API to keep tabs on the name and price of items in a shopping list "database" mimicked using an array.

Note: Since we are currently using an array for storage, this will be cleared each time the node server restarts. Further down the line we can implement a database to CRUD the items.

## Route Requests
we'll focus on getting these routes up and running some simple jest supertests on them.

GET `/items`
>RESPONSE:

    [
        {“name”: “itemA”, “price”: 1.11},
        {“name”:”itemB”, “price”: 2.20},
        ...
    ]

POST `/items`
>REQUEST:
    
    {
        “name”:”itemC”,
        “price”: 3.00
    } 
>RESPONSE:

    {
        “added”: {
            “name”: “popsicle”, “price”: 1.45
            }
    }
GET `/items/:name`
>RESPONSE:

    {
        “name”: “itemName”,
        “price”: Float
    }

PATCH `/items/:name`
>REQUEST:
PATCH to `/items/itemC` in attempt to change name
    
    {
        “name”:”itemCyan”
    } 
or in attempt to also change price

    {
        “name”:”itemCyan”,
        “price”: 3.33
    } 


>RESPONSE:

    {
        “updated”: {
            “name”: “itemCyan”, “price”: 3.00
            }
    }
or

    {
        “updated”: {
            “name”: “itemCyan”, “price”: 3.33
            }
    }

DELETE `/items/:name`
>RESPONSE:

    {
        message: “Deleted”
    }

## Requirements
You may need to use these tools to run the scripts and run the tests mentioned before.
- [Node](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)

## Development
This App was made using a WSL Ubunto distro running from a VS Code desktop environment.
Here are some extensions/modules/tools i use:
- [Prettier](https://prettier.io/) : [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Supertest](https://github.com/ladjs/supertest)
