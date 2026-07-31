function searchableDate(value: number | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const monthShort = new Intl.DateTimeFormat("en", {
    month: "short",
    timeZone: "UTC",
  }).format(date);
  const monthLong = new Intl.DateTimeFormat("en", {
    month: "long",
    timeZone: "UTC",
  }).format(date);

  return [
    `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    `${month}/${day}`,
    `${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`,
    `${year}/${month}/${day}`,
    `${monthShort} ${day}`,
    `${monthLong} ${day}`,
    `${day} ${monthShort}`,
    `${day} ${monthLong}`,
  ].join(" ");
}

export function adminSearchMatches(
  query: string,
  values: Array<string | number | null | undefined>,
  dates: Array<number | null | undefined> = [],
): boolean {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const haystack = [
    ...values.map((value) => String(value ?? "")),
    ...dates.map(searchableDate),
  ].join(" ").toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export function readAdminQuery(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value || "").trim().slice(0, 120);
}
