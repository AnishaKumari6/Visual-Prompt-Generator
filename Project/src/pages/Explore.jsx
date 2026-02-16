import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Explore() {
  const { token } = useAuth();
  const [subject, setSubject] = useState("");
  const [style, setStyle] = useState("Realistic");
  const [lighting, setLighting] = useState("Cinematic");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("promptHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("promptHistory", JSON.stringify(history));
  }, [history]);

  const generatePrompt = async () => {
    if (!subject.trim()) {
      setError("Please enter a subject.");
      return;
    }

    setError("");
    setLoading(true);
    setGeneratedImage("");

    const prompt = `
Ultra-detailed ${style} artwork of ${subject},
${lighting} lighting, high resolution,
professional composition, trending on ArtStation, 8k quality.
    `;

    try {
      const response = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image generation failed");
      }

      const newPrompt = {
        id: Date.now(),
        text: prompt,
        image: data.image,
      };

      setGeneratedPrompt(prompt);
      setGeneratedImage(data.image);
      setHistory((prev) => [newPrompt, ...prev]);

    } catch (err) {
      console.error(err);
      setError("Image generation failed. Check backend.");
    }

    setLoading(false);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    } catch (err) {
      console.error("Clipboard failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-24 px-4 md:px-8 relative overflow-hidden selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl">
          AI Prompt Builder
        </h1>
        <p className="mt-4 text-gray-400 text-lg md:text-xl font-light">
          Craft the perfect prompt for your next masterpiece
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-8 md:p-10 rounded-3xl shadow-2xl shadow-purple-500/10 relative z-10 transition-all duration-500 hover:border-white/[0.12]">

        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        {/* Subject */}
        {/* Subject */}
        <div className="mb-8 group">
          <label className="block mb-3 text-sm font-medium text-gray-400 uppercase tracking-wider group-focus-within:text-purple-400 transition-colors">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. futuristic city, warrior princess..."
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none text-lg text-white placeholder-gray-600 shadow-inner"
          />
        </div>

        {/* Style */}
        {/* Style */}
        <div className="mb-8">
          <label className="block mb-3 text-sm font-medium text-gray-400 uppercase tracking-wider">
            Style
          </label>
          <div className="flex flex-wrap gap-3">
            {["Realistic", "Cyberpunk", "Fantasy", "Anime", "Digital Art"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setStyle(item)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border border-transparent ${
                    style === item
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/10"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* Lighting */}
        <div className="mb-10">
          <label className="block mb-3 text-sm font-medium text-gray-400 uppercase tracking-wider">
            Lighting
          </label>
          <div className="relative">
            <select
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none appearance-none text-white cursor-pointer shadow-inner"
            >
              <option>Cinematic</option>
              <option>Soft Natural</option>
              <option>Neon Glow</option>
              <option>Dramatic Shadows</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePrompt}
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 transform shadow-xl ${
            loading
              ? "bg-gray-800 cursor-not-allowed opacity-50"
              : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-1 hover:scale-[1.01]"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Magic...
            </span>
          ) : (
            "Generate Prompt & Image"
          )}
        </button>

        {/* Output */}
        <AnimatePresence>
          {generatedPrompt && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-10 p-6 md:p-8 bg-black/60 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-3xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Generated Prompt
                </h3>
                <span className="text-xs font-mono text-gray-500 px-2 py-1 bg-white/5 rounded">
                  RAW
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[#0f0f0f] border border-white/5 font-mono text-sm text-gray-300 leading-relaxed shadow-inner">
                {generatedPrompt}
              </div>

              {generatedImage && (
                <div className="mt-8 group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img
                    src={generatedImage}
                    alt="Generated result"
                    className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 text-white text-sm font-medium">
                    generated-image.png
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <button
                  onClick={copyPrompt}
                  className="flex-1 py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-all duration-200 border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy Prompt
                </button>

                <button
                  onClick={() => {
                    setSubject("");
                    setGeneratedPrompt("");
                    setGeneratedImage("");
                  }}
                  className="px-6 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-200"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* History */}
        {history.length > 0 && (
        <div className="mt-20 max-w-4xl mx-auto relative z-10 pb-20">
          <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
            Previous Creations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {history.map((item) => (
              <div
                key={item.id}
                className="group p-5 bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-purple-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/5"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-xs font-mono text-purple-400/80 bg-purple-500/10 px-2 py-1 rounded">
                    PROMPT
                  </p>
                  <span className="text-xs text-gray-600">
                    {new Date(item.id).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 line-clamp-2 mb-4 group-hover:text-gray-300 transition-colors">
                  {item.text}
                </p>

                {item.image && (
                  <div className="rounded-xl overflow-hidden aspect-video relative">
                     <img
                      src={item.image}
                      alt="History result"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 right-8 bg-white text-black px-6 py-3 rounded-full shadow-lg"
          >
            Prompt copied successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
