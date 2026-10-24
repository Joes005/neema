/**
 * Base API URL for NEEMA / LUVELLE Backend.
 * Defaults to empty string so requests hit the same-origin reverse-proxy (/api/*),
 * or uses VITE_API_URL if explicitly specified in environment.
 */
export const API_BASE_URL: string =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL !== undefined)
    ? import.meta.env.VITE_API_URL
    : "";
