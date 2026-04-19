export default function Footer() {
  return (
    <footer className="glass-panel-strong accent-glow mt-auto border-t border-white/10 px-4 py-7">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-300/75">
            Reddit
          </p>
          <p className="mt-2 text-sm text-zinc-200/78">
            Find me here.
          </p>
        </div>

        <a
          href="https://www.reddit.com/user/Genos_X_0/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-sm border border-neutral-300/25 bg-white/7 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/12"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 bg-neutral-200 text-base text-zinc-950 transition group-hover:bg-white">
            r
          </span>
          <span>
            Reddit
            <span className="ml-2 text-zinc-300/75">@Genos_X_0</span>
          </span>
        </a>
      </div>
    </footer>
  );
}
