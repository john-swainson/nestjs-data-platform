import { Routes } from 'nest-router';
import { RecordsModule } from './records/records.module';

export const routes: Routes = [
  {
    path: '/records',
    module: RecordsModule,
  },
];
