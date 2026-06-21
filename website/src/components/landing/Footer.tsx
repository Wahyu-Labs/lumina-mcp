import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full border-t border-border/40 py-12 text-center text-muted-foreground text-sm bg-background/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="m-0 text-xs">
          {t('footer.copyright')}
        </p>
        <div className="flex gap-6 text-xs">
          <a href="https://github.com/Wahyu-Labs/lumina-mcp" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href="https://github.com/Wahyu-Labs/lumina-mcp/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            License
          </a>
          <a href="https://github.com/Wahyu-Labs/lumina-mcp/issues" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  )
}
