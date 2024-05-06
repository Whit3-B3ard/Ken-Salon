import "../app/globals.css"; // or your global stylesheet
import { UserProvider } from "@/context/UserContext"; // Adjust this path as necessary
import AuthProvider from "@/context/auth";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
}
export default MyApp;