export interface CreateCommentDto {
    content: string
    tourId: string
}

export interface UpdateCommentDto {
    content: string
}

export interface CommentFiltersDto {
    tourId?: string
    userId?: string
    page?: number
    limit?: number
}
