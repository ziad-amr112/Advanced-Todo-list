import {SignUp} from '@clerk/nextjs';


export default function Page() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 rounded-lg">
          <SignUp/>
        </div>
      </div>
    );
  }
  