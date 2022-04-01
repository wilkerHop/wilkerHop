const fs = require('fs');
const mongodb = require('mongodb');
const axios = require('axios');
const qs = require('qs');

const mongoUri = process.env.MONGODB_URI;
const client = new mongodb.MongoClient(mongoUri, { useNewUrlParser: true });

const createLanguageStatsWithOther = (languages) => {
  const [other, first, second, third, fourth, fifth] = languages.sort((a) =>
    a.name === 'Other' ? -1 : 1
  );

  return `
1. 🥇 **${first.name}** with **${first.text}** of pleasure.
2. 🥈 **${second.name}** with **${second.text}** of work.
3. 🥉 **${third.name}** with **${third.text}** of playing.
4. 🏅 **${fourth.name}** with **${fourth.text}** of extreme thinking.
5. 🎖️ **${fifth.name}** with **${fifth.text}** of worrying bugs would appear.

And more **${other.text}** of 😁🖱💻🔌 (diverse file extensions).`;
};

const getWakatimeTokens = async (refreshToken) => {
  const querystring = qs.stringify({
    client_id: process.env.WAKATIME_CLIENT_ID,
    client_secret: process.env.WAKATIME_CLIENT_SECRET,
    redirect_uri: process.env.WAKATIME_REDIRECT_URI,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const config = {
    method: 'post',
    url: 'https://wakatime.com/oauth/token',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring,
  };

  const { data } = await axios(config);

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };
};

const app = async () => {
  await client.connect();

  const collection = client.db('wakatime').collection('tokens');

  // TODO: get last time used to check if it's time to refresh the token
  const { refresh_token: refreshToken } = await collection.findOne();

  const { access_token, refresh_token } = await getWakatimeTokens(refreshToken);

  await collection.updateOne({}, { $set: { refresh_token, access_token } });

  await client.close();

  const {
    data: { data },
  } = await axios.get(
    `https://wakatime.com/api/v1/users/current/stats/last_7_days`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const l = createLanguageStatsWithOther(data.languages);

  const readme = fs.readFileSync('README.md', 'utf8');
  const [head, , tail] = readme.split('<!-- Wakatime Stats -->');

  const languages = `\n\n### Languages${l}\n\n`;

  const newReadme = [head, languages, tail].join('<!-- Wakatime Stats -->');

  fs.writeFileSync('README.md', newReadme);
};

app();
