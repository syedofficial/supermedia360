import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * CursorScrubVideo
 *
 * Renders a video whose playhead is driven by cursor position instead of
 * normal playback. The video never autoplays and is never started by a
 * click — it only scrubs as the cursor moves across the tracking area.
 *
 * FRAME-ACCURATE PLAYBACK REQUIREMENT
 * For buttery, judder-free scrubbing, the uploaded video must be encoded
 * with every frame as a keyframe (GOP size of 1). Standard long-GOP
 * encodes force the browser to decode forward from the last keyframe on
 * every seek, which causes visible stutter when scrubbing. Re-encode the
 * source with:
 *
 *   ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 18 -g 1 -keyint_min 1 \
 *     -x264-params "scenecut=0" -profile:v high -pix_fmt yuv420p \
 *     -movflags +faststart -an out.mp4
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */

type Axis = "horizontal" | "vertical"
type TrackingArea = "component" | "window"
type ObjectFit = "cover" | "contain" | "fill"

interface CursorScrubVideoProps {
    videoFile?: string
    axis: Axis
    reverse: boolean
    trackingArea: TrackingArea
    smoothing: number
    objectFit: ObjectFit
    showPoster: boolean
    borderRadius: number
    style?: React.CSSProperties
}

function clamp01(value: number): number {
    if (value < 0) return 0
    if (value > 1) return 1
    return value
}

export default function CursorScrubVideo(props: CursorScrubVideoProps) {
    const {
        videoFile,
        axis,
        reverse,
        trackingArea,
        smoothing,
        objectFit,
        showPoster,
        borderRadius,
        style,
    } = props

    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    const [isReady, setIsReady] = useState(false)
    const isReadyRef = useRef(false)

    const normalizedRef = useRef({ x: 0, y: 0 })
    const currentTimeRef = useRef(0)
    const seekingRef = useRef(false)
    const lastObjectUrlRef = useRef<string | undefined>(undefined)

    const axisRef = useRef(axis)
    const reverseRef = useRef(reverse)
    const smoothingRef = useRef(smoothing)

    useEffect(() => {
        axisRef.current = axis
    }, [axis])

    useEffect(() => {
        reverseRef.current = reverse
    }, [reverse])

    useEffect(() => {
        smoothingRef.current = smoothing
    }, [smoothing])

    useEffect(() => {
        isReadyRef.current = isReady
    }, [isReady])

    // Load / prime the video whenever the source changes.
    useEffect(() => {
        const video = videoRef.current
        if (!video || !videoFile) return

        setIsReady(false)
        isReadyRef.current = false
        currentTimeRef.current = 0

        video.load()
        video
            .play()
            .then(() => video.pause())
            .catch(() => {})
        video.currentTime = 0

        const handleCanPlayThrough = () => setIsReady(true)
        const handleSeeking = () => {
            seekingRef.current = true
        }
        const handleSeeked = () => {
            seekingRef.current = false
        }

        video.addEventListener("canplaythrough", handleCanPlayThrough)
        video.addEventListener("seeking", handleSeeking)
        video.addEventListener("seeked", handleSeeked)

        if (videoFile.startsWith("blob:") && lastObjectUrlRef.current !== videoFile) {
            const previous = lastObjectUrlRef.current
            lastObjectUrlRef.current = videoFile
            if (previous) URL.revokeObjectURL(previous)
        }

        return () => {
            video.removeEventListener("canplaythrough", handleCanPlayThrough)
            video.removeEventListener("seeking", handleSeeking)
            video.removeEventListener("seeked", handleSeeked)
        }
    }, [videoFile])

    // Track cursor position over the configured tracking area.
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handlePointerMove = (event: PointerEvent) => {
            let x: number
            let y: number

            if (trackingArea === "window") {
                x = event.clientX / window.innerWidth
                y = event.clientY / window.innerHeight
            } else {
                const rect = container.getBoundingClientRect()
                x = (event as any).offsetX / rect.width
                y = (event as any).offsetY / rect.height
            }

            normalizedRef.current = { x: clamp01(x), y: clamp01(y) }
        }

        const target: Window | HTMLDivElement =
            trackingArea === "window" ? window : container
        target.addEventListener(
            "pointermove",
            handlePointerMove as EventListener
        )
        return () =>
            target.removeEventListener(
                "pointermove",
                handlePointerMove as EventListener
            )
    }, [trackingArea])

    // RAF loop: lerp toward the cursor-derived target time and apply seeks.
    useEffect(() => {
        let rafId: number

        const tick = () => {
            const video = videoRef.current
            if (
                video &&
                isReadyRef.current &&
                Number.isFinite(video.duration) &&
                video.duration > 0
            ) {
                const { x, y } = normalizedRef.current
                let pos = axisRef.current === "horizontal" ? x : y
                if (reverseRef.current) pos = 1 - pos

                const target = pos * video.duration
                const current = currentTimeRef.current
                const next = current + (target - current) * smoothingRef.current
                currentTimeRef.current = next

                if (!seekingRef.current && Math.abs(video.currentTime - next) > 0.008) {
                    video.currentTime = next
                }
            }
            rafId = requestAnimationFrame(tick)
        }

        rafId = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafId)
    }, [])

    // Revoke any object URL still held when the component fully unmounts.
    useEffect(() => {
        return () => {
            if (lastObjectUrlRef.current) {
                URL.revokeObjectURL(lastObjectUrlRef.current)
                lastObjectUrlRef.current = undefined
            }
        }
    }, [])

    if (!videoFile) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#1a1a1a",
                    color: "#8a8a8a",
                    fontSize: 14,
                    borderRadius,
                    ...style,
                }}
            >
                Add a video file
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius,
                background: "#000",
                ...style,
            }}
        >
            <video
                ref={videoRef}
                src={videoFile}
                muted
                playsInline
                preload="auto"
                disableRemotePlayback
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit,
                    borderRadius,
                    display: "block",
                    opacity: showPoster || isReady ? 1 : 0,
                    transition: "opacity 0.2s ease-out",
                }}
            />
        </div>
    )
}

addPropertyControls(CursorScrubVideo, {
    videoFile: {
        type: ControlType.File,
        title: "Video",
        allowedFileTypes: ["mp4", "webm", "mov", "m4v"],
    },
    axis: {
        type: ControlType.Enum,
        title: "Axis",
        options: ["horizontal", "vertical"],
        optionTitles: ["Horizontal", "Vertical"],
        defaultValue: "horizontal",
    },
    reverse: {
        type: ControlType.Boolean,
        title: "Reverse",
        defaultValue: false,
    },
    trackingArea: {
        type: ControlType.Enum,
        title: "Tracking Area",
        options: ["component", "window"],
        optionTitles: ["Component", "Window"],
        defaultValue: "component",
    },
    smoothing: {
        type: ControlType.Number,
        title: "Smoothing",
        min: 0.02,
        max: 1,
        step: 0.01,
        defaultValue: 0.22,
    },
    objectFit: {
        type: ControlType.Enum,
        title: "Object Fit",
        options: ["cover", "contain", "fill"],
        optionTitles: ["Cover", "Contain", "Fill"],
        defaultValue: "cover",
    },
    showPoster: {
        type: ControlType.Boolean,
        title: "Show Poster",
        defaultValue: true,
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        min: 0,
        defaultValue: 0,
    },
})
