export const verbAndParse = async (verb, url, data) => {
  const initialFetch = await fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json'
    },
    method: `${verb}`
  });
  const userData = await initialFetch.json()
  return userData;
};