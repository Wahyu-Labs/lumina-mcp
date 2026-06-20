import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-md hover:bg-muted/80 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <Globe className="h-4 w-4 shrink-0" />
        <span className="inline-block uppercase text-[11px] font-bold tracking-wider">{i18n.language}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-background border border-border/50 shadow-lg rounded-md overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            <button
              onClick={() => changeLanguage('en')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-muted/50 ${i18n.language === 'en' ? 'text-foreground font-semibold bg-muted/20' : 'text-muted-foreground'}`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('id')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-muted/50 ${i18n.language === 'id' ? 'text-foreground font-semibold bg-muted/20' : 'text-muted-foreground'}`}
            >
              Indonesia
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
