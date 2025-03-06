"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function TaskFilter({ onFilter }: { onFilter: (filters: any) => void }) {
  const [priority, setPriority] = useState<"HIGH" | "MEDIUM" | "LOW" | null>(null);
  const [completed, setCompleted] = useState<boolean | null>(null);
  const [isApplyDisabled, setIsApplyDisabled] = useState(true);

  useEffect(() => {
    setIsApplyDisabled(priority === null && completed === null);
  }, [priority, completed]);

  const handleApply = () => {
    const filters = {
      priority: priority ?? null,
      completed: completed ?? null,
    };
    onFilter(filters);
  };

  return (
    <div className="w-fit self-start mt-4">
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-fit text-sm py-1">Filters</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2 border rounded-md mt-1 space-y-2 text-sm">
        <div>
          <label className="text-xs font-medium">Priority</label>
          <div className="flex gap-1 mt-1">
            {["HIGH", "MEDIUM", "LOW"].map((level) => (
              <Button
                key={level}
                variant={priority === level ? "default" : "outline"}
                className="px-2 py-1 text-xs"
                onClick={() => setPriority(priority === level ? null : level as "HIGH" | "MEDIUM" | "LOW")}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium">Status</label>
          <div className="flex gap-1 mt-1">
            <Button 
              variant={completed === true ? "default" : "outline"} 
              className="px-2 py-1 text-xs"
              onClick={() => setCompleted(completed === true ? null : true)}
            >
              Completed
            </Button>
            <Button 
              variant={completed === false ? "default" : "outline"} 
              className="px-2 py-1 text-xs"
              onClick={() => setCompleted(completed === false ? null : false)}
            >
              Not Completed
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleApply} 
            className="w-fit text-xs py-1"
            disabled={isApplyDisabled}
          >
            Apply
          </Button>

          <Button 
            onClick={() => { 
              setPriority(null); 
              setCompleted(null); 
              onFilter({ priority: null, completed: null }); 
            }} 
            variant="outline" 
            className="w-fit text-xs py-1"
          >
            Reset
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
    </div>
  );
}
