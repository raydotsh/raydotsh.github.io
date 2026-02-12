const projects = [
  { name: "Pycaster", video: "/pycaster.mp4", desc: "Python podcast automation tool" },
  { name: "NotToSQL", video: "/nottosql.mp4", desc: "SQL → NoSQL converter" },
  { name: "PyShell", video: "/pyshell.mp4", desc: "Interactive Python shell UI" }
]

export default function Projects() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl text-center text-aqua mb-12">Projects</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map(p => (
          <div key={p.name} className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-purple-300/20 hover:scale-105 transition">
            <video src={p.video} autoPlay loop muted className="rounded-xl mb-4" />
            <h3 className="text-xl text-pink-300">{p.name}</h3>
            <p className="text-sm text-gray-300">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
