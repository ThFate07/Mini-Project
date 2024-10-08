import Link from "next/link";

function Home() {
  return (
    <div className="bg-amber-50">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold font-sans text-center pt-16 mb-2">
        Personal productivity hub
      </h1>
      <div className="text-lg lg:text-xl font-semibold font-sans text-center mb-10 px-10">
        A fast and flexible web-based todo list app. No account required.
      </div>
      <div className="flex flex-col items-center mb-14">
        <Link
          href="/app"
          className="px-6 py-4 w-max text-xl font-semibold text-center bg-yellow hover:brightness-90 transition rounded-xl"
        >
          Get Started
        </Link>

      </div>
      <img
        className="w-10/12 mx-auto rounded-xl mb-14 drop-shadow-md"
        alt="screenshot of Personal productivity hub web-based todo app"
        src="/assets/app.png"
      />

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
        <img
          src="/assets/todo.png"
          alt="screenshot of Personal productivity hub's todo creator"
          className="max-w-md w-2/3 rounded-lg drop-shadow-md"
        />
        <div>
          <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
            Todo Properties
          </h2>
          <p className="max-w-sm lg:w-96">
            Create todo with 4 properties: Name, Date, Priority and Tag. Press
            Enter to add it to list. Click the circle to mark it as done.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
        <div>
          <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
            Multiple Lists
          </h2>
          <p className="max-w-sm lg:w-96">
            Create multiple lists for different purposes: daily todo list,
            long-term goal list or even project feature list.
          </p>
        </div>
        <img
          src="/assets/list.png"
          alt="screenshot of Personal productivity hub's multiple list feature"
          className="max-w-[13em] w-2/3 rounded-lg order-first lg:order-last drop-shadow-md"
        />
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
        <img
          src="/assets/calendar.png"
          alt="screenshot of Personal productivity hub's calendar view feature"
          className="max-w-[17em] w-2/3 rounded-lg drop-shadow-md"
        />
        <div>
          <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
            Calendar View
          </h2>
          <p className="max-w-sm lg:w-96">
            View your todos with calendar. The date with todos is highlighted.
            Click on each date to only show the todos on that day.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
        <div>
          <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">Sorter</h2>
          <p className="max-w-sm lg:w-96">
            Sort your todos with the 4 properties. You can also use it under
            calendar view.
          </p>
        </div>
        <img
          src="/assets/sort.png"
          alt="screenshot of Personal productivity hub's sorter feature"
          className="max-w-[8em] w-2/3 rounded-lg order-first lg:order-last drop-shadow-md"
        />
      </div>

      <p className="text-3xl font-bold text-center mt-20 mx-10 pb-1">
        You can access all these features without creating an account!
      </p>
      <p className="text-center mx-10 mb-8 font-semibold">
        Your data will be stored on your device locally and not persisted in any
        database.
      </p>

      <div className="flex flex-col items-center mb-16">
        <Link
          href="/app"
          className="px-6 py-4 w-max text-xl font-semibold text-center bg-yellow hover:brightness-90 transition rounded-xl"
        >
          Get Started
        </Link>
      </div>

      <footer className="py-8 bg-[#252525] text-white">
        <div className="text-center">
          Made by Kunaal,Steve,Shivam,Ken
        </div>
      </footer>
    </div>
  );
}

export default Home;
