export interface CreateTourDto {
    title: string
    type: string
    typeLabel: string
    location: string
    price: number
    duration: number
    guideAvailable: boolean
    image: string
    description: string
    highlights: string[]
    itinerary: any
    included: string[]
    excluded: string[]
    requirements: string[]
    maxCapacity: number
    difficulty: string
    bestTime: string
    transportation: string
    accommodation: string
}

export interface UpdateTourDto extends Partial<CreateTourDto> {}

export interface TourFiltersDto {
    type?: string
    location?: string
    minPrice?: number
    maxPrice?: number
    minDuration?: number
    maxDuration?: number
    guideAvailable?: boolean
    difficulty?: string
    page?: number
    limit?: number
    search?: string
}
