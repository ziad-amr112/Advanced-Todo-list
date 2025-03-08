"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  onPageChange: (page: number) => void;
}

export function SearchParamsProvider({ onPageChange }: Props) {
  const searchParams = useSearchParams();
  const [pageFromUrl, setPageFromUrl] = useState<number>(1); 

  useEffect(() => {
    const page = searchParams.get("page");
    setPageFromUrl(page ? Number(page) : 1); 
  }, [searchParams]);

  useEffect(() => {
    onPageChange(pageFromUrl);
  }, [pageFromUrl, onPageChange]);

  return null;
}
