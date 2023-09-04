import { plainToClass } from "class-transformer";
import { CreatePermissionDto } from "../../authorization/dto/create-permission.dto";
import { Permission } from "../../authorization/entities/permission.entity";
import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertUserCRUDPermission1692765399666 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const permissionRepo = queryRunner.manager.getRepository(Permission);
      const systemMenu = await permissionRepo.findOneBy({ menuOptionLabel: 'Sistema' });

      const objFindAll = plainToClass(CreatePermissionDto, {
        menuOptionLabel: 'Usuarios',
        menuModuleLabel: 'Mostrar submenú Usuarios',
        route: 'users',
        permission: systemMenu
      });
      await permissionRepo.save(objFindAll);


      const objFindOne = plainToClass(CreatePermissionDto, {
        menuModuleLabel: 'Mostrar un usuario',
        route: 'users/{id}',
        permission: systemMenu
      })
      await permissionRepo.save(objFindOne);


      const objCreate = plainToClass(CreatePermissionDto, {
        menuModuleLabel: 'Crear un usuario',
        route: 'users',
        permission: systemMenu
      })
      await permissionRepo.save(objCreate);

      const objUpdate = plainToClass(CreatePermissionDto, {
        menuModuleLabel: 'Actualizar un usuario',
        route: 'users/{id}',
        permission: systemMenu
      })
      await permissionRepo.save(objUpdate);

      const objDelete = plainToClass(CreatePermissionDto, {
        menuModuleLabel: 'Eliminar un usuario',
        route: 'users/{id}',
        permission: systemMenu
      })
      await permissionRepo.save(objDelete);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager.delete(Permission, { menuModuleLabel: "Eliminar un usuario" })
      await queryRunner.manager.delete(Permission, { menuModuleLabel: "Actualizar un usuario" })
      await queryRunner.manager.delete(Permission, { menuModuleLabel: "Crear un usuario" })
      await queryRunner.manager.delete(Permission, { menuModuleLabel: "Mostrar un usuario" })
      await queryRunner.manager.delete(Permission, { menuModuleLabel: "Mostrar submenú Usuario" })
    }

}
