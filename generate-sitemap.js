import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';

const cwd = process.cwd();
dotenv.config({ path: path.join(cwd, ".env.local") });
dotenv.config({ path: path.join(cwd, ".env") });

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in the .env file");
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const monthDays = [
    { month: 'january', days: 31 },
    { month: 'february', days: 29 },
    { month: 'march', days: 31 },
    { month: 'april', days: 30 },
    { month: 'may', days: 31 },
    { month: 'june', days: 30 },
    { month: 'july', days: 31 },
    { month: 'august', days: 31 },
    { month: 'september', days: 30 },
    { month: 'october', days: 31 },
    { month: 'november', days: 30 },
    { month: 'december', days: 31 }
];

function generateDayUrls() {
    const urls = [];
    monthDays.forEach(({ month, days }) => {
        for (let day = 1; day <= days; day++) {
            urls.push({ url: `/date/${month}${day}`, changefreq: 'weekly', priority: 0.8 });
        }
    });
    return urls;
}

const dateUrls = generateDayUrls();

async function generateSitemap() {
    const sitemapStream = new SitemapStream({ hostname: 'https://theywillkillyou.com' });
    const writableStream = fs.createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));
    sitemapStream.pipe(writableStream);

    try {
        const staticPages = [
            { url: 'https://theywillkillyou.com/', changefreq: 'daily', priority: 1.0 },
            { url: 'https://theywillkillyou.com/privacy-policy', changefreq: 'yearly', priority: 0.3 },
            { url: 'https://theywillkillyou.com/terms-of-service', changefreq: 'yearly', priority: 0.3 },
        ];

        const { data: profiles } = await axios.get(`${API_URL}/profiles`);

        const profileUrls = [];
        profiles.forEach(profile => {
            profileUrls.push({ url: `/profile/${profile.shortUrl}`, changefreq: 'weekly', priority: 0.8 });
        });

        staticPages.forEach(page => sitemapStream.write(page));
        dateUrls.forEach(url => sitemapStream.write(url));
        profileUrls.forEach(url => sitemapStream.write(url));

        sitemapStream.end();
        writableStream.on('finish', () => {
            console.log('Sitemap successfully generated!');
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
}

generateSitemap();
