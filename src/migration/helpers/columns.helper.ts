import { TableColumn, TableColumnOptions } from "typeorm";

type TableColumnOverrides = Omit<TableColumnOptions, "name" | "type">;

/**
 * Cria coluna UUID padronizada
 */
export const uuidColumn = (
  name = "id",
  overrides: TableColumnOverrides = {}
): TableColumn => {
  const isPrimaryKey = name === "id";

  return new TableColumn({
    name,
    type: "uuid",
    isNullable: false,

    // espalhamento condicional SEM union
    ...(isPrimaryKey && {
      isPrimary: true,
      isGenerated: true,
      generationStrategy: "uuid",
      default: "gen_random_uuid()",
    }),

    ...overrides,
  });
};

/**
 * Coluna varchar padrão
 */
export const varcharColumn = (
  name: string,
  length = 100,
  options?: Partial<TableColumn>
): TableColumn =>
  new TableColumn({
    name,
    type: "varchar",
    length: length.toString(),
    isNullable: options?.isNullable ?? false,
    isUnique: options?.isUnique ?? false,
  });
