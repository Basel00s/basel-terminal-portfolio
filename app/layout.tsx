import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
const inter=Inter({subsets:["latin"],variable:"--font-inter",display:"swap"});
export const metadata:Metadata={title:"Basel — Software Developer",description:"The portfolio of Basel: a computer science student learning, building, and exploring software engineering."};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en" suppressHydrationWarning><body className={inter.variable}>{children}</body></html>}