const modules = import.meta.glob('../assets/sky-bg-frame/sky-bg-*.jpg', {
  eager: true,
  import: 'default',
})

export const skyFrames = Object.keys(modules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => modules[key])

let preloaded = false

// Warms the browser cache once so every section scrubbing this sequence
// reuses the same downloaded frames instead of each fetching on first use.
export function preloadSkyFrames() {
  if (preloaded || typeof window === 'undefined') return
  preloaded = true
  skyFrames.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}
