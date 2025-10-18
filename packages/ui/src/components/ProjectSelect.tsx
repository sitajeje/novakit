import React from "react";
import { Select, type Option } from "./Select/Select";

export type Project = { id: string; name: string };

type ProjectSelectProps = {
    projects: Project[];
    selectedProject: string | null;
    onChange: (projectId: string) => void;
};

export default function ProjectSelect({ projects, selectedProject, onChange }:ProjectSelectProps){
    const options: Option[] = projects.map(p => ({ label: p.name, value: p.id }));
    return <Select options={options} value={selectedProject} onValueChange={onChange} label="Projects:" />;
};

