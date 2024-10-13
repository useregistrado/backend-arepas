import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionGuard } from 'src/auth/permissions.guard';
import { CheckPermissions } from 'src/decorators/permissions.decorator';

@UseGuards(AuthGuard, PermissionGuard)
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  @CheckPermissions('POST', 'areas/')
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }

  @Get()
  @CheckPermissions('GET', 'areas/')
  findAll() {
    return this.areasService.findAll();
  }

  @Get('/:id')
  @CheckPermissions('GET', 'areas/:id')
  findOne(@Param('id') id: string) {
    return this.areasService.findOne(+id);
  }

  @Patch('/:id')
  @CheckPermissions('PATCH', 'areas/:id')
  update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areasService.update(+id, updateAreaDto);
  }

  @Delete('/:id')
  @CheckPermissions('DELETE', 'areas/:id')
  remove(@Param('id') id: string) {
    return this.areasService.remove(+id);
  }
}
