async function get(endpoint: string) {
  const response = await fetch(`https://api.github.com/${endpoint}`);
  if (response.status >= 400) throw response;
  return response.json();
}

export { get };
