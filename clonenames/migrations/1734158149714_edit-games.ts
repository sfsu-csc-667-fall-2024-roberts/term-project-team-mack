import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.dropColumn("games", ["status", "name"]);
    
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumns("games", {
        name: {
            type: "varchar(255)",
            notNull: true,
        },
        status: {
            type: "varchar(15)",
            notNull: true,
        }
    })
}
