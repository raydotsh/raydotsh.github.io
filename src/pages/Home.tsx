import Navbar from "../components/Navbar"
import ProjectCard from "../components/ProjectCard"

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <h1>Rehana Rahman</h1>
        <p>
          I'm a builder who learned the hard way, no fancy setup, no laptop, just curiosity, stubbornness and a terminal open on my phone.
        </p>
        <p>
          Most of what I make lives at the intersection of code, systems, and experimentation. Shells, tools, weird projects and things that probably started with "what if…".
        </p>
      </section>

      {/* PROJECTS 2x2 GRID */}
      <section className="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          <ProjectCard
            title="pyshell"
            description="terminal shell from scratch in python"
            github="https://github.com/raydotsh/pyshell"
            image="/images/pyshell.jpg"
          />

          <ProjectCard
            title="nottoSQL"
            description="sqlite from scratch in C"
            github="https://github.com/raydotsh/nottoSQL"
            image="/images/notto.jpg"
          />

          <ProjectCard
            title="pycaster"
            description="wolfenstein-style raycaster in python"
            github="https://github.com/raydotsh/pycaster"
            video="/videos/pycaster.mp4"
          />

          <ProjectCard
            title="pitsoferrors"
            description="mini number game in shell"
            github="https://github.com/raydotsh/PitsOfErrors"
            video="/videos/pitsoferrors.mp4"
          />
        </div>
      </section>

      {/* BLOG + POETRY MATCHING PROJECT CARD STYLE */}
      <section className="projects">
        <h2>Writing</h2>
        <div className="projects-grid">
          <a href="/blog" className="project-card">
            <h3>blogs</h3>
            <p>i mostly try to walk someone towards my my intuition, approach and random thoughts through my blogs. this link takes you to my medium page.</p>
            <span className="card-footer">my blogs</span>
          </a>

          <a
            href="https://raydotsh.bearblog.dev/blogs/"
            target="_blank"
            className="project-card"
          >
            <h3>poetry</h3>
            <p>i write poems as an escape from things i can't share or find difficulty in describing. the link below takes you to my bearblog.</p>
            <span className="card-footer">my poetries</span>
          </a>
        </div>
      </section>
    </>
  )
}
