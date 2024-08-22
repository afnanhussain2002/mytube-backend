
# MyTube Backend

This repository contains the backend for MyTube, a YouTube-like platform. The backend is built using Node.js, Express.js, and MongoDB, providing RESTful API services for video uploading, user management, comments, likes, playlists, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Middleware](#middleware)
- [Utilities](#utilities)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/mytube-backend.git
    cd mytube-backend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Setup environment variables**:

   Create a `.env` file in the root directory and add your environment variables. Example:

    ```bash
    MONGO_URI=mongodb://localhost:27017/mytube
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

4. **Run the application**:

    ```bash
    npm start
    ```

    The server should now be running on `http://localhost:5000`.

## Usage

You can interact with the backend through the API endpoints. For testing, you can use Postman or any other API client.

## Project Structure

```bash
mytube-backend/
├── public/                     # Public assets
├── src/                        # Source files
│   ├── controllers/            # Controllers for handling requests
│   ├── db/                     # Database connection setup
│   ├── middlewares/            # Express middlewares
│   ├── models/                 # Mongoose models
│   ├── routes/                 # Express routes
│   ├── utils/                  # Utility functions
│   ├── app.js                  # Express app configuration
│   ├── constants.js            # Application constants
│   ├── index.js                # Entry point of the application
├── .gitignore                  # Git ignore file
├── .prettierrc                 # Prettier configuration
├── package.json                # NPM dependencies and scripts
├── package-lock.json           # NPM lockfile
└── README.md                   # Project documentation
```

## API Endpoints

Here is a list of available API endpoints:

- **User Routes**: `/api/users`
  - `POST /register` - Register a new user
  - `POST /login` - Login a user
  - `GET /:id` - Get user by ID

- **Video Routes**: `/api/videos`
  - `POST /` - Upload a new video
  - `GET /:id` - Get video by ID
  - `DELETE /:id` - Delete a video

- **Comment Routes**: `/api/comments`
  - `POST /` - Add a new comment
  - `GET /:videoId` - Get comments for a video

- **Like Routes**: `/api/likes`
  - `POST /` - Like a video
  - `DELETE /:id` - Unlike a video

- **Playlist Routes**: `/api/playlists`
  - `POST /` - Create a new playlist
  - `GET /:id` - Get playlist by ID

- **Subscription Routes**: `/api/subscriptions`
  - `POST /` - Subscribe to a channel
  - `DELETE /:id` - Unsubscribe from a channel

## Environment Variables

Make sure to configure the following environment variables:

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for video storage
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Middleware

This project includes the following middlewares:

- `auth.middleware.js`: Middleware for checking authentication
- `multer.middleware.js`: Middleware for handling file uploads
- `owner.middleware.js`: Middleware for verifying resource ownership

## Utilities

The `src/utils` directory includes various utility functions:

- `apiError.js`: Custom error handling
- `apiResponse.js`: Standardized API responses
- `asyncHandler.js`: Wrapper for handling async functions
- `cloudinary.js`: Helper for Cloudinary integration

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any changes.

## License

This project is licensed under the MIT License.

---

Feel free to modify or extend this template based on your project's specifics or any additional details you want to include!