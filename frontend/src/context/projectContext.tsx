import { createContext, useState, useEffect, ReactNode } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/api-path";

interface ProjectContextType {
  userProjects: { name: string }[]; 
  currentSelectedProject: string | null;
  setCurrentSelectedProject: (name: string | null) => void; 
}

const projectContextDefaultValue: ProjectContextType = {
  userProjects: [], 
  currentSelectedProject: null, 
  setCurrentSelectedProject: () => {}, 
};

export const ProjectContext = createContext<ProjectContextType>(projectContextDefaultValue);

interface ProjectProviderProps {
  children: ReactNode; 
}

const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [userProjects, setUserProjects] = useState<{ name: string }[]>([]); // User projects array
  const [currentSelectedProject, setCurrentSelectedProject] = useState<string | null>(null); // current selected project state

  useEffect(() => {
    console.log("sidebar useeffect");
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.PROJECTS.GET_ALL_PROJECT);
        console.log("Data", response.data);

        if (response.data.length) {
          let projectNames = response.data.map((project: any) => ({
            name: project.name,
          }));
          console.log({ projectNames });
          setUserProjects(projectNames);
        }
      } catch (error) {
        console.error("Error while fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        userProjects,
        currentSelectedProject,
        setCurrentSelectedProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
