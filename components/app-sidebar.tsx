"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

import {
  CommandIcon,
  DashboardSquare01Icon,
  Folder01Icon,
  LicenseThirdPartyIcon,
  List,
  Plus,
  Shirt01Icon,
} from "@hugeicons/core-free-icons"
import Image from "next/image"

type LinkItem = {
  name: string
  href: string
  icon: IconSvgElement
  permission?: string[]
}

type NavGroup = {
  groupName: string
  links: LinkItem[]
  permission?: string[] | string
}

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const LINKS: NavGroup[] = [
    // {
    //   groupName: "Dashboard",
    //   links: [
    //     {
    //       name: "Contacts",
    //       href: "#",
    //       icon: DashboardSquare01Icon,
    //     },
    //   ],
    // },
    {
      groupName: "Inventory",
      links: [
        // {
        //   name: "Create New SKU",
        //   href: "/purchase-order/create-purchase-order",
        //   icon: Plus,
        // },
        {
          name: "All Products",
          href: "/inventory/sku/all-sku",
          icon: Shirt01Icon,
        },
        {
          name: "All Inventory",
          href: "/inventory/all-inventory",
          icon: List,
        },
      ],
    },
    {
      groupName: "Product Vendor",
      links: [
        // {
        //   name: "Create New SKU",
        //   href: "/purchase-order/create-purchase-order",
        //   icon: Plus,
        // },
        {
          name: "All Vendors",
          href: "/product-vendor/all-vendors",
          icon: LicenseThirdPartyIcon,
        },
      
      ],
    },
    {
      groupName: "Purchase Order",
      links: [
        {
          name: "Create Purchase Order",
          href: "/purchase-order/create-purchase-order",
          icon: Plus,
        },
        {
          name: "All Purchase Orders",
          href: "/purchase-order/all-purchase-order",
          icon: List,
        },
      ],
    },
  ]

  return (
    <Sidebar collapsible="offcanvas" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="">
          
              {/* <HugeiconsIcon
                icon={CommandIcon}
                strokeWidth={2}
                className="size-5!"
              />
              <span className="text-base font-semibold">
                Acme Inc.
              </span> */}

              <Image width={500} height={500} src={"/assets/images/logo/braford2.png"} alt="Logo" className="h-10 object-contain"/> 
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {LINKS.map((group) => (
          <SidebarGroup
            key={group.groupName}
            className="group-data-[collapsible=icon]:hidden"
          >
            <SidebarGroupLabel>
              {group.groupName}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.links.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      render={<a href={item.href} />}
                    >
                      <HugeiconsIcon
                        icon={item.icon}
                        strokeWidth={2}
                      />
                      <span>{item.name}</span>
                    </SidebarMenuButton>

                    {/* <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <SidebarMenuAction
                            showOnHover
                            className="aria-expanded:bg-muted"
                          />
                        }
                      >
                        <HugeiconsIcon
                          icon={item.icon}
                          strokeWidth={2}
                        />
                        <span className="sr-only">
                          More
                        </span>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        side="right"
                        align="start"
                        className="w-40"
                      >
                        <DropdownMenuItem>
                          <HugeiconsIcon
                            icon={Folder01Icon}
                            strokeWidth={2}
                          />
                          <span>Open</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>{/* User section */}</SidebarFooter>
    </Sidebar>
  )
}