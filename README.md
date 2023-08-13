# Branch-International---WEB-CHAT-APP (For Agents)
Web Chat App ( Managing all Agent's Responses)
//video

# Functionalities Implemented [All : Basic + App Extend]

This messaging web application enables a streamlined process for responding to customer inquiries. Below are the implemented functionalities:

1. **Agent Portal**:
   - Multiple agents can log in simultaneously to respond to incoming messages.
   - Agents are presented with an intuitive UI to manage customer inquiries.

2. **API Integration**:
   - Created an API endpoint to send and receive customer messages.
   - Messages can be submitted through a web form and are stored in the system.

3. **Message Storage and Display**:
   - Customer service messages provided in a CSV file are stored in a chosen database.
   - Messages are displayed in the agent portal for easy viewing and response.

4. **Agent Workload Management**:
   - Implemented a scheme to prevent multiple agents from working on the same message using status : unresolved | pending | resolved and using real-time typing notations.

6. **Search Functionality**:
   - Implemented a search feature allowing agents to search messages and customers.

7. **Customer Context**:
   - Provided agents with additional context by surfacing customer profiles and relevant internal information.
   - Visible Customer Information : Email, Image, Name.

8. **Canned Responses**:
   - Incorporated a feature for agents to use pre-configured stock messages.
   - Agents can quickly respond to common inquiries with predefined messages.

9. **Real-time Updates**:
   - Leveraged websockets to make the agent UI interactive and dynamic.
   - New incoming messages appear in real time and notifications appears.

Feel free to explore this application and its functionalities by following the steps mentioned in the README.

> Note: The README instructions provided earlier in this document guide you on setting up and running the application on your local machine.


# Technologies Used

This project was built using the following technologies:

- **TypeScript**: A superset of JavaScript that adds static types to the language.
- **React**: A JavaScript library for building user interfaces.
- **Node.js**: A runtime environment for executing JavaScript on the server.
- **Express.js**: A minimal web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing and managing data.

Feel free to explore the documentation of each technology for more information:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)


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

