import { Column, Entity } from 'typeorm';
import { Base } from '../shared/base.entity';

@Entity({ name: 'Player' })
export class PlayerEntity extends Base {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    name: string;

    @Column()
    faceImg: string;

    @Column()
    country: string;
}
