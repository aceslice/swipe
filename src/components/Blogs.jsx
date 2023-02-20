const Blogs = ({ articles }) => {
  return (
    <div className="Blogs">
      {articles.map(
        ({ image, description, author, title, source , url}) => {
          return (
            <a href={url} key={url}>
              <div className="card">
                <span style={{ backgroundImage: `url(${image})` }}></span>
                <h1>{title}</h1>
                <div className="description">{description}</div>
                <footer>
                  <p className="author">{author || source.name}</p>
                  <p className="source">{source.url}</p>
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
