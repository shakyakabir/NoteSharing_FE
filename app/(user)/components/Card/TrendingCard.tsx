import { Eye, Heart } from "lucide-react";
export interface TrendingCardProps {
  image: string;
  tag: string;
  title: string;
  views: string;
  likes: string;
}
export default function TrendingCard({
  image,
  tag,
  title,
  views,
  likes,
}: TrendingCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-gray-100 mb-3">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-gray-600 shadow-sm">
          {tag}
        </span>
      </div>
      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
        {title}
      </h4>
      <div className="flex items-center space-x-4 mt-1.5 text-xs text-gray-400">
        <span className="flex items-center space-x-1">
          <Eye size={12} />
          <span>{views}</span>
        </span>
        <span className="flex items-center space-x-1">
          <Heart size={12} />
          <span>{likes}</span>
        </span>
      </div>
    </div>
  );
}
