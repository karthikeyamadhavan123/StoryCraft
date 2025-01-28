import axios from "axios";
import { useEffect, useState } from "react";
interface Project {

    _id?: string;
    project_name?: string;
    content?: string;
    owner: string;


    // Add other optional properties here
}
const useProject = (url: string) => {
    const [project, setProject] = useState<Project>({

        _id: undefined,
        project_name: undefined,
        content: undefined,
        owner: '', // Default value for owner since it’s required

    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShopProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url, {
                    withCredentials: true
                });
            

                setProject(response.data.projects)

                // setShop(response.data.allShops); // assuming the data is in response.data
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };


        fetchShopProducts();
    }, [url]);

    return { project, loading, error, setProject };
};

export default useProject;