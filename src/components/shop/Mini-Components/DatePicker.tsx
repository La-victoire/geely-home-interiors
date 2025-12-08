import React, { useState } from "react";

export default function DateTimePicker({ onChange }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleUpdate = (d: string, t: string) => {
    if (!d || !t) return;

    // Combine into full JS Date object
    const iso = new Date(`${d}T${t}:00`).toISOString();

    onChange(iso); // Send valid ISO string upward
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="date"
        className="border p-2 rounded"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          handleUpdate(e.target.value, time);
        }}
      />

      <input
        type="time"
        className="border p-2 rounded"
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
          handleUpdate(date, e.target.value);
        }}
      />
    </div>
  );
}

