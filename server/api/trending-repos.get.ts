export default defineCachedEventHandler(
  async (_event) => {
    const data = await fetchTredndingRepos();

    return data;
  },
  {
    maxAge: 60 * 60,
  }
);

async function fetchTredndingRepos() {
  const data = (await $fetch(
    "https://popular.forgithub.com/index.json"
  )) as TrendingReposData;

  return data;
}
