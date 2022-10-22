const Blogs = ({ articles }) => {
  return (
    <div className="Blogs">
      {articles.map((article) => {
        return (
          <a href={article.url} key={article.url}>
            <div className="card" >
              <span
                style={{ backgroundImage: `url(${article.urlToImage})` }}
              ></span>
              <h1>{article.title}</h1>
              <div className="description">{article.description}</div>
              <footer>
                <p className="author">
                  By {article.author || article.source.name}
                </p>
                <p className="time">{article.source.name}</p>
              </footer>
            </div>
          </a>
        );
      })}
    </div>
  );
};
export default Blogs;
