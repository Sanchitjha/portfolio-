export function isEmail(value) {
  return /\S+@\S+\.\S+/.test(value || "")
}

export function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0
}

export function clampLen(value, min, max) {
  const len = (value || "").trim().length
  return len >= min && len <= max
}

export function sanitizeTags(input) {
  if (!input) return []
  const arr = Array.isArray(input) ? input : String(input).split(",")
  return arr
    .map((t) => String(t).trim())
    .filter(Boolean)
    .slice(0, 10)
}
