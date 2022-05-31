import { State } from './State';
import { Project } from './Project';
import { ProjectStatus } from '../enums/ProjectStatus';

export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
     }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }

        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);

        this.projects.push(newProject);

        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

    moveProject(id: string,newStatus: ProjectStatus) {
        var project = this.projects.find(prj => prj.id === id);

        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();