import "../styles/global.css";
import Providers from "./Providers";
import LayoutClient from "./LayoutClient";
import LoaderWrapper from "./LoaderWrapper";
export const metadata = {
  title: "Devkhamal Portfolio And Blog",
  description: "Portfolio and Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fleur+De+Leah&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Galada&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Sofia"
        />
        <link
          rel="icon"
          href=".\devkhamal_fav.png"
          width="100px"
          hight="100px"
          className="page_icon"
        />
      </head>
      <body>
        <div id="root">
          <Providers>
            <LoaderWrapper>
              <LayoutClient /> {children}
            </LoaderWrapper>
          </Providers>
        </div>
      </body>
    </html>
  );
}
