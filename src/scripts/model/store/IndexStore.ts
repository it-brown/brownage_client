import { Store } from 'vuex';
import { ProjectSchedule } from '@/scripts/model/chart/ProjectSchedule';
import JSONUtil from '@/scripts/util/JSONUtil';

export interface IIndexStore {
    onEditProjectId: number | null;
    projectSchedule: ProjectSchedule[];
}

export default class IndexStore extends Store<IIndexStore> {
    public constructor() {
        super({
            state: {
                onEditProjectId: null,
                projectSchedule: []
            },
            mutations: {
                UPDATE_PROJECTS: (state, projectSchedule: ProjectSchedule[]): void => {
                    state.projectSchedule = projectSchedule;
                },
                UPDATE_PROJECT_ID: (state, onEditProjectId: number): void => {
                    state.onEditProjectId = onEditProjectId;
                },

            },
            actions: {
                changeProjectList: (context, projectSchedule: ProjectSchedule[]): void => {
                    context.commit('UPDATE_PROJECTS', projectSchedule);
                },
                changeProjectId: (context, onEditProjectId: number): void => {
                    context.commit('UPDATE_PROJECT_ID', onEditProjectId);
                },
                initializeStore: (context): void => {
                    if (localStorage.getItem('projectSchedule') && localStorage.getItem('onEditProjectId')) {
                        context.commit('UPDATE_PROJECTS', JSONUtil.tryParse(localStorage.getItem('projectSchedule')!));
                        context.commit('UPDATE_PROJECT_ID', JSONUtil.tryParse(localStorage.getItem('onEditProjectId')!));
                    }
                }
            },
            getters: {
                projectList: state => {
                    return state.projectSchedule;
                },
                getProjectById: state => {
                    return state.projectSchedule.find(state => state.id == this.state.onEditProjectId);
                }
            }
        })
    }
}
