export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar will mount here */}
      <header id="navbar-root" className="sticky top-0 z-50 w-full" />

      {/* Main Landing Page Landmark Structure */}
      <main id="main-content" className="flex-1 flex flex-col w-full">
        <section id="hero" aria-label="Velora AI Introduction" />
        <section id="features" aria-label="What Velora AI Does" />
        <section id="how-it-works" aria-label="How Velora AI Works" />
        <section id="live-signals" aria-label="Live Trading Signals" />
        <section id="disclaimer" aria-label="Risk Disclaimer" />
      </main>

      {/* Footer Landmark */}
      <footer id="footer" className="w-full border-t border-border" />
    </div>
  );
}
