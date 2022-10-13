# ACC_Assignment_01

## 1. Get all the user

https://acc-assignment-01.onrender.com/api/v1/users?page=1&limit=10

## 2. Save new user

https://acc-assignment-01.onrender.com/api/v1/users

body: {
"gender": "female",
"name": "user ",
"contact": "01800000000",
"address": "dhanmondi",
"photoUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
}

## 3. Delete a user

https://acc-assignment-01.onrender.com/api/v1/users/6

## 4. Get a random user information

https://acc-assignment-01.onrender.com/api/v1/users/random

## 5. Update a user

https://acc-assignment-01.onrender.com/api/v1/users/4

body:
{
"id":4,
"contact":"000000000",
"gender":"female"
}

## 6. Update list/multiple of users information

https://acc-assignment-01.onrender.com/api/v1/users/update/bulk-update

body: [
{"id":4,"gender":"female","name":"user 4"},
{"id":5,"gender":"femaleee","name":"user 5","contact":"01900000000000"},
{"id":9,"contact":"0138888888888","gender":"female"}]
