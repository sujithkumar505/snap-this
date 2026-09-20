import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppShell } from "../components/app-ui";

function NotFoundComponent() {
  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><p className="metric text-sm text-primary">404 / NOT FOUND</p><h1 className="mt-3 text-4xl font-semibold display-heading">This view is unavailable</h1><p className="mt-3 text-muted-foreground">The analysis or page you requested doesn’t exist.</p><Link to="/" className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline">Return to overview</Link></div></div>;
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error); const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "root" }); }, [error]);
  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><h1 className="text-3xl font-semibold display-heading">Something went wrong</h1><p className="mt-3 text-muted-foreground">Try refreshing this view or return to the overview.</p><div className="mt-6 flex justify-center gap-2"><button onClick={() => { router.invalidate(); reset(); }} className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">Try again</button><Link to="/" className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-semibold">Overview</Link></div></div></div>;
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "Cloudwise · Multi-cloud sustainability analysis" }, { name: "description", content: "Compare cloud cost, carbon, and performance with transparent mock analysis." }, { name: "author", content: "Cloudwise" }, { property: "og:title", content: "Cloudwise · Multi-cloud sustainability analysis" }, { property: "og:description", content: "Compare cloud cost, carbon, and performance with transparent mock analysis." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "stylesheet", href: appCss }, { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }, { rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }, { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Sans:wght@400;500;600;700&display=swap" }] }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) { return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><AppShell><Outlet /></AppShell></QueryClientProvider>; }
