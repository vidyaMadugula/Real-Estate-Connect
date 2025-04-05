# Real Estate Connect

Real Estate Connect is a full-stack real estate platform enabling dynamic property listings and real-time communication between users. The app utilizes WebSockets with Socket.IO for real-time chat functionality. It leverages JWT and cookies for secure authentication, and Prisma with MongoDB for efficient data management. Deployed on Render, the platform includes features like rich-text property descriptions, image uploads, and advanced filtering for a seamless user experience.

## Folder Structure

```
api
├── controllers
│   ├── auth.controller.js
│   ├── chat.controller.js
│   ├── message.controller.js
│   ├── post.controller.js
│   ├── test.controller.js
│   └── user.controller.js    
├── lib
│   ├── prisma.js             
├── logs
│   ├── .80fa764b779294b8cadf975e262c1f2fd68d5235-audit.json 
│   ├── app-2025-02-26.log
│   └── app-2025-02-27.log          
├── middleware
│   └── verifyToken.js         
├── prisma/              
│   └── schema.prisma
├── routes
│   ├── auth.route.js
│   ├── chat.route.js
│   ├── message.route.js
│   ├── post.route.js
│   ├── test.route.js
│   └──  user.route.js
├── .env                
├── .gitignore          
├── app.js               
├── logger.js            
├── package.json         
└── package-lock.json
client                   
├── README.md
├── .gitignore
├── vercel.json
├── vite.config.js
├── package.json
├── package-lock.json
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── index.scss
│   ├── main.jsx
│   ├── responsive.scss
│   └── components/
│   │   ├── card/
│   │   ├── chat/
│   │   ├── filter/
│   │   ├── list/
│   │   ├── map/
│   │   ├── navbar/
│   │   ├── pin/
│   │   ├── searchBar/
│   │   ├── slider/
│   │   └── uploadWidget/
|   └── context/
│   │   ├── AuthContext.jsx
│   │   └── SocketContext.jsx
│   └── lib/
│   │   ├── apiRequest.js
│   │   ├── dummydata.js
│   │   ├── loader.js
│   │   └── notificationStore.js
│   └── routes/
│   │   ├── ChatPage/
│   │   ├── homePage/
│   │   ├── layout/
│   │   ├── listPage/
│   │   ├── login/
│   │   ├── newPostPage/
│   │   ├── profilePage/
│   │   ├── profileUpdatePage/
│   │   ├── register/
│   │   └── singlePage/
socket                   
│   ├── app.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
```

## Run Locally

### Clone the project

```bash
git clone https://github.com/vidyaMadugula/Real-Estate-Connect.git
```

### Go to the project directory

```bash
cd REAL_ESTATEAPP
```

### 1. Setting up the api (Backend)
### Navigate to the api folder

```bash
cd api
```

### Install dependencies

```bash
npm install
```

### Setup Environment Variables (api/.env)

```bash
DATABASE_URL=""
JWT_SECRET_KEY=""
VITE_CLIENT_URL=""
```

### Start the development server

```bash
npm start 
```

### 2. Setting up the client (Frontend)
### Navigate to the client folder

```bash
cd ../client
```

### Install dependencies

```bash
npm install
```

### Setup Environment Variables (api/.env)

```bash
VITE_API_URL=""
VITE_SOCKET_URL=""
VITE_UPI_ID=""
```

### Start the development server

```bash
npm run dev 
```

### 3. Setting up the socket (WebSocket Server)
### Navigate to the socket folder

```bash
cd ../socket
```

### Install dependencies

```bash
npm install
```

### Setup Environment Variables (api/.env)

```bash
VITE_CLIENT_URL=""
```

### Start the WebSocket server

```bash
npm start  
```
