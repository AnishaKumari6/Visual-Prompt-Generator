import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 px-8 md:px-20">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          About PromptLens
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          PromptLens is a visual-first AI prompt generation platform designed to make creativity structured,
          accessible, and powerful. Instead of writing long technical prompts manually, users can select
          visual styles and instantly generate optimized prompts tailored for modern AI systems.
        </p>

        <p className="text-gray-400 text-lg leading-relaxed mb-8">
          As AI tools become more advanced, the quality of input determines the quality of output.
          Crafting the perfect prompt is no longer optional — it’s essential. PromptLens simplifies
          this process by transforming visual inspiration into structured, high-quality prompts
          within seconds.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-16">

          <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-purple-500 transition">
            <h3 className="text-xl font-semibold mb-4">Visual Intelligence</h3>
            <p className="text-gray-400">
              Select styles, themes, and creative elements visually without complex syntax.
              Designed for creators, designers, and innovators.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold mb-4">Structured Output</h3>
            <p className="text-gray-400">
              Generates clean, structured prompts optimized for AI image and text generation platforms.
              No guesswork. Just precision.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-pink-500 transition">
            <h3 className="text-xl font-semibold mb-4">Creative Acceleration</h3>
            <p className="text-gray-400">
              Reduce trial and error. Focus on ideas instead of formatting. Build faster and create
              without friction.
            </p>
          </div>

        </div>

        <div className="mt-20 text-gray-500 text-center">
          <p>
            PromptLens is built with modern web technologies and a vision to bridge creativity and artificial intelligence.
          </p>
        </div>

      </motion.div>
    </div>
  );
}
