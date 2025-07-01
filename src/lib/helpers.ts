export function formatMoney(amount: number, currency: string = "EUR") {
    if (currency === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    } else if (currency === "DZD") {
      return new Intl.NumberFormat("fr-DZ", {
        style: "currency",
        currency: "DZD",
      }).format(amount);
    } else {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
    }
  }
  
  export function toSlug(str: string) {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  export function truncateText(text: string, maxLength: number) {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
  }