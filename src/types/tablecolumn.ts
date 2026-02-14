export interface TableColumn<T> {
  align?: "left" | "center" | "right";
  cssCustom?: string;
  render: (row: T) => React.ReactNode;
}