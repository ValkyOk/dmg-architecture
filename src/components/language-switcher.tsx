"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useState } from "react";

export function LanguageSwitcher() {
  // In a real app, you'd use a i18n library (like next-intl) and context.
  // This is a UI placeholder.
  const [language, setLanguage] = useState("ES");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
           {language}
          <Languages className="h-4 w-4" />
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setLanguage("ES")}>
          Español
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setLanguage("EN")}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
