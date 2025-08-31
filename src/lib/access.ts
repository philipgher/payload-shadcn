import { User } from "@/payload-types"
import type { Access, PayloadRequest } from "payload"

export type Role = User['role']

// helper functions
export const isAdmin = (user?: { role?: Role }) => user?.role === "admin"
export const isEditor = (user?: { role?: Role }) =>
  user?.role === "editor" || isAdmin(user)
export const isAuthor = (user?: { role?: Role }) =>
  user?.role === "author" || isEditor(user) || isAdmin(user)
export const isViewer = (user?: { role?: Role }) =>
  user?.role === "viewer" || isAuthor(user)

export const checkRole =
  (roles: Role[]): Access =>
    ({ req }) =>
      !!req.user && roles.includes(req.user.role as Role)

// example: authors can only edit their own docs
export const canEditOwn =
  (roles: Role[] = ["author"]): Access =>
    ({ req, id }) => {
      const user = req.user
      if (!user) return false
      if (isAdmin(user) || isEditor(user)) return true
      // if author, only allow editing if they own it
      if (roles.includes(user.role) && id && req.data?.author === user.id) {
        return true
      }
      return false
    }
