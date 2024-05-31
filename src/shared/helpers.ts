import { BadRequestException, ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';


export const handleCreateUserError = (error: any) => {
  console.log(error)
  // Handle duplicate key errors
  if (error?.code === 11000) {
    throw new ConflictException('This email already exists');
  }
  
  // Handle Mongoose schema validation errors or any other specific errors
  if (error?.name === 'ValidationError' || error?.message.includes('not in schema')) {
    throw new BadRequestException('Invalid data provided');
  }
  
  // Fallback for other types of errors
  // throw new InternalServerErrorException('Unexpected error occurred');
}

export const hashPassord = async (saltValue: string): Promise<string> =>{
  const saltOrRounds = 10;
  const hashed = await bcrypt.hash(saltValue, saltOrRounds);
  return hashed
}