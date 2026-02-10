import {
  Header,
  Hero,
  Problem,
  Pillars,
  AnalyticsComparison,
  ServerSideStats,
  ConsentOptimization,
  CapabilityMatrix,
  TechStack,
  AIActCompliance,
  Regulations,
  ComplianceDatabase,
  Resources,
  WhyUs,
  Contact,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <ComplianceDatabase />
        <Pillars />
        <AnalyticsComparison />
        <ServerSideStats />
        <ConsentOptimization />
        <CapabilityMatrix />
        <TechStack />
        <AIActCompliance />
        <Regulations />
        <Resources />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
