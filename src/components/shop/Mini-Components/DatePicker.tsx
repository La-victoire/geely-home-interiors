"use client";

import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export function DateTimePicker({ value, onChange }: {value:string, onChange: any} ) {
  const [date, setDate] = React.useState<any>(
    value ? new Date(value) : null
  );

  const [time, setTime] = React.useState(
    value ? new Date(value).toISOString().slice(11, 16) : "12:00"
  );

  const [isoValue, setIsoValue] = React.useState(value || "");

  React.useEffect(() => {
    if (value) {
      const v = new Date(value);
      setDate(v);
      setTime(v.toISOString().slice(11, 16)); // "HH:MM"
      setIsoValue(value);
    }
  }, [value]);

  function updateIso(d:any, t:any) {
    if (!d || !t) return;

    const [h, m] = t.split(":").map(Number);

    const final = new Date(d);
    final.setHours(h);
    final.setMinutes(m);
    final.setSeconds(0);

    const iso = final.toISOString();

    setIsoValue(iso);
    onChange?.(iso);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!isoValue}
          className="data-[empty=true] w-[280px] text-left justify-start"
        >
          {isoValue
            ? new Date(isoValue).toLocaleString()
            : "Pick date & time"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-4 space-y-3">
        
        {/* DATE PICKER */}
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(d) => {
            setDate(d);
            updateIso(d, time);
          }}
        />

        {/* TIME PICKER */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium mr-2">Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              updateIso(date, e.target.value);
            }}
            className="border rounded px-2 py-1"
          />
        </div>

      </PopoverContent>
    </Popover>
  );
}
