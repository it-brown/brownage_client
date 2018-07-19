import { TaskItem } from '@/scripts/model/chart/TaskItem';

export interface ProjectSchedule {
    id: number;
    name: string;
    tasks: TaskItem[];
}
