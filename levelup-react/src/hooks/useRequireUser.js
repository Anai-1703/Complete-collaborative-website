import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "./use-current-user.js";

/**
 * Redirects the user to the given path if they are NOT logged in.
 */
export function useRequireUser(path = "/login") {
    const navigate = useNavigate();
    const currentUser = useCurrentUser();
    useEffect(() => {
        if (!currentUser) {
            navigate(path);
        }
    }, [currentUser, navigate, path]);
}
