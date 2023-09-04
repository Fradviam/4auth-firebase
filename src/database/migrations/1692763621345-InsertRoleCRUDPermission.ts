import { plainToClass } from "class-transformer";
import { Permission } from "../../authorization/entities/permission.entity";
import { MigrationInterface, QueryRunner } from "typeorm"
import { CreatePermissionDto } from "../../authorization/dto/create-permission.dto";

export class InsertRoleCRUDPermission1692763621345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const permissionRepo = await queryRunner.manager.getRepository(Permission);
      const objSystemMenu = plainToClass(CreatePermissionDto, {
        menuOptionLabel: 'Sistema',
        menuModuleLabel: 'Mostrar menú principal Sistema',
      });

      await permissionRepo.save(objSystemMenu);
      const systemMenu = await permissionRepo.findOneBy({ menuOptionLabel: 'Sistema' });


      const objFindAll = plainToClass(CreatePermissionDto, {
        menuOptionLabel: 'Roles',
        menuModuleLabel: 'Mostrar submenú Roles',
        route: 'roles',
        permission: systemMenu
      });
      await permissionRepo.save(objFindAll);


      const objFindOne = plainToClass(CreatePermissionDto, {
        menuModuleLabel: 'Mostrar un rol',
        route: 'roles/{id}',
        permission: systemMenu
      })
      await permissionRepo.save(objFindOne);


      const objCreate = plainToClass(CreatePermissionDto, {
        menuModuleLabel: 'Crear un rol',
        route: 'roles',
        permission: systemMenu
      })
      await permissionRepo.save(objCreate);

      const objUpdate = plainToClass(CreatePermissionDto, {
        menuModuleLabel: 'Actualizar un rol',
        route: 'roles/{id}',
        permission: systemMenu
      })
      await permissionRepo.save(objUpdate);

      const objDelete = plainToClass(CreatePermissionDto, {
        menuModuleLabel: 'Eliminar un rol',
        route: 'roles/{id}',
        permission: systemMenu
      })
      await permissionRepo.save(objDelete);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager.delete(Permission, { menuModuleLabel: "Eliminar un rol" })
      await queryRunner.manager.delete(Permission, { menuModuleLabel: "Actualizar un rol" })
      await queryRunner.manager.delete(Permission, { menuModuleLabel: "Crear un rol" })
      await queryRunner.manager.delete(Permission, { menuModuleLabel: "Mostrar un rol" })
      await queryRunner.manager.delete(Permission, { menuModuleLabel: "Mostrar submenú Roles" })
      await queryRunner.manager.delete(Permission, { menuModuleLabel: "Mostrar menú principal Sistema" })
    }

}
