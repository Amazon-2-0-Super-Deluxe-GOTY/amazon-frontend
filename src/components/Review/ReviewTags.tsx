import type { ReviewTag } from "@/api/review";

export const ReviewTags = ({ tags }: { tags: ReviewTag[] }) => {
  return (
    <div className="mt-3 flex lg:flex-wrap gap-2 w-full overflow-x-auto whitespace-nowrap">
      {tags.map((tag, i) => (
        <div
          className="py-2 px-5 text-sm lg:text-base bg-tertiary-hover rounded-sm"
          key={i}
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
};
