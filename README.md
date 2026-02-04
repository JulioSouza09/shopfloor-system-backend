 # Shopfloor Mini

A lightweight shopfloor management system for tracking production orders and machine status with real-time KPI monitoring.

## Overview

This project demonstrates professional REST API design, database integration, and clean architecture patterns. It provides a complete backend system for managing manufacturing operations with order tracking, machine status monitoring, and automated performance metrics.

## Features

- **Order Management**: Create, read, update orders with status tracking (PENDING → IN_PROGRESS → COMPLETED)
- **Machine Monitoring**: Track machine status (RUNNING, STOPPED, MAINTENANCE)
- **Real-time KPIs**: Aggregated metrics with intelligent caching (30s TTL)
- **Input Validation**: Comprehensive validation with detailed error messages
- **Security**: SQL injection protection via parameterized queries
- **Performance**: Cached KPI calculations with automatic invalidation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Validation**: Custom validators
- **Architecture**: Layered (Routes → Controllers → Services → Database)

## Project Structure

```
backend/
├── src/
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Server entry point
│   ├── controllers/            # Request handlers
│   │   ├── ordersController.js
│   │   ├── machinesControllers.js
│   │   └── kpisControllers.js
│   ├── services/               # Business logic
│   │   ├── ordersService.js
│   │   ├── machinesService.js
│   │   └── kpiService.js
│   ├── routes/                 # API endpoints
│   │   ├── ordersRoutes.js
│   │   ├── machinesRoutes.js
│   │   └── kpisRoutes.js
│   ├── validators/             # Input validation
│   │   ├── orderValidator.js
│   │   └── machineValidator.js
│   ├── middlewares/            # Express middlewares
│   │   └── globalMiddlewares.js
│   └── database/
│       ├── db.js               # Database connection
│       └── schema.sql          # Table definitions
├── package.json
└── README.md
```

## Installation

```bash
# Install dependencies
npm install

# Initialize database
# Option 1: Run the SQL schema directly
sqlite3 database.db < src/database/schema.sql

# Option 2: Call createTables() function from db.js
# Import and call createTables() in your code, or run:
node -e "import('./src/database/db.js').then(m => m.createTables())"

# Start the server
npm start
```

## Usage

```bash
# Start development server
npm start

# Server runs on http://localhost:3000
```

## API Documentation

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/:id` | Get order by ID |
| PUT | `/api/orders/:id` | Update order |

**Order Schema:**
```json
{
  "product": "string (required, non-empty)",
  "quantity": "number (required, positive integer)",
  "status": "PENDING | IN_PROGRESS | COMPLETED"
}
```

### Machines

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/machines` | Get all machines |
| POST | `/api/machines` | Create new machine |
| GET | `/api/machines/:id` | Get machine by ID |
| PATCH | `/api/machines/:id/status` | Update machine status |

**Machine Schema:**
```json
{
  "name": "string (required, non-empty)",
  "status": "RUNNING | STOPPED | MAINTENANCE"
}
```

### KPIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/kpis` | Get aggregated metrics |

**KPI Response:**
```json
{
  "totalOrders": 150,
  "completedOrders": 120,
  "pendingOrders": 20,
  "inProgressOrders": 10,
  "completionRate": 80,
  "totalUnitsProduced": 6750,
  "totalMachines": 5,
  "runningMachines": 3,
  "stoppedMachines": 1,
  "maintenanceMachines": 1
}
```

## Architecture

### Layered Design

```
Routes → Controllers → Services → Database
```

- **Routes**: Define endpoints and apply validators
- **Controllers**: Handle HTTP requests/responses
- **Services**: Implement business logic and KPI calculations
- **Database**: Execute SQL queries with prepared statements

### KPI Caching Strategy

The KPI service implements intelligent caching to optimize performance:

1. **Cache on Read**: First request calculates and caches metrics
2. **TTL-based**: Cache expires after 30 seconds
3. **Invalidation on Write**: Cache clears when orders/machines are modified
4. **Automatic Recalculation**: Next request rebuilds cache if invalid

Benefits:
- Reduces database queries
- Sub-millisecond response times for cached data
- Always fresh after data mutations

## Validation Rules

### Orders
- Product: required, non-empty string
- Quantity: required, positive integer
- Status: must be PENDING, IN_PROGRESS, or COMPLETED

### Machines
- Name: required, non-empty string
- Status: must be RUNNING, STOPPED, or MAINTENANCE

Invalid requests return `400 Bad Request` with error details.

## Error Handling

All errors follow consistent format:

```json
{
  "error": "Error message"
}
```

HTTP Status Codes:
- `200 OK`: Success
- `201 Created`: Resource created
- `400 Bad Request`: Invalid input
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Security

- **SQL Injection Protection**: Parameterized queries via prepared statements
- **Input Validation**: All inputs validated before processing
- **Error Handling**: Sensitive details not exposed in responses

## Performance Considerations

- KPI calculations cached with 30-second TTL
- Efficient filtering using native array methods
- Single database connection (better-sqlite3 is synchronous)
- Automatic cache invalidation prevents stale data

## Future Enhancements

- [ ] Add authentication/authorization
- [ ] Implement pagination for large datasets
- [ ] Add filtering and sorting options
- [ ] Real-time updates via WebSockets
- [ ] Historical KPI tracking
- [ ] Export data to CSV/Excel
- [ ] Docker containerization
- [ ] Unit and integration tests