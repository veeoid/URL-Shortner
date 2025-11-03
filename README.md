# URL-Shortner

A simple URL shortner built using NodeJS, Express and MongoDB.

## Features
- Generate short URLs for long URLs
- Track analytics for each short URL including visit history
- RESTful API design

## Installation
1. Clone the repository:
   ```bash
   git clone
    ```
2. Navigate to the project directory:
    ```bash
    cd SHORT-URL
     ```
3. Install the dependencies:
    ```bash
    npm install
     ```
4. Start the server:
    ```bash
    npm start
     ```
5. The server will be running at `http://localhost:8001`

## API Endpoints
- `POST /url` - Generate a new short URL
- `GET /:shortId` - Redirect to the original URL
- `GET /url/analytics/:shortId` - Get analytics for a short URL

## Technologies Used
- Node.js
- Express
- MongoDB

