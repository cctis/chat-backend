import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as admin from 'firebase-admin';
import { USERS_FIREBASE_COLETION as USERS_FIREBASE_COLLECTION } from 'src/constants';
import { CreateUserResponse } from './dto/create-user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<void> {
    await this.firebaseAdmin
      .firestore()
      .collection(USERS_FIREBASE_COLLECTION)
      .add(createUserDto);
  }

  public async findAll(): Promise<CreateUserResponse[]> {
    const resultSet = await this.firebaseAdmin
      .firestore()
      .collection(USERS_FIREBASE_COLLECTION)
      .get();
    return resultSet.docs.map((doc) => ({
      id: doc.id,
      // nick:doc.data().nick
      ...doc.data(),
    }));
  }

  public async findOne(id: string): Promise<CreateUserResponse> {
    const documentRef = this.firebaseAdmin
      .firestore()
      .collection(USERS_FIREBASE_COLLECTION)
      .doc(id);
    const documentSnapshot = await documentRef.get();
    console.log('en el service', documentSnapshot.data());
    return documentSnapshot.exists
      ? {
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        }
      : null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
