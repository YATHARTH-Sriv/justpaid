
export function GridPattern() {
    const columns = 40;
    const rows = 20;
    return (
      <div className="flex bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: columns }).map((_, col) => {
            const index = row * columns + col;
            return (
              <div
                key={`${col}-${row}`}
                className={`w-10 h-10 flex flex-shrink-0 rounded-md ${
                  index % 2 === 0
                    ? "bg-neutral-950"
                    : "bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                }`}
              />
            );
          })
        )}
      </div>
    );
  }
  