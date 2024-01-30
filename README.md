## Overview
In this project I am rebuilding my capstone project from the MIT xPro bootcamp.
For this version 2 of the Bank App, I am using a supabase/postgres database and authentication and authorization utilizing the RLS. 

## Future Improvements
1)Create a new table in the database that has a relationship one-to-many with each user that stores a history of all the transactions.
2)Create a new component that shows the history of all the deposits and withdrawals by a user.

## Getting Started
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
  
cd your-project
npm install  
npm install @supabase/supabase-js

create a supabase project. 

## .evn_example
VITE_SUPABASE_URL='YOUR_SUPABASE_URL'
VITE_SUPABASE_ANON_KEY='YOUR_SUPABASE_PUBLIC_KEY'

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
