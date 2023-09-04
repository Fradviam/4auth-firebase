import { Role } from "../../authorization/entities/role.entity";
import { User } from "../../users/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm"
import * as bcrypt from 'bcrypt';
import { plainToClass } from "class-transformer";
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class InsertAdminUser1692757478607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const roleRepo = await queryRunner.manager.getRepository(Role);
      const userRepo = await queryRunner.manager.getRepository(User);

      const roleAdmin = await roleRepo.findOneBy({ name: 'Administrador' });

      const newUser = {
          user: 'admin',
          name: 'Administrador',
          fatherLastName: 'Administrador',
          motherLastName: 'Administrador',
          email: 'admin@trebool.com.mx',
          password: await bcrypt.hash('admin1234', 10),
          forgotPassword: false,
          phone: '33 3333 3333',
          role: roleAdmin,
        }

        const objUser = plainToClass(CreateUserDto, newUser);
        userRepo.save(objUser);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager.delete(User, { user: "admin" })
    }

}
