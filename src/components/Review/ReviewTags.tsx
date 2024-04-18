export const ReviewTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="mt-3 flex lg:flex-wrap gap-2 w-full overflow-x-auto whitespace-nowrap">
      {tags.map((tag, i) => (
        <div
          className="px-3 lg:px-4 py-1.5 lg:py-2 text-sm lg:text-base bg-gray-300 rounded-full"
          key={i}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};
