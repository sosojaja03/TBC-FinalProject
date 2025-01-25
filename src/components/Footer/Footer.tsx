import { NavLink } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

export const Footer = () => {
  useTranslation();

  return (
    <footer className="mt-12 border-t bg-muted/50">
      <div className="container mx-auto flex justify-center px-4 py-6 text-center align-middle text-muted-foreground">
        <p className="mr-4">© 2025 BooksForAll. All rights reserved </p>
        <NavLink className="flex" to="/dashboard/about">
          <Trans>nav-Translation.About</Trans>
        </NavLink>
      </div>
    </footer>
  );
};
