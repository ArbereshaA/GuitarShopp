🎸 Guitar Shop Application

This is a 3-page Guitar Shop application built with React and Apollo Client, fetching data from a GraphQL API. The app allows users to browse guitar brands, explore models, and view detailed guitar specifications.

🔗 API

All data is fetched from the provided GraphQL API:
👉 GraphQL Endpoint

🎨 Design Reference

The UI follows the provided Figma design reference.

📄 Pages
🔹 Page 1 – Guitar Brands

Displays all guitar brands fetched from the API.

Clicking on a brand navigates to the Guitar Models page.

🔹 Page 2 – Guitar Models

Displays models for the selected brand.

Includes:

Search bar → filter models by name.

Filter dropdown → narrow down by guitar type.

Pagination / Infinite Scroll (bonus).

Clicking on a model navigates to the Guitar Details page.

🔹 Page 3 – Guitar Details (Bonus)

Shows details of a selected guitar in two tabs:

Specs Tab → Displays all specifications of the guitar.

Musicians Tab → Lists musicians using the guitar.

Only 2 musicians shown at a time.

Includes navigation dots/buttons to reveal 2 more at a time if available.

⚙️ Requirements

Apollo Client for GraphQL data fetching.

Handle loading and error states gracefully.

Styled with CSS / Tailwind / UI library for clean readability.

Fully responsive design.

🚀 Getting Started

Clone the repository

git clone https://github.com/yourusername/guitar-shop.git
cd guitar-shop

Install dependencies

npm install

Run the development server

npm run dev

Open in browser
