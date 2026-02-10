import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { db: { schema: "compliance" } }
);

function toCSV(data: Record<string, unknown>[]): string {
  if (!data.length) return "";
  const headers = Object.keys(data[0]);
  const rows = data.map(row =>
    headers.map(h => {
      const val = row[h];
      if (val === null || val === undefined) return "";
      if (typeof val === "object") {
        const json = JSON.stringify(val);
        return '"' + json.replace(/"/g, '""') + '"';
      }
      const str = String(val);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    }).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

async function exportAll() {
  const docsDir = path.join(__dirname, "../docs");

  // 1. Laws
  const { data: laws } = await supabase.from("laws").select("*").order("law_id");
  fs.writeFileSync(path.join(docsDir, "1_laws.csv"), toCSV(laws || []));
  console.log(`Exported ${laws?.length} laws to docs/1_laws.csv`);

  // 2. Countries
  const { data: countries } = await supabase.from("countries").select("*").order("country");
  fs.writeFileSync(path.join(docsDir, "2_countries.csv"), toCSV(countries || []));
  console.log(`Exported ${countries?.length} countries to docs/2_countries.csv`);

  // 3. Comparisons
  const { data: comparisons } = await supabase.from("comparisons").select("*").order("priority", { ascending: false });
  fs.writeFileSync(path.join(docsDir, "3_comparisons.csv"), toCSV(comparisons || []));
  console.log(`Exported ${comparisons?.length} comparisons to docs/3_comparisons.csv`);
}

exportAll();
