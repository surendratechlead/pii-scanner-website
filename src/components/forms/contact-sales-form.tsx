'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface ContactSalesFormProps {
  onSuccess?: () => void
}

export function ContactSalesForm({ onSuccess }: ContactSalesFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    onSuccess?.()
    toast({
      title: 'Request received!',
      description: 'Our sales team will contact you within 24 hours.',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sales-name" className="text-base">Full Name</Label>
        <Input id="sales-name" placeholder="John Doe" className="h-12 text-base" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sales-email" className="text-base">Work Email</Label>
        <Input id="sales-email" type="email" placeholder="john@company.com" className="h-12 text-base" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sales-company" className="text-base">Company</Label>
        <Input id="sales-company" placeholder="Acme Inc." className="h-12 text-base" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sales-employees" className="text-base">Number of Employees</Label>
        <Select>
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50-200">50-200</SelectItem>
            <SelectItem value="200-500">200-500</SelectItem>
            <SelectItem value="500-1000">500-1000</SelectItem>
            <SelectItem value="1000+">1000+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white h-12 text-base" disabled={loading}>
        {loading ? 'Submitting...' : 'Contact Sales'}
      </Button>
    </form>
  )
}
