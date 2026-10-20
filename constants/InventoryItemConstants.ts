export const InventoryBadgeColors: Record<
  string,
  | "orange"
  | "green"
  | "blue"
  | "purple"
  | "yellow"
  | "slate"
  | "ghost"
  | "default"
  | "outline"
  | "secondary"
  | "destructive"
  | "link"
  | null
  | undefined
> = {
  PENDING_QC: "yellow",
  AVAILABLE: "green",
  RESERVED: "purple",
  IN_TRANSIT: "blue",
  DAMAGED_HOLD: "orange",
  REJECTED: "destructive",
  WRITTEN_OFF: "slate",
}