import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useI18n } from "../contexts/I18n";
import type { Language } from "../types/i18n";

const languageLabels: Record<Language, string> = {
  pt: 'PT',
  en: 'EN',
};

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      {languageLabels[language]}
    </Button>
  );
}

