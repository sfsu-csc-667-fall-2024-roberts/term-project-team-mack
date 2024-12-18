import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("games");
    pgm.dropTable("GamePlayers");
    pgm.dropTable("GameState");

    pgm.createTable("gameplayers", {
        id: "id",
        game_id: {
            type: "integer",
            references: "games(id)",
            onDelete: "CASCADE"
        },
        user_id: {
            type: "integer",
            references: "users(id)",
            onDelete: "CASCADE"
        },
        role: {
            type: "varchar(10)",
            notNull: true
        },
        team: {
            type: "varchar(5)",
            notNull: true
        },
        joined_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        }
    });

    pgm.createTable("gamestate", {
        id: "id",
        game_id: {
            type: "integer",
            references: "games(id)",
            onDelete: "CASCADE"
        },
        user_id: {
            type: "integer",
            references: "users(id)",
            onDelete: "CASCADE"
        },
        role: {
            type: "varchar(10)",
            notNull: true
        },
        team: {
            type: "varchar(5)",
            notNull: true
        },
        joined_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        }
    });

    pgm.createTable("games", {
        id: "id",
        created_by: {
            type: "integer",
            references: "users(id)",
            notNull: true
        },
        created_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        },
        updated_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        }
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("games");
    pgm.dropTable("gamestate");
    pgm.dropTable("gameplayers");
    pgm.createTable("GamePlayers", {
        id: "id",
        game_id: {
            type: "integer",
            references: "games(id)",
            onDelete: "CASCADE"
        },
        user_id: {
            type: "integer",
            references: "users(id)",
            onDelete: "CASCADE"
        },
        role: {
            type: "varchar(10)",
            notNull: true
        },
        team: {
            type: "varchar(5)",
            notNull: true
        },
        joined_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        }
    });
    pgm.createTable("GameState", {
        id: "id",
        game_id: {
            type: "integer",
            references: "games(id)",
            onDelete: "CASCADE"
        },
        grid: {
            type: "jsonb",
            notNull: true
        },
        current_turn: {
            type: "varchar(5)",
            notNull: true
        },
        created_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        },
        updated_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        }
    });
    pgm.createTable("games", {
        id: "id",
        created_by: {
            type: "integer",
            references: "users(id)",
            notNull: true
        },
        created_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        },
        updated_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        }
    });
}
