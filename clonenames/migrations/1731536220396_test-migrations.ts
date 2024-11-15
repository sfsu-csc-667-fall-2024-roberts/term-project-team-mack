import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("test", {
        id: "id",
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp")
        },
        test_string: {
            type: "varchar(255)",
            notNull: true
        }
    });
    
    pgm.createTable("users", {
        id: "id",
        email: {
            type: "varchar(255)",
            unique: true,
            notNull: true
        },
        username: {
            type: "varchar(255)",
            notNull: true
        },
        password: {
            type: "varchar(255)",
            notNull: true
        }
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
   pgm.dropTable("test");
   pgm.dropTable("users");
}
