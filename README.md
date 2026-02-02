# cAPI Client

![cAPI Footer Logo](./public/capi-footer-logo.png)

A modern React + TypeScript-based API Client User Interface for testing and interacting with REST APIs. cAPI Client is yet another API UI client.

## Features

- **URL Configuration**: Set the endpoint URL
- **HTTP Methods**: Support for GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
- **Query Parameters**: Add URL query parameters
- **Headers**: Configure custom request headers
- **Authentication**: Multiple auth types:
  - Bearer Token
  - Basic Auth
  - API Key
  - Custom Header
- **Request Body**: Support for:
  - JSON
  - Plain Text
  - Form Data
  - x-www-form-urlencoded
- **Response View**: View response status, headers, and body

## Requirements

- Node.js 16.13.2

  ```bash
   nvm install v16.13.2
   nvm use 16.13.2
   ```

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Building for Production

Build the production bundle:
```bash
npm run build
```

## Project Structure

```
src/
  ├── components/          # React components (TypeScript)
  │   ├── UrlInput.tsx      # URL input component
  │   ├── MethodSelector.tsx # HTTP method selector
  │   ├── KeyValueEditor.tsx # Reusable key-value editor
  │   ├── AuthConfig.tsx    # Authentication configuration
  │   ├── BodyEditor.tsx     # Request body editor
  │   └── ResponseView.tsx  # Response display component
  ├── services/             # Services (TypeScript)
  │   └── apiService.ts      # API request service
  ├── types/                 # TypeScript type definitions
  │   └── index.ts           # Shared types and interfaces
  ├── App.tsx                # Main application component
  ├── App.css                # Application styles
  ├── index.tsx               # Application entry point
  └── index.css               # Global styles
```

## Usage

1. Enter the API endpoint URL
2. Select the HTTP method
3. Add query parameters if needed
4. Configure headers
5. Set up authentication if required
6. Add request body if applicable
7. Click "Send Request" to execute the API call
8. View the response in the right panel

## Technologies Used

- React 17.0.2
- TypeScript 4.9.5
- Create React App
- Modern CSS with Flexbox and Grid

## TypeScript

This project is built with TypeScript for type safety and better developer experience. All components, services, and utilities are fully typed.
