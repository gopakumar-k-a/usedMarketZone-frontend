import AllPosts from "@/components/post/AllPosts";
import SuggestedUsers from "@/components/user/SuggestedUsers";
function HomePage() {
  return (
    <div className="grid grid-cols-5 w-full h-full">
      <div className="col-span-5 md:col-span-3  w-full h-full ">
      
        <AllPosts />
      </div>
      <div className="hidden md:block md:col-span-2  md:w-full md:h-full ">
        <SuggestedUsers />
      </div>

    </div>
  );
}

export default HomePage;
