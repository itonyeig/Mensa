import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, Min, IsOptional, IsString } from "class-validator";


export class PaginationQueryDto {
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    @IsOptional()
    @ApiProperty({
      type: String,
      example: '1',
      required: false
    })
    page: number = 1;
  
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    @IsOptional()
    @ApiProperty({
      type: String,
      description: 'The number of messages to retrieve.',
      example: 10,
      required: false
    })
    limit: number = 10;

    // @IsString()
    // @IsOptional()
    // @ApiProperty({  required: false })
    // search?: string;
  }