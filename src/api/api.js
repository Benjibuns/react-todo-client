export const API_URL =
  process.env.REACT_APP_API_URL === "DEVELOPMENT"
    ? "http://localhost:5000/api"
    : "https://br-flask-todo-api.herokuapp.com/api";
