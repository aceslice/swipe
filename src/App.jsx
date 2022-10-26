
import "./css/App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import searchImg from "./assets/search_96px.png";
import toggle from "./assets/moon.png";
import logo from "./assets/diversity_96px.png";
const App = () => {
  const queries = ["artificial intelligence","technology","meta", "fashion"];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  const [input, setInput] = useState(" ");
  const [query, setQuery] = useState(randomQuery);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recom, setRecom] = useState("Recommended For You");

  const NEWS_API = `https://newsapi.org/v2/everything?q=${query}&apiKey=3c2e99de21374d3d8729d62a16752647`;

  useEffect(() => {
    fetch(NEWS_API)
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong");
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
  }, [NEWS_API]);
  return (
    <div className="App">
      <div className="Topnav">
        <img src={logo} alt="swipe logo" className="logo" />
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(e.target.lastElementChild.value);
            setInput(" ");
            setRecom(`Showing results for ${e.target.lastElementChild.value}`);
          }}
        >
          <img src={searchImg} alt="search image" />
          <input
            type="text"
            aria-label="search"
            placeholder="ex: artificial intelligence, technology, "
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </form>
        <img src={toggle} alt="toggle image" className="toggle" />
      </div>
      <Header message={recom} />
      {error && (
        <div className="error">
          <h1>{error}</h1>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Try Again
          </button>
        </div>
      )}
      {isLoading && (
        <div>
          <h1>Loading</h1>
        </div>
      )}
      {data && <Blogs articles={data} />}
    </div>
  );
};

export default App;
