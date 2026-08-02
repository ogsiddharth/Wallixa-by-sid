type Props = {
  title: string;
  subtitle: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-10">

      <h2 className="text-4xl font-bold tracking-tight">
        {title}
      </h2>

      <p className="mt-2 text-gray-400">
        {subtitle}
      </p>

    </div>
  );
}