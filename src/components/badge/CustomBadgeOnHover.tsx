

const CustomBadgeOnHover = ({ message }:{message:string}) => {
  return (
    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded-lg">
      {message}
    </div>
  );
};

export default CustomBadgeOnHover;
