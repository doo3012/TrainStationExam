import Link from "next/link";

type AppShellProps = {
  title: string;
  subtitle: string;
  active: "list" | "manage";
  children: React.ReactNode;
};

export function AppShell({ title, subtitle, active, children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-[#20201d]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="border-b border-[#d9d1c3] pb-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7d2d1f]">
                Train Station
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-normal text-[#20201d] md:text-5xl">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#665f54]">
                {subtitle}
              </p>
            </div>
            <nav className="inline-flex w-fit border border-[#c9bfaf] bg-[#fffaf2] p-1">
              <Link
                href="/"
                className={`px-4 py-2 text-sm font-medium transition ${
                  active === "list"
                    ? "bg-[#20201d] text-white"
                    : "text-[#5f574c] hover:bg-[#eee6d8]"
                }`}
              >
                List
              </Link>
              <Link
                href="/manage"
                className={`px-4 py-2 text-sm font-medium transition ${
                  active === "manage"
                    ? "bg-[#20201d] text-white"
                    : "text-[#5f574c] hover:bg-[#eee6d8]"
                }`}
              >
                Manage
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
