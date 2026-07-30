type Props = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-gray-400">{description}</p>
    </div>
  );
}