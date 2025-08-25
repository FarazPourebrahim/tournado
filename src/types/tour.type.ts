export interface TourType {
    value: "Relaxation" | "Cultural" | "Adventure" | "Luxury" | "Family" | "Nature" | "Historical" | "Sports"
    label: string
}

export interface Tour {
    id: string
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
    createdAt: string
    updatedAt: string
    _count?: {
        comments: number
    }
    comments?: Comment[]
}

export interface Comment {
    id: string
    content: string
    userId: string
    tourId: string
    createdAt: string
    updatedAt: string
    user: {
        name: string
        username: string
    }
    tour?: {
        title: string
        location: string
    }
}
