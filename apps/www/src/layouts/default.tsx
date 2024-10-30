import type { QueryClient } from "@tanstack/react-query"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { ChevronsUpDown, Home, LogOut, Moon } from "lucide-react"
import type { Component, ExoticComponent, ReactNode } from "react"
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Separator } from "~/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import { Skeleton } from "~/components/ui/skeleton"
import type { Org } from "~/schemas/org"
import type { User } from "~/schemas/user"
import { AuthServices } from "~/services/auth"
import { OrgServices } from "~/services/org"

const linkGroups = [
  {
    links: [
      {
        title: "Início",
        path: "/",
        icon: Home,
      },
    ],
  },

  {
    label: "Produtos",
    links: [],
  },
] satisfies Array<{
  label?: string
  links: Array<{
    title: string
    path: string
    icon: ReactNode | Component | ExoticComponent
  }>
}>

const userQueryOptions = queryOptions({
  queryKey: ["user"],
  queryFn: AuthServices.getUser,
})

const orgQueryOptions = queryOptions({
  queryKey: ["org"],
  queryFn: OrgServices.getOrg,
})

type LoaderData = {
  user: Promise<User>
  org: Promise<Org>
}

export function loader(queryClient: QueryClient) {
  return function () {
    return {
      user: queryClient.ensureQueryData(userQueryOptions),
      org: queryClient.ensureQueryData(orgQueryOptions),
    } satisfies LoaderData
  }
}

export default function DefaultLayout() {
  const loaderData = useLoaderData() as LoaderData
  const location = useLocation()

  const userQuery = useQuery({
    ...userQueryOptions,
    initialData: loaderData.user as unknown as User,
  })
  const orgQuery = useQuery({
    ...orgQueryOptions,
    initialData: loaderData.org as unknown as Org,
  })

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              {orgQuery.isLoading && (
                <div className="flex gap-2 p-2 group-data-[collapsible=icon]:!p-0">
                  <Skeleton className="aspect-square size-8" />

                  <div className="flex flex-col justify-between truncate">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              )}

              {orgQuery.isSuccess && (
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  tooltip={orgQuery.data.name}>
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    {orgQuery.data.abbr}
                  </div>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="text-muted-foreground truncate text-xs">Organização</span>
                    <span className="truncate font-semibold">{orgQuery.data.name}</span>
                  </div>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {linkGroups.map((group, groupIndex) => (
            <SidebarGroup key={groupIndex}>
              {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}

              <SidebarGroupContent>
                <SidebarMenu>
                  {group.links.map((link) => (
                    <SidebarMenuButton
                      isActive={link.path === location.pathname}
                      key={link.path}
                      tooltip={link.title}
                      asChild>
                      <Link to={link.path}>
                        {link.icon && <link.icon />}

                        <span>{link.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                {userQuery.isLoading && (
                  <div className="flex gap-2 p-2 group-data-[collapsible=icon]:!p-0">
                    <Skeleton className="aspect-square size-8" />

                    <div className="flex flex-col justify-between truncate">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                )}

                {userQuery.isSuccess && (
                  <>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage
                            src={userQuery.data.photoURL || undefined}
                            alt={userQuery.data.name}
                          />

                          <AvatarFallback className="rounded-lg">
                            {userQuery.data.abbr}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">{userQuery.data.name}</span>
                          <span className="truncate text-xs">{userQuery.data.email}</span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                      side="bottom"
                      align="end"
                      sideOffset={4}>
                      <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                              src={userQuery.data.photoURL || undefined}
                              alt={userQuery.data.name}
                            />
                            <AvatarFallback className="rounded-lg">
                              {userQuery.data.abbr}
                            </AvatarFallback>
                          </Avatar>

                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{userQuery.data.name}</span>
                            <span className="truncate text-xs">{userQuery.data.email}</span>
                          </div>
                        </div>
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />

                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <LogOut />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </>
                )}
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="bg-background sticky inset-0 flex h-16 w-full shrink-0 items-center justify-between border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger />

            <Separator orientation="vertical" className="mr-2 h-4" />

            {/* TODO: fazer o breadcrumb funcional */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Moon />

            <span className="sr-only">Toggle Theme</span>
          </Button>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
