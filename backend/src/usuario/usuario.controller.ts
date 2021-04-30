import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('api/v1/usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create (@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll (): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @UsePipes(ValidationPipe)
  findOne (@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  update (
    @Param('id') id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  remove (@Param('id') id: number): Promise<boolean> {
    return this.usuarioService.remove(+id);
  }
}
