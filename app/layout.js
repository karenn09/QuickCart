import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "QuickCart - GreatStack",
  description: "E-Commerce with Next.js ",
};

const clerkAppearance = {
  elements: {
    signIn: {
      title: "Inicia sesión en AtelierShop",
      subtitle: "Ingresa tus credenciales para iniciar sesión",
    },
    signUp: {
      title: "Regístrate en AtelierShop",
      subtitle: "Ingresa tus credenciales para registrarte",
    },
    profile: {
      title: "Mi Perfil",
      subtitle: "Edita tus datos personales y opciones",
    },
    forgotPassword: {
      title: "Recuperar Contraseña",
      subtitle: "Ingresa tu correo para recuperar tu contraseña",
    },

  }
 }


export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      localization={esES}
      appearance= {clerkAppearance} >
      <html lang="es">
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <Toaster />
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// appearance={{ baseTheme: dark }}