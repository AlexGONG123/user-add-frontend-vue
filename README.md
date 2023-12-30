# User-Add Frontend Application

## Access URL

Visit the application: [User-add Admin System](https://yinianyangguang.top/#/login)

## Administrator Login Information

1. **Username**: `admin`  
   **Password**: `admin`

2. **Username**: `aaa`  
   **Password**: `aaa`

## Local Development Environment

- **Node.js**: v17.9.1
- **npm**: v8.11.0

## Installation and Running

Clone the project locally:

```bash
git clone [Your Project's Git Repository URL]
cd [Your Project Directory]

Install dependencies:

\`\`\`bash
npm install
\`\`\`

Run the project locally:

\`\`\`bash
npm run dev
\`\`\`

Build for production:

\`\`\`bash
npm run build
\`\`\`

## Project Structure

- /api - Contains Axios request functions.
- /composables - Houses utility functions, such as cookie retrieval and notification triggering.
- /pages - Stores page components.
- /router - Defines Vue routing.
- /store - Holds Vuex's createStore for managing global data.
- axios.js - Creates an Axios instance and sets interceptors.
- main.js - The main entry file of the application.
- permission.js - Sets up navigation guards for routing.

## Notes

- Ensure that the correct versions of Node.js and npm are installed in your local development environment.
- Before building for production, make sure all functionalities have been tested and verified.
