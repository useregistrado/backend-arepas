import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}
  async create(createAreaDto: CreateAreaDto) {
    if (await this.findOneByName(createAreaDto.name)) {
      throw new ConflictException(
        `Ya existe el area con name ${createAreaDto.name}`,
      );
    }
    return this.areaRepository.save(createAreaDto);
  }

  findAll() {
    return this.areaRepository.findBy({ deleted_from_erp: false });
  }

  findOne(id: number) {
    return this.areaRepository.findOneBy({ id });
  }

  async findOneByName(name: string) {
    return this.areaRepository.findOneBy({ name });
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    const area = await this.areaRepository.findOneBy({ id });
    area.name = updateAreaDto.name;
    area.description = updateAreaDto.description;
    return this.areaRepository.save(area);
  }

  remove(id: number) {
    return this.areaRepository.save({
      id,
      deleted_from_erp: true,
    });
  }
}
