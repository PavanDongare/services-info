import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { db: { schema: "compliance" } }
);

async function dropColumn() {
  console.log("Attempting to drop age_of_consent column from laws table...\n");

  // Check current schema
  const { data: currentSchema } = await supabase
    .from("laws")
    .select("*")
    .limit(1);

  if (currentSchema && currentSchema.length > 0) {
    const columns = Object.keys(currentSchema[0]);
    const hasColumn = columns.includes("age_of_consent");
    
    console.log(`Current columns in laws table (${columns.length} total):`);
    console.log(columns.join(", "));
    console.log(`\nage_of_consent present: ${hasColumn}`);
    
    if (!hasColumn) {
      console.log("\n✓ Column already removed - nothing to do!");
      return;
    }
  }

  // Try to execute the migration
  const { error } = await supabase.rpc("exec_sql", {
    query: "ALTER TABLE laws DROP COLUMN IF EXISTS age_of_consent;",
  });

  if (error) {
    console.error(
      "\n⚠ Cannot drop column with anon key (expected limitation)"
    );
    console.log("\nTo complete the migration, you have two options:");
    console.log(
      "\n1. Use Supabase Dashboard (easiest):"
    );
    console.log("   - Go to SQL Editor in Supabase dashboard");
    console.log("   - Run: ALTER TABLE compliance.laws DROP COLUMN IF EXISTS age_of_consent;");
    console.log(
      "\n2. Use Service Role Key (programmatic):"
    );
    console.log("   - Replace NEXT_PUBLIC_SUPABASE_ANON_KEY with SUPABASE_SERVICE_ROLE_KEY");
    console.log("   - Service role key has DDL permissions");
    return;
  }

  console.log("\n✓ Column dropped successfully!");
}

dropColumn().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
