# Propaganda analysis

The project is a web service designed to read **Standard Test Data Format (STDF)** files. Currently, the project offers the following features:

### Installation

1. **Install node.js:** [Download here](https://nodejs.org/en/download/).
2. **Install Python:** [Download here](https://www.python.org/).
3. **Clone the project**
4. **Navigate to the project directory:** `cd bachelor_app`.
5. **Backend setup:**
   - Create a virtual Python environment and activate it:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - Install all the required libraries, modules, and packages:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the backend:
     ```bash
     uvicorn app.backend.main:app --reload
     ```
   - Access the Swagger documentation at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

6. **Frontend setup:**
   - Navigate to the frontend directory: `cd app/frontend`.
   - Install dependencies: `npm install`.
   - Start the server: `npm start`.
   - Open your browser and navigate to [http://localhost:3000/home](http://localhost:3000/home).