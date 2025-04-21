export default defineCachedEventHandler(
  async (event) => {
    const env = useRuntimeConfig(event);

    console.log('[Server env] ', env);
    const data = await fetchTredndingRepos();
    const { page = 0 } = getQuery<{ page?: number }>(event);

    console.log('page', page);
    const filterRepos = [];
    for (const repo of data.repositories) {
      const { readme, ...rest } = repo;
      filterRepos.push(rest);
    }

    const HITS_PER_PAGE = 20;

    const startIndex = HITS_PER_PAGE * page;
    const result = {
      date: data.date,
      repositories: filterRepos.slice(startIndex, startIndex + HITS_PER_PAGE),
    };

    // 计算并打印返回数据的大小
    const jsonString = JSON.stringify(result);

    // 计算 UTF-8 编码下的实际字节大小
    const encoder = new TextEncoder();
    const bytes = encoder.encode(jsonString);
    const byteSize = bytes.length;

    console.log(
      `[DEBUG] Response data size: ${byteSize} bytes (${(byteSize / 1024).toFixed(2)} KB)`
    );

    // 额外打印字符数，用于比较
    console.log(`[DEBUG] JSON string length (character count): ${jsonString.length} characters`);

    return result;
  },
  {
    maxAge: 60 * 60 * 3,
    getKey: (event) => {
      const query = getQuery(event);
      return `${event.path}?page=${query.page ?? 0}`;
    },
  }
);

async function fetchTredndingRepos() {
  const data = (await $fetch('https://popular.forgithub.com/index.json')) as TrendingReposData;

  return data;
}
