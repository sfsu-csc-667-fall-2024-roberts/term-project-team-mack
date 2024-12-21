import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumn("gamestate", {
        keycard: {
            type: 'jsonb',
            notNull: false, 
            default: '{}'
        }
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropColumn('gamestate', 'keycard');
}
