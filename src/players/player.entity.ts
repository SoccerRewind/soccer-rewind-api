import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../shared/base.entity';
import { PlayerCareerEntity } from '../player-career/player-career.entity';

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

    // relations
    @OneToMany(
        type => PlayerCareerEntity,
        playerCareer => playerCareer.player,
    )
    playerCareer: PlayerCareerEntity[];
}
