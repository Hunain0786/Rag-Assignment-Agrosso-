export default function Sources({ sources }: any) {
  if (!sources) return null;

  return (
    <div className="mt-4 sm:mt-6">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black">Sources</h3>
      <div className="space-y-3 sm:space-y-4">
        {sources.map((s: any, i: number) => (
          <div key={i} className="p-3 sm:p-4 bg-gray-50 border-2 border-gray-300 rounded-lg">
            <strong className="text-black block mb-2 text-sm sm:text-base">{s.document}</strong>
            <p className="text-gray-700 text-xs sm:text-sm">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

