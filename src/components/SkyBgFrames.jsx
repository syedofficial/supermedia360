/**
 * Renders the two stacked <img>s `useScrollFrameSequence` crossfades
 * between. Drop it as the first child of a `position: relative` section
 * (give that section's `.container` `position: relative; z-index: 1;` so
 * content sits above it).
 */
export default function SkyBgFrames({ frameARef, frameBRef }) {
  return (
    <div className="sky-frames" aria-hidden="true">
      <img ref={frameARef} className="sky-frame sky-frame-a" alt="" />
      <img ref={frameBRef} className="sky-frame sky-frame-b" alt="" />
    </div>
  )
}
