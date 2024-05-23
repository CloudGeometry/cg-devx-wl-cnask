import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './create_new_db';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class ScriptModule {}
