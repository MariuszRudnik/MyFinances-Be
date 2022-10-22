import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

@Entity('users')
export class UserEntity {
  @ApiProperty({
    description: 'Primary key as User ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Mariusz'
  })
  @Column()
  first_name: string;

  @ApiProperty({
    description: 'User first last name',
    example: 'Json'
  })
  @Column()
  last_name: string;

  @ApiProperty({
    description: 'User email address',
    example:'jhon.doe@gmail.com'
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Hashed user password'
  })
  @Column()
  @Exclude()
  password: string;
}
