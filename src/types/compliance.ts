export interface CookieCategory {
  user_can_control: string;
  default_state: string;
  consent_required?: string;
}

export interface CookieCategories {
  strictly_necessary: CookieCategory;
  performance: CookieCategory;
  functional: CookieCategory;
  targeting: CookieCategory;
}

export interface UserRights {
  right_to_access: string;
  right_to_deletion: string;
  right_to_portability: string;
  right_to_object: string;
}

export interface Law {
  id: number;
  law_id: string;
  law_name: string;
  consent_model: "OPT_IN" | "OPT_OUT" | "IMPLIED_CONSENT" | "NOTIFY_ONLY";
  cookie_blocking_required: string;
  granular_consent_required: string;
  reject_button_required: string;
  settings_button_required: string;
  age_of_consent: number | null;
  cookie_categories: CookieCategories;
  consent_proof_retention_years: number;
  consent_refresh_required: string | null;
  consent_refresh_days: number | null;
  user_rights: UserRights;
  max_fine_percentage_revenue: number | null;
  max_fine_absolute_usd: number | null;
  enforcement_likelihood: string | null;
  sensitive_data_extra_consent: string | null;
  child_data_parental_consent: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Country {
  id: number;
  country: string;
  slug: string;
  law_id: string;
  region: string;
  created_at: string;
}

export interface Comparison {
  id: number;
  law1_id: string;
  law2_id: string;
  slug: string;
  priority: number;
  created_at: string;
}
