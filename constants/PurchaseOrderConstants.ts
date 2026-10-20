export const POBadgeColors : Record<
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
    PENDING: 'destructive',
    PARTIALLY_COMPLETED: "orange",
    COMPLETED: "green",
    OVERDUE: "ghost"

}