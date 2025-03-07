"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
  onPageChange: (page: number) => void;
}

export default function SearchParamsProvider({ onPageChange }: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    onPageChange(pageFromUrl); 
  }, [searchParams, onPageChange]);

  return null;
}
