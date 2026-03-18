'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SignupFormProps {
  onSuccess?: () => void
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: ''
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    onSuccess?.()
    toast({
      title: 'Account created!',
      description: 'Check your email to verify your account.',
    })
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-base">Full Name</Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => updateField('fullName', e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base">Work Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company" className="text-base">Company</Label>
        <Input
          id="company"
          placeholder="Acme Inc."
          value={formData.company}
          onChange={(e) => updateField('company', e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-base">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            className="h-12 text-base pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white h-12 text-base"
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
      <p className="text-xs text-muted-foreground text-center px-4">
        By signing up, you agree to our{' '}
        <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a> and{' '}
        <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>
      </p>
    </form>
  )
}
