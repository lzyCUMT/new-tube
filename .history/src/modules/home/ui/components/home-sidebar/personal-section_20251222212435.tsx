"use client";

import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link";
import {
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "History",
    url: "/playList/history",
    icon: HistoryIcon,
    auth: true,
  },
  {
    title: "Like videos",
    url: "/playList/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "All playLists",
    url: "/feed/trending",
    icon: FlameIcon,
  },
];

export const PersonalSection = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>You</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false} //TODO:Change to look at current pathname
                onClick={() => {}} //TODO: Do something on click
              >
                <Link href={item.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
