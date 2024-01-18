import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const error404 = () => {
    const location = useLocation();
    let role;
    const pathname = location.pathname;
    if (pathname) {
        if (pathname.startsWith("/doctor")) {
            role = "doctor";
        } else if (pathname.startsWith("/admin")) {
            role = "admin";
        } else if (pathname.startsWith("/")) {
            role = "user";
        }
    }
    const getHomeUrl = () => {
        // Return the home URL based on the role
        switch (role) {
            case "user":
                return "/";
            case "doctor":
                return "/doctor/dashboard";
            case "admin":
                return "/admin/dashboard";
            default:
                return "/";
        }
    };

    return (
        <div className="flex h-screen items-center justify-center p-5 w-full bg-gray-100">
            <div className="text-center">
                <div className="inline-flex rounded-full bg-blue-200 p-4">
                    <div className="rounded-full bg-white p-4">

                        <FontAwesomeIcon className="w-20 h-20 text-blue-500" icon={faTriangleExclamation} />
                    </div>
                </div>
                <h1 className="mt-5 text-4xl font-bold text-gray-800 lg:text-6xl">
                    404 - Page Not Found
                </h1>
                <p className="text-gray-600 mt-5 text-lg">
                    Something's missing.
                    <br />
                    Sorry, we can't find that page. You'll find lots to explore on the
                    home page.{" "}
                </p>
                <Link
                    to={getHomeUrl()}
                    className="mt-8 bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 inline-block"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default error404;
