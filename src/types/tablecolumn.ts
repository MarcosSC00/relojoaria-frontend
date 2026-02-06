export interface TableColumn<T> {
  align?: "left" | "center" | "right";
  render: (row: T) => React.ReactNode;
}