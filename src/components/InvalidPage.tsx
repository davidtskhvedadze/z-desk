

import Image from "next/image";
import UnAuthorizedLogo from "../../public/unauthorized-user-access-svgrepo-com.svg"

export function InvalidPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image className="mx-auto" src={UnAuthorizedLogo} alt="Workflow" width={60} height={60}/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Access Denied
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
          Please sign in as an admin to view this page.
          </p>
        </div>
      </div>
    </div>
  );
}