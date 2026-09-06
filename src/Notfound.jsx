import {useRouteError, Link} from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">
        Oops! Something went wrong 😢
      </h1>

      <p className="mt-2 text-gray-600">{error?.message || "Unknown error"}</p>

      <Link to="/" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Go Home
      </Link>
    </div>
  );
}

export default ErrorPage;
