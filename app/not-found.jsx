import Button from "@/components/Button";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="mesh-bg">
        <div
          className="mesh-blob animate-pulse-glow"
          style={{ width: 420, height: 420, top: 40, left: "15%", background: "#6C3FD4" }}
        />
        <div
          className="mesh-blob animate-pulse-glow"
          style={{ width: 360, height: 360, bottom: 20, right: "15%", background: "#00C9A7", animationDelay: "2s" }}
        />
      </div>
      <div className="container-x relative text-center">
        <h1 className="font-heading font-extrabold text-[120px] md:text-[180px] leading-none gradient-text hero-glow">
          404
        </h1>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-white -mt-4">
          Page Not Found
        </h2>
        <p className="mt-4 text-text-secondary max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="ghost">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
