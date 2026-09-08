import menuItemsDe from "../../messages/menu-items.de.json";

type MenuItemTranslation = { name: string; description: string };

const translations: Record<string, MenuItemTranslation> = menuItemsDe;

export function localizeMenuItem<
  T extends { name: string; description: string },
>(item: T, locale: string): T {
  if (locale !== "de") return item;
  const translation = translations[item.name];
  if (!translation) return item;
  return { ...item, name: translation.name, description: translation.description };
}
