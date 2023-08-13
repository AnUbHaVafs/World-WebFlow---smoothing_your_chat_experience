# Branch-International---WEB-CHAT-APP (For Agents)
Web Chat App ( Managing all Agent's Responses)

<!DOCTYPE html>
<html>
<head>
    <title>Project Name - README</title>
</head>
<body>
    <h1>Project Name</h1>
    <p>Brief description of your project.</p>

    <h2>Prerequisites</h2>
    <p>Before you begin, ensure you have met the following requirements:</p>
    <ul>
        <li><a href="https://nodejs.org/" target="_blank">Node.js</a>: Download and Install Node.js</li>
        <li><a href="https://www.mongodb.com/try/download/community" target="_blank">MongoDB</a>: Download and Install MongoDB</li>
    </ul>

    <h2>Installation</h2>
    <ol>
        <li>Clone the repository:</li>
    </ol>
    <pre><code>git clone https://github.com/your-username/your-project.git</code></pre>
    <ol start="2">
        <li>Navigate to the project directory:</li>
    </ol>
    <pre><code>cd your-project</code></pre>
    <ol start="3">
        <li>Install frontend dependencies:</li>
    </ol>
    <pre><code>cd client<br>npm install</code></pre>
    <ol start="4">
        <li>Install backend dependencies:</li>
    </ol>
    <pre><code>cd ../server<br>npm install</code></pre>

    <h2>Configuration</h2>
    <ol>
        <li>Create a <code>.env</code> file in the <code>server</code> directory for environment variables:</li>
    </ol>
    <pre><code>
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-database-name
    </code></pre>
    <p>Replace <code>your-database-name</code> with the desired name for your MongoDB database.</p>

    <h2>Running the Application</h2>
    <ol>
        <li>Start the MongoDB server:</li>
    </ol>
    <p>On Windows, open a command prompt and run:</p>
    <pre><code>mongod</code></pre>
    <p>On macOS or Linux, open a terminal and run:</p>
    <pre><code>sudo service mongod start</code></pre>
    <ol start="2">
        <li>Start the backend server:</li>
    </ol>
    <pre><code>cd server<br>npm run start</code></pre>
    <p>The backend server will run on <a href="http://localhost:5000" target="_blank">http://localhost:5000</a>.</p>
    <ol start="3">
        <li>Start the frontend development server:</li>
    </ol>
    <pre><code>cd ../client<br>npm run dev</code></pre>
    <p>The frontend development server will run on <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.</p>

    <h2>Accessing the Application</h2>
    <p>You can access the application by opening your web browser and navigating to <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.</p>

    <h2>Shutting Down the Application</h2>
    <ol>
        <li>Stop the frontend development server by pressing <code>Ctrl + C</code> in the terminal where it's running.</li>
        <li>Stop the backend server by pressing <code>Ctrl + C</code> in the terminal where it's running.</li>
        <li>Stop the MongoDB server:</li>
    </ol>
    <p>On Windows, close the command prompt where <code>mongod</code> is running.<br>On macOS or Linux, run:</p>
    <pre><code>sudo service mongod stop</code></pre>
</body>
</html>


On macOS or Linux, run:

bash
Copy code
sudo service mongod stop
