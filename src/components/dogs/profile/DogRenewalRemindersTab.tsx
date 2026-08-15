import type { Dog } from "../../../types/dog";
import { useRenewalRemindersByDog } from "../../../hooks/useRenewalReminders";

import RenewalReminderList from "../renewals/RenewalReminderList";
import AddRenewalReminderDialog from "../renewals/AddRenewalReminderDialog";

interface DogRenewalRemindersTabProps {
  dog: Dog;
}

export default function DogRenewalRemindersTab({
  dog,
}: DogRenewalRemindersTabProps) {
  const { data: reminders = [], isLoading } = useRenewalRemindersByDog(dog.id);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddRenewalReminderDialog dogId={dog.id} />
      </div>

      <RenewalReminderList reminders={reminders} isLoading={isLoading} />
    </div>
  );
}
