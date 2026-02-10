import { supabase } from "./supabase";
import type { Law, Country, Comparison } from "@/types/compliance";

// Laws
export async function getAllLaws(): Promise<Law[]> {
  const { data, error } = await supabase
    .from("laws")
    .select("*")
    .order("law_name");

  if (error) throw error;
  return data || [];
}

export async function getLawById(lawId: string): Promise<Law | null> {
  const { data, error } = await supabase
    .from("laws")
    .select("*")
    .eq("law_id", lawId)
    .single();

  if (error) return null;
  return data;
}

export async function getLawsByConsentModel(
  model: string
): Promise<Law[]> {
  const { data, error } = await supabase
    .from("laws")
    .select("*")
    .eq("consent_model", model)
    .order("law_name");

  if (error) throw error;
  return data || [];
}

// Countries
export async function getAllCountries(): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .order("country");

  if (error) throw error;
  return data || [];
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getCountriesByLaw(lawId: string): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("law_id", lawId)
    .order("country");

  if (error) throw error;
  return data || [];
}

export async function getCountriesByRegion(region: string): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("region", region)
    .order("country");

  if (error) throw error;
  return data || [];
}

// Comparisons
export async function getAllComparisons(): Promise<Comparison[]> {
  const { data, error } = await supabase
    .from("comparisons")
    .select("*")
    .order("priority", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getComparisonBySlug(
  slug: string
): Promise<Comparison | null> {
  const { data, error } = await supabase
    .from("comparisons")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

// Stats
export async function getStats() {
  const [laws, countries] = await Promise.all([
    getAllLaws(),
    getAllCountries(),
  ]);

  const consentModels = {
    OPT_IN: laws.filter((l) => l.consent_model === "OPT_IN").length,
    OPT_OUT: laws.filter((l) => l.consent_model === "OPT_OUT").length,
    IMPLIED_CONSENT: laws.filter((l) => l.consent_model === "IMPLIED_CONSENT")
      .length,
    NOTIFY_ONLY: laws.filter((l) => l.consent_model === "NOTIFY_ONLY").length,
  };

  const regions = countries.reduce(
    (acc, c) => {
      acc[c.region] = (acc[c.region] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    totalLaws: laws.length,
    totalCountries: countries.length,
    consentModels,
    regions,
  };
}
