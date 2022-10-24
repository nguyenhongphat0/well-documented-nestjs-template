import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'admins',
})
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    default: true,
  })
  isActive: boolean;
}
