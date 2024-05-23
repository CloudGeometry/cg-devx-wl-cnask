import { Injectable } from '@nestjs/common';
import { BadUserInputError } from '../common/exception/bad_user_input.error';
import { UpdateRoleInput } from './dto/update-role.input';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './models/role.model';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async getRoles(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }

  async addRole(data: CreateRoleInput): Promise<Role> {
    return await this.prisma.role.create({
      data: {
        ...data
      }
    });
  }

  async updateRole(id: string, data: UpdateRoleInput): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: { id }
    });

    if (!role) {
      throw new BadUserInputError(`No role found for id: ${id}`);
    }

    return await this.prisma.role.update({
      data: {
        ...data
      },
      where: { id }
    });
  }

  async deleteRole(id: string): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: { id }
    });

    if (!role) {
      throw new BadUserInputError(`No role found for id: ${id}`);
    }
    return await this.prisma.role.delete({ where: { id } });
  }
}
