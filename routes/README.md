# E-Commerce Analytics API

A robust Express.js API for generating business intelligence reports from e-commerce data. This service provides endpoints for analyzing customer spending, sales trends, product performance, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Database Schema](#database-schema)
- [Development](#development)
- [License](#license)

## Features

- **Customer Analytics**: Identify top spenders and frequent buyers
- **Sales Reporting**: Generate monthly sales reports for shipped/delivered orders
- **Product Insights**: Find products that have never been ordered
- **Geographic Analysis**: Calculate average order values by country
- **Secure Database Connection**: MySQL with SSL support

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ecommerce-analytics-api.git
cd ecommerce-analytics-api

# Install dependencies
npm install

# Set up environment variables (see Configuration section)
cp .env.example .env

# Start the server
npm start
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
```

## API Endpoints

### Customer Reports

#### `GET /api/reports/top-customers`
Returns customers ranked by total spending.

#### `GET /api/reports/frequent-buyers`
Lists customers who have placed more than one order.

### Sales Reports

#### `GET /api/reports/monthly-sales`
Provides monthly revenue for shipped and delivered orders.

### Product Reports

#### `GET /api/reports/unsold-products`
Lists products that have never been ordered.

#### `GET /api/reports/products-never-ordered`
Alternative endpoint for products with no orders.

### Geographic Reports

#### `GET /api/reports/avg-order-value-country`
Shows average order value by customer country.

#### `GET /api/reports/average-order-value-by-country`
Alternative endpoint for average order value by country.

## Usage Examples

### Fetch Top Customers

```javascript
fetch('http://localhost:3000/api/reports/top-customers')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Example response:
```json
[
  {
    "name": "John Doe",
    "total_spent": 2500.75
  },
  {
    "name": "Jane Smith",
    "total_spent": 1850.25
  }
]
```

### Get Monthly Sales Report

```javascript
fetch('http://localhost:3000/api/reports/monthly-sales')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Example response:
```json
[
  {
    "month": "2023-01",
    "revenue": 12500.50
  },
  {
    "month": "2023-02",
    "revenue": 15750.25
  }
]
```

## Database Schema

This API assumes the following database structure:

- `customers` - Customer information including name and country
- `orders` - Order details with customer_id and status
- `order_items` - Line items with order_id, product_id, quantity, and unit_price
- `products` - Product catalog with product_id and name

## Development

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Running in Development Mode

```bash
# Install nodemon for development
npm install -D nodemon

# Add to package.json scripts
# "dev": "nodemon index.js"

# Run in development mode
npm run dev
```

## License

[MIT](LICENSE)
