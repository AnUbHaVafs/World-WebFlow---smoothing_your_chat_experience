# Branch-International---WEB-CHAT-APP
Web Chat App ( Managing all Agent's Responses)


Project Name
Brief description of your project.

Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js: Download and Install Node.js
MongoDB: Download and Install MongoDB
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/your-project.git
Navigate to the project directory:

bash
Copy code
cd your-project
Install frontend dependencies:

bash
Copy code
cd client
npm install
Install backend dependencies:

bash
Copy code
cd ../server
npm install
Configuration
Create a .env file in the server directory for environment variables:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-database-name
Replace your-database-name with the desired name for your MongoDB database.

Running the Application
Start the MongoDB server:

On Windows, open a command prompt and run:

bash
Copy code
mongod
On macOS or Linux, open a terminal and run:

bash
Copy code
sudo service mongod start
Start the backend server:

bash
Copy code
cd server
npm run start
The backend server will run on http://localhost:5000.

Start the frontend development server:

bash
Copy code
cd ../client
npm run dev
The frontend development server will run on http://localhost:3000.

Accessing the Application
You can access the application by opening your web browser and navigating to http://localhost:3000.

Shutting Down the Application
To shut down the application, follow these steps:

Stop the frontend development server by pressing Ctrl + C in the terminal where it's running.

Stop the backend server by pressing Ctrl + C in the terminal where it's running.

Stop the MongoDB server:

On Windows, close the command prompt where mongod is running.

On macOS or Linux, run:

bash
Copy code
sudo service mongod stop
