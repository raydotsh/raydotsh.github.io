import Navbar from "../components/Navbar"

export default function WhoAmI() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <h1>whoami</h1>

        <p>
          hey, i’m rehana &gt;.&lt; someone who writes code, breaks things,
          fixes them again, and sometimes blogs about it. currently upskilling
          and mass applying for jobs.
        </p>

        <p>
          <strong>interests:</strong> machine learning, web systems & infrastructure, computer history, minimal computing, games, reading.
        </p>

        <p>
          <strong>open to roles:</strong> systems engineering, backend engineering.
        </p>

        <p>
          <strong>areas i love working in:</strong> memory management, concurrency & parallelism, vectorization & SIMD, GPU programming, python internals, profiling & optimization.
        </p>
      </section>   {/* ← YOU FORGOT THIS CLOSING TAG */}

      {/* TIMELINE SECTION */}
      <section className="timeline-section">
        <h2>My Journey</h2>

        <div className="timeline-grid">
          <div className="timeline-year">
            <span>2004</span>
            <p>spawned into existence</p>
          </div>

          <div className="timeline-year">
            <span>2009</span>
            <p>tutorial arc (childhood)</p>
          </div>

          <div className="timeline-year">
            <span>2014</span>
            <p>crafting tools</p>
          </div>

          <div className="timeline-year">
            <span>2019</span>
            <p>creative mode</p>
          </div>

          <div className="timeline-year">
            <span>2024</span>
            <p>survival mode</p>
          </div>

          <div className="timeline-year highlight">
            <span>Currently</span>
            <p>stacking xp</p>
          </div>
        </div>
      </section>
    </>
  )
}
