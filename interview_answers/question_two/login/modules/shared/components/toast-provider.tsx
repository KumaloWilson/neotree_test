"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      expand={true}
      richColors={true}
      closeButton={true}
      toastOptions={{
        duration: 4000,
        style: {
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "0.75rem",
          fontSize: "14px",
          fontFamily: "inherit",
        },
        className: "toast-custom",
      }}
    />
  )
}
