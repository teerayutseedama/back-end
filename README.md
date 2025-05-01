# Transfer API

A RESTful API built with NestJS for managing transfers and authentication.

## Features

- **Transfer Management**: Create, update, and manage transfers with associated items
- **Authentication**: JWT-based authentication with user registration and login
- **API Documentation**: Swagger/OpenAPI documentation
- **Database**: Prisma ORM with SQLite (configurable for other databases)
- **CORS Support**: Configured for cross-origin requests
- **Testing**: Jest setup for unit and e2e tests

## Prerequisites

- Node.js (v16 or later)
- pnpm (v7 or later)
- SQLite (or another database of your choice)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd transfer-api

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

## Database Setup

The project uses Prisma ORM with SQLite by default. To set up the database:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

To view your database with Prisma Studio:

```bash
npx prisma studio
```

## Running the Application

```bash
# Development mode
pnpm run start:dev

# Production mode
pnpm run build
pnpm run start:prod
```

The API will be available at `http://localhost:3000` by default.

## API Documentation

Swagger documentation is available at `http://localhost:3000/api` when the application is running.

### Main Endpoints

#### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/profile` - Get user profile (protected)

#### Transfers

- `POST /transfers` - Create a new transfer
- `PUT /transfers/:id` - Update a transfer

## Development

### Debug in VS Code

Launch configurations are provided for VS Code:

1. Press F5 or select "Debug NestJS" from the Run and Debug menu
2. Set breakpoints in your code
3. Use the Debug Console to evaluate expressions

### Testing

```bash
# Run unit tests
pnpm run test

# Run tests with coverage
pnpm run test:cov

# Run end-to-end tests
pnpm run test:e2e
```

### Linting

```bash
# Run ESLint
pnpm run lint
```

## Project Structure

```
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── dto/              # Data transfer objects
│   │   ├── guards/           # Authentication guards
│   │   ├── strategies/       # Passport strategies
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── transfer/             # Transfer module
│   │   ├── dto/              # Data transfer objects
│   │   ├── transfer.controller.ts
│   │   ├── transfer.module.ts
│   │   └── transfer.service.ts
│   ├── app.controller.ts     # Main app controller
│   ├── app.module.ts         # Main app module
│   ├── app.service.ts        # Main app service
│   ├── main.ts               # Application entry point
│   └── prisma.service.ts     # Prisma service
├── prisma/                   # Prisma schema and migrations
│   ├── migrations/
│   └── schema.prisma
├── test/                     # End-to-end tests
├── .env.example              # Example environment variables
├── .eslintrc.js              # ESLint configuration
├── .gitignore                # Git ignore file
├── jest.config.js            # Jest configuration
├── nest-cli.json             # NestJS CLI configuration
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Environment Variables

| Variable      | Description                     | Default                                  |
|---------------|---------------------------------|------------------------------------------|
| PORT          | Application port                | 3001                                     |
| DATABASE_URL  | Database connection string      | file:./dev.db                            |
| JWT_SECRET    | Secret for JWT tokens           | super-secret                             |
| NODE_ENV      | Environment (dev/prod)          | development                              |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
