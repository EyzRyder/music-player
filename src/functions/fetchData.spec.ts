import { expect, test } from 'vitest';
import { fetchPageData } from './fetchData';
import { MetaTag } from './cheerio';


test('right element type', async () => {
    const data = await fetchPageData("https://www.youtube.com/watch?v=pQpKqOSnkpU");
    expect(typeof data).toBeTypeOf("string");
})

test('See if meta tags are being fetched', async () => {

    const data = await fetchPageData("https://www.youtube.com/watch?v=pQpKqOSnkpU");
    const tags = await MetaTag(data);
    expect(tags).toHaveProperty("title");
    expect(tags).toHaveProperty("favicon");
    expect(tags).toHaveProperty("description");
    expect(tags).toHaveProperty("img");

})