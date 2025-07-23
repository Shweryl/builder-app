import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import { api } from "~/utils/api";
import MainLayout from "~/modules/common/MainLayout"
import { AppThemeProvider } from "~/components/providers/theme-provider"

import "~/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={geist.className}>
      <AppThemeProvider>
       <MainLayout>
         <Component {...pageProps} />
       </MainLayout>
      </AppThemeProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
