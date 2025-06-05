import Image from "next/image";

export default function Header() {
  return (
    <header>
      <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <button
            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <!-- Hamburger icon --> */}
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule={"evenodd"}
                />
              </svg>
            </span>
          </button>

          {/* <!-- Collapsible navigation container --> */}
          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-te-collapse-item
          >
            {/* <!-- Logo --> */}
            <a
              className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
              href="#"
            >
              <div
                style={{
                  background:
                    "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxLjg1MDkgMjAuNDM1M0MyMC4zODg4IDIwLjA4NyAxOS43ODM2IDE4LjA2NzQgMTkuNDIxNCAxNy4yNDU2QzE5LjEzNDIgMTYuNTkxMiAxMy4wNjkyIDIuNTAwMyAxMy4wNjkyIDIuNTAwM0gxMC43NUMxMC4wODUgMi40OTU4NyA5LjQyMDYgMi41NDA3MyA4Ljc2MjE4IDIuNjM0NUM1LjYxNTg5IDMuMTAwMzEgMy4yNzAyNSA1LjA0NDU0IDMuMjcwMjUgOC4yOTA4MkMzLjMxMjIyIDEwLjA0MjEgNC4wNDEwOCAxMS41ODU5IDYuNjE0MjIgMTIuODc5MUw0Ljk2NDMyIDE2LjUzOTFDNC43MTQ3NSAxNy4wOTM2IDQuMDg5NjggMTguNDYgMy43NDE4IDE5LjEyMjFDMy4wNzkyIDIwLjM5MDkgMi41NjY3OCAyMC40Mzg2IDEuNTA0MzkgMjAuNDM4NlYyMS41QzIuNTg2NjYgMjEuNDkzMyA3LjM2NzM5IDIxLjUgNy4zNjczOSAyMS41QzguMjUwODYgMjEuNSA5LjU3NjA5IDIxLjM4OTEgMTAuNDIwOSAyMS4xNTczQzEyLjg1MDUgMjAuNDkxOCAxNC4yNjUyIDE4Ljg0NiAxNC4yNjUyIDE2LjcwMjFDMTQuMjY1MiAxMy44Mjk2IDEyLjI5NjEgMTIuNDk5OCA5LjY1MDA5IDExLjE3QzkuMTY4NTggMTAuOTEzOCA4Ljk4NzQ3IDEwLjgwNCA4Ljk4NzQ3IDEwLjgwNEwxMC4xNDU5IDguMTQyMkw5LjQ2NDU1IDYuNTA0MDhMNy44MTc5NiAxMC4yMTA2QzcuODE3OTYgMTAuMjEwNiA1LjU5MjcgOS42NDgzMyA1LjU5MjcgNy4wMTIwNEM1LjU5MjcgNC41ODQyNiA4LjA0NTQ2IDMuNjg0OCAxMC4xMjA1IDMuNjg0OEgxMC43ODMxQzEwLjg2NzEgMy44Nzc3OCAxOC4yMjMyIDIxLjQ5ODkgMTguMjIzMiAyMS40OTg5QzE4LjMzMzYgMjEuNDk4OSAyMi4zMjM1IDIxLjQ5ODkgMjIuNDk1OSAyMS40OTg5TDIyLjQ4ODEgMjAuNDQ0MkMyMS45OTExIDIwLjQ0NDIgMjIuMDc4NSAyMC40MzY0IDIxLjg1MDkgMjAuNDM1M1pNMTEuNjQzNCAxNy4yOTg4QzExLjY0MzQgMTguNzEwNiAxMC44MTMgMjAuNDIyIDcuNDgzMzQgMjAuNDIySDQuNzc3NjlDNS4wNDQ5NCAxOS43ODMxIDcuODA1ODEgMTMuNDYzNiA3LjgwNTgxIDEzLjQ2MzZDMTAuMTE1IDE0LjYwNTkgMTEuNjQ3OCAxNS4yODkxIDExLjY0MzQgMTcuMjk4OFoiIGZpbGw9IiMxNjI1NEMiLz4KPC9zdmc+Cg==)",
                  height: "26px",
                  width: "26px",
                }}
              >&nbsp;</div>
            </a>
            {/* <!-- Left navigation links --> */}
            <ul
              className="list-style-none mr-auto flex flex-wrap pl-0"
              data-te-navbar-nav-ref
            >
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <a
                  className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                  href="/"
                  data-te-nav-link-ref
                >
                  Home
                </a>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <a
                  className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  href="/issuance"
                  data-te-nav-link-ref
                >
                  Issuance
                </a>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <a
                  className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  href="/verification"
                  data-te-nav-link-ref
                >
                  Verification
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
