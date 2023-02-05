const Blogs = ({ articles }) => {
  return (
    <div className="Blogs">
      {articles.map(
        ({ urlToImage, url, description, author, title, source }) => {
          return (
            <a href={url} key={url}>
              <div className="card">
                <span style={{ backgroundImage: `url(${urlToImage})` }}></span>
                <h1>{title}</h1>
                <div className="description">{description}</div>
                <footer>
                  <p className="author">{author || source.name}</p>
                  <p className="source">{source.name}</p>
                  <br />
                </footer>
              </div>
            </a>
          );
        }
      )}
    </div>
  );
};
export default Blogs;
