export default function TrailerModal({ trailerKey, onClose }) {
  if (!trailerKey) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="relative bg-black rounded-xl overflow-hidden w-[90%] max-w-4xl shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl z-10 cursor-pointer bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition"
        >
          ✕
        </button>

        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Movie Trailer"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
