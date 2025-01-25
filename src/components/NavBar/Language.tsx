import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18next, { t } from "i18next";

const Language: React.FC = () => {
  useTranslation();
  const handleChangeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="dark:bg-amber-400" variant="outline" size="icon">
            <Globe className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleChangeLanguage("en")}>
            {t("nav-Translation.English")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleChangeLanguage("ka")}>
            {t("nav-Translation.Georgian")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default Language;
