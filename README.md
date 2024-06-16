# Albums

Albums is a React application that displays a list of users, their albums, and photos within those albums. The app uses a JSON server to store and fetch data, with state management handled by Redux and @reduxjs/toolkit. This README provides an overview of the project, including setup instructions, package usage, and a detailed description of the application's functionality.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [State Management](#state-management)
- [Usage](#usage)
- [Packages](#packages)
- [Contributing](#contributing)
- [License](#license)

## Features
- Display a list of users.
- Display a list of albums for each user.
- Display a list of photos for each album.
- Fetch and manage data using JSON server and Redux.
- Lazy loading of albums and photos.
- Error handling and loading states.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/SolimanIslam/AlbumsApp.git
   cd albums-app
2. Install dependencies:
   ```bash
   npm install

3. Start the JSON server:
   ```bash
   npx json-server --watch db.json --port 3005

4. Start the React application:
   ```bash
   npm start

# API Endpoints

The following endpoints are used to manage users, albums, and photos:

## Users

- **GET:** `/users`
- **POST:** `/users`
  - JSON Body:
    ```json
    {
      "id": "acdd",
      "name": "Constance Emmerich"
    }
    ```
- **DELETE:** `/users/:id`

## Albums

- **GET:** `/albums?userId=:userId`
- **POST:** `/albums`
  - JSON Body:
    ```json
    {
      "id": "a776",
      "title": "Refined Soft Fish",
      "userId": "acdd"
    }
    ```
- **DELETE:** `/albums/:id`

## Photos

- **GET:** `/photos?albumId=:albumId`
- **POST:** `/photos`
  - JSON Body:
    ```json
    {
      "id": "3431",
      "url": "https://loremflickr.com/150/150?lock=3022692397613056",
      "albumId": "a776"
    }
    ```
- **DELETE:** `/photos/:id`

# State Management

The application uses Redux for state management, leveraging `@reduxjs/toolkit` for streamlined setup and maintenance.

## Users

- Managed with async thunks for fetching and manipulating data.
- `userSlice.js` handles user-related state.

## Albums and Photos

- Managed with `createApi` from `@reduxjs/toolkit/query/react` for efficient data fetching and caching.
- `albumApi.js` and `photoApi.js` handle albums and photos respectively.

# Loading and Error States

Fine-grained control over component state using `isLoading`, `error`, and `data` properties from API requests.

# Usage

- The app displays users on the initial load.
- Clicking on a user fetches and displays their albums.
- Clicking on an album fetches and displays its photos.
- The app uses lazy fetching, only loading albums or photos when their parent entity is clicked.

# Packages

- `@faker-js/faker`: Generates random names, albums, and photo URLs.
- `@reduxjs/toolkit`: Manages global state and API interactions.
- `axios`: Handles HTTP requests.
- `classnames`: Manages CSS class names conditionally.
- `json-server`: Mocks REST API for development.
- `react`: Core library for building user interfaces.
- `react-dom`: DOM bindings for React.
- `react-icons`: Provides icons.
- `react-redux`: Official React bindings for Redux.




https://github.com/SolimanIslam/AlbumsApp/assets/136899518/b10a4542-56ec-4185-b827-af7f5e81496c


