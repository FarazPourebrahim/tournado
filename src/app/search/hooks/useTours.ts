import { useContext, useMemo, useState } from "react";
import { FiltersContext } from "@/app/search/providers/filters/filters.provider";
import { mockTours } from "@/mocks/mockTours";

export function useTours(query: string) {
  const { filters } = useContext(FiltersContext);
  const [sortOption, setSortOption] = useState({
    label: "قیمت (کم به زیاد)",
    value: "price-asc",
  });

  const handleSortChange = (option: { value: string; label: string }) => {
    setSortOption(option);
  };

  const filteredMockTours = useMemo(() => {
    return mockTours.filter((item) => {
      const matchesQuery = query
        ? item.title.toLowerCase().includes(query.toLowerCase())
        : true;

      return (
        matchesQuery &&
        (filters.type === "All" || filters.type.includes(item.type.value)) &&
        item.price >= filters.min &&
        item.price <= filters.max &&
        (!filters.isGuideMandatory ||
          (filters.isGuideMandatory && item.guideAvailable)) &&
        item.duration >= filters.duration[0] &&
        item.duration <= filters.duration[1]
      );
    });
  }, [filters, query]);

  const sortedMockTours = useMemo(() => {
    return [...filteredMockTours].sort((a, b) => {
      switch (sortOption.value) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "duration-asc":
          return a.duration - b.duration;
        case "duration-desc":
          return b.duration - a.duration;
        default:
          return 0;
      }
    });
  }, [filteredMockTours, sortOption]);

  return {
    sortedMockTours,
    handleSortChange,
    sortOption,
  };
}
