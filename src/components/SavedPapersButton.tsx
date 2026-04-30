import { Bookmark } from 'lucide-react';

interface SavedPapersButtonProps {
  onClick: () => void;
  count: number;
  isActive?: boolean;
}

export function SavedPapersButton({ onClick, count, isActive }: SavedPapersButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 left-6 z-30 bg-gradient-to-br from-purple-900/80 to-purple-600/60 backdrop-blur-md border-2 px-5 py-3 rounded-2xl shadow-2xl transition-all duration-300 group flex items-center gap-3 ${
        isActive 
          ? 'border-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.8)] scale-105' 
          : 'border-purple-400/40 hover:border-purple-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105'
      }`}
      title="View Saved Papers & Associations"
    >
      <Bookmark className={`w-6 h-6 transition-all duration-300 ${
        isActive ? 'text-purple-100 fill-purple-200' : 'text-purple-200 group-hover:text-purple-100 group-hover:fill-purple-200'
      }`} />
      <div className="flex flex-col items-start">
        <span className={`text-sm transition-colors ${
          isActive ? 'text-purple-100' : 'text-purple-200 group-hover:text-purple-100'
        }`}>
          Saved Research
        </span>
        {count > 0 && (
          <span className="text-xs text-purple-300/80">
            {count} item{count !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      {count > 0 && (
        <div className="absolute -top-2 -right-2 min-w-[28px] h-7 px-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-purple-900 animate-pulse">
          <span className="text-xs font-bold">{count}</span>
        </div>
      )}
    </button>
  );
}