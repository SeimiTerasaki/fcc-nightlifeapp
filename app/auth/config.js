var ids = {
  github: {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_KEY,
    callbackURL: "https://fcc-nightlifeapp-sterasaki.c9users.io/auth/github/callback"
  }
};

module.exports = ids;