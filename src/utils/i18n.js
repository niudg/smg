export function translateTitle(title) {
  if (this.$te(`${title}`)) return this.$t(`${title}`)
  return title
}
