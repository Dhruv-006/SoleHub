# SoleHub - Cloud-Based Shoe E-Commerce Web Application

**Step Into Your Style.**

SoleHub is a cloud-hosted shoe e-commerce web application developed using React, Node.js, Express.js and PostgreSQL. The application uses Render Web Service as its cloud compute environment and Render PostgreSQL as persistent cloud storage. 

This is a demonstration project created to explore cloud deployment, REST APIs, and cloud database management.

## Project Overview

Users can browse shoes, search and filter products, select sizes, manage their shopping cart and place orders. Product and order information is stored persistently in the cloud database. The project demonstrates cloud deployment, compute services, storage services, REST APIs, database operations, internet accessibility and basic cloud resource management.

## Features

- **Product Catalog:** Browse, search, and filter a list of shoes fetched directly from a PostgreSQL database.
- **Product Details:** View individual product specifications, select sizes, and check real-time stock availability.
- **Shopping Cart:** Add products, update quantities, and remove items with persistent cart state.
- **Checkout Flow:** Submit customer details to place an order, validating stock and recalculating prices on the server.
- **Responsive UI:** Clean, modern interface that works beautifully across mobile, tablet, and desktop devices.
- **RESTful API:** Robust Node.js backend following standardized JSON response contracts and proper error handling.

## Tech Stack

- **Frontend:** React, HTML, CSS, JavaScript (Vite)
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Cloud Computing Platform:** Render (Web Service & PostgreSQL)
- **Version Control:** Git & GitHub

## Architecture

```text
                       USER
                        │
                        ▼
               ┌─────────────────┐
               │    SoleHub UI   │
               │ React + CSS + JS│
               └────────┬────────┘
                        │
                        │ HTTP / JSON
                        ▼
               ┌─────────────────┐
               │ Render Web      │
               │ Service         │
               │                 │
               │ Node.js         │
               │ Express.js      │
               └────────┬────────┘
                        │
                        │ SQL
                        ▼
               ┌─────────────────┐
               │ Render          │
               │ PostgreSQL      │
               │                 │
               │ Products        │
               │ Orders          │
               │ Order Items     │
               └─────────────────┘
```

## Cloud Computing Concepts (ALA-1)

### Compute Service
Render Web Service hosts the Node.js/Express backend and handles HTTP requests. It manages scaling, health checks, and application logs.

### Storage Service
Render PostgreSQL provides persistent cloud database storage for products and orders.

### Deployment
The application is connected to GitHub and automatically deployed through Render on every code push.

### Internet Accessibility
The application is available through a public Render URL, making the frontend and REST APIs accessible from anywhere.

### Resource Management
Render Dashboard is used to manage deployment, logs, environment variables, and cloud services (compute and storage).

## Local Setup

### 1. Prerequisites
- Node.js (v18 or higher)
- PostgreSQL

### 2. Clone Repository
```bash
git clone https://github.com/username/solehub-cloud-ecommerce.git
cd solehub-cloud-ecommerce
```

### 3. Database Setup
1. Create a local PostgreSQL database named `solehub`.
2. Run the SQL scripts in `database/schema.sql` and `database/seed.sql` to initialize tables and seed data.

### 4. Environment Variables
Create a `.env` file in the root based on `.env.example`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/solehub
```

### 5. Install Dependencies and Run
Run the full-stack locally (frontend on port 5173, backend on 5000):
```bash
npm install
npm run dev
```

## API Endpoints

- `GET /api/health` - Check service status
- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Retrieve single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product
- `POST /api/orders` - Place a new order
- `GET /api/orders/:id` - Retrieve order details

## Testing
- Ensure the backend correctly fetches products from the PostgreSQL database.
- Verify checkout dynamically computes order totals instead of relying on frontend data.
- Check Render logs to confirm no internal stack traces or environment variables are leaked.

## Screenshots
*(Add screenshots of Homepage, Products page, Checkout, Render Web Service Dashboard, Render PostgreSQL Dashboard, and Database contents during the demonstration).*
