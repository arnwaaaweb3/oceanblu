// components/Hero3.tsx
'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/Hero3.module.css'

export default function Hero3() {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const videoElement = videoRef.current

        if (!videoElement) return

        // Pake Intersection Observer buat deteksi scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Kalo kelihatan di viewport, play video
                        videoElement.play()
                    } else {
                        // Kalo ga kelihatan, pause video
                        videoElement.pause()
                    }
                })
            },
            { threshold: 0.5 } // Trigger pas 50% video keliatan
        )

        observer.observe(videoElement)

        // Cleanup
        return () => {
            observer.unobserve(videoElement)
        }
    }, [])

    return (
        <div className={styles.heroContainer}>
            {/* Kiri - Teks */}
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                    About <span className={styles.highlight}>US</span>
                </h1>
                <p className={styles.heroSubtitle}>
                    Founded in 2014, Jan Gzrobski led the team to form a social organization focused on marine conservation.
                    His premise was simple:
                </p>
                <p className={styles.heroSubtitle} style={{ marginTop: '1rem' }}>
                    <span className={styles.selectedtext}>
                        Each year, 8 million tons of microplastics circulate in the ocean, causing severe harm and pollution.
                    </span>
                </p>
                <p className={styles.heroSubtitle}>
                    This pollution destroys ecosystems, tortures marine life, and slowly pushes species toward extinction.
                </p>
            </div>

            <div className={styles.founders}>
                <Image
                    src="/founders.svg"
                    alt="Founders of Oceanblu"
                    width={700}
                    height={700}
                    className={styles.foundersImage}
                    priority
                />
            </div>

            {/* Kanan - Video AutoPlay Looping */}
            <div className={styles.videoWrapper}>
                <div className={styles.videoOverlay}></div>

                <video
                    ref={videoRef}
                    className={styles.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                >
                    <source src="/videos/oceanblu.webm" type="video/webm" />
                    <source src="/videos/oceanblu.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    )
}