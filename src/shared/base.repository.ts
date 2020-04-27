import { Repository } from 'typeorm';

export class BaseRepository<E, C, U> extends Repository<E> {
    public async _findAll(): Promise<E[]> {
        return this.find();
    }

    public async _findById(id: number): Promise<E> {
        return this.createQueryBuilder()
            .where({ id })
            .getOne();
    }

    public async _create(createDTO: C): Promise<E> {
        const insertResult = await this.createQueryBuilder()
            .insert()
            .values(createDTO)
            .execute();
        return this._findById(insertResult.generatedMaps[0].id);
    }

    public async _update(id: number, updateDTO: U): Promise<E> {
        await this.createQueryBuilder()
            .update()
            .set(updateDTO)
            .where({ id })
            .execute();
        return this._findById(id);
    }

    public async _delete(id: number) {
        return this.createQueryBuilder()
            .softDelete()
            .where({ id })
            .execute();
    }
}
