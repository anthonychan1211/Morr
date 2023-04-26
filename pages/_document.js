import Document, { Html, Head, NextScript, Main } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    );
  }
}
`Morr collection critique

￼
^ webpage name should be morr instead 

Home page
 - font selection and consistency across the site
	- would choose classier fonts
	- make sure the fonts in different places are consistent
 - free delivery a little intrusive and not on theme
 - product in nature a little hard to see on homepage
	 - font contrast
 - bottom “copyright bar” being diff color is a bit jarring



Individual product pages
 - when clicking detail and product care 
 - make fine prints smaller? or can also put it in a separate FAQ page with return policy etc


order and contact us pages 
 - layout formatting a little off
 - color off

Account page
 - font diff
 - login spacing 
 - registration
	- popup that needs to be dismissed is intrusive, can we make it auto redirect?
 - after logging in the site is stuck in the account page


Email
 - needs styling and better text copy, looks spammy right now
 - confirmation redirect takes me to a localhost link instead of the site and errors out (the confirmation works, just the wrong redir link)
 - why is reset pw only after i sign in?
 - 

Shopping cart
 - didnt get to test too much since i can’t actually check out



functional:
 - did you compress photos? they take a while to load`;
