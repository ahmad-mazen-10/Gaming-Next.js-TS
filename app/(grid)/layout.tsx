import ButtonGradient from "../components/ButtonGradient";
import GridContainer from "../components/defaults/GridContainer";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";
import Navbar from "../components/nav/Navbar";
import Sidebar from "../components/nav/Sidebar";
import { WishlistProvider } from "../context/wishlistContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WishlistProvider>
      <main className="dark background grid min-h-screen h-full">
        <ButtonGradient />
        <GridContainer cols={12}>
          <Sidebar />
          <MaxWidthWrapper className="col-span-full lg:col-span-10">
            <Navbar /> {children}
          </MaxWidthWrapper>
        </GridContainer>
      </main>
    </WishlistProvider>
  );
}