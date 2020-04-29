import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../shared/base.entity';
import { PlayerEntity } from '../players/player.entity';
import { TeamEntity } from '../teams/team.entity';

@Entity({ name: 'PlayerCareer' })
export class PlayerCareerEntity extends Base {
    @Column()
    playerId: number;

    @Column()
    teamId!: number;

    @Column()
    dateFrom!: Date;

    @Column()
    dateTo!: Date;

    // relations
    @ManyToOne(
        type => PlayerEntity,
        player => player.playerCareer,
        {
            onDelete: 'CASCADE',
        },
    )
    player: PlayerEntity;

    @ManyToOne(
        type => TeamEntity,
        team => team.playerCareer,
        {
            onDelete: 'CASCADE',
        },
    )
    team: TeamEntity;
}
