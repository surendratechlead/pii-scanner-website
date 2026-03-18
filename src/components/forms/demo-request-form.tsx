'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface DemoRequestFormProps {
  onSuccess?: () => void
}

export function DemoRequestForm({ onSuccess }: DemoRequestFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    databaseType: '',
    message: ''
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    onSuccess?.()
    toast({
      title: 'Demo requested!',
      description: 'Our team will contact you shortly.',
    })
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="demo-name" className="text-base">Full Name</Label>
        <Input
          id="demo-name"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => updateField('fullName', e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="demo-email" className="text-base">Work Email</Label>
        <Input
          id="demo-email"
          type="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="demo-company" className="text-base">Company</Label>
        <Input
          id="demo-company"
          placeholder="Acme Inc."
          value={formData.company}
          onChange={(e) => updateField('company', e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="demo-phone" className="text-base">Phone (Optional)</Label>
        <Input
          id="demo-phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          className="h-12 text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="database-type" className="text-base">Primary Database</Label>
        <Select value={formData.databaseType} onValueChange={(v) => updateField('databaseType', v)}>
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Select your database" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <SelectItem value="postgresql">PostgreSQL</SelectItem>
            <SelectItem value="mysql">MySQL</SelectItem>
            <SelectItem value="mongodb">MongoDB</SelectItem>
            <SelectItem value="oracle">Oracle</SelectItem>
            <SelectItem value="sqlserver">SQL Server</SelectItem>
            <SelectItem value="snowflake">Snowflake</SelectItem>
            <SelectItem value="bigquery">BigQuery</SelectItem>
            <SelectItem value="multiple">Multiple Databases</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-base">Tell us about your needs (Optional)</Label>
        <Textarea
          id="message"
          placeholder="What are your main data privacy challenges?"
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          rows={3}
          className="text-base resize-none"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white h-12 text-base"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Request Demo'}
      </Button>
    </form>
  )
}
