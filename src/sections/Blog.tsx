export default function Blog() {
  return (
    <section className="py-20 px-6 bg-[#12111a]">
      <h2 className="text-4xl text-center text-purple-300 mb-12">Tech Blog</h2>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="bg-white/5 p-6 rounded-xl border border-pink-300/20">
          <h3 className="text-xl text-pink-300">How I Built Pycaster</h3>
          <p className="text-gray-300">Automation, audio pipelines, and Python magic.</p>
        </div>
      </div>
    </section>
  )
}
