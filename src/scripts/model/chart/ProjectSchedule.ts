import { TaskItem } from '@/scripts/model/chart/TaskItem';

export interface ProjectSchedule {
    id: number;
    projectName: string;
    tasks: TaskItem[]
}
