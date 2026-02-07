import "./styles/globals.css";
import { Gloria_Hallelujah } from "next/font/google";

const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${gloria.className}`}>{children}</body>
    </html>
  );
}
