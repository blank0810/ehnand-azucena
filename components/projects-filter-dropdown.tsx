"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Search, X, Filter, Tag, Layers, Award } from "lucide-react"

interface FilterOption {
  id: string
  label: string
  count: number
  category: "technology" | "category" | "status"
  icon?: React.ReactNode
}

interface ProjectsFilterDropdownProps {
  selectedFilter: string
  onFilterChange: (filter: string) => void
  projects: Array<{
    technologies: string[]
    category: string
    status: string
  }>
}

export default function ProjectsFilterDropdown({
  selectedFilter,
  onFilterChange,
  projects,
}: ProjectsFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<"all" | "technology" | "category" | "status">("all")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Generate filter options with counts
  const generateFilterOptions = (): FilterOption[] => {
    const options: FilterOption[] = []

    // Technology filters
    const technologies = new Set<string>()
    projects.forEach((project) => {
      project.technologies.forEach((tech) => technologies.add(tech))
    })

    Array.from(technologies)
      .sort()
      .forEach((tech) => {
        const count = projects.filter((p) => p.technologies.includes(tech)).length
        options.push({
          id: tech,
          label: tech,
          count,
          category: "technology",
          icon: <Tag className="h-4 w-4" />,
        })
      })

    // Category filters
    const categories = new Set<string>()
    projects.forEach((project) => categories.add(project.category))

    Array.from(categories)
      .sort()
      .forEach((category) => {
        const count = projects.filter((p) => p.category === category).length
        options.push({
          id: category,
          label: category,
          count,
          category: "category",
          icon: <Layers className="h-4 w-4" />,
        })
      })

    // Status filters
    const statuses = new Set<string>()
    projects.forEach((project) => statuses.add(project.status))

    Array.from(statuses)
      .sort()
      .forEach((status) => {
        const count = projects.filter((p) => p.status === status).length
        options.push({
          id: status,
          label: status,
          count,
          category: "status",
          icon: <Award className="h-4 w-4" />,
        })
      })

    return options
  }

  const filterOptions = generateFilterOptions()

  // Filter options based on search term and active category
  const filteredOptions = filterOptions.filter((option) => {
    const matchesSearch = option.label.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || option.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const handleFilterSelect = (filterId: string) => {
    onFilterChange(filterId)
    setIsOpen(false)
    setSearchTerm("")
  }

  const clearFilter = () => {
    onFilterChange("All")
    setIsOpen(false)
  }

  const getSelectedFilterLabel = () => {
    if (selectedFilter === "All") return "All Projects"
    const option = filterOptions.find((opt) => opt.id === selectedFilter)
    return option ? option.label : selectedFilter
  }

  const getSelectedFilterCount = () => {
    if (selectedFilter === "All") return projects.length
    const option = filterOptions.find((opt) => opt.id === selectedFilter)
    return option ? option.count : 0
  }

  const categoryTabs = [
    { id: "all" as const, label: "All Filters", icon: <Filter className="h-4 w-4" /> },
    { id: "technology" as const, label: "Technologies", icon: <Tag className="h-4 w-4" /> },
    { id: "category" as const, label: "Categories", icon: <Layers className="h-4 w-4" /> },
    { id: "status" as const, label: "Status", icon: <Award className="h-4 w-4" /> },
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-300
          ${
            isOpen
              ? "border-primary bg-primary/10 text-primary"
              : "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-primary/50 hover:bg-gray-700/50"
          }
          backdrop-blur-sm shadow-lg hover:shadow-xl min-w-[200px] justify-between
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5" />
          <div className="text-left">
            <div className="font-medium">{getSelectedFilterLabel()}</div>
            <div className="text-xs opacity-70">{getSelectedFilterCount()} projects</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedFilter !== "All" && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                clearFilter()
              }}
              className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-3 w-3 text-red-400" />
            </motion.button>
          )}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search filters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex border-b border-gray-700">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200
                    ${
                      activeCategory === tab.id
                        ? "text-primary bg-primary/10 border-b-2 border-primary"
                        : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/30"
                    }
                  `}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Filter Options */}
            <div className="max-h-64 overflow-y-auto">
              {/* All Projects Option */}
              {(activeCategory === "all" || searchTerm === "") && (
                <motion.button
                  onClick={() => handleFilterSelect("All")}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200
                    ${
                      selectedFilter === "All"
                        ? "bg-primary/20 text-primary border-r-2 border-primary"
                        : "text-gray-300 hover:bg-gray-700/50"
                    }
                  `}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <Filter className="h-4 w-4" />
                    <span className="font-medium">All Projects</span>
                  </div>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">{projects.length}</span>
                </motion.button>
              )}

              {/* Filtered Options */}
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleFilterSelect(option.id)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200
                      ${
                        selectedFilter === option.id
                          ? "bg-primary/20 text-primary border-r-2 border-primary"
                          : "text-gray-300 hover:bg-gray-700/50"
                      }
                    `}
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      {option.icon}
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">{option.count}</span>
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-400">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No filters found</p>
                  <p className="text-xs">Try a different search term</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-700 bg-gray-800/50">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{filteredOptions.length + (activeCategory === "all" ? 1 : 0)} filters available</span>
                {selectedFilter !== "All" && (
                  <button onClick={clearFilter} className="text-primary hover:text-primary/80 transition-colors">
                    Clear filter
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
