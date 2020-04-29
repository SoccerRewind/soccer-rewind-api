import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../shared/base.entity';
import { PlayerCareerEntity } from '../player-career/player-career.entity';

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

    // relations
    @OneToMany(
        type => PlayerCareerEntity,
        playerCareer => playerCareer.team,
    )
    playerCareer: PlayerCareerEntity[];
}
