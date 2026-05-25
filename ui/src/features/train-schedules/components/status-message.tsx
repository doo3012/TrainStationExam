type StatusMessageProps = {
  title: string;
  detail?: string;
};

export function StatusMessage({ title, detail }: StatusMessageProps) {
  return (
    <div className="border border-dashed border-[#c9bfaf] bg-[#fffaf2] px-5 py-8 text-center">
      <p className="text-sm font-semibold text-[#20201d]">{title}</p>
      {detail ? <p className="mt-2 text-sm text-[#665f54]">{detail}</p> : null}
    </div>
  );
}
