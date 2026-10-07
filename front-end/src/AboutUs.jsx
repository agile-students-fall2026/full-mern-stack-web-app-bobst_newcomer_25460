import { useEffect, useState } from 'react'
import './AboutUs.css'

const AboutUs = () => {
  const [about, setAbout] = useState(null)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setError('')

    const loadAbout = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_HOSTNAME}/about-us`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('The About Us page could not be loaded.')
        }

        const content = await response.json()
        if (!controller.signal.aborted) setAbout(content)
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Unable to load this page. Please try again.')
        }
      }
    }

    loadAbout()
    return () => controller.abort()
  }, [attempt])

  if (error) {
    return (
      <div className="AboutUs-state">
        <p role="alert">{error}</p>
        <button type="button" onClick={() => setAttempt(value => value + 1)}>
          Try again
        </button>
      </div>
    )
  }

  if (!about) {
    return (
      <div className="AboutUs-state" role="status">
        Loading About Us...
      </div>
    )
  }

  return (
    <article className="AboutUs" aria-labelledby="about-title">
      <div className="AboutUs-copy">
        <p className="AboutUs-eyebrow">{about.eyebrow}</p>
        <h1 id="about-title">{about.title}</h1>
        <div className="AboutUs-biography">
          {about.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <figure className="AboutUs-portrait">
        <img src={about.imageUrl} alt={about.imageAlt} width="636" height="605" />
      </figure>
    </article>
  )
}

export default AboutUs
