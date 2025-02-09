import type { Metadata } from "next";
import './globals.css'
import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryProvider from "@/lib/QueryProvider";

export const metadata: Metadata = {
  title: "Gaming",
  description: "this ia gaming web app",
};

const montserrat = Montserrat({
  weight: ['300', '400', '700'],
  subsets: ['latin']
})

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} dark antialiased`}>
        <QueryProvider>
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover={false}
            theme="dark"
          />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}

// 3:45
