import { metatagsSchema } from './../schemas/metatags';
import cheerio from 'cheerio';
import { MetaTags } from '../schemas/metatags';

export function MetaTag(pageData: string) {
    const $ = cheerio.load(pageData);

    const getMetatag = (name: string) =>
        $(`meta[name=${name}]`).attr('content') ||
        $(`meta[property="og:${name}"]`).attr('content') ||
        $(`meta[property="og:${name}"]`).attr('content');

    const tags = metatagsSchema.parse({
        title: $('title').first().text(),
        favicon: $('link[rel="shortcut icon"]').attr('href') || $('link[rel="icon"]').attr('href'),
        artist: $('div#text-container').children('#text').children('a.yt-formatted-string').first().text(),
        description: getMetatag('description'),
        img: getMetatag("image")
    });
    

    return tags;
}

