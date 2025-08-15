"use client"
import { cn } from "../utils/class-names-util"
import { FaCheck, FaMinus } from "react-icons/fa"

interface CheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  className?: string
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  label,
  className,
}: CheckboxProps) {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked)
    }
  }

  return (
    <label className={cn("flex items-center cursor-pointer", disabled && "cursor-not-allowed opacity-50", className)}>
      <div className="relative">
        <input type="checkbox" checked={checked} onChange={handleChange} disabled={disabled} className="sr-only" />
        <div
          className={cn(
            "w-4 h-4 border-2 rounded flex items-center justify-center transition-colors",
            checked || indeterminate
              ? "bg-primary border-primary text-white"
              : "border-gray-300 bg-white hover:border-primary",
          )}
        >
          {indeterminate ? <FaMinus className="w-2 h-2" /> : checked ? <FaCheck className="w-2 h-2" /> : null}
        </div>
      </div>
      {label && <span className="ml-2 text-sm text-gray-700">{label}</span>}
    </label>
  )
}
