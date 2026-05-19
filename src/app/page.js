import TwoStripMarquee from "./components/TwoStripMarquee";
import Navbar from "./components/Navbar";
import LoadingOverlay from "./components/LoadingOverlay";
import DotBackground from "./components/DotBackground";
import AnimatedSignature from "./components/AnimatedSignature";

export default function Home() {
  return (
    <main
      className="fixed inset-0 w-full h-dvh overflow-hidden"
      style={{
        background: `
          radial-gradient(900px 500px at 90% -10%, color-mix(in oklch, var(--accent) 12%, transparent), transparent 70%),
          radial-gradient(700px 400px at -10% 30%, color-mix(in oklch, var(--ink) 6%, transparent), transparent 70%),
          var(--bg)
        `,
      }}
    >
      {/* z-0: permanent dot splatter — identical positions to the loading canvas */}
      <DotBackground />

      {/* z-1: the signature image — animates via CSS delay, stays in DOM forever */}
      <AnimatedSignature />

      <Navbar />
      <TwoStripMarquee />

      {/* z-200: canvas + cream background, fades out when logo animation finishes */}
      <LoadingOverlay />
    </main>
  );
}
