import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { RecordsModule } from './records/records.module';
import { routes } from './routes';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    RecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
