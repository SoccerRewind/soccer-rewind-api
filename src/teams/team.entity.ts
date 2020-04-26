import { Column, Entity } from 'typeorm';
import { Base } from '../shared/base.entity';

@Entity({ name: 'Team' })
export class TeamEntity extends Base {
    @Column()
    name!: string;

    @Column()
    shortName!: string;

    @Column()
    logoImg!: string;

    @Column()
    country!: string;
}
