import { ApiPropertyUserId } from "../../common/decorators/api-property-user-id";

export class DeleteTokenDTO {
    @ApiPropertyUserId()
    readonly userId: number
}