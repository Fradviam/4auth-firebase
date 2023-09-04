import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullbleToRouteOnPermissionTable1692763596444 implements MigrationInterface {
    name = 'AddNullbleToRouteOnPermissionTable1692763596444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "route" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "route" SET NOT NULL`);
    }

}
