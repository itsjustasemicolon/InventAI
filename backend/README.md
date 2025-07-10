# Walmart-Sparkathon Backend

## Overview
This backend provides API endpoints for demand prediction, stock reordering, and store insights using a machine learning model. It features role-based authentication (admin, store) and integrates with MongoDB Atlas for user management and data storage.

## Roles
- **Admin**: Can upload CSVs and is associated with multiple stores.
- **Store**: Can update data into the CSV for their store.

## Authentication
- JWT-based authentication.
- Hardcoded users for demo purposes.

## Endpoints

### 1. Demand Prediction
- **URL:** `/api/predict-demand`
- **Method:** POST
- **Auth:** Store/Admin
- **Body:**
  ```json
  {
    "store_id": "string",
    "item_id": "string",
    "date": "YYYY-MM-DD"
  }
  ```
- **Response:**
  ```json
  {
    "predicted_demand": number
  }
  ```

### 2. Stock Reordering
- **URL:** `/api/reorder-stock`
- **Method:** POST
- **Auth:** Store/Admin
- **Body:**
  ```json
  {
    "store_id": "string",
    "item_id": "string",
    "current_stock": number
  }
  ```
- **Response:**
  ```json
  {
    "reorder_quantity": number
  }
  ```

### 3. Store Insights
- **URL:** `/api/store-insights`
- **Method:** GET
- **Auth:** Store/Admin
- **Query Params:**
  - `store_id` (string)
- **Response:**
  ```json
  {
    "insights": { ... }
  }
  ```

### 4. Upload CSV (Admin only)
- **URL:** `/api/upload-csv`
- **Method:** POST
- **Auth:** Admin
- **Form Data:**
  - `file`: CSV file
- **Response:**
  ```json
  {
    "message": "Upload successful"
  }
  ```

### 5. Update Data (Store only)
- **URL:** `/api/update-data`
- **Method:** POST
- **Auth:** Store
- **Body:**
  ```json
  {
    "store_id": "string",
    "item_id": "string",
    "date": "YYYY-MM-DD",
    "stock": number
  }
  ```
- **Response:**
  ```json
  {
    "message": "Update successful"
  }
  ```

## Setup
- Configure MongoDB Atlas URI in `.env`.
- Install dependencies: `npm install`
- Start server: `npm start`

## Notes
- ML model is loaded from the `ml` directory and used for predictions.
- For demo, user roles and credentials are hardcoded in `config/users.js`.
