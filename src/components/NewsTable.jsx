import React from 'react';

const NewsTable = ({ news }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="text-left p-4">Author</th>
            <th className="text-left p-4">Title</th>
            <th className="text-left p-4">Published At</th>
          </tr>
        </thead>
        <tbody>
          {news.map((article, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{article.author || 'Unknown'}</td>
              <td className="p-4">{article.title}</td>
              <td className="p-4">{new Date(article.publishedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsTable;
