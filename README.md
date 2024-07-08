# FoodConnect

FoodConnect is a web application designed to facilitate the distribution of leftover food to NGOs. The platform allows users to easily locate nearby NGOs, ensuring excess food reaches those in need, reducing waste, and helping the community.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

**Frontend:**
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

**Backend:**
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database program that uses JSON-like documents with optional schemas.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties.

## Features

- User and NGO authentication using JWT.
- Secure user data validation with Zod.
- Easy integration of OpenCage Geocoding API for location services.
- Separate login and signup for NGOs.
- Tailwind CSS for a responsive and visually appealing user interface.
- Efficient data management with MongoDB and Mongoose.

## Installation

1. **steps to run**:

   ```sh
   - clone a repo
   git clone https://github.com/your-username/foodconnect.git
   cd foodconnect 
   - 
   cd frontend
   npm install

   cd ../backend
   npm install
   
   cd backend
   node .\index.js
   
   cd frontend
   npm start


