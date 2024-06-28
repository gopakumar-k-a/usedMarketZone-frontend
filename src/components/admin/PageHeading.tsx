

function PageHeading({ heading, Icon }) {
  return (
    <>
      <div className="w-full p-4 flex gap-2">
        <h1 className="text-2xl dark:white font-medium">{heading}</h1>
        <div className="inline-flex items-center justify-center p-2 text-2xl font-bold text-white bg-blue-500 rounded-lg">
        <Icon/>
        </div>
      </div>
    </>
  );
}

export default PageHeading;
