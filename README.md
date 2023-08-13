# Branch-International---WEB-CHAT-APP (For Agents)
Web Chat App ( Managing all Agent's Responses)

# Project Name

Brief description of your project.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/): Download and Install Node.js
- [MongoDB](https://www.mongodb.com/try/download/community): Download and Install MongoDB

## Installation

1. Clone the repository:

    ```bash
   git clone https://github.com/your-username/your-project.git

2. Navigate to the project directory:
    ```bash
    cd your-project

3. Install frontend dependencies:
    ```bash
   cd client
   npm install
4. Install backend dependencies:
     ```bash
    cd ../server
    npm install

## Configuration

1. Create a `.env` file in the `server` directory for environment variables:
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/your-database-name
     
Replace `your-database-name` with the desired name for your MongoDB database.

## Running the Application

1. Start the MongoDB server:
- On Windows:
  ```
  mongod
  ```
- On macOS or Linux:
  ```
  sudo service mongod start
  ```

2. Start the backend server:            
      ```bash
       cd server
       npm run start









The backend server will run on `http://localhost:5000`.

3. Start the frontend development server:
  ```bash
  cd ../client
  npm run dev

The frontend development server will run on `http://localhost:3000`.

## Accessing the Application

Access the application by opening your web browser and navigating to [http://localhost:3000](http://localhost:3000).

## Shutting Down the Application

To shut down the application:
1. Stop the frontend development server with `Ctrl + C`.
2. Stop the backend server with `Ctrl + C`.
3. Stop the MongoDB server:
- On Windows, close the `mongod` command prompt.
- On macOS or Linux:
  ```
  sudo service mongod stop
  ```

