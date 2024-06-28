import Countdown from 'react-countdown';

const BidEndTimer = ({ endDate }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Bid has ended</span>;
    } else {
      return (
        <div className="text-black dark:text-white pb-2">
          Time left:{" "}
          <span className="text-red-600 dark:text-red-400">
            {days > 0 && `${days}d `}{hours.toString().padStart(2, '0')}h {minutes.toString().padStart(2, '0')}m {seconds.toString().padStart(2, '0')}s
          </span>
        </div>
      );
    }
  };

  return <Countdown date={new Date(endDate)} renderer={renderer} />;
};

export default BidEndTimer