import { Role } from "../../authorization/entities/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  user: string;

  @Column({length: 100})
  name: string;

  @Column({length: 100})
  fatherLastName: string;

  @Column({length: 100, nullable: true })
  motherLastName?: string;

  @Column()
  email: string;

  @Column()
  password?: string;

  @Column({ default: false })
  forgotPassword?: boolean

  @Column({length: 30 , nullable: true })
  phone: string;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'roleId'})
  role: Role;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deletedAt',
    type: 'timestamp',
  })
  deletedAt: Date;
}
