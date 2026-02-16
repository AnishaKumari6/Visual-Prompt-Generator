import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = Array.from({ length: 102 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/400/500?random=${i + 1}`,
}));

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {images.map((img) => (
    <div key={img.id} className="overflow-hidden rounded-xl">
      <img
        src={img.url}
        alt="AI Style"
        className="w-full h-[350px] object-cover hover:scale-105 transition duration-300"
      />
    </div>
  ))}
</div>

export default function Gallery() {
  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  useEffect(() => {
    setGeneratedPrompt("");
  }, [selected]);
  const handleGenerate = async () => {
    console.log("Generate clicked");
    if (selected.length === 0) return;

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: selected }),
      });

      const data = await response.json();
      setGeneratedPrompt(data.prompt);
    } catch (error) {
      setGeneratedPrompt("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 py-20 bg-black text-white">
      <h2 className="text-4xl font-semibold mb-10">Explore Styles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            onClick={() => toggleSelect(img.id)}
            className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              selected.includes(img.id)
                ? "border-purple-500 scale-95"
                : "border-transparent hover:scale-105"
            }`}
          >
            <img
              src={img.url}
              alt="AI Style"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {selected.length > 0 && (
        <motion.div
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 bg-purple-600 px-6 py-3 rounded-full shadow-lg text-white font-medium cursor-pointer hover:bg-purple-700"
        >
          Continue ({selected.length})
        </motion.div>
      )}

      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#111] border-l border-gray-800 shadow-2xl p-8 z-50"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold">Prompt Studio</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-400 mb-4">
            Selected Images: {selected.length}
          </p>

          <div className="bg-black border border-gray-800 rounded-xl p-4 min-h-[150px] text-gray-400">
            {loading
              ? "Generating..."
              : generatedPrompt || "Your generated prompt will appear here..."}
          </div>

          <button
            onClick={handleGenerate}
            className="mt-6 w-full bg-purple-600 py-3 rounded-xl hover:bg-purple-700 transition"
          >
            Generate Prompt
          </button>
        </motion.div>
      )}
    </div>
  );
}
