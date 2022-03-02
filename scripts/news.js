const fs = require('fs');
const axios = require('axios').default;

const today = new Date();
const yesterday = new Date(today);

yesterday.setDate(yesterday.getDate() - 1);

const url =
  process.env.URL +
  new Date().toISOString().split('T')[0] +
  `&from=${yesterday.toISOString().split('T')[0]}`;

const createArticle = (table, article) => {
  return (
    table +
    `
<tr>
<td valign="top" align="center" width="20%">
<a href="${article.url}">
<span>${article.source.name}</span>
<img src="${article.urlToImage}" align="center" alt="${article.source.name}"/>
</a>
</td>
<td valign="center" width="80%">
<h2>${article.title}</h2>
<p>${article.description}</p>
</td>`
  );
};

const app = async () => {
  const { data } = await axios.get(url);

  const news = data.articles.slice(0, 5).reduce(createArticle, '');

  const readme = fs.readFileSync('README.md', 'utf8');
  const [head, , tail] = readme.split('<!-- Crypto News -->');

  const table = `\n<table width="100%">${news}\n</table>\n`;

  const newReadme = [head, table, tail].join('<!-- Crypto News -->');

  fs.writeFileSync('README.md', newReadme);
};

app();
