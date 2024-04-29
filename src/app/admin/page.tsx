export default function Page() {
  return (
    <div className="grow flex flex-col lg:flex-row gap-4 lg:gap-6">
      <ul className="lg:basis-2/3">
        <li>Category</li>
      </ul>
      <aside className="lg:basis-1/3 grow bg-gray-100 rounded-lg"></aside>
    </div>
  );
}
