# Notes Keeper Web App

## Overview

**Notes Keeper** is a web application designed for taking and managing personal notes. The application leverages Firebase Authentication for user management and MongoDB for data storage. It includes a backend powered by Node.js/Express and a frontend built with React.

## Features

- **User Authentication**: Sign in with Google using Firebase.
- **CRUD Operations**: Create, read, update, and delete notes.
- **Notes Management**: Keep your notes organized and access them anywhere.

## Tech Stack

### Frontend
- **React**: Library for building the user interface.
- **Axios**: HTTP client for making API requests.
- **Tailwind CSS**: Utility-first CSS framework.
- **Firebase**: Firebase Authentication SDK.

### Backend
- **Node.js & Express**: Server and web framework.
- **MongoDB & Mongoose**: NoSQL database and ODM.
- **Firebase Admin SDK**: For verifying user tokens.

## Prerequisites

- **Node.js**: Version 14 or higher.
- **MongoDB**: Local or hosted instance.

## Installation

### Clone the Repository

```bash
git clone https://github.com/relmelegy/fs-keeper.git
cd fs-keeper


### Install Backend Dependencies

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

### Install Frontend Dependencies

1. Navigate to the frontend folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

## Configuration

### Backend Configuration

1. Create a `.env` file inside the `backend` directory and configure the following variables:

```env
MONGO_DB_URI=<Your MongoDB Connection String>
FIREBASE_SERVICE_ACCOUNT_KEY=./fs-keeper-firebase-adminsdk-tozd4-b5b5e921ce.json
```

2. Add the Firebase Admin SDK Service Account JSON file to the `backend/config` folder.

### Frontend Configuration

1. Navigate to the `frontend` directory.
2. Create a `.env` file inside the `frontend` directory and add your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=<Your Firebase API Key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
REACT_APP_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
REACT_APP_FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
REACT_APP_FIREBASE_APP_ID=<Your Firebase App ID>
REACT_APP_FIREBASE_MEASUREMENT_ID=<Your Firebase Measurement ID>
```

## Usage

### Running Backend

1. Navigate to the `backend` directory:

```bash
cd backend
```

2. Start the server:

```bash
npm start
```

The backend server will start on `http://localhost:5001`.

### Running Frontend

1. Navigate to the `frontend` directory:

```bash
cd frontend
```

2. Start the React development server:

```bash
npm start
```

The frontend server will start on `http://localhost:3000`.

### Simultaneous Running (Optional)

You can run both the backend and frontend servers simultaneously using `concurrently`.

1. Install `concurrently` globally:

```bash
npm install -g concurrently
```

2. Create a `package.json` file in the root directory (above both `frontend` and `backend` folders):

```json
{
  "name": "fullstack-project",
  "version": "1.0.0",
  "scripts": {
    "start": "concurrently \"npm start --prefix backend\" \"npm start --prefix frontend\""
  }
}
```

3. Run the servers:

```bash
npm start
```

## API Endpoints

### Notes API

- **Get All Notes (GET)**

  ```http
  GET /notes
  ```

- **Create a Note (POST)**

  ```http
  POST /notes
  ```

  **Request Body**:

  ```json
  {
    "title": "My New Note",
    "content": "Note content goes here"
  }
  ```

- **Update a Note (PATCH)**

  ```http
  PATCH /notes/:id
  ```

  **Request Body**:

  ```json
  {
    "title": "Updated Note Title",
    "content": "Updated note content"
  }
  ```

- **Delete a Note (DELETE)**

  ```http
  DELETE /notes/:id
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Firebase** for authentication
- **MongoDB** for data storage
- **Tailwind CSS** for styling

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Authors

- **Raaid Elmelegy** - [relmelegy](https://github.com/relmelegy)
```