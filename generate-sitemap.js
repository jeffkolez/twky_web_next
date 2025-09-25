import { SitemapStream } from "sitemap";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";

const cwd = process.cwd();
dotenv.config({ path: path.join(cwd, ".env.local") });
dotenv.config({ path: path.join(cwd, ".env") });

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const SITE_URL = "https://theywillkillyou.com";

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const monthDays = [
    { month: "january", days: 31 },
    { month: "february", days: 29 },
    { month: "march", days: 31 },
    { month: "april", days: 30 },
    { month: "may", days: 31 },
    { month: "june", days: 30 },
    { month: "july", days: 31 },
    { month: "august", days: 31 },
    { month: "september", days: 30 },
    { month: "october", days: 31 },
    { month: "november", days: 30 },
    { month: "december", days: 31 },
];

function generateDayUrls() {
    const urls = [];
    monthDays.forEach(({ month, days }) => {
        for (let day = 1; day <= days; day++) {
            urls.push({ url: `/date/${month}${day}`, changefreq: "weekly", priority: 0.8 });
        }
    });
    return urls;
}

const dateUrls = generateDayUrls();


async function fetchAllNewsForSitemap(perPage = 500) {
    const items = [];
    let page = 1;

    while (true) {
        const { data } = await axios.get(`${API_URL}/news/sitemap`, {
            params: { page, per_page: perPage },
        });
        for (const row of data.data) {
            items.push(row);
        }
        if (page >= data.meta.last_page) break;
        page += 1;
    }

    return items;
}

async function fetchProfiles() {
    const { data } = await axios.get(`${API_URL}/profiles`);
    return data;
}

async function fetchNewsArchiveMeta(perPage = 20) {
    // Get archive pagination by calling /news with per_page only; we don't need items.
    const { data } = await axios.get(`${API_URL}/news`, { params: { per_page: perPage, page: 1 } });
    return data?.meta ?? { last_page: 1 };
}

async function generateSitemap() {
    const sitemapPath = path.resolve(__dirname, "public", "sitemap.xml");
    fs.mkdirSync(path.dirname(sitemapPath), { recursive: true });

    const sitemapStream = new SitemapStream({ hostname: SITE_URL });
    const writableStream = fs.createWriteStream(sitemapPath);
    sitemapStream.pipe(writableStream);

    try {
        // Static pages
        const staticPages = [
            { url: "/", changefreq: "daily", priority: 1.0 },
            { url: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
            { url: "/terms-of-service", changefreq: "yearly", priority: 0.3 },
            { url: "/news", changefreq: "hourly", priority: 0.9 }, // archive root
        ];

        // Profiles
        const profiles = await fetchProfiles();
        const profileUrls = profiles.map((p) => ({
            url: `/profile/${p.shortUrl}`,
            changefreq: "weekly",
            priority: 0.8,
        }));

        // News archive pages
        const archiveMeta = await fetchNewsArchiveMeta(20); // match your /news page size
        const archivePages = Array.from({ length: archiveMeta.last_page }, (_, i) => i + 1)
            .filter((p) => p > 1)
            .map((p) => ({
                url: `/news?page=${p}`,
                changefreq: "hourly",
                priority: 0.7,
            }));

        const newsItems = await fetchAllNewsForSitemap(500);
        const newsUrls = newsItems.map((n) => ({
            url: `/news/${n.slug}`,
            lastmod: n.lastmod,
            changefreq: "daily",
            priority: 0.9,
        }));

        for (const page of staticPages) sitemapStream.write(page);
        for (const url of dateUrls) sitemapStream.write(url);
        for (const url of profileUrls) sitemapStream.write(url);
        for (const url of archivePages) sitemapStream.write(url);
        for (const url of newsUrls) sitemapStream.write(url);

        sitemapStream.end();
        await new Promise((resolve, reject) => {
            writableStream.on("finish", () => resolve());
            writableStream.on("error", reject);
        });

        console.log("Sitemap successfully generated!");
    } catch (error) {
        console.error("Error generating sitemap:", error);
        sitemapStream.end();
    }
}

generateSitemap();
