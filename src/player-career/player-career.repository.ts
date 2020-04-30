import { EntityRepository, Repository } from 'typeorm';
import { PlayerCareerEntity } from './player-career.entity';

@EntityRepository(PlayerCareerEntity)
export class PlayerCareerRepository extends Repository<PlayerCareerEntity> {
    public async findForPlayer(playerId: number): Promise<PlayerCareerEntity[]> {
        return this.createQueryBuilder('PlayerCareer')
            .where({ playerId: playerId })
            .leftJoinAndSelect('PlayerCareer.player', 'player')
            .leftJoinAndSelect('PlayerCareer.team', 'team')
            .getMany();
    }

    public async isExist(playerId: number): Promise<boolean> {
        const n: number = await this.createQueryBuilder()
            .where({ playerId: playerId })
            .getCount();
        return n > 0;
    }
}
