import {
  ArmchairIcon,
  HomeIcon,
  MonitorIcon,
  ShirtIcon,
  WrenchIcon,
} from "lucide-react";

const icons: { id: string; render: (className?: string) => React.ReactNode }[] =
  [
    {
      id: "shirt",
      render: (className) => <ShirtIcon className={className} key={"shirt"} />,
    },
    {
      id: "monitor",
      render: (className) => (
        <MonitorIcon className={className} key={"monitor"} />
      ),
    },
    {
      id: "home",
      render: (className) => <HomeIcon className={className} key={"home"} />,
    },
    {
      id: "armchair",
      render: (className) => (
        <ArmchairIcon className={className} key={"armchair"} />
      ),
    },
    {
      id: "wrench",
      render: (className) => (
        <WrenchIcon className={className} key={"wrench"} />
      ),
    },
  ];

export function getIcon(
  iconId: string,
  className?: string
): React.ReactNode | undefined {
  return icons.find((i) => i.id === iconId)?.render(className);
}

export function getAllIcons() {
  return icons;
}
