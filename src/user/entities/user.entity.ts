import { Appreciation } from 'src/appreciation/entities/appreciation.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'int', default: 1 }) 
  role: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'refresh_token', nullable: true })
  refresh_token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  update_at: Date;

  @OneToOne(() => Appreciation, (appreciation) => appreciation.user)
  appreciation:Appreciation;
}