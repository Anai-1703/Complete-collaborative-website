import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "./use-current-user.js";
import { useEffect } from "react";

/**
 * Redirects the user to the given path if they are logged in.
 */
export function useRequireAnon(path = "/") {
    const navigate = useNavigate();
    const currentUser = useCurrentUser();
    useEffect(() => {
        if (currentUser) {
            navigate(path);
        }
    }, [currentUser, navigate, path]);
}
