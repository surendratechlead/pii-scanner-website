'use client'

import { motion, type Variants } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'
import type { ReactNode } from 'react'

interface MotionSectionProps {
  children: ReactNode
  variants?: Variants
  className?: string
  id?: string
}

export function MotionSection({ children, variants, className, id }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={variants}
    >
      {children}
    </motion.section>
  )
}

interface MotionDivProps {
  children: ReactNode
  variants?: Variants
  className?: string
}

export function MotionDiv({ children, variants, className }: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function MotionItem({ children, variants, className }: MotionDivProps) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
