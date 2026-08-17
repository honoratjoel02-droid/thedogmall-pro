import type { Dog } from "../../../types/dog";
import { useFeedingLogsByDog } from "../../../hooks/useFeedingLogs";

import CurrentDietSummary from "../feeding/CurrentDietSummary";
import FeedingLogList from "../feeding/FeedingLogList";
import AddFeedingLogDialog from "../feeding/AddFeedingLogDialog";

interface DogFeedingTabProps {
  dog: Dog;
}

export default function DogFeedingTab({ dog }: DogFeedingTabProps) {
  const { data: logs = [], isLoading } = useFeedingLogsByDog(dog.id);

  return (
    <div className="space-y-4">
      <CurrentDietSummary logs={logs} />

      <div className="flex justify-end">
        <AddFeedingLogDialog dogId={dog.id} />
      </div>

      <FeedingLogList logs={logs} isLoading={isLoading} />
    </div>
  );
}
