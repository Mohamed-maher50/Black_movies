const fetchData = async (url, query) => {
  const req = await fetch(
    `${url}?api_key=${process.env.REACT_APP_APi_KEY}&query=${
      query ? query : ""
    }`
  );
  const res = await req.json();
  return res;
};
export default fetchData;
