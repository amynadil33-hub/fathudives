'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Waves, GraduationCap, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { formatPrice, cn } from '@/lib/utils'
import type { Course, CourseCategory } from '@/lib/types'

const CATEGORIES: (CourseCategory | 'All')[] = [
  'All',
  'First-Time Diving',
  'Beginner Certification',
  'Advanced Courses',
  'Rescue and Safety',
  'Speciality Courses',
  'Professional Development',
]

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <Link
        href={`/dive-courses/${course.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={course.featuredImage || '/placeholder.svg'}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {course.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl text-foreground">
          <Link
            href={`/dive-courses/${course.slug}`}
            className="transition-colors hover:text-primary"
          >
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-slate-blue" /> {course.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Waves className="size-3.5 text-slate-blue" /> {course.numberOfDives} dives
          </div>
          <div className="col-span-2 flex items-center gap-1.5">
            <GraduationCap className="size-3.5 text-slate-blue" /> Prior cert:{' '}
            {course.requiredCertification}
          </div>
        </dl>
        <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
          <div>
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              From (placeholder)
            </p>
            <p className="font-serif text-2xl text-primary">
              {formatPrice(course.price, course.currency)}
            </p>
          </div>
          <Link
            href={`/dive-courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Learn More
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function CoursesExplorer({ courses }: { courses: Course[] }) {
  const [category, setCategory] = useState<CourseCategory | 'All'>('All')

  const filtered = useMemo(
    () => (category === 'All' ? courses : courses.filter((c) => c.category === category)),
    [category, courses],
  )

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter courses by category"
        className="flex flex-wrap justify-center gap-2"
      >
        {CATEGORIES.map((c) => {
          const active = category === c
          return (
            <button
              key={c}
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {c}
            </button>
          )
        })}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course, i) => (
          <Reveal key={course.id} delay={Math.min(i * 0.06, 0.3)}>
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
