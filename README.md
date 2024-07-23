# Admin Dashboard Console

This project is an admin dashboard console, which includes a login page, a user page with filters and pagination, and a detailed user information page. The project is built using modern JavaScript frameworks and libraries.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Login Page](#login-page)
4. [User Page](#user-page)
5. [User Details](#user-details)

## Installation

To get started, clone the project from GitHub and install the necessary dependencies.

### Step 1: Clone the repository

```bash
git clone https://github.com/victor-chukwuemeke/lendsqr-fe-test.git
cd lendsqr-fe-test
```

### Step 2: Install Dependencies

We are installing with --legacy-peer-deps because some packages could be deprecated or old versions.
`npm install --legacy-peer-deps`

### Step 3: Start the application

To start the application and view the admin dashboard prototype:
`npm start`

## Usage

When you run the application, it will open in your default web browser. The first page you will see upon mounting is the login page.

## Login Page

Only recognized and authenticated admins who have registered/signed up can access the dashboard.It is assumed that this user has registered and come over all the validation rules involved in siging up, Now the user wants to sign in, In this console, the valid credentials are:

`Email: test@example.com`
`Password: Password123`
Any other credentials will keep the login button disabled.

## User Page

Upon successful login, you will be directed to the user page where the header and sidebar for navigation are manifest. This page includes the following features:

#### API Fetch: Fetches the user with some information, each of which is unique.

#### Pagination: Over 500 users are loaded or fetched from the API, This pagination enables navigation through multiple pages of users, clicking on the numbers on the pagination shows us the users on that page.

#### Filters: Allows you to filter users based on various criteria(though this was just the design).

#### Navigation: The Sidebar and header also allows for easy navigation through the app, though empty pages but they have working links and a notice that they are empty.

## User Details

Clicking on the three dots at the end of a user on the list shows options, click on view details to view a more comprehensive information of the selected user. This links to a page that displays all relevant information retrieved about this user(personal information, educational information, socials).

## License

This project is not licensed.
