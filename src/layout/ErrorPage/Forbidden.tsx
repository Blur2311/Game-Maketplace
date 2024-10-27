import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <>
      <main className="flex items-center justify-center min-h-full px-6 py-24 bg-bgMainColor sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-mainYellow">403</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white text-balance sm:text-7xl">
            Access Denied
          </h1>
          <p className="mt-6 text-lg font-medium text-white text-pretty sm:text-xl/8">
            Sorry, you do not have permission to access this page. Retry login.
          </p>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-mainYellow px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-mainYellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainYellow"
            >
              Go back home
            </Link>
            <Link
              to="/sign-in"
              className="rounded-md bg-mainYellow px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-mainYellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainYellow"
            >
              Go login <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}