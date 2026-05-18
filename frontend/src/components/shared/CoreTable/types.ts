export interface ColumnConfig<T> {
  header: string;
  key: keyof T | string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface TableAction<T> {
  label: string;
  icon: React.ElementType;
  onClick: (item: T) => void;
  variant?: "default" | "destructive" | "primary";
  show?: (item: T) => boolean; // Condicional: Ej: Solo mostrar "Borrar" si active === true
}

export interface CoreTableProps<T> {
  title: string;
  service: {
    get: (params: any) => Promise<T[]>;
    delete?: (id: string) => Promise<any>;
    restore?: (id: string) => Promise<any>;
  };
  columns: ColumnConfig<T>[];
  actions?: TableAction<T>[];
  onViewDetails?: (item: T) => void; // El botón de "Ir a info" que pediste
  formComponent?: React.ComponentType<{ item?: any; onSuccess: () => void }>;
  entityName?: string;
  primaryActionLabel?: string; // Ej: "NUEVO FICHAJE", "CREAR TORNEO"
}