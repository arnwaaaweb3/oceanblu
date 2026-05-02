// app/components/hero5.tsx
import styles from '@/styles/hero/Hero5.module.css'
import Image from 'next/image'
import JoinButton from '@/components/JoinButton'   // ← Import JoinButton

const Hero5 = () => {
  return (
    <div className={styles.heroContainer}>
      {/* Wrapper buat atur padding/margin nanti */}
      <div className={styles.wrapper}>
        
        {/* Video Background */}
        <video 
          className={styles.videoBackground}
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source 
            src="/videos/oceanblu2.webm"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay */}
        <div className={styles.darkOverlay} />
        
        {/* Overlay untuk dark/light mode effect */}
        <div className={styles.overlay} />
        
        {/* Background SVG */}
        <div className={styles.svgBackground}>
          <Image
            src="/bground-light.svg"
            alt="Background pattern"
            fill
            className={styles.svgLight}
            priority
            draggable={false}
          />
          <Image
            src="/bground-dark.svg"
            alt="Background pattern"
            fill
            className={styles.svgDark}
            priority
            draggable={false}
          />
        </div>
        
        {/* Content */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            Learn how to contribute to our journey, our ocean, and our community!
          </h1>
          <p className={styles.subtitle}>
            Be our #OceanPatriots and help us protect our oceans!
          </p>
        </div>

        {/* Join Button - Dipasang di sini */}
        <JoinButton />

      </div>
    </div>
  )
}

export default Hero5