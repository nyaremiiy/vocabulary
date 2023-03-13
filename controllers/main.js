export const main = () => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
};
