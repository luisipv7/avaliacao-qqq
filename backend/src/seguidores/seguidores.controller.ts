import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateSeguidoreDto } from './dto/update-seguidore.dto';
import { SeguidoresService } from './seguidores.service';

@Controller('api/v1/seguidores')
export class SeguidoresController {
  constructor(private readonly seguidoresService: SeguidoresService) {}

  @UseGuards(JwtAuthGuard)
  @Put('/seguir/:id_usuario')
  seguir(
    @Param('id_usuario') id_usuario: string,
    @Body() updateSeguidoreDto: UpdateSeguidoreDto,
  ) {
    return this.seguidoresService.seguir(+id_usuario, updateSeguidoreDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('deixar_de_seguir/:id_usuario')
  deixar_de_seguir(
    @Param('id_usuario') id_usuario: string,
    @Body() updateSeguidoreDto: UpdateSeguidoreDto,
  ) {
    return this.seguidoresService.deixar_de_seguir(
      +id_usuario,
      updateSeguidoreDto,
    );
  }

  @Get()
  findAll() {
    return this.seguidoresService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id_usuario')
  findOne(@Param('id_usuario') id_usuario: number) {
    return this.seguidoresService.findOne(+id_usuario);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguidoresService.remove(+id);
  }
}
