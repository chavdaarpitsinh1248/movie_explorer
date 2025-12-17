Movie Explorer

Live Website: [ https://chavarpitmovieexplorer.netlify.app/ ]

Movie Explorer is a frontend-only web application built using React and Vite.
It allows users to search for movies and view detailed information using the OMDb API.
This project is created to practice modern React development, API integration, and deployment workflows.

---

Features

* Search movies by title
* View detailed movie information such as poster, year, plot, and ratings
* Filter movies by year and type (movie or series)
* Responsive user interface
* Fast performance with Vite

---

Tech Stack

* React
* Vite
* JavaScript (ES6+)
* CSS / Tailwind CSS (if used)
* OMDb API

---

Project Overview

* Frontend-only application
* No backend
* No database
* Movie data is fetched directly from the OMDb public API

---

Environment Variables

This project uses an API key stored in an environment file that is not committed to GitHub.

Create a file named .env in the root directory and add:

VITE_OMDB_API_KEY=your_omdb_api_key_here

Important notes:

* Environment variables must start with VITE_
* The .env file is included in .gitignore
* When deploying to Netlify, the same variable must be added in the site’s Environment Variables

---

Local Development Setup

1. Clone the repository

git clone [https://github.com/your-username/movie-explorer.git](https://github.com/your-username/movie-explorer.git)
cd movie-explorer

2. Install dependencies

npm install

3. Start the development server

npm run dev

The application will run at:
[http://localhost:5173](http://localhost:5173)

---

Build for Production

npm run build

The production-ready files will be generated inside the dist folder.

---

Deployment

This project is deployed using Netlify with GitHub integration.

Netlify build settings:
Build command: npm run build
Publish directory: dist

Every push to the main branch automatically redeploys the site.

---

What I Learned

* Building component-based applications using React
* Fetching and handling data from third-party APIs
* Managing environment variables securely
* Deploying frontend applications using GitHub and Netlify

---

License

This project is created for educational and learning purposes.

---

Acknowledgements

OMDb API for providing movie data
React and Vite communities for excellent tooling

---

If you like this project, feel free to star the repository.
