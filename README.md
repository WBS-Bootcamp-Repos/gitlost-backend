# Travel Blog - Fullstack Application

## Overview

A fullstack travel blog built using **React (frontend)** and **Node.js with PostgreSQL (backend)**. Users can create, update, and explore travel posts with images and descriptions.

## Features

- **Frontend:** React, Vite, React Router for navigation.
- **Backend:** Node.js, Express, PostgreSQL with CRUD API.
- **Database:** PostgreSQL with `posts` table including `id, author, title, content, cover, date`.

## Setup & Installation

1. Clone frontend (`git clone <frontend_repo>`) & backend (`git clone <backend_repo>`).
2. Install dependencies (`npm install`), configure `.env`, and start servers.

## API Endpoints

- `GET /posts` → Retrieve all posts.
- `GET /posts/:id` → Retrieve a single post.
- `POST /posts` → Create a new post.
- `PUT /posts/:id` → Update a post.
- `DELETE /posts/:id` → Delete a post.

## Steps to follow

Follow **Git workflow**: Use feature branches & pull requests. No direct pushes to `main`.
