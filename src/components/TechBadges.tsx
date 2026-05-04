import Image from "next/image";

interface TechItem {
  name: string;
  icon: string;
}

interface TechBadgesProps {
  techs: TechItem[];
}

export default function TechBadges({ techs }: TechBadgesProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {techs.map((tech) => (
        <div
          key={tech.name}
          className="flex items-center gap-2 bg-stone-700/30 px-4 py-2.5 rounded-lg border border-stone-600/50"
        >
          <Image src={tech.icon} alt={tech.name} width={32} height={32} />
          <span className="text-base font-medium">{tech.name}</span>
        </div>
      ))}
    </div>
  );
}
