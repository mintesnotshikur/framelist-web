export default function MovieCardSkeleton() {
  return (
    <div className="rounded-2xl p-3 bg-[#e0e0e0] shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] flex flex-col animate-pulse">
      <div className="bg-gray-300 rounded-xl mb-3 aspect-2/3 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/4"></div>
    </div>
  );
}
