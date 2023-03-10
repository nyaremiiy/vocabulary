export const config = {
  PORT: 5000,
  DB: {
    url: function () {
      return `mongodb+srv://${this.name}:${this.password}@cluster0.bnblhfu.mongodb.net/?retryWrites=true&w=majority`;
    },
    name: 'nyaremiiy',
    password: 'vqYxIOonjmJddctK',
  },
  secret: 'vqYxIOonjmJddctK',
};
