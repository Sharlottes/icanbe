export const metadata = {
  title: "I Can Be",
  description: "XREAL 4th Metathon Project - I Can Be",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
