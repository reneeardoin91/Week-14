import got from 'got';
const dataURL = 'https://dev-renee-week14.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1';

async function getPosts() {
  const response = await got(dataURL);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
  }

  const posts = await response.json();
  if (!Array.isArray(posts)) {
    throw new Error('The posts endpoint returned an invalid response.');
  }

  return posts;
}

export async function getAllIds() {
  const posts = await getPosts();

  return posts.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    };
  });
}

export async function getSortedList() {
  const posts = await getPosts();

  return posts
    .sort((a, b) => a.post_title.localeCompare(b.post_title))
    .map(item => ({
      id: item.ID.toString(),
      title: item.post_title,
      date: item.post_date.slice(0, 10)
    }));
}

export async function getData(idRequested) {
  const posts = await getPosts();
  const post = posts.find(item => item.ID.toString() === idRequested);
  if (!post) {
    throw new Error(`Post ${idRequested} was not found.`);
  }

  return post;
}