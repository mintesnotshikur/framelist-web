export default function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 animate-fadeIn">
      <div className="bg-[#e0e0e0] p-8 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] text-center max-w-sm w-full animate-[modalPop_0.25s_ease-out]">
        {" "}
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Clear Watchlist?
        </h2>
        <p className="text-gray-600 mb-6">
          This will remove all movies from your watchlist.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-[#e0e0e0] shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] hover:scale-105 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
