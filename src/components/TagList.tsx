
function TagList({ onTagClick }: { onTagClick: (tagValue: string) => void }) {
  const tags = [
    "list pendding tasks.",
    "list tasks of next five days.",
    "yes",
    "no",
  ];

  return (
    <div className="text-xs text-gray-600 flex flex-wrap gap-2">
      {tags &&
        tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => onTagClick(tag)}
            className="bg-gray-200 px-1.5 rounded-full cursor-pointer"
          >
            {tag}
          </button>
        ))}
    </div>
  );
}

export default TagList;
