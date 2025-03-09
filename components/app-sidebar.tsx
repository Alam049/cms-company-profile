"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  SquareTerminal,
  Diamond,
  WrapText,
  CalendarRange,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LogoSidebar } from "@/components/logo-sidebar"
import Link from "next/link"


const data = {
  user: {
    name: "Administrator",
    email: "administrator@gmail.com",
    avatar: "/profile.jpeg",
  },
  logo: [
    {
      name: "SG CMS ",
      logo: "/site-logo.svg",
      plan: "Holding Company",
      route:"/"
    }
  ],
  navMain: [
    {
      title: "Home Page",
      url: "/",
      icon: Diamond,
      isActive: true,
      items: [],
    },
    {
      title: "About Us",
      url: "about-us",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Our Vision",
          url: "/about-us/our-vision",
        },
        {
          title: "Our Mission",
          url: "/about-us/our-mission",
        },
        {
          title: "History",
          url: "/about-us/history",
        },
      ],
    },
    {
      title: "Product",
      url: "/product",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/product/overview",
        },
        {
          title: "Reason",
          url: "/product/reason",
        },
        {
          title: "Product Detail",
          url: "/product/product-detail",
        },
        {
          title: "Specification",
          url: "/product/specification",
        },
      ],
    },
    {
      title: "Partnership",
      url: "/partnerships",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/partnership/overview",
        },
        {
          title: "How to Partner",
          url: "/partnership/how-to-partner",
        },
        {
          title: "Benefits",
          url: "/partnership/benefit",
        },
        {
          title: "Requirements",
          url: "/partnership/requirement",
        },
      ],
    },
    {
      title: "Activities",
      url: "/activities",
      icon: CalendarRange,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/activities/overview",
        },
        {
          title: "News",
          url: "/activities/news",
        },
      ],
    },
    {
      title: "Support",
      url: "/supports",
      icon: WrapText, 
      isActive: true,
      items: [
        {
          title: "Help Center",
          url: "/supports/help-center",
        },
        {
          title: "FAQs",
          url: "/supports/faq",
        },
        {
          title: "Contact Support",
          url: "/supports/contact-support",
        },
        {
          title: "Community Forum",
          url: "/supports/community-forum",
        },
        {
          title: "System Status",
          url: "/supports/system-status",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
       <Link href="/">
       <LogoSidebar
        logo={data.logo}
        />
       </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
