export default function Interests() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl text-center text-aqua mb-12">Interests</h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <div>
          <h3 className="text-pink-300 text-2xl mb-4">Books</h3>
          <ul className="text-gray-300 space-y-2">
            <li>A thousand splendid suns</li>
            <li>The sectret history</li>
          </ul>
        </div>

        <div>
          <h3 className="text-purple-300 text-2xl mb-4">Anime</h3>
          <ul className="text-gray-300 space-y-2">
            <li>Jujutsu Kaisen</li>
            <li>One Punch Man</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
