import React from "react";
import Globals from "../global/Globals";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../redux/actions";


const useDashboard = () => {
    const [noMoreData, setNoMoreData] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const page = React.useRef(1);
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users)


    React.useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async (isLoadMore) => {
        const response = await Globals.APIRequest({
            url : `${Globals.BaseUrl}/api/users?page=${page.current}`,
            method : "GET",
        })

        setIsLoading(false)

        if(response.data?.length > 0){
            const data = isLoadMore ? [...users, ...response.data] : response.data;
            dispatch(allUsers(data))

        }
        else{
            isLoadMore ? setNoMoreData(true) : null;
        }
    }

    const handleEndReached = () => {
        page.current = page.current + 1;
        getUsers(true)
    }

    return {
        users,
        noMoreData,
        handleEndReached,
        isLoading
    }

}

export default useDashboard;