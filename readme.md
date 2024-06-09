# AI-Based Library Recommendation System (Collaborative Filtering)

This is a simple guide to set up and run the AI-based Library Recommendation System using collaborative filtering. The system recommends books based on machine learning algorithms.

## Prerequisites

To run this project successfully, make sure you have the following installed:

- Python 3.10+
- Node.js 20

## Setup

1. **Clone Repository:** Clone the project repository to your local machine.

2. **Install Dependencies:** Open your Windows terminal and run the following command to install the required Python libraries:
   ```
   pip install numpy pandas scikit-learn flask flask_cors
   ```

3. **Open Visual Studio Code:** Navigate to the project folder and open Visual Studio Code.

4. **Run Backend:**
   - Open the terminal in Visual Studio Code.
   - Navigate into the backend folder:
     ```
     cd backend
     ```
   - Run the backend server:
     ```
     python app.py
     ```

5. **Run Frontend:**
   - Open another terminal in Visual Studio Code.
   - Navigate into the frontend folder:
     ```
     cd frontend
     ```
   - Install frontend dependencies:
     ```
     npm install
     ```
   - Start the frontend server:
     ```
     npm start
     ```

## Usage

Once both backend and frontend servers are running, you can access the system through your web browser. You can add test books and test the recommendation model to receive personalized book suggestions based on collaborative filtering.