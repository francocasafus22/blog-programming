import type { LucideProps } from "lucide-react";
import type { FC } from "react";

interface LinkProps {
  href: string;
  icon: FC<Omit<LucideProps, "ref">>;
  name: string;
}

export default function LinkWithIcon({ href, icon: Icon, name }: LinkProps) {
  return (
    <a
      href={`${href}`}
      className="flex gap-2 px-4 py-2 group items-center hover:bg-accent"
    >
      <Icon
        size={20}
        className="text-accent group-hover:text-accent-foreground"
      />
      {name}
    </a>
  );
}
