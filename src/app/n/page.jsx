import InfiniteGrid from "../components/Infinite-grid";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden" style={{
        background: `
          radial-gradient(900px 500px at 90% -10%, color-mix(in oklch, var(--accent) 12%, transparent), transparent 70%),
          radial-gradient(700px 400px at -10% 30%, color-mix(in oklch, var(--ink) 6%, transparent), transparent 70%),
          var(--bg)
        `,
      }}>
      <Navbar />
      <InfiniteGrid />
     
    </main>
  );
}
