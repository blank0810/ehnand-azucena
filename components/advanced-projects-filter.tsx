"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Filter,
  Search,
  X,
  Plus,
  Tag,
  Calendar,
  User,
  Award,
  Layers,
  Star,
  Clock,
  Code,
  Globe,
  Sparkles,
  ChevronRight,
  Settings,
} from "lucide-react"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  period: string
  role: string
  status: string
  category: string
  liveUrl?: string
  githubUrl?: string
}

interface FilterCriteria {
  id: string
  name: string
  type: "technology" | "category" | "status" | "role" | "year" | "custom"
  value: string
  icon: React.ReactNode
  color: string
}

interface PreMadeFilter {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  criteria: FilterCriteria[]
  gradient: string
}

interface AdvancedProjectsFilterProps {
  projects: Project[]
  onFilteredProjectsChange: (projects: Project[]) => void
  onActiveFiltersChange: (filters: FilterCriteria[]) => void
}

export default function AdvancedProjectsFilter({
  projects,
  onFilteredProjectsChange,
  onActiveFiltersChange,
}: AdvancedProjectsFilterProps) {
  const [activeFilters, setActiveFilters] = useState<FilterCriteria[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showCustomBuilder, setShowCustomBuilder] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Pre-made filter combinations
  const preMadeFilters: PreMadeFilter[] = [
    {
      id: "live-projects",
      name: "Live Projects",
      description: "Currently active and accessible projects",
      icon: <Globe className="h-4 w-4" />,
      color: "text-green-400",
      gradient: "from-green-500/20 to-emerald-500/20",
      criteria: [
        {
          id: "live-status-1",
          name: "Live Production",
          type: "status",
          value: "Live Production",
          icon: <Award className="h-3 w-3" />,
          color: "bg-green-500/20 text-green-400",
        },
        {
          id: "live-status-2",
          name: "Live",
          type: "status",
          value: "Live",
          icon: <Award className="h-3 w-3" />,
          color: "bg-green-500/20 text-green-400",
        },
      ],
    },
    {
      id: "saas-platforms",
      name: "SaaS Platforms",
      description: "Software as a Service applications",
      icon: <Layers className="h-4 w-4" />,
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-cyan-500/20",
      criteria: [
        {
          id: "saas-category",
          name: "SaaS Platform",
          type: "category",
          value: "SaaS Platform",
          icon: <Layers className="h-3 w-3" />,
          color: "bg-blue-500/20 text-blue-400",
        },
      ],
    },
    {
      id: "recent-work",
      name: "Recent Work",
      description: "Projects from 2024-2025",
      icon: <Clock className="h-4 w-4" />,
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20",
      criteria: [
        {
          id: "recent-2025",
          name: "2025",
          type: "year",
          value: "2025",
          icon: <Calendar className="h-3 w-3" />,
          color: "bg-purple-500/20 text-purple-400",
        },
        {
          id: "recent-2024",
          name: "2024",
          type: "year",
          value: "2024",
          icon: <Calendar className="h-3 w-3" />,
          color: "bg-purple-500/20 text-purple-400",
        },
      ],
    },
    {
      id: "full-stack",
      name: "Full Stack",
      description: "Projects using React or Laravel",
      icon: <Code className="h-4 w-4" />,
      color: "text-orange-400",
      gradient: "from-orange-500/20 to-red-500/20",
      criteria: [
        {
          id: "react-tech",
          name: "React",
          type: "technology",
          value: "React",
          icon: <Tag className="h-3 w-3" />,
          color: "bg-orange-500/20 text-orange-400",
        },
        {
          id: "laravel-tech",
          name: "Laravel",
          type: "technology",
          value: "Laravel",
          icon: <Tag className="h-3 w-3" />,
          color: "bg-orange-500/20 text-orange-400",
        },
      ],
    },
    {
      id: "leadership-roles",
      name: "Leadership Roles",
      description: "Projects where I led development",
      icon: <Star className="h-4 w-4" />,
      color: "text-yellow-400",
      gradient: "from-yellow-500/20 to-amber-500/20",
      criteria: [
        {
          id: "lead-role",
          name: "Lead Developer",
          type: "role",
          value: "Lead Developer",
          icon: <User className="h-3 w-3" />,
          color: "bg-yellow-500/20 text-yellow-400",
        },
        {
          id: "solo-role",
          name: "Solo Developer",
          type: "role",
          value: "Solo Developer",
          icon: <User className="h-3 w-3" />,
          color: "bg-yellow-500/20 text-yellow-400",
        },
      ],
    },
  ]

  // Available filter options for custom builder
  const availableFilters = {
    technologies: Array.from(new Set(projects.flatMap((p) => p.technologies))).sort(),
    categories: Array.from(new Set(projects.map((p) => p.category))).sort(),
    statuses: Array.from(new Set(projects.map((p) => p.status))).sort(),
    roles: Array.from(new Set(projects.map((p) => p.role))).sort(),
    years: Array.from(new Set(projects.map((p) => p.period.match(/\d{4}/g)?.[0] || "")))
      .filter(Boolean)
      .sort(),
  }

  // Filter projects based on active filters
  const filterProjects = (filters: FilterCriteria[]) => {
    if (filters.length === 0) return projects

    return projects.filter((project) => {
      // Group filters by type for proper OR/AND logic
      const filtersByType = filters.reduce(
        (acc, filter) => {
          if (!acc[filter.type]) {
            acc[filter.type] = []
          }
          acc[filter.type].push(filter)
          return acc
        },
        {} as Record<string, FilterCriteria[]>,
      )

      // For each filter type, use OR logic within the type, AND logic between types
      return Object.entries(filtersByType).every(([type, typeFilters]) => {
        return typeFilters.some((filter) => {
          switch (filter.type) {
            case "technology":
              return project.technologies.includes(filter.value)
            case "category":
              return project.category === filter.value
            case "status":
              return project.status === filter.value
            case "role":
              return project.role === filter.value
            case "year":
              return project.period.includes(filter.value)
            default:
              return true
          }
        })
      })
    })
  }

  // Apply search filter
  const applySearch = (projectList: Project[]) => {
    if (!searchTerm) return projectList
    return projectList.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  // Update filtered projects when filters or search changes
  useEffect(() => {
    const filtered = filterProjects(activeFilters)
    const searched = applySearch(filtered)
    onFilteredProjectsChange(searched)
    onActiveFiltersChange(activeFilters)
  }, [activeFilters, searchTerm, projects])

  const applyPreMadeFilter = (preMadeFilter: PreMadeFilter) => {
    setActiveFilters(preMadeFilter.criteria)
    setSelectedCategory(preMadeFilter.id)
  }

  const addCustomFilter = (type: string, value: string) => {
    const icons = {
      technology: <Tag className="h-3 w-3" />,
      category: <Layers className="h-3 w-3" />,
      status: <Award className="h-3 w-3" />,
      role: <User className="h-3 w-3" />,
      year: <Calendar className="h-3 w-3" />,
    }

    const colors = {
      technology: "bg-blue-500/20 text-blue-400",
      category: "bg-green-500/20 text-green-400",
      status: "bg-purple-500/20 text-purple-400",
      role: "bg-orange-500/20 text-orange-400",
      year: "bg-pink-500/20 text-pink-400",
    }

    const newFilter: FilterCriteria = {
      id: `${type}-${value}-${Date.now()}`,
      name: value,
      type: type as FilterCriteria["type"],
      value,
      icon: icons[type as keyof typeof icons],
      color: colors[type as keyof typeof colors],
    }

    setActiveFilters([...activeFilters, newFilter])
    setSelectedCategory(null)
  }

  const removeFilter = (filterId: string) => {
    setActiveFilters(activeFilters.filter((f) => f.id !== filterId))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setSelectedCategory(null)
    setSearchTerm("")
  }

  const getFilterCount = (criteria: FilterCriteria[]) => {
    return filterProjects(criteria).length
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </motion.div>

      {/* Pre-made Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Quick Filters
          </h3>
          <button
            onClick={() => setShowCustomBuilder(!showCustomBuilder)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-300"
          >
            <Settings className="h-4 w-4" />
            Custom Filter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {preMadeFilters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => applyPreMadeFilter(filter)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300 group
                ${
                  selectedCategory === filter.id
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                    : "border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-700/30"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${filter.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div className="relative z-10">
                <div className={`${filter.color} mb-2`}>{filter.icon}</div>
                <h4 className="font-semibold text-white mb-1">{filter.name}</h4>
                <p className="text-xs text-gray-400 mb-2">{filter.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{getFilterCount(filter.criteria)} projects</span>
                  <ChevronRight className="h-3 w-3 text-gray-500 group-hover:text-primary transition-colors" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Custom Filter Builder */}
      <AnimatePresence>
        {showCustomBuilder && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 space-y-4"
          >
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" />
              Build Custom Filter
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(availableFilters).map(([category, options]) => (
                <div key={category} className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-300 capitalize">{category}</h5>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {options.map((option) => (
                      <button
                        key={option}
                        onClick={() => addCustomFilter(category.slice(0, -1), option)}
                        disabled={activeFilters.some((f) => f.value === option)}
                        className="w-full text-left px-3 py-2 text-sm bg-gray-700/50 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-white flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                Active Filters ({activeFilters.length})
              </h4>
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
              >
                Clear All
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <motion.div
                  key={filter.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                    ${filter.color} border border-current/30 backdrop-blur-sm
                  `}
                >
                  {filter.icon}
                  <span>{filter.name}</span>
                  <button
                    onClick={() => removeFilter(filter.id)}
                    className="ml-1 p-0.5 hover:bg-current/20 rounded-full transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Results Summary */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/30 rounded-full border border-gray-700/50">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-gray-300">
            {activeFilters.length === 0 ? (
              <>
                Showing all <span className="text-primary font-semibold">{projects.length}</span> projects
              </>
            ) : (
              <>
                Showing <span className="text-primary font-semibold">{filterProjects(activeFilters).length}</span> of{" "}
                <span className="text-white font-semibold">{projects.length}</span> projects
              </>
            )}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
