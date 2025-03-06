import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const priorities = ["HIGH", "MEDIUM", "LOW"] as const;

export default function PrioritySelector({ 
    onSelect, 
    selectedPriority
  }: { 
    onSelect: (priority: "HIGH" | "MEDIUM" | "LOW") => void;
    selectedPriority?: "HIGH" | "MEDIUM" | "LOW";
  }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedPriority || "Select Priority"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {priorities.map((priority) => (
          <DropdownMenuItem key={priority} onClick={() => onSelect(priority as "HIGH" | "MEDIUM" | "LOW")}>
            {priority}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
