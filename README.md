## Practical-20 E-commerce App to use Tanstack query

A small e-commerce application built with React, TypeScript, Material-UI, Redux Toolkit, TanStack Query and JSON-Server.
Users can sign up, sign in, create/read/update/delete their own products, search & filter, and browse with infinite scroll.

## Features

- **Authentication**

  - Sign up & Sign in (mocked via JSON-Server)
  - JWT-style token stored in Redux + `localStorage`
  - Logout

- **Product Management**

  - Create, Read, Update, Delete (CRUD)
  - Each product scoped to its creator (only owner can see/edit/delete)
  - Infinite scroll on product list

- **UX Enhancements**

  - Search bar (only on product list page)
  - Sidebar filters: sort by name/price, filter by category, price range, rating, discount
  - Image preview in product form
  - Responsive Material-UI layout

- **State & Data Fetching**
  - Global state with Redux Toolkit (auth + search)
  - Server state with TanStack Query (products)
  - JSON-Server as a fake REST API

## Tech Stack

- **Frontend**

  - React 18+
  - TypeScript
  - Material-UI v5
  - Redux Toolkit
  - @tanstack/react-query
  - React Router v6

- **Backend (Mock)**
  - JSON-Server

## Deploy Link:
https://lucky-arithmetic-f32e7f.netlify.app/
