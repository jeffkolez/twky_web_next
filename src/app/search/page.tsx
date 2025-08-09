"use client";
// Old route: /search/:search?
// In Next, use searchParams (?q=... or ?search=...)
// If you want a path param like /search/foo, create [search]/page.tsx instead.

export default function SearchRoute({ searchParams }: { searchParams: { q?: string, search?: string } }) {
  const term = searchParams.q ?? searchParams.search ?? "";
  return (
    <main style={{ padding: 24 }}>
      <h1>Search</h1>
      <p>Query: {term}</p>
      {/* Render your existing <Search /> and <SearchResults /> here */}
    </main>
  );
}
