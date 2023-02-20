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
  const [input, setInput] = useState(" ");
  const [query, setQuery] = useState(randomQuery);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recomMessage, setRecomMessage] = useState("Recommended For You");

  const API_KEY = import.meta.env.VITE_APP_GNEWS_API_KEY;
  const GNEWS_API = `https://gnews.io/api/v4/search?q=${query}&token=${API_KEY}&lang=en&country=us`;

  useEffect(() => {
    fetch(GNEWS_API)
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
        console.log(data);
      })
      .catch((err) => {
        setError("Houston, we have a problem!");
        setIsLoading(false);
        console.log(err.message);
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
            setInput(" ");
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

      {/* Error display */}
      {error && (
        <div className="error">
          <h1>{error}</h1>
          <p>
            Due to a reason or two, the data could not be displayed. Restoration
            is in progess. Allow the button to take you to a preview video.
          </p>

          <a href="https://www.linkedin.com/feed/update/urn:li:activity:6989970951304015872?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A6989970951304015872%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B4k%2F7KbHWRQKbiw4h7rthng%3D%3D">
            <button>View Demo</button>
          </a>
        </div>
      )}

      {/* Show loading animation or message when data is being fetched form the API */}
      {isLoading && (
        <div>
          <h1>Loading</h1>
        </div>
      )}

      {/* Display articles when the aricles conditions are true or the articles exist */}
      {data && <Blogs articles={data} />}
    </div>
  );
};

export default App;
