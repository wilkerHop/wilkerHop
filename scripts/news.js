const fs = require('fs');
const axios = require('axios').default;

const url = process.env.URL + new Date().toISOString().split('T')[0];
console.log(url);
const template = `<tr>
<td valign="top" align="center" width="20%">
<a href="{{url}}">
<span>{{sourceName}}</span>
<img src="{{urlToImage}}" align="center" />
</a>
</td>
<td valign="center" width="80%">
{{description}}
</td>`;

const app = async () => {
  const { data } = await axios.get(url);

  console.log(data.articles.length);

  const news = data.articles.slice(0, 5).map((article) => {
    let md = template;

    md = md.replace('{{url}}', article.url);
    md = md.replace('{{sourceName}}', article.source.name);
    md = md.replace('{{urlToImage}}', article.urlToImage);
    md = md.replace('{{description}}', article.description);

    return md;
  });

  const readme = fs.readFileSync('README.md', 'utf8');
  const [head, , tail] = readme.split('<!-- Crypto News -->');

  const table = `\n<table width="100%">\n${news.join('\n')}\n</table>\n`;

  const newReadme = [head, table, tail].join('<!-- Crypto News -->');

  fs.writeFileSync('README.md', newReadme);
};

app();
