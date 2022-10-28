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
  ];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  const [input, setInput] = useState(" ");
  const [query, setQuery] = useState(randomQuery);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recom, setRecom] = useState("Recommended For You");

  const API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY;
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
            placeholder="Search article you want...."
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
          <a href="https://www.linkedin.com/feed/update/urn:li:activity:6989970951304015872?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A6989970951304015872%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B4k%2F7KbHWRQKbiw4h7rthng%3D%3D">
            <button>View Demo</button>
          </a>
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
