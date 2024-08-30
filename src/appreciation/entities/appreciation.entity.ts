import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appreciation {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'int' })
  quality: number;

  @Column({ type: 'text' })
  Feedback: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    update_at: Date;


    @OneToOne(() => User, (user) => user.appreciation)
    @JoinColumn()
    user: User
}