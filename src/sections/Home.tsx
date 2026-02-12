import { motion } from "framer-motion"

export default function Home() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      
      <video autoPlay loop muted className="absolute w-full h-full object-cover opacity-40">
        <source src="/anime-bg.mp4" type="video/mp4" />
      </video>

      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="z-10 backdrop-blur-md bg-white/10 p-10 rounded-3xl border border-pink-300/30"
      >
        <h1 className="text-5xl font-bold text-pink-300">Rehana Rahman</h1>
        <p className="mt-4 text-lg text-purple-200">
          Web × Cloud × Creative Tech
        </p>
        <a href="https://github.com/raydotsh" className="mt-6 inline-block bg-pink-400 px-6 py-2 rounded-full hover:bg-pink-300 transition">
          View GitHub
        </a>
      </motion.div>
    </section>
  )
}
