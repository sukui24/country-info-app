import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateUserAndCalendarEvent_1_0_0_1744910802417
  implements MigrationInterface
{
  name = "CreateUserAndCalendarEvent_1_0_0_1744910802417";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "calendar_event",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user",
            type: "integer",
          },
          {
            name: "title",
            type: "varchar",
            length: "255",
          },
          {
            name: "event_date",
            type: "timestamp",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    // Add foreign key constraint
    await queryRunner.createForeignKey(
      "calendar_event",
      new TableForeignKey({
        columnNames: ["user"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
    console.log("Migration for version 1.0.0 is done");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraint first
    const table = await queryRunner.getTable("calendar_event");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("user") !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("calendar_event", foreignKey);
    }

    await queryRunner.dropTable("calendar_event");
    await queryRunner.dropTable("user");
  }
}
