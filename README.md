# Branch-International---WEB-CHAT-APP (For Agents)
Web Chat App ( Managing all Agent's Responses) <br>
Visit : 
https://screenapp.io/app/#/shared/84236021-31c8-4766-91c8-5a63b222cc2b

# Functionalities Implemented [All : Basic + App Extend]

Below are the implemented functionalities:

1. **Agent Portal**:
   - Multiple agents can log in simultaneously to respond to incoming messages.
   - Agents are presented with an intuitive UI to manage customer inquiries.

 ![Screenshot (402)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/058ef52b-21ed-45cf-b300-76ad3842c969)


2. **API Integration**:
   - Created an API endpoint to send and receive customer messages.
   - Messages can be submitted through a web form and are stored in the system.

3. **Message Storage and Display**:
   - Customer service messages provided in a CSV file are stored in a chosen database.
   - Messages are displayed in the agent portal for easy viewing and response.
   
![Screenshot (387)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/5513e24e-99cd-41eb-b219-7a58b741d6ef)


4. **Agent Workload Management**:
   - Implemented a scheme to prevent multiple agents from working on the same message using status : unresolved | pending | resolved and using real-time typing notations.
  
![Screenshot (389)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/6b95921b-b414-4458-897d-ab3e33bf2dba)

6. **Search Functionality**:
   - Implemented a search feature allowing agents to search messages and customers.

![Screenshot (390)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/d0b1d488-b60c-4a9c-ade1-5122374e5b06)


7. **Customer Context**:
   - Provided agents with additional context by surfacing customer profiles and relevant internal information.
   - Visible Customer Information : Email, Image, Name.

![Screenshot (391)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/155599cf-b703-4458-8ee8-bca20b161be8)

8. **Canned Responses**:
   - Incorporated a feature for agents to use pre-configured stock messages.
   - Agents can quickly respond to common inquiries with predefined messages.
  
![Screenshot (392)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/93586851-bce3-4246-91ae-b3d78c9c2b99)

9. **Real-time Updates**:
   - Leveraged websockets to make the agent UI interactive and dynamic.
   - New incoming messages appear in real time and notifications appears.

![Screenshot (395)](https://github.com/AnUbHaVafs/Branch-International---WEB-CHAT-APP/assets/76126067/8891e2f5-2254-4076-b798-f890393b772a)


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

