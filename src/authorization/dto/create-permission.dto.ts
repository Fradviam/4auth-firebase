import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePermissionDto {
  @ApiProperty()
  @IsString()
  menuOptionLabel: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  menuModuleLabel: string;

  @ApiProperty()
  @IsString()
  route: string;

  @ApiProperty()
  @IsNumber()
  parentPermissionId: number;
}
