type Props = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: Props) {
  return (
    <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur transition duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(37,99,235,0.15)]">
      {/* Icon badge */}
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-lg font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
        {title.charAt(0)}
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-400">
        {description}
      </p>

      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 transition group-hover:opacity-100" />
    </div>
  );
}