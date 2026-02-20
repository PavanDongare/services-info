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
  ComplianceTools,
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
        <ComplianceTools />
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
