
function TagList({ onTagClick }: { onTagClick: (tagValue: string) => void }) {
  const tags = [
    "list pendding todos.",
    "list todos of next five days.",
    // "yes",
    // "no",
  ];

  return (
    <div className="text-xs text-gray-600 flex content-start flex-wrap gap-2">
      {tags &&
        tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => onTagClick(tag)}
            className="bg-gray-200 px-2 py-0.5 rounded-full cursor-pointer"
          >
            {tag}
          </button>
        ))}
    </div>
  );
}

export default TagList;
