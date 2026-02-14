import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log("Supabase URL:", supabaseUrl ? "Found" : "Missing");
console.log("Supabase Key:", supabaseKey ? "Found" : "Missing");

const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: "compliance" },
});

// Helper to create slug from country name
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Parse CSV
function parseCSV(content: string): Array<Record<string, string>> {
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const row: Record<string, string> = {};
    headers.forEach((header, i) => {
      row[header.trim()] = values[i]?.trim() || "";
    });
    return row;
  });
}

async function seedLaws() {
  console.log("Seeding laws...");

  const lawsPath = path.join(__dirname, "../docs/laws_data_complete.json");
  const lawsData = JSON.parse(fs.readFileSync(lawsPath, "utf-8"));

  // Transform data for insert
  const laws = lawsData.map((law: Record<string, unknown>) => ({
    law_id: law.law_id,
    law_name: law.law_name,
    consent_model: law.consent_model,
    cookie_blocking_required: law.cookie_blocking_required,
    granular_consent_required: law.granular_consent_required,
    reject_button_required: law.reject_button_required,
    settings_button_required: law.settings_button_required,
    cookie_categories: law.cookie_categories,
    consent_proof_retention_years: law.consent_proof_retention_years,
    consent_refresh_required: law.consent_refresh_required || null,
    consent_refresh_days: law.consent_refresh_days || null,
    user_rights: law.user_rights,
    max_fine_percentage_revenue: law.max_fine_percentage_revenue || null,
    max_fine_absolute_usd: law.max_fine_absolute_usd || null,
    enforcement_likelihood: law.enforcement_likelihood || null,
    sensitive_data_extra_consent: law.sensitive_data_extra_consent || null,
    child_data_parental_consent: law.child_data_parental_consent || null,
    notes: law.notes || null,
  }));

  const { error } = await supabase.from("laws").upsert(laws, {
    onConflict: "law_id",
  });

  if (error) {
    console.error("Error seeding laws:", error);
    throw error;
  }

  console.log(`Seeded ${laws.length} laws`);
}

async function seedCountries() {
  console.log("Seeding countries...");

  const csvPath = path.join(__dirname, "../docs/countries_complete.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const countriesData = parseCSV(csvContent);

  // Transform data for insert
  const countries = countriesData.map((row) => ({
    country: row.country,
    slug: createSlug(row.country),
    law_id: row.law_id,
    region: row.region,
  }));

  const { error } = await supabase.from("countries").upsert(countries, {
    onConflict: "slug",
  });

  if (error) {
    console.error("Error seeding countries:", error);
    throw error;
  }

  console.log(`Seeded ${countries.length} countries`);
}

async function seedComparisons() {
  console.log("Seeding comparisons...");

  // High-value comparison pairs for SEO
  const comparisons = [
    { law1_id: "gdpr", law2_id: "ccpa", slug: "gdpr-vs-ccpa", priority: 10 },
    { law1_id: "gdpr", law2_id: "lgpd", slug: "gdpr-vs-lgpd", priority: 9 },
    { law1_id: "gdpr", law2_id: "uk_dpa", slug: "gdpr-vs-uk-dpa", priority: 8 },
    { law1_id: "gdpr", law2_id: "pipl", slug: "gdpr-vs-pipl", priority: 7 },
    { law1_id: "ccpa", law2_id: "vcdpa", slug: "ccpa-vs-vcdpa", priority: 6 },
    { law1_id: "ccpa", law2_id: "cpa", slug: "ccpa-vs-cpa", priority: 5 },
    { law1_id: "lgpd", law2_id: "ccpa", slug: "lgpd-vs-ccpa", priority: 4 },
    { law1_id: "gdpr", law2_id: "pipeda", slug: "gdpr-vs-pipeda", priority: 3 },
    { law1_id: "pipl", law2_id: "ccpa", slug: "pipl-vs-ccpa", priority: 2 },
    { law1_id: "gdpr", law2_id: "pipa", slug: "gdpr-vs-pipa", priority: 1 },
    {
      law1_id: "gdpr",
      law2_id: "pdpa_singapore",
      slug: "gdpr-vs-pdpa-singapore",
      priority: 1,
    },
    {
      law1_id: "ccpa",
      law2_id: "tdpsa",
      slug: "ccpa-vs-tdpsa",
      priority: 1,
    },
  ];

  const { error } = await supabase.from("comparisons").upsert(comparisons, {
    onConflict: "slug",
  });

  if (error) {
    console.error("Error seeding comparisons:", error);
    throw error;
  }

  console.log(`Seeded ${comparisons.length} comparisons`);
}

async function main() {
  console.log("Starting seed process...");
  console.log("Supabase URL:", supabaseUrl);

  try {
    await seedLaws();
    await seedCountries();
    await seedComparisons();
    console.log("\nSeed completed successfully!");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

main();
