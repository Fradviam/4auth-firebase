import { Role } from "../../authorization/entities/role.entity";
import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertAdminRole1692757395820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const user = await queryRunner.manager.save(
        queryRunner.manager.create<Role>(Role, {
          name: 'Administrador',
          description: 'Rol con acceso total al sistema',
          isAdmin: true,
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
