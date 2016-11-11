var ids = {
  github: {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_KEY,
    callbackURL: "https://sterasaki-nightlifeapp.herokuapp.com//auth/github/callback"
  }
};

module.exports = ids;