"use client";
// Old route: /date/:date  (example: september21)

export default function DateRoute({ params }: { params: { date: string } }) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Date</h1>
      <p>Date param: {params.date}</p>
      {/* <SignificantDatesPage dateParam={params.date} /> */}
    </main>
  );
}
