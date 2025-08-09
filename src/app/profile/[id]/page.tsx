"use client";
// Old route: /profile/:id
// If your old Profile.page.tsx uses react-router's useParams, refactor it to accept props or read params here.

export default function ProfileRoute({ params }: { params: { id: string } }) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Profile</h1>
      <p>ID: {params.id}</p>
      {/* <ProfilePage id={params.id} /> */}
    </main>
  );
}
