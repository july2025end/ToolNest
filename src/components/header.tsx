import { HeaderNav } from "./header-nav";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { ToolsMenu } from "./tools-menu";

export function Header() {
  return (
    <header className="glass sticky top-0 z-30 border-b border-border/70">
      <div className="container-x flex h-14 items-center gap-4">
        <Logo />
        <HeaderNav />
        <div className="ml-auto flex items-center gap-1">
          <ToolsMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
