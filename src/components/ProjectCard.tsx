interface Props {
  title: string
  description: string
  github: string
  image?: string
  video?: string
}

export default function ProjectCard({
  title,
  description,
  github,
  image,
  video,
}: Props) {
  return (
    <a href={github} target="_blank" className="project-card">

      <div className="project-media">
        {image && <img src={image} alt={title} />}
        {video && (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
      </div>

      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

    </a>
  )
}
