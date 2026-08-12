import { useEffect, useState } from "react";

import { BACKUP_RECORDED_EVENT, getLastBackupAt } from "../lib/backup";

export function useLastBackupAt() {
  const [lastBackupAt, setLastBackupAt] = useState(() => getLastBackupAt());

  useEffect(() => {
    function handleBackupRecorded() {
      setLastBackupAt(getLastBackupAt());
    }

    window.addEventListener(BACKUP_RECORDED_EVENT, handleBackupRecorded);

    return () =>
      window.removeEventListener(BACKUP_RECORDED_EVENT, handleBackupRecorded);
  }, []);

  return lastBackupAt;
}
