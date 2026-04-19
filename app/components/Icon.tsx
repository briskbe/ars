"use client";

import {
  Flame,
  Wrench,
  Zap,
  Settings,
  Truck,
  Shield,
  Sun,
  HardHat,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  Star,
  Users,
  TrendingUp,
  Heart,
  Briefcase,
  Building2,
  FileText,
  Upload,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "../../sanity/lib/iconList";

const MAP: Record<IconName, LucideIcon> = {
  Flame,
  Wrench,
  Zap,
  Settings,
  Truck,
  Shield,
  Sun,
  HardHat,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  Star,
  Users,
  TrendingUp,
  Heart,
  Briefcase,
  Building2,
  FileText,
  Upload,
};

export function getIcon(name?: string | null): LucideIcon {
  if (name && name in MAP) return MAP[name as IconName];
  return Wrench;
}

export default function Icon({
  name,
  className,
  strokeWidth,
}: {
  name?: string | null;
  className?: string;
  strokeWidth?: number;
}) {
  const Component = getIcon(name);
  return <Component className={className} strokeWidth={strokeWidth} />;
}
