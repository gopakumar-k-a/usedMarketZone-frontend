import Countdown from 'react-countdown';

interface RendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

interface BidEndTimerProps {
  endDate: string;
}

const BidEndTimer = ({ endDate }: BidEndTimerProps) => {
  const renderer = ({ days, hours, minutes, seconds, completed }: RendererProps) => {
    if (completed) {
      return <span>Bid has ended</span>;
    } else {
      return (
        <div className="text-black dark:text-white pb-2">
          <div className="text-green-500">End Date: {endDate}</div>
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

export default BidEndTimer;
