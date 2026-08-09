// src/components/dogs/form/DogMediaSection.tsx

import type { Dispatch, SetStateAction } from "react";

import DogPhotoUpload from "../DogPhotoUpload";

import type { DogFormData } from "./types";

interface Props {
  value: DogFormData;
  onChange: Dispatch<SetStateAction<DogFormData>>;
}

export default function DogMediaSection({ value, onChange }: Props) {
  function handlePhotoChange(profilePhoto: string) {
    onChange((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        profilePhoto,
      },
    }));
  }

  return (
    <section className="space-y-6 rounded-xl border p-6">
      <div>
        <h2 className="text-xl font-semibold">📷 Médias</h2>

        <p className="text-sm text-muted-foreground">
          Photo principale du chien.
        </p>
      </div>

      <DogPhotoUpload
        value={value.media.profilePhoto ?? ""}
        onChange={handlePhotoChange}
      />
    </section>
  );
}
