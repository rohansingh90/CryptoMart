import React, { useEffect, useState } from "react";

const News = () => {
  const [articles, setArticles] = useState([]); // Changed 'article' to 'articles' for clarity

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://api.coingecko.com/api/v3/news`);
      const data = await response.json();
      setArticles(data.data);
      console.log(data);
    };

    getData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {articles.map((article, index) => {
        const { title, description, url } = article; // Destructuring article properties

        return (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={article.thumb_2x} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{title}</h2>
              <p className="text-gray-600 mb-4">{description}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default News;
