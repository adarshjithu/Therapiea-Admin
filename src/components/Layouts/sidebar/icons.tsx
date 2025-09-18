import { SVGProps } from "react";
import {
  ArrowDown,
  ChevronDown,
  ChevronUp,
  User,
  Box,
  Layers,
  ShoppingCart,
  Ruler,
  Home,
  Calendar,
  Type,
  Table,
  PieChart,
  Circle,
  KeyRound,
  ArrowLeft,
  Settings
} from 'lucide-react';

export type PropsType = SVGProps<SVGSVGElement>;

export function UserIcon(props: PropsType) {
  return <User {...props} />;
}

export function BoxIcon(props: PropsType) {
  return <Box {...props} />;
}

export function CategoryIcon(props: PropsType) {
  return <Layers {...props} />;
}

export function ChevronUpIcon(props: PropsType) {
  return <ChevronUp {...props} />;
}

export function OrderIcon(props: PropsType) {
  return <ShoppingCart {...props} />;
}

export function SizingIcon(props: PropsType) {
  return <Ruler {...props} />;
}

export function HomeIcon(props: PropsType) {
  return <Home {...props} />;
}

export function CalendarIcon(props: PropsType) {
  return <Calendar {...props} />;
}



export function AlphabetIcon(props: PropsType) {
  return <Type {...props} />;
}

export function TableIcon(props: PropsType) {
  return <Table {...props} />;
}

export function PieChartIcon(props: PropsType) {
  return <PieChart {...props} />;
}

export function FourCircleIcon(props: PropsType) {
  return <Circle {...props} />;
}

export function AuthenticationIcon(props: PropsType) {
  return <KeyRound {...props} />;
}

export function ArrowLeftIcon(props: PropsType) {
  return <ArrowLeft {...props} />;
}

export function SettingsIcon(props: PropsType) {
  return <Settings {...props} />;
}

// Note: ArrowDown is already imported and can be used directly
export { ArrowDown };