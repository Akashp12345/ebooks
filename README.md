# Book Store

## Description

This is Book Store application built using React. It allows user to read the book, user can add book to favourite list and mark as read as well. It gives the recommandation of books according to the user activities.

## Features

- Create multiple accounts and maintain their favourite list.
- Read the books.
- Mark as read after reading the books.
- User can create account and signin.
- Auto recommandation of books according to users search history, read history and favourite list.

## Website link

[Website Link](https://techdome.akash-patil.info)

## Book API
  
We used [Google Book API](https://developers.google.com/books/docs/overview)

## Folder Structure

- `src/`: Contains the source code of the application.
  - `components/`: Reusable UI components.
  - `utils/`: Utility functions, Redux store, and routes.
    - `store/`: Contains the Redux store and all slices.
    - `routes.jsx`: Contains all routes.
  - `pages/`: All the pages/screens are stored here.
  - `services/`: Request middleware is stored here.
- `App.jsx`: Entry point of the application.

## Requirements <!-- Requirements -->

- Nodejs
- Packages listed in `package.json`


## Technology Used

- ReactJS

## Packages Used

- **axios**: A promise-based HTTP client for the browser and Node.js, used to fetch data from the Google Books API.
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`, helping to manage configuration.
- **antd**: Provides inbuilt UI components.
- **react-icons**: For various icons.
- **react-redux**: For managing the state with Redux.
- **react-router-dom**: For managing routes in a React application.


## Test Credentials
- `Email` : akash@example.com
- `Password`: password

## Installation <!-- Installation -->

1. Clone the repository:

   ```bash
   git clone <repository_url>

   ```

2. Go to the project

   ```bash
   cd ebooks

   ```

3. Install Dependencies:
   ```bash
   npm install
   ```

## Usage <!-- Usage -->

1.  Start Server
    ```bash
    npm run dev
    ```

<!-- Testing Section -->

## Testing

We used jest and supertest library for testing pages.

- Test Command
  ```bash
  npm test
  ```

## Deployment

### Technology Used

- **AWS EC2**: Amazon Web Services Elastic Compute Cloud (EC2) is used to deploy the server.
- **Nginx**: Nginx is a high-performance web server and reverse proxy server. It is used to serve the website, handle load balancing, and manage incoming HTTP requests efficiently.
- **AWS CodePipeline**: AWS CodePipeline is a continuous integration and continuous delivery (CI/CD) service for fast and reliable application updates. It automates the build, test, and deploy phases of your release process, helping to streamline the deployment of your website.

## AWS CodePipeline Stages

### Overview

AWS CodePipeline automates the build, test, and deployment phases of your release process every time there is a code change, based on the release model you define. Here are the stages typically involved in a CodePipeline setup for deploying a web application:

### Stages

1. **Source**
2. **Build**
3. **Deploy**

### Stage Details

#### 1. Source

- **Description**: The source stage retrieves the source code for the application from a version control repository.
- **Action Provider**: AWS CodeCommit.
- **Example Configuration**:
  - **Repository**: The repository containing the source code (e.g., `my-git-repo`).
  - **Branch**: The branch to monitor for changes (e.g., `main` or `master`).
  - **Output Artifact**: The output artifact is a ZIP file containing the source code, which is passed to the next stage.


#### 2. Build
- **Description**: The build stage compiles the source code, runs tests, and prepares artifacts for deployment.
- **Action Provider**: AWS CodeBuild.
- **Example Configuration**:
  - **Build Project**: The CodeBuild project that defines the build environment and commands (e.g., `my-build-project`).
  - **Build Specification**: A `buildspec.yml` file that defines the build steps, including dependencies, tests, and artifacts.
  - **Output Artifact**: The build output, typically a ZIP file or directory containing the compiled code and other necessary files for deployment.

  **Example `buildspec.yml`**:
  ```yaml
  version: 0.2

  phases:
    install:
      commands:
        - npm install
    build:
      commands:
        - npm run build
    post_build:
      commands:
        - echo Build completed

  artifacts:
    files:
      - '**/*'
    discard-paths: yes


#### 3. Deploy

- **Description**: The deploy stage takes the built artifacts and deploys them to the specified environment (e.g., EC2 instances).
- **Action Provider**: AWS CodeDeploy.
