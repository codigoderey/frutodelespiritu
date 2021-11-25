const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://frutodelespiritu.com';
export default baseURL;