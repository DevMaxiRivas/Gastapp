import BrandLogo from "@/components/shared/BrandLogo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { APP_ROUTES } from "@/lib/constants";
import { Link } from "react-router-dom";

export function Header() {
  const { user } = useAuth()
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo />

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            What people say
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {user === null ?
            <>
              <Link to={APP_ROUTES.LOGIN}>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex cursor-pointer">
                  Log in
                </Button>
              </Link>
              <Link to={APP_ROUTES.REGISTER}>
                <Button size="sm" className="bg-primary hover:bg-primary/90 cursor-pointer">
                  Get started free
                </Button>
              </Link>
            </> :
            <Link to={APP_ROUTES.DASHBOARD}>
              <Button size="sm" className="bg-primary hover:bg-primary/90 cursor-pointer">
                Dashboard
              </Button>
            </Link>
          }
        </div>
      </div>
    </header>
  );
}
