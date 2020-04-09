export interface IRepository<T> {
  findAll(): T[];
  findById(id: string): T;
  create(): T;
  deleteById(id: string): T;
  updateById(id: string): T;
}