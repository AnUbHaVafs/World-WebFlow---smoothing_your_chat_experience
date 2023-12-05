# World WebFlow - <i>smoothing your chat experience</i>
<br>

Visit :  https://screenapp.io/app/#/shared/84236021-31c8-4766-91c8-5a63b222cc2b
<br><br><br>
- ![Screenshot (1899)](https://github.com/AnUbHaVafs/World-WebFlow---smoothing_your_chat_experience/assets/76126067/f5c1daa6-de58-4dfa-8555-741e7c1c508e)
- 
# Functionalities Implemented:

Below are the implemented functionalities:

1. **Agent Portal**:
   - Multiple agents can log in simultaneously to respond to incoming messages.
   - Agents are presented with an intuitive UI to manage customer inquiries.
  
   - ![Screenshot (1899)](https://github.com/AnUbHaVafs/World-WebFlow---smoothing_your_chat_experience/assets/76126067/f5c1daa6-de58-4dfa-8555-741e7c1c508e)
   - ![Screenshot (1901)](https://github.com/AnUbHaVafs/World-WebFlow---smoothing_your_chat_experience/assets/76126067/5df03e84-ebc6-443d-9e76-d47afdf5bee1)

![Screenshot (1900)](https://github.com/AnUbHaVafs/World-WebFlow---smoothing_your_chat_experience/assets/76126067/c97c7c9b-34a8-46cd-bf24-7a1156812ad4)
![Screenshot (1904)](https://github.com/AnUbHaVafs/World-WebFlow---smoothing_your_chat_experience/assets/76126067/4e4bdbf0-c605-403c-9f0e-d5f6b6e7f693)
![Screenshot (1903)](https://github.com/AnUbHaVafs/World-WebFlow---smoothing_your_chat_experience/assets/76126067/b925805a-f01e-4228-ab77-75d18ac1cd47)



![Screenshot (402)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/e4cb6d23-4bee-4985-aa63-d088b3bf2dd0)


2. **API Integration**:
   - Created an API endpoint to send and receive customer messages.
   - Messages can be submitted through a web form and are stored in the system.

3. **Message Storage and Display**:
   - Customer service messages provided in a CSV file are stored in a chosen database.
   - Messages are displayed in the agent portal for easy viewing and response.
   
![Screenshot (387)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/42763095-194a-44a4-b265-ff03ccb81bd4)


4. **Agent Workload Management**:
   - Implemented a scheme to prevent multiple agents from working on the same message using status : unresolved | pending | resolved and using real-time typing notations.
  
![Screenshot (389)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/c717c4b6-135d-4060-9020-ef91bd6cb99d)

6. **Search Functionality**:
   - Implemented a search feature allowing agents to search messages and customers.

![Screenshot (390)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/cd82e48f-14a2-4971-852e-4b29c0124a90)


7. **Customer Context**:
   - Provided agents with additional context by surfacing customer profiles and relevant internal information.
   - Visible Customer Information : Email, Image, Name.

![Screenshot (391)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/d67f2519-00f1-4f96-93f5-f63c60c33cc4)

8. **Canned Responses**:
   - Incorporated a feature for agents to use pre-configured stock messages.
   - Agents can quickly respond to common inquiries with predefined messages.
  
![Screenshot (392)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/8cc00d4f-81e5-4cce-ae58-a6f691ed796a)

9. **Real-time Updates**:
   - Leveraged websockets to make the agent UI interactive and dynamic.
   - New incoming messages appear in real time and notifications appears.

![Screenshot (395)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/0ea7c7b0-a956-4328-87e1-b93510f2c9d3)

**Postman** (APIs Testing) :

![Screenshot (406)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/4c6031c8-8008-4330-8534-ee09b1c6b8a3)

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
   cd Frontend
   npm install
4. Install backend dependencies:
     ```bash
    cd ..
    npm install

## Configuration

1. Create a `.env` file in the `server` directory for environment variables:
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/your-database-name
     JWT_SECRET=YOUR_TOKEN_JWT
     NODE_ENV=production
     
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
      cd ../Frontend
      npm run dev

The frontend development server will run on `http://localhost:5173`.

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

