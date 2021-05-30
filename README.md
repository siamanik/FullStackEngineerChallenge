# Installation process

Prerequisites: docker, docker-compose, node, yarn

## Steps
### In project root create the mysql container 
```
docker-compose up -d
```

### make sure mysql is running
### initiate employees table and seed admin account command
```
sh init-mysql.sh
```

#### Note: In mysql hr db should have employees table with 1 row by now.

### initiate server on localhost::3000
```
cd server
yarn install
yarn serve
```

### initiate client on localhost::8080
```
cd ../client  # {rootDirectory}/client
yarn install
yarn serve

```
Admin account
```
email: admin@test.com
password: admin123
```

# Work Explanation

Summary: 
This project was created with nodejs, expressjs, Sequelize on the backend. 
Fontend is implemented with vue.js, vuetify. 
DB is dockerized mysql. 

Implementation consists of 4 pages
1. Login page
2. Employee page
3. Review page
4. Feedback page

## Login page
Assumptions:
1) Login can be performed with email and password.
2) email format and password length is validated.
3) It is an unrestricted page.
4) Forgot password is aesthetic only.
5) Authorization is done with JWT.
6) When email password matches Token is created with expiration and stored in localStorage.

## Employee page
Assumptions:
1) Only admin account can access this page.
2) APIs used in this page are also protected so that only admin token only can access.
3) CRUD can be performed on Employees.
4) Employee information only consists of fullname, email, password, admin flag.

## Review page
Assumptions:
1) Only admin account can access this page.
2) APIs used in this page are also protected so that only admin token only can access.
3) CRUD can be performed on Reviews.
4) Review is assumed to have free text based question. Feedback for that review by employees is the free text answer for that question.
5) Review also consists of employeeID to determine who this review is for.
6) When review is created new Assign button is revealed.
7) Assign button opens a dialog showing the list of employees except self.
8) Each employee on the list have assign button that assigns for review to that employee.
9) If one employee is already assigned to that review item, then assign button is disabled.
10) If the review feedback is done, that is also shown in the dialog page.

## Review page
1) All jwt verified account can access this page.
2) Can view the list of pending feedbacks.
3) Feedback button open up a form where answer for the review question can be put.
4) On submit, the item from the list dissapears.

## Test
1) To simulate test, frontend e2e test has been implemented.
2) Cypress was used to write test.
3) Test only consists of admin login, employee creation, employee deletion.

--------------------------------

# Full Stack Developer Challenge
This is an interview challengs. Please feel free to fork. Pull Requests will be ignored.

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it 
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
* Technology and design choices
* Identify areas of your strengths
