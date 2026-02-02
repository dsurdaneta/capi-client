# cAPI Client

<div align="center">
  <img src="./public/capi-footer-logo.png" alt="cAPI Footer Logo" width="400" />
</div>

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
- **Example Requests**: Pre-configured example requests from public APIs to help you get started quickly

## Example Requests

cAPI Client includes a collection of pre-defined example requests from various public APIs. These examples help you quickly test the application and explore different API endpoints without manually entering URLs and parameters.

The examples include:
- **Open Library API**: Search for books by authors
- **Meow Facts API**: Get random cat facts
- **Pokemon API**: Access Pokemon data, items, berries, and Pokedex information
- **Random User API**: Generate random user data
- **Star Wars API**: Access Star Wars universe data

You can find more public APIs to test with at the [public-apis GitHub repository](https://github.com/public-apis/public-apis), which is a comprehensive list of free APIs for software and web development.

To use an example request:
1. Click on the "Example Requests" section at the top of the application
2. Select any example from the list
3. The URL, method, and query parameters will be automatically populated
4. Click "Send Request" to execute the API call

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
  ├── components/              # React components (TypeScript)
  │   ├── AuthConfig.tsx       # Authentication configuration
  │   ├── AuthConfig.css       # AuthConfig styles
  │   ├── BodyEditor.tsx       # Request body editor
  │   ├── BodyEditor.css       # BodyEditor styles
  │   ├── ExampleRequests.tsx  # Pre-defined example requests
  │   ├── ExampleRequests.css  # ExampleRequests styles
  │   ├── Footer.tsx           # Footer component
  │   ├── Footer.css           # Footer styles
  │   ├── Header.tsx           # Header component
  │   ├── Header.css           # Header styles
  │   ├── KeyValueEditor.tsx   # Reusable key-value editor
  │   ├── KeyValueEditor.css   # KeyValueEditor styles
  │   ├── MethodSelector.tsx   # HTTP method selector
  │   ├── MethodSelector.css   # MethodSelector styles
  │   ├── ResponseView.tsx     # Response display component
  │   ├── ResponseView.css     # ResponseView styles
  │   ├── UrlInput.tsx         # URL input component
  │   └── UrlInput.css         # UrlInput styles
  ├── services/                # Services (TypeScript)
  │   └── apiService.ts        # API request service
  ├── types/                   # TypeScript type definitions
  │   └── index.ts             # Shared types and interfaces
  ├── App.tsx                  # Main application component
  ├── App.css                  # Application styles
  ├── index.tsx                # Application entry point
  ├── index.css                # Global styles
  └── react-app-env.d.ts       # React app type definitions
public/
  ├── capi-footer-logo.png     # Footer logo image
  ├── capi-header-logo.png     # Header logo image
  ├── favicon.svg              # Application favicon
  └── index.html               # HTML template
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
