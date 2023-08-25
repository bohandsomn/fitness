import { ApiHeaderOptions, ApiHeaders } from '@nestjs/swagger'

export const ApiPropertyHeadersAuthorization = (headers: ApiHeaderOptions[] = []) => ApiHeaders([
    { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' },
    ...headers
])