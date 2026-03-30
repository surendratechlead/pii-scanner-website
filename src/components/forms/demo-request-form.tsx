'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'

interface DemoRequestFormProps {
  onSuccess?: () => void
}

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Bahrain', 'Bangladesh', 'Belgium', 'Bhutan', 'Brazil', 'Bulgaria',
  'Cambodia', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Czech Republic',
  'Denmark', 'Dominican Republic',
  'Ecuador', 'Egypt', 'Estonia', 'Ethiopia',
  'Finland', 'France',
  'Germany', 'Ghana', 'Greece', 'Guatemala',
  'Honduras', 'Hong Kong', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kuwait',
  'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg',
  'Malaysia', 'Maldives', 'Mexico', 'Mongolia', 'Morocco', 'Myanmar',
  'Nepal', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway',
  'Oman',
  'Pakistan', 'Panama', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland',
  'Taiwan', 'Tanzania', 'Thailand', 'Tunisia', 'Turkey',
  'UAE', 'Uganda', 'Ukraine', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Venezuela', 'Vietnam',
  'Zambia', 'Zimbabwe',
]

const COUNTRY_CODES = [
  { code: '+1', label: 'US/CA (+1)' },
  { code: '+44', label: 'UK (+44)' },
  { code: '+91', label: 'India (+91)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+49', label: 'Germany (+49)' },
  { code: '+33', label: 'France (+33)' },
  { code: '+81', label: 'Japan (+81)' },
  { code: '+86', label: 'China (+86)' },
  { code: '+65', label: 'Singapore (+65)' },
  { code: '+971', label: 'UAE (+971)' },
  { code: '+966', label: 'Saudi (+966)' },
  { code: '+55', label: 'Brazil (+55)' },
  { code: '+52', label: 'Mexico (+52)' },
  { code: '+82', label: 'S. Korea (+82)' },
  { code: '+31', label: 'Netherlands (+31)' },
  { code: '+46', label: 'Sweden (+46)' },
  { code: '+41', label: 'Switzerland (+41)' },
  { code: '+39', label: 'Italy (+39)' },
  { code: '+34', label: 'Spain (+34)' },
  { code: '+48', label: 'Poland (+48)' },
]

export function DemoRequestForm({ onSuccess }: DemoRequestFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    company: '',
    country: '',
    comments: '',
    newsletter: false,
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
      description: 'Our team will contact you shortly to assist with your request.',
    })
  }

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demo-first-name" className="text-base">First Name *</Label>
          <Input
            id="demo-first-name"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            className="h-12 text-base"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-last-name" className="text-base">Last Name *</Label>
          <Input
            id="demo-last-name"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            className="h-12 text-base"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo-email" className="text-base">Organization Email Address *</Label>
        <Input
          id="demo-email"
          type="email"
          placeholder="yourname@email.com"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo-phone" className="text-base">Phone Number *</Label>
        <div className="flex gap-2">
          <Select value={formData.countryCode} onValueChange={(v) => updateField('countryCode', v)}>
            <SelectTrigger className="h-12 text-base w-[140px] flex-shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {COUNTRY_CODES.map((cc) => (
                <SelectItem key={cc.code} value={cc.code}>{cc.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="demo-phone"
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '')
              updateField('phone', val)
            }}
            className="h-12 text-base flex-1"
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">Numerical values only</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo-company" className="text-base">Company Name *</Label>
        <Input
          id="demo-company"
          placeholder="Company Name"
          value={formData.company}
          onChange={(e) => updateField('company', e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo-country" className="text-base">Country *</Label>
        <Select value={formData.country} onValueChange={(v) => updateField('country', v)} required>
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {COUNTRIES.map((country) => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo-comments" className="text-base">Comments</Label>
        <Textarea
          id="demo-comments"
          placeholder="Additional Comments..."
          value={formData.comments}
          onChange={(e) => updateField('comments', e.target.value)}
          rows={3}
          className="text-base resize-none"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        You can learn about our privacy practices, including how to withdraw your consent, in our{' '}
        <a href="#" className="text-emerald-600 hover:underline">Privacy Notice</a>.
        Upon submitting this form, we will contact you using the information provided to assist you with your request.
      </p>

      <div className="flex items-start gap-2">
        <Checkbox
          id="demo-newsletter"
          checked={formData.newsletter}
          onCheckedChange={(checked) => updateField('newsletter', checked === true)}
          className="mt-0.5"
        />
        <Label htmlFor="demo-newsletter" className="text-sm text-muted-foreground font-normal cursor-pointer">
          I&apos;d like to receive news about products, services, and events.
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white h-12 text-base"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}
