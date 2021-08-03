import { DeepPartial } from "./deep-partial";

export interface Repository<T> {
	find(options: any): Promise<T[]>;

	findOneOrFail(id: string | number): Promise<T>;

	findOne(cond: any): Promise<T>;

	create(model: DeepPartial<T>): T;

	save(model: T): Promise<T>;

	bulkSave(models: DeepPartial<T[]>): Promise<T[]>;

	delete(id: string): Promise<T>;

	deleteAll(options: any): Promise<T[]>;
}
