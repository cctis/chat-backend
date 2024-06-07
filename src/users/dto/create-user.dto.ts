import { IsAlphanumeric, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(10)
    @IsAlphanumeric()
    readonly nick: string;
    @IsOptional()
    @MinLength(5)
    @MaxLength(40)
    @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/, {
        message: 'El campo solo puede contener letras en español y espacios',
    })
    readonly fullname?:string;

}
