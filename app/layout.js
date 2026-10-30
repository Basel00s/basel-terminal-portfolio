import "./globals.css";

export const metadata = {
  title: "Basel — Developer",
  description: "The personal terminal portfolio of Basel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
