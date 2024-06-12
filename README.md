# Jobster

Jobster is a job application management dashboard that allows users to manage job applications, schedule interviews, and track application statuses.

![Jobster Dashboard](./img/Screenshot%202024-06-12%20214040.png) <!-- Adjust the path accordingly -->

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- User authentication and profile management
- Job listing and application tracking
- Interview scheduling and management
- Application status updates and filtering

## Tech Stack

- **Framework**: [Hono](https://hono.dev/)
- **ORM**: [Drizzle ORM](https://drizzle.team/)
- **Database**: PostgreSQL (using [Neon Database](https://neon.tech/))
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Environment Variables**: [dotenv](https://www.npmjs.com/package/dotenv)
- **Authentication**: [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- **Password Hashing**: [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Task Scheduling**: [node-cron](https://www.npmjs.com/package/node-cron)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vicky-peace/Jobster-API
   cd jobster
