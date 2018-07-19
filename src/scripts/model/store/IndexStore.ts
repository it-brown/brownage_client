import { Store } from 'vuex';
import { ProjectSchedule } from '@/scripts/model/chart/ProjectSchedule';

export interface IIndexStore {
    projectList: ProjectSchedule[]
}

export default class IndexStore extends Store<IIndexStore> {
    public constructor() {
        super({
            state: {
                projectList: []
            },
            mutations: {
                UPDATE_PROJECTS: (state, projectList: ProjectSchedule[]): void => {
                    state.projectList = projectList;
                }
            },
            actions: {
                changeProjectList: (context, projectList: ProjectSchedule[]): void => {
                    context.commit('UPDATE_PROJECTS', projectList);
                }
            }
        })
    }
}
