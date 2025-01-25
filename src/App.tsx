import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useAuthContext } from "./components/Context/index";
import { AppRoutes } from "./components/Routes";
import { useTranslation } from "react-i18next";

function App() {
  const { handleSetUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    // Persist language
    const savedLanguage = localStorage.getItem("appLanguage") || "en";
    i18n.changeLanguage(savedLanguage);

    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSetUser(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSetUser(session);
    });

    return () => subscription.unsubscribe();
  }, [handleSetUser, i18n]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AppRoutes />;
}

export default App;
