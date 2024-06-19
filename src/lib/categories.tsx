import {
  BedIcon,
  BoxingGlovesIcon,
  CleanerIcon,
  CleaningSprayIcon,
  ClothesIcon,
  ComputerIcon,
  HammerIcon,
  HangerIcon,
  JumpRopeIcon,
  LaptopIcon,
  RulerIcon,
  SofaIcon,
  VacuumCleanerIcon,
  WashingMachineIcon,
} from "@/components/Shared/Icons";

const icons: { id: string; render: (className?: string) => React.ReactNode }[] =
  [
    {
      id: "clothes",
      render: (className) => (
        <ClothesIcon className={className} key={"clothes"} />
      ),
    },
    {
      id: "hanger",
      render: (className) => (
        <HangerIcon className={className} key={"hanger"} />
      ),
    },
    {
      id: "ruler",
      render: (className) => <RulerIcon className={className} key={"ruler"} />,
    },
    {
      id: "bed",
      render: (className) => <BedIcon className={className} key={"bed"} />,
    },
    {
      id: "boxing-gloves",
      render: (className) => (
        <BoxingGlovesIcon className={className} key={"boxing-gloves"} />
      ),
    },
    {
      id: "cleaner",
      render: (className) => (
        <CleanerIcon className={className} key={"cleaner"} />
      ),
    },
    {
      id: "cleaning-spray",
      render: (className) => (
        <CleaningSprayIcon className={className} key={"cleaning-spray"} />
      ),
    },
    {
      id: "jump-rope",
      render: (className) => (
        <JumpRopeIcon className={className} key={"jump-rope"} />
      ),
    },
    {
      id: "laptop",
      render: (className) => (
        <LaptopIcon className={className} key={"laptop"} />
      ),
    },
    {
      id: "hammer",
      render: (className) => (
        <HammerIcon className={className} key={"hammer"} />
      ),
    },
    {
      id: "vacuum-cleaner",
      render: (className) => (
        <VacuumCleanerIcon className={className} key={"vacuum-cleaner"} />
      ),
    },
    {
      id: "washing-machine",
      render: (className) => (
        <WashingMachineIcon className={className} key={"washing-machine"} />
      ),
    },
    {
      id: "computer",
      render: (className) => (
        <ComputerIcon className={className} key={"computer"} />
      ),
    },
    {
      id: "sofa",
      render: (className) => <SofaIcon className={className} key={"sofa"} />,
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
