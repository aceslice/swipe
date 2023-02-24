import "./css/App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import searchImg from "./assets/search_96px.png";
import toggle from "./assets/moon.png";
import logo from "./assets/diversity_96px.png";
const App = () => {
  const queries = [
    "artificial intelligence",
    "technology",
    "meta",
    "fashion",
    "gaming",
    "cloud",
    "social networking",
    "cyber security",
    "meta",
    "tesla",
    "quantum computing",
    "chat gpt",
  ];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(randomQuery);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recomMessage, setRecomMessage] = useState("Recommended For You");

  const API_KEY = import.meta.env.VITE_APP_GNEWS_API_KEY;
  const GNEWS_API = `https://gnews.io/api/v4/search?q=${query}&token=${API_KEY}&lang=en`;

  useEffect(() => {
    fetch(GNEWS_API)
      .then((res) => {
        if (!res.ok) {
          throw Error(err);
        }
        return res.json();
      })
      .then((data) => {
        setData(data.articles);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError("Houston, we have a problem!");
        setIsLoading(false);
      });
  }, [GNEWS_API]);
  return (
    <div className="App">
      {/* Code for navigation bar */}
      <div className="Topnav">
        <img src={logo} alt="swipe logo" className="logo" />
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(e.target.lastElementChild.value);
            setInput("");
            setRecomMessage(
              `Showing results for ${e.target.lastElementChild.value}`
            );
          }}
        >
          <img src={searchImg} alt="search image" />
          <input
            type="text"
            aria-label="search"
            placeholder="Search article you want...."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </form>
        <img src={toggle} alt="toggle image" className="toggle" />
      </div>

      {/* Set message for user on new search done */}
      <Header message={recomMessage} />

      {/* Display error message when something goes wrong*/}
      {error && (
        <div className="error">
          <h1>{error}</h1>
          <p>
            Due to a reason or two, the data could not be displayed. Restoration
            is in progess.
          </p>
          {/* Refresh the page when button is clicked */}
          <button
            onClick={() => {
              history.go();
            }}
          >
            Refresh
          </button>
        </div>
      )}

      {/* Show loading animation or message when data is being fetched from the API */}
      {isLoading && (
        <div>
          <h1>Loading......</h1>
        </div>
      )}

      {/* Display articles after being fetched from API*/}
      {data && <Blogs articles={data} />}
    </div>
  );
};

export default App;
