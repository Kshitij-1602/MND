# MND
Project Using PokeAPI

# My Next Developer Project - MERN Stack Poke API

This is a simple Pokémon search application built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). The app allows users to search for Pokémon by name, view search results, and explore detailed information about each Pokémon.

---

## **Tech Stack:**

- **MongoDB**: For storing Pokémon data.
- **Express.js**: Web server framework for Node.js.
- **React.js**: Frontend JavaScript library for building the user interface.
- **Node.js**: JavaScript runtime for running the backend API server.
- **Axios**: For making HTTP requests.
- **PokeAPI**: To fetch Pokémon data when it's not found in the database.

---

## **Features:**

- Search for Pokémon by name.
- View Pokémon details with images and various attributes.
- Handle cases where Pokémon is not found in the database.
- Fetch data from PokeAPI if the Pokémon doesn't exist in the database.
- Responsive UI with a search bar and results display.

---

## **Steps to Setup Locally:**

### **1. Clone the repository:**

```bash
git clone https://github.com/your-username/pokemon-search-app.git
cd pokemon-search-app
```
### **2. Install dependencies for both backend and frontend:**
    
- Make sure you have Node installed on your device.

``` bash 
cd backend
npm install
cd ../frontend
npm install
```
### **3. Set up MongoDB and update env file:**

 - Create a MongoDB instance and run it locally. 
 - Crete a .env file and update the MONGO_URI with the Cluster string.
 - Update the PORT and NODE_ENV in the .env file

### **4. Running the application locally:**

 - Start the backend and frontend server

 ```bash
 cd backend
npm start
cd ../frontend
npm start
```
