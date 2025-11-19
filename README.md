# Test Website – ToolsTide App Skeleton

This repository contains a **starter codebase** for a modern content website inspired by the ToolsTide blueprint.  It uses **Next.js 14** with TypeScript and Tailwind CSS for the frontend, plus a set of serverless functions and a database schema suitable for deployment on AWS.

## Features

- **Next.js 14 App Router** for server‑side rendering (SSR) and static generation
- **Tailwind CSS** for rapid, responsive styling
- **Categories and posts** dynamic routes under `app/`
- **Reusable components** for header, footer and post cards
- **Serverless functions** in the `lambda/` directory for authentication, posts, uploads and categories
- **Prisma schema** set up for PostgreSQL (users, posts, categories, tags)

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment variables and fill in your AWS/DB details:

```bash
cp .env.example .env
```

3. Run the development server:

```bash
npm run dev
```

The app will be available at <http://localhost:3000>.

## Deployment

This skeleton is designed for deployment on **AWS Amplify** with a serverless backend (Lambda functions behind API Gateway) and a PostgreSQL database on **Amazon RDS**.  See the ToolsTide blueprint for high‑level architecture details.
