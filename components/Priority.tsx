"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const priorities = ["HIGH", "MEDIUM", "LOW"] as const;

export default function PrioritySelector({ 
    onSelect, 
    selectedPriority = "Select Priority" 
}: { 
    onSelect: (priority: "HIGH" | "MEDIUM" | "LOW") => void;
    selectedPriority?: "HIGH" | "MEDIUM" | "LOW" | "Select Priority";
}) {
    const [priority, setPriority] = useState<"HIGH" | "MEDIUM" | "LOW" | "Select Priority">(selectedPriority);

    useEffect(() => {
        setPriority(selectedPriority);
    }, [selectedPriority]);

    const handleSelectPriority = (priority: "HIGH" | "MEDIUM" | "LOW") => {
        setPriority(priority);
        onSelect(priority); 
    }

    const buttonText = priority;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {buttonText}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {priorities.map((priorityOption) => (
                    <DropdownMenuItem 
                        key={priorityOption} 
                        onClick={() => handleSelectPriority(priorityOption)}>
                        {priorityOption}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
