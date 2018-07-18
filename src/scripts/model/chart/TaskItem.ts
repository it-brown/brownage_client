export interface TaskItem  {
    /**
     * @description unique id for the each task. per project.
     * @example 1
     */
    id: number;

    /**
     * @description task information
     * @example 'some kind of task'
     */
    text: string;

    /**
     * @description start date of the task
     * @example '2018/7/12'
     */
    start_date: string;

    /**
     * @description planned period of the task. start_date included.
     * @example 3
     */
    duration: number;

    /**
     * @description range of 0 to 1
     * @example 0
     */
    progress: number;
}

export interface TaskItems {
    tasks: TaskItem[];
}
