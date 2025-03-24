"use client"

import type React from "react"

// components/InputBox.tsx
import { Input } from "@/components/ui/input"

interface InputBoxProps {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputBox({ label, placeholder, value, onChange }: InputBoxProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <Input placeholder={placeholder} value={value} onChange={onChange} className="w-full" />
    </div>
  )
}

